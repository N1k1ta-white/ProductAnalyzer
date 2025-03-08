import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProductReduxState} from "../types/product";
import fetchDataAuth from "@/lib/fetchDataAuth";
import { CategoryReduxState } from "@/types/category";
import fetchData from "@/lib/fetch";
import { paginationResponse } from "@/types/paginationRespose";

interface State {
    loading: boolean;
    products: ProductReduxState[];
    categories: CategoryReduxState[];
    error: string | null;
}

const initialState: State = {
    loading: false,
    products: [] as ProductReduxState[],
    categories: [] as CategoryReduxState[],
    error: null,
}

export const addProduct = createAsyncThunk<ProductReduxState, ProductReduxState>(//1 - то шо получаем 2 - то шо передаем
    'products/addProduct',
    async (product) => {
        try {
            const query = `${import.meta.env.VITE_API_URL}/product`;
            return await fetchDataAuth<ProductReduxState>(query,{
                method: "POST",
                body: JSON.stringify({
                    name: product.name,
                    quantity: product.quantity,
                    categoryId: product.categoryId,
                    description: product.description,
                    price: product.price,
                    properties: product.properties
                  })
            });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
)

export const fetchProducts = createAsyncThunk<paginationResponse, void>(//1 - то шо получаем 2 - то шо передаем
    'products/fetchProducts',
    async () => {
        try {
            const query = `${import.meta.env.VITE_API_URL}/product`;
            return await fetchData<paginationResponse>(query,{method:"GET"});
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
)



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
    },
    extraReducers:(builder) => {
        builder
        .addCase(addProduct.pending,(state) => {state.loading=true; state.error=null})
        .addCase(addProduct.fulfilled, (state, action) => {
            state.products.push(action.payload);
            state.loading=false;
            state.error=null;
        })
        .addCase(addProduct.rejected,(state,action) => {
            state.loading=false;
            state.error= action.error.message || "Ошибка добавления продукта";
        })
        .addCase(fetchProducts.pending,(state) => {
            state.loading=true;
        })
        .addCase(fetchProducts.fulfilled,(state,action) => {
            state.products = action.payload.data;
            state.loading=false;
            state.error = null;
        })
        .addCase(fetchProducts.rejected,(state,action) => {
            state.loading=false;
            state.error = action.error.message || "Ошибка при получении продактов";
        })

    }
})

export const { updateError, updateProducts } = productsSlice.actions;
export default productsSlice.reducer;