import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {OrderReduxState} from "@/types/order.ts";
import fetchDataAuth from "@/lib/fetchDataAuth";


interface State {
    loading: boolean;
    orders: OrderReduxState[];
    error: string | null;
}

const initialState: State = {
    loading: false,
    orders: [] as OrderReduxState[],
    error: null,
}

export const addOrder = createAsyncThunk<OrderReduxState, OrderReduxState>(//1 - то шо получаем 2 - то шо передаем
    'products/addOrder',
    async (order) => {
        try {
            const query = `${import.meta.env.VITE_API_URL}/order`;
            return await fetchDataAuth<OrderReduxState>(query,{
                method: "POST",
                body: JSON.stringify({
                    order
                  })
            });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
)

export const fetchOrders = createAsyncThunk<OrderReduxState[], void>(//1 - то шо получаем 2 - то шо передаем
    'products/fetchOrders',
    async () => {
        try {
            const query = `${import.meta.env.VITE_API_URL}/order`;
            return await fetchDataAuth<OrderReduxState[]>(query,{method:"GET"});
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
)

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        updateError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        updatePayments: (state, action: PayloadAction<OrderReduxState[]>) => {
            state.orders = action.payload
        }
    }
})

export const { updateError, updatePayments } = ordersSlice.actions;
export default ordersSlice.reducer;