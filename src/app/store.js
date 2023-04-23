import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoAPI";

//adding the cryptoApi hook as the reducer
export default configureStore({
    reducer:{
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
})