export type Nullable<T> = T | null;

export type TParams = Record<string, unknown>;

export interface IProperty {
    id: number;
    name: string;
    type: 'str' | 'bool';
}

export interface IListing {
    listing_id: number;
    scan_date: string;
    is_active: boolean | null;
    properties?: IProperty[];
}


export interface IData {
    listings: IListing[]
    debugMode?: boolean,
}

export enum EListingType  {
    ALL_LISTINGS = 'all',
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}


export interface IProperties  {
    [key: number]: string | boolean};

export interface IQueryArgs {
    is_active?: EListingType;
    scan_date_from?: string | null;
    scan_date_to?: string | null;
    property_name?: string | null;
    properties?: IProperties;
    debugMode?: boolean;
}

