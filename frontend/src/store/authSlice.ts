import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthUserReduxState} from "../types/user.ts"
import { createAsyncThunk } from '@reduxjs/toolkit'

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
            const formData = new FormData();
            formData.append('login', loginData.login);
            formData.append('password', loginData.password);
            console.log("fetchLoginUser");
            localStorage.setItem("loginDAta","logPog");
            const query = `${import.meta.env.VITE_API_URL}/login`;
            const response = await fetch(query, {
                method: 'POST',
                body: formData, // НЕ указываем `Content-Type`, браузер сам его поставит!
                credentials: "include"
            });
            if (!response.ok) {
                const errorResponse = await response.json().catch(() => null);
                throw new Error(errorResponse?.message || 'Неизвестная ошибка');
            }
            return await response.json();
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