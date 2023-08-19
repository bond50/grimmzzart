// https://www.bezkoder.com/react-redux-login-example-toolkit-hooks/
// https://www.daydone.com.ng/product?prod=212
//https://www.mkulimayoung.com/account/items/create
//https://victormatara.com/list-of-agricultural-produce-marketing-companies-in-kenya/
//https://medium.com/swlh/creating-phone-number-verification-component-using-react-js-and-twilio-services-6a635657ecc9
//https://codepen.io/john-mantas/pen/bxmrBq
//https://bbbootstrap.com/snippets/bootstrap-4-ecommerce-products-list-range-filters-89673127
//https://snazzymaps.com/style/352070/colliers-map-light
//https://www.youtube.com/watch?v=DNM9FdFrI1k&list=PLUDnjDRKIOEEgtbIPhJN4uq1D2UBBryeh
//https://www.youtube.com/watch?v=-BVfB4YQY3k
//https://www.youtube.com/watch?v=0cPCMIuDk2I
// Improved code
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
// Import reducers
import messageReducer from "./slices/message";
import authReducer from "./slices/auth";
import orderSlice from './slices/orderSlice'


// Persist configuration
const persistConfig = {
    key: "root",
    storage,
};

// Combine reducers
const rootReducer = combineReducers({
    message: messageReducer,
    auth: authReducer,
    orders: orderSlice
});

// Persist the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with middleware and dev tools
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== "production",
});

// Export persistor and store
export const persistor = persistStore(store);
export default store;
