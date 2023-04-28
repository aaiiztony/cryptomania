import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

//creating a constant to store headers for the api
const cryptoApiHeaders = {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_COINRANKING_API_HOST,
};

//creating a callback function to easily trigger the endpoints
const createRequest= (url)=> ({url, headers: cryptoApiHeaders});

//creating a variable to store base url of the api
const baseUrl = import.meta.env.VITE_COINRANKING_BASE_URL;


//creating the main hook using the baseURL, headers, createRequest function & createApi hook
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        // to get a list of the coins rankwise
        getCryptos: builder.query({
            query: (count)=> createRequest(`/coins?limit=${count}`)
        }),
        //to get individual crypto coin detail
        getCryptoDetails: builder.query({
            query: (coinId)=> createRequest(`/coin/${coinId}`)
        }),
        //to get inidividual history of coin -- RETURNS TIMESTAMP OF 1970 ONLY - API ISSUE
        getCryptoHistory: builder.query({
            query: ({coinId, timeperiod})=> createRequest(`/coin/${coinId}/history?timePeriod=${timeperiod}`)
        }),
        //endpoint with premium plan requirement
        getExchanges: builder.query({
            query: ()=> createRequest(`/exchanges`)
        }),
    })
})

//destructuring to get the custom hook for the data fetching
export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetExchangesQuery,
    useGetCryptoHistoryQuery
} = cryptoApi;