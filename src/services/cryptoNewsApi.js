import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

//creating a constant to store headers for the api
const cryptoNewsApiHeaders = {
    'x-bingapis-sdk': 'true',
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_CRYPTONEWS_API_HOST,
};

//creating a callback function to easily trigger the endpoints
const createRequest= (url)=> ({url, headers: cryptoNewsApiHeaders});

//creating a variable to store base url of the api
const baseUrl = import.meta.env.VITE_CRYPTONEWS_BASE_URL;


//creating the main hook using the baseURL, headers, createRequest function & createApi hook
export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        // to get a list of the coins rankwise
        getCryptosNews: builder.query({
            query: ({category, count})=> createRequest(`/search?q=${category}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        }),
    })
})

//destructuring to get the custom hook for the data fetching
export const {
   useGetCryptosNewsQuery
} = cryptoNewsApi;