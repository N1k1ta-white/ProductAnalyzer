import { configureStore } from '@reduxjs/toolkit';
import productReducer from "./productsSlice.ts"
import orderReducer from "./ordersSlice.ts"
import paymentReducer from "./paymentsSlice.ts"
import authReducer from "./authSlice.ts"

const store = configureStore({
    reducer: {
        authData: authReducer,
        productsData: productReducer,
        ordersData: orderReducer,
        paymentsData: paymentReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
export default store