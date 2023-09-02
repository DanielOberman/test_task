import {EListingType} from './models';

export const STAGE_ITEMS: { label: string; value: EListingType }[] = [
    {
        label: 'All',
        value: EListingType.ALL_LISTINGS,
    },
    {
        label: 'Active',
        value: EListingType.ACTIVE,
    },
    {
        label: 'Inactive',
        value:  EListingType.INACTIVE,
    },
];



