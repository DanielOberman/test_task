import React from 'react';

import { Stack } from '@mui/system';
import {MenuItem, Select, TextField, Typography} from '@mui/material';
import { grey,  } from '@mui/material/colors';

import {  IProperty, IQueryArgs } from '../../../../models';
import { PropertiesList } from '../properties-list';
import { useQueryParams } from '../../../../hooks/use-query-params';
import { useGetPropertyNameByNameQuery } from '../../../../features/api';
import { skipToken } from '@reduxjs/toolkit/dist/query';

interface IProps {
    filterState: IQueryArgs;
    onChange:  (query: any) => void
}
// useGetPropertyNameByIdQuery
export const PropertiesFilter:React.FC<IProps> = ({filterState, onChange}) => {
    const { insertAllQueryParams } = useQueryParams();

    const getIds = filterState.properties ? Object.keys(filterState.properties).map(i => +i) : [];

    const args = filterState.property_name ? window.location.search : skipToken;

    const { data: properties } = useGetPropertyNameByNameQuery(args);
    
    const propertiesData = React.useMemo(() =>  properties?.properties,[properties]) as IProperty[];

    const [propertyName, setPropertyName] = React.useState<string | undefined | null>(filterState.property_name);
    const [propertiesManualIds, setPropertiesManualIds] = React.useState<number[]>(getIds);

    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            const updatedObject = {
                ...filterState,
            };

            // @ts-ignore
            delete updatedObject?.properties
            insertAllQueryParams(updatedObject);
            onChange({property_name: propertyName});
        }
    };

    const propertiesManualList = React.useMemo(() => {
        return propertiesData?.filter(i => propertiesManualIds.includes(i.id))
    },[propertiesManualIds,propertiesData ])


    const addDefaultValue = (prop: IProperty) => {
        if (!propertiesManualIds.includes(prop.id)) {
            if (prop.type === 'bool') {
                onChange({properties: {[prop.id]: true}})
            } else {
                onChange({properties: {[prop.id]: ''}})
            }
         } else {
            const updatedProperties = { ...filterState.properties }; 

            if (propertiesManualIds.length === 1) {

                const updatedObject = {
                    ...filterState,
                    properties: updatedProperties,
                };

                // @ts-ignore
                delete updatedObject?.properties
                insertAllQueryParams(updatedObject);

            } else {
                for (const key in updatedProperties) {

                    if (!propertiesManualIds.includes(Number(key))) {
                        delete updatedProperties[key];
                    }
                }
        
                const updatedObject = {
                ...filterState,
                properties: updatedProperties,
                };
                
                insertAllQueryParams(updatedObject);
            }
        }
    }

    return <Stack gap={4}>
            <Stack width="100%" gap={1}>   
        <Stack gap={1}>
            <Typography variant='subtitle2'>Property name</Typography>
            <TextField
                size="small"
                label="Enter property name"
                value={propertyName}
                onKeyDown={handleKeyDown}
                onChange={(event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {setPropertyName(event.target.value)}}
            />
        </Stack>
        {
            !!propertiesData?.length && <Stack gap={1} >
            <Typography variant='subtitle2'>Properties</Typography>
            <Select
                size="small"
                value="undefined"
                renderValue={() => <>Choose properties</>}
                onChange={(event) => {
                    let arr: number[] = [...propertiesManualIds];
                    
                    if (!arr.includes(+event.target.value)) {
                        arr.push(+event.target.value);
                        setPropertiesManualIds(arr);
                    } else {
                        const filter  =  arr.filter( i => i !== +event.target.value);
                        setPropertiesManualIds(filter);
                    }
                }}
                fullWidth
            >
                {propertiesData.map((i) => {
                    return <MenuItem onClick={() => console.log(addDefaultValue(i))}
                    sx={{
                        backgroundColor: propertiesManualIds.includes(i.id) ? grey[100] : 'initial',
                      }}      
                    key={i.id} value={i.id}>
                    {i.name}
                </MenuItem>
                })}
            </Select>
        </Stack>
        }

        </Stack>
        {
            !!propertiesManualList?.length && <PropertiesList data={propertiesManualList} filterState={filterState} propertiesManualIds={propertiesManualIds}  onChange={onChange} /> 
        }
    
    

  </Stack>
    
    
 
}