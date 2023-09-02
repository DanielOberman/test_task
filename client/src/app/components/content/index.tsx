import React from 'react';

import { Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';

import { ListingsFilters } from './listings/listings-filters';
import { EListingType, IData, IProperties, IQueryArgs } from '../../models';
import { useQueryParams } from '../../hooks/use-query-params';
import { ListingsList } from './listings/listings-list';
import { PropertiesFilter } from './properties/properties-filter';
import {getListings} from '../../features/api';

export const Content: React.FC = () => {
   const { getQueryParams, insertQueryParams } = useQueryParams();

   const [listings, setListings] = React.useState<IData>();
   
    const [getListingsList,  {isLoading, isFetching} ] = getListings.useLazyQuery();

    const handleSubmit = () => {
        if (!getQueryParams()?.is_active ) {
            insertQueryParams({is_active: EListingType.ALL_LISTINGS})
        }
        getListingsList(window.location.search).then(res => setListings(res.data));
    }

   const [filterState, setFilterState] = React.useState<IQueryArgs>({
        is_active: getQueryParams()?.is_active as EListingType || EListingType.ALL_LISTINGS,
        scan_date_from: getQueryParams()?.scan_date_from as string || null,
        scan_date_to: getQueryParams()?.scan_date_to as string || null,
        property_name: getQueryParams()?.property_name as string || null,
        properties:  getQueryParams()?.properties as IProperties,
   }); 

    const onActiveChange = (query: any) => {
        setFilterState((prevState) => ({...prevState, ...query}));
        insertQueryParams(query);
    }   
    console.log(isLoading  || isFetching)
    return (
        <Stack sx={{position: 'relative'}}>
            {(isLoading  || isFetching) &&  <Box sx={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
            }}>
                <CircularProgress />
            </Box>}
            <Stack direction="row">
            <Stack gap={4} sx={{ height: '100%', width: '486px', padding: '16px'}}>
            <Typography variant='h6'>Listings Filters</Typography>
            
            <Stack direction="column" gap={2}>
                <ListingsFilters  values={filterState} onChange={onActiveChange} />
                <PropertiesFilter  filterState={filterState}  onChange={onActiveChange} />
            </Stack>
            <Stack width="100%" mt="32px"  display="flex" alignItems="end">
            <Button onClick={handleSubmit} variant="contained" sx={{
                width: '200px'
            }}>
                Отправить
            </Button>
            </Stack>
            </Stack>
            <Stack sx={{ height: '100%', width: '100%', padding: '16px'}} gap={2}>

            {
                <ListingsList data={listings?.listings || []} isLoading={isLoading} />
            }
            {
                listings?.debugMode && <TextField
                    value={listings?.debugMode}
                    sx={{
                        width: '486px',
                    }}
                    id="outlined-multiline-flexible"
                    label="Query"
                    multiline
                    minRows={5}
                    maxRows={15}
                />
            }
            </Stack>
            
            
        </Stack>
           
        </Stack>
  
    );
};


