import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "../types/product";

interface State {
    loading: boolean;
    products: Product[];
    error: string | null;
}

const initialState: State = {
    loading: false,
    products: [] as Product[],
    error: null,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        updateError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        updateProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload
        }
    }
})

export const { updateError, updateProducts } = productsSlice.actions;
export default productsSlice.reducer;