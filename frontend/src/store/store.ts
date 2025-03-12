import { configureStore } from '@reduxjs/toolkit';
import productReducer from "@/store/productsSlice.ts"
import orderReducer from "@/store/ordersSlice.ts"
import authReducer from "@/store/authSlice.ts"
import chatReducer from "@/store/roomsSlice.ts"

const store = configureStore({
    reducer: {
        authData: authReducer,
        productsData: productReducer,
        ordersData: orderReducer,
        chatData: chatReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
export default store