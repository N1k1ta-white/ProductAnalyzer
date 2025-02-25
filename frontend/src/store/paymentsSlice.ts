import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Payment} from "@/types/payment.ts";

interface State {
    loading: boolean;
    payments: Payment[];
    error: string | null;
}

const initialState: State = {
    loading: false,
    payments: [] as Payment[],
    error: null,
}

const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        updateError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        updatePayments: (state, action: PayloadAction<Payment[]>) => {
            state.payments = action.payload
        }
    }
})

export const { updateError, updatePayments } = paymentsSlice.actions;
export default paymentsSlice.reducer;