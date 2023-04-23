import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

//creating a constant to store headers for the api
const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'a2636b10f8msh585d2152c69a9cdp187843jsnac233565b07b',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
};

//creating a callback function to easily trigger the endpoints
const createRequest= (url)=> ({url, headers: cryptoApiHeaders});

//creating a variable to store base url of the api
const baseUrl = 'https://coinranking1.p.rapidapi.com/';


//creating the main hook using the baseURL, headers, createRequest function & createApi hook
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getCryptos: builder.query({
            query: (count)=> createRequest(`/coins?limit=${count}`)
        })
    })
})

//destructuring to get the custom hook for the data fetching
export const {useGetCryptosQuery} = cryptoApi;