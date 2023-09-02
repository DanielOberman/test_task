import qs from 'qs';

import { useLocation, useNavigate } from 'react-router-dom';

import { TParams, Nullable } from '../models';

// Для сброса пустых строковых полей
export const removeEmptyString = (params: TParams) =>
    Object.keys(params).reduce((acc, key) => {
        if (params[key] === '') {
            acc[key] = undefined;
        } else {
            acc[key] = params[key];
        }

        return acc;
    }, {} as TParams);

export function useQueryParams() {
    const navigate = useNavigate();
    const location = useLocation();


    // TODO: неверный возвращаемый тип - все значения string
    const getQueryParams = <T extends TParams>(): Nullable<T> =>
    qs.parse(location.search, { ignoreQueryPrefix: true })   as Nullable<T>;

    const insertQueryParams = <T extends TParams>(params: T): void => {
        // @ts-ignore
        const parsedObject = qs.parse(location.search, { arrayFormat: 'indices', allowDots: false, ignoreQueryPrefix: true });

        if (params.properties) {
            const key = Object.keys(params.properties)[0];
            const value = Object.values(params.properties)[0];

            if (parsedObject.properties) {
              // @ts-ignore
              parsedObject.properties[key] = value;
            } else {
              // @ts-ignore
              parsedObject.properties = {[key]: value};
            }
        } else {
           const key = Object.keys(params)[0];
           const value = Object.values(params)[0];
            // @ts-ignore
           parsedObject[key] = value;
        }

          const queryString = qs.stringify(parsedObject, {
            encode: false, 
            arrayFormat: 'indices'
        });

        navigate(`?${queryString}`);
    };

    const insertAllQueryParams = <T extends TParams>(params: T): void => {
        const queryString = qs.stringify(params, {
            encode: false, 
            arrayFormat: 'indices'
        });

        navigate(`?${queryString}`);

    }

    

    return {
        getQueryParams,
        insertQueryParams,
        insertAllQueryParams,
    };
}
