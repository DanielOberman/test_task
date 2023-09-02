import React from 'react';

import { Stack, Typography } from '@mui/material';

import { ToggleButtonGroup } from '../../../toggle-button-group';
import { IQueryArgs } from '../../../../models';
import { STAGE_ITEMS } from '../../../../const';
import {DatePickerValue} from '../../date-picker-value';
import dayjs from 'dayjs';
import { formatDataDate } from '../../../../../utils';

interface IProps {
    values: IQueryArgs
    onChange: (query: any) => void
}

export const ListingsFilters: React.FC<IProps> = ({values, onChange}) => (
    <Stack direction="row" gap={4}>
    <ToggleButtonGroup
    title="Listings"
    items={STAGE_ITEMS}
    color="primary"
    value={values.is_active}
    onChange={(value) =>{
        onChange({is_active: value});
    }}
/>
<Stack gap={2}>
    <Stack gap={1}>
        <Typography variant='subtitle2'>Range selection</Typography>
            <DatePickerValue value={values.scan_date_from  ? dayjs(values.scan_date_from) : null} label="From" onChange={(value) => {
                onChange({scan_date_from: formatDataDate(value)});
            }} />
        </Stack>
        <DatePickerValue value={values.scan_date_to ? dayjs(values.scan_date_to) : null}  label="To" onChange={(value) => onChange({scan_date_to:  formatDataDate(value)})} />
    </Stack>
</Stack>
);
