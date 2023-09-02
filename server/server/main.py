from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from urllib.parse import parse_qs
from multidict import MultiDict
from typing import Optional
from datetime import datetime
import sqlite3 

app = FastAPI()

# Получение properties по названию
@app.get("/properties_by_name")
async def get_properties(property_name: str):
    connection = get_database_connection()
    cursor = connection.cursor()
    
    query = f"SELECT * FROM test_properties WHERE LOWER(name) LIKE LOWER('%{property_name}%')"
    cursor.execute(query)
    
    properties = cursor.fetchall()
    connection.close()
    
    properties_list = [
        {"id": property_data[0], "name": property_data[1], "type": property_data[2]}
        for property_data in properties
    ]
    
    return {"properties": properties_list}

# Получение listings по фильтрам
@app.get("/listings")
async def get_listings(request: Request):
    query_params = request.query_params
    is_active = query_params.get("is_active")
    scan_date_from = query_params.get("scan_date_from")
    scan_date_to = query_params.get("scan_date_to")
    
    query_string = request.url.query    
    parsed_data = parse_nested_query_params(query_string)
    properties = parsed_data.get('properties', None)

    query = build_query(is_active, scan_date_from, scan_date_to, properties)
    aggregate = execute_query_and_aggregate(query)
    
    return {
        'listings': aggregate,
        'debugMode': query
    }


# Подключение к БД
def get_database_connection():
    try:
        connection = mysql.connector.connect(
            user='root', password='root', host='localhost', port='3306', database='db'
        )
        return connection
    except mysql.connector.Error as err:
        print("Error connecting to MySQL:", err)
        return None
   
def parse_nested_query_params(query_string):
    parsed_query = parse_qs(query_string)
    nested_params = MultiDict()
    
    for key, values in parsed_query.items():
        if "[" in key and "]" in key:
            param, idx = key.split("[")
            idx = idx.rstrip("]")
            if not nested_params.get(param):
                nested_params[param] = {}
            nested_params[param][idx] = values[0]
        else:
            nested_params[key] = values[0]
    
    return nested_params

# Формирование запроса для listings
def build_query(is_active=None, scan_date_from=None, scan_date_to=None, property_filters=None):
    connection = get_database_connection()
    cursor = connection.cursor()
    
    query = """
    SELECT
      tl.listing_id,
      tl.scan_date,
      tl.is_active,
      tp.id AS property_id,
      tp.name AS property_name,
      CASE
        WHEN tp.type = 'str' THEN tps.value
        WHEN tp.type = 'bool' THEN tpb.value
      END AS property_value
    FROM test_listings tl
    LEFT JOIN test_property_values_str tps ON tl.listing_id = tps.listing_id
    LEFT JOIN test_property_values_bool tpb ON tl.listing_id = tpb.listing_id
    JOIN test_properties tp ON tps.property_id = tp.id OR tpb.property_id = tp.id
    """

    conditions = []
    
    if is_active == 'active':
        conditions.append("tl.is_active = true")
    elif is_active == 'inactive':
        conditions.append("tl.is_active IS NOT true")
    
    if scan_date_from:
        conditions.append(f"tl.scan_date >= '{scan_date_from}'")
    if scan_date_to:
        conditions.append(f"tl.scan_date <= '{scan_date_to}'")

    property_value_conditions = []
    
    if property_filters:
        if isinstance(property_filters, dict):
            for prop_id, prop_value in property_filters.items():
                
                prop_type_query = f"SELECT type FROM test_properties WHERE id = {prop_id}"
                cursor.execute(prop_type_query)
                prop_type = cursor.fetchone()

                if prop_type:
                    prop_type = prop_type[0]
                    if prop_type == 'bool':
                        prop_value_bool = prop_value.lower() == 'true'
                        property_value_conditions.append(
                            f"(tpb.property_id = {prop_id} AND tpb.value = {prop_value_bool})")
                    else:
                        property_value_conditions.append(f"(tpb.property_id = {prop_id} AND tpb.value != true)")
                        
                    if prop_type == 'str':
                        property_value_conditions.append(f"(tps.property_id = {prop_id} AND tps.value = '{prop_value}')")
        elif isinstance(property_filters, str):
            property_value_conditions.append(f"tp.type = '{property_filters}'")
            
        
        if property_value_conditions:
            conditions.append("(" + " OR ".join(property_value_conditions) + ")")

    if conditions:
        query += "WHERE " + " AND ".join(conditions)

    query += " ORDER BY tl.listing_id, tp.id;"
    return query

# Формирование данных для ответа
def execute_query_and_aggregate(query):
    connection = get_database_connection()
    cursor = connection.cursor()

    cursor.execute(query)
    results = cursor.fetchall()

    aggregated_results = []
    current_listing = None

    for row in results:
        listing_id, scan_date, is_active, property_id, property_name, property_value = row

        if current_listing is None or current_listing['listing_id'] != listing_id:
            if current_listing is not None:
                aggregated_results.append(current_listing)
            current_listing = {
                'listing_id': listing_id,
                'scan_date': scan_date,
                'is_active': is_active,
                'properties': []
            }

        current_listing['properties'].append({
            'id': property_id,
            'name': property_name,
            'type': 'str' if property_value is not None and isinstance(property_value, str) else 'bool',
        })

    if current_listing is not None:
        aggregated_results.append(current_listing)

    connection.close()
    return aggregated_results

    connection = get_database_connection()
    cursor = connection.cursor()

    cursor.execute(query)
    results = cursor.fetchall()

    aggregated_results = []
    current_listing = None

    for row in results:
        listing_id, scan_date, is_active, property_id, property_name, property_value = row

        if is_active_filter == 'all' or (is_active_filter == 'active' and is_active) or (is_active_filter == 'inactive' and (is_active is False or is_active is None)):
            if current_listing is None or current_listing['listing_id'] != listing_id:
                if current_listing is not None:
                    aggregated_results.append(current_listing)
                current_listing = {
                    'listing_id': listing_id,
                    'scan_date': scan_date,
                    'is_active': is_active,
                    'properties': []
                }

            current_listing['properties'].append({
                'id': property_id,
                'name': property_name,
                'type': 'str' if property_value is not None and isinstance(property_value, str) else 'bool',
            })

    if current_listing is not None:
        aggregated_results.append(current_listing)

    connection.close()
    return aggregated_results

# Configure CORS
origins = [
    "http://localhost:3000", 
    "http://127.0.0.1:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

