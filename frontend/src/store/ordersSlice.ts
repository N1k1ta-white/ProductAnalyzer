import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Order} from "@/types/order.ts";

interface State {
    loading: boolean;
    orders: Order[];
    error: string | null;
}

const initialState: State = {
    loading: false,
    orders: [] as Order[],
    error: null,
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        updateError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        updatePayments: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload
        }
    }
})

export const { updateError, updatePayments } = ordersSlice.actions;
export default ordersSlice.reducer;