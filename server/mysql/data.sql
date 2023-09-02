CREATE TABLE IF NOT EXISTS test_listings(
  listing_id VARCHAR(255),
  scan_date DATETIME,
  is_active BOOLEAN
);

ALTER TABLE test_listings ADD CONSTRAINT test_listings_pk PRIMARY KEY (listing_id);

CREATE TABLE IF NOT EXISTS test_properties(
  id INT,
  name TEXT,
  type TEXT
);
ALTER TABLE test_properties ADD CONSTRAINT test_properties_pk PRIMARY KEY (id);

CREATE TABLE IF NOT EXISTS test_property_values_str(
  listing_id VARCHAR(255),
  property_id INT,
  value TEXT
);
ALTER TABLE test_property_values_str ADD CONSTRAINT test_property_values_str_test_listings_listing_id_fk FOREIGN KEY (listing_id) REFERENCES test_listings (listing_id);
ALTER TABLE test_property_values_str ADD CONSTRAINT test_property_values_str_test_properties_id_fk FOREIGN KEY (property_id) REFERENCES test_properties (id);

CREATE TABLE IF NOT EXISTS test_property_values_bool(
  listing_id VARCHAR(255),
  property_id INT,
  value BOOLEAN
);
ALTER TABLE test_property_values_bool ADD CONSTRAINT test_property_values_bool_test_listings_listing_id_fk FOREIGN KEY (listing_id) REFERENCES test_listings (listing_id);
ALTER TABLE test_property_values_bool ADD CONSTRAINT test_property_values_bool_test_properties_id_fk FOREIGN KEY (property_id) REFERENCES test_properties (id);

INSERT INTO test_listings (listing_id, scan_date, is_active) VALUES (111, '2023-08-04 05:15:49.985000', true);
INSERT INTO test_listings (listing_id, scan_date, is_active) VALUES (222, '2023-08-07 05:15:49.985000', true);
INSERT INTO test_listings (listing_id, scan_date, is_active) VALUES (333, '2023-08-16 05:15:49.985000', false);
INSERT INTO test_listings (listing_id, scan_date, is_active) VALUES (444, '2023-08-08 05:15:49.985000', true);
INSERT INTO test_listings (listing_id, scan_date, is_active) VALUES (555, '2023-08-20 05:15:49.985000', true);
INSERT INTO test_listings (listing_id, scan_date, is_active) VALUES (666, '2023-08-14 05:15:49.985000', true);
INSERT INTO test_listings (listing_id, scan_date, is_active) VALUES (777, '2023-08-21 05:15:49.985000', true);

INSERT INTO test_properties (id, name, type) VALUES (111, 'Property 1', 'str');
INSERT INTO test_properties (id, name, type) VALUES (222, 'Listing property 2', 'str');
INSERT INTO test_properties (id, name, type) VALUES (333, 'Some property 3', 'bool');
INSERT INTO test_properties (id, name, type) VALUES (444, 'Test property 4', 'str');
INSERT INTO test_properties (id, name, type) VALUES (555, 'My property 5', 'bool');
INSERT INTO test_properties (id, name, type) VALUES (666, 'My property 1', 'bool');

INSERT INTO test_property_values_bool (listing_id, property_id, value) VALUES (111, 333, true);
INSERT INTO test_property_values_bool (listing_id, property_id, value) VALUES (222, 333, null);
INSERT INTO test_property_values_bool (listing_id, property_id, value) VALUES (444, 555, false);
INSERT INTO test_property_values_bool (listing_id, property_id, value) VALUES (444, 333, true);
INSERT INTO test_property_values_bool (listing_id, property_id, value) VALUES (555, 555, true);
INSERT INTO test_property_values_bool (listing_id, property_id, value) VALUES (666, 666, false);

INSERT INTO test_property_values_str (listing_id, property_id, value) VALUES (111, 111, 'some');
INSERT INTO test_property_values_str (listing_id, property_id, value) VALUES (111, 222, 'test');
INSERT INTO test_property_values_str (listing_id, property_id, value) VALUES (222, 111, null);
INSERT INTO test_property_values_str (listing_id, property_id, value) VALUES (333, 444, 'value');
INSERT INTO test_property_values_str (listing_id, property_id, value) VALUES (333, 222, '');
