import { baseApi } from '../baseApi';


const clientApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPropertyNameByName: build.query<any, string>({
            query: (queryArg) => ({ url: `http://127.0.0.1:8000/properties_by_name${queryArg}` }) ,
        }),
        getListings: build.query<any, string>({
            query: (queryArg) => ({ url: `http://127.0.0.1:8000/listings${queryArg}` }) ,
        }),
    }),
});

export const {
    useGetPropertyNameByNameQuery,
    endpoints: { getListings },
} = clientApi;

