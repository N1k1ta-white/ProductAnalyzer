import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthUserReduxState} from "../types/user.ts"
import { createAsyncThunk } from '@reduxjs/toolkit'
import fetchData from "../lib/fetch.ts";
interface State {
    loading: boolean;
    user: AuthUserReduxState | null;
    error: string | null;
}

const initialState: State = {
    loading: false,
    user: null,
    error: null,
}

export const fetchLoginUser = createAsyncThunk<{user:AuthUserReduxState,token:string}, {login:string,password:string}>(
    'auth/loginUser',
    async (loginData) => {
        try {

            console.log("fetchLoginUser");
            localStorage.setItem("loginDAta","logPog");

            const query = `${import.meta.env.VITE_API_URL}/login`;
            return await fetchData<{user:AuthUserReduxState,token:string}>(query, {
                method: 'POST',
                body: JSON.stringify({
                    login: loginData,
                }),
            });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
)
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        updateUser: (state, action: PayloadAction<AuthUserReduxState | null>) => {
            state.user = action.payload
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchLoginUser.pending,(state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchLoginUser.fulfilled,(state,action)=> {
            state.loading = false;
            state.error = null;
            state.user = action.payload.user;
            localStorage.setItem("token",action.payload.token);//Надо бы название поля гдето сохранить
        })
        .addCase(fetchLoginUser.rejected,(state,action)=> {
            state.loading = false;
            console.log(action.error.message);
            state.error = action.error.message || 'Ошибка логина';
        })

    }
})

export const { updateError, updateUser } = authSlice.actions;
export default authSlice.reducer;