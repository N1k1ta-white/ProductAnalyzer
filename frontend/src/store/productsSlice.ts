import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProductReduxState} from "../types/product";

interface State {
    loading: boolean;
    products: ProductReduxState[];
    error: string | null;
}

const initialState: State = {
    loading: false,
    products: [] as ProductReduxState[],
    error: null,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        updateError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        updateProducts: (state, action: PayloadAction<ProductReduxState[]>) => {
            state.products = action.payload
        }
    }
})

export const { updateError, updateProducts } = productsSlice.actions;
export default productsSlice.reducer;