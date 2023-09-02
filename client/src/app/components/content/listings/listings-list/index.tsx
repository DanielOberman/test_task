import React from 'react';

import { Box, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import type { GridCellParams } from '@mui/x-data-grid';

import { IListing  } from '../../../../models';
import { formatDate } from '../../../../../utils';

interface IProps {
    data?: IListing[];
    isLoading: boolean;
}

export const ListingsList: React.FC<IProps> = ({ data, isLoading }) => {
    const COLUMNS = React.useMemo(
        () => [
            {
                field: 'listing_id',
                headerName: 'listing id',
                width: 120,
                sortable: false,
                renderCell: ({ value }: GridCellParams<IListing, string>) => {
                    return value;
                },
            },
            {
                field: 'scan_date',
                headerName: 'date',
                flex: 1,
                sortable: false,
                renderCell: ({ value }: GridCellParams<IListing, string>) => {
                    return value ? formatDate(value): '-';
                },
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data],
    );

    return (
        <Stack  gap={4} style={{ height: 355, width: '486px', }}>
                <Typography variant='h6'>Matched listings list</Typography>
            <DataGrid<IListing>
            rows={data || []}
            columns={COLUMNS}
            hideFooter
            disableColumnMenu
            disableRowSelectionOnClick
            sortingMode="server"
            getRowId={(v) => v.listing_id}
            getRowHeight={() => 'auto'}
            loading={isLoading}
            slots={{
                noRowsOverlay: () => (
                    <Box height="100%" display="flex" alignItems="center" justifyContent="center">
                        No matched listings 
                    </Box>
                ),
            }}
        />
        </Stack>

        
    );
};
