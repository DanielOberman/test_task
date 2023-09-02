import React from 'react';

import { IProperties, IProperty, IQueryArgs } from '../../../../models';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { Box, Stack } from '@mui/system';
import { Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { useQueryParams } from '../../../../hooks/use-query-params';

interface IProps {
    data: IProperty[];
    filterState: IQueryArgs;
    onChange:  (query: any) => void
    propertiesManualIds: number[];
}

export const PropertiesList:React.FC<IProps> = ({data, filterState, onChange}) => {
    const { getQueryParams } = useQueryParams();

    // @ts-ignore
    const handleChecked = (id: number, value: boolean ) => {
        
        onChange( {properties: {[id]: value}})
    }

    const handleChange = (id: number, value: string ) => {
        onChange( {properties: {[id]: value}})
    }

    const COLUMNS = React.useMemo(
        () => [
            {
                field: 'name',
                headerName: '',
                flex: 1,
                sortable: false,
                renderCell: ({ value, row }: GridCellParams<IProperty, string>) => {
                    const checked = getQueryParams()?.properties as IProperties  === 'true' ? false : filterState?.properties?.[row.id]  === 'false' ? true : undefined;

                    const textFieldvalue = typeof filterState?.properties?.[row.id]  === 'string' ? filterState?.properties?.[row.id] : filterState?.properties?.[row.id];

                    return <Stack direction="row" display="flex" justifyContent="space-between" width="100%">
                        <Box>
                            {value}
                        </Box>
                        <Box>
                            {
                                row.type === 'bool' ? <FormControlLabel control={<Checkbox defaultChecked={checked}  onChange={(e) => handleChecked(row.id, !e.target.checked)}   />} label="falsy value" />
                                :
                                <TextField size="small" value={textFieldvalue} onChange={(event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {handleChange(row.id, event.target.value)}} />
                            }
                        </Box>
                    </Stack>;
                },
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data, filterState],
    );

    return (
        <Stack gap={4} style={{ height: 250,  width:"100%", }}>
                <Typography variant='h6'>Properties list</Typography>
            <DataGrid<IProperty>
            rows={data}
            columns={COLUMNS}
            hideFooter
            disableColumnMenu
            disableRowSelectionOnClick
            sortingMode="server"
          
            getRowHeight={() => 'auto'}
        />
        </Stack>

        
    );



 
}