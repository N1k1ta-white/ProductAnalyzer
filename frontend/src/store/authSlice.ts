import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../types/user.ts"

interface State {
    loading: boolean;
    user: User | null;
    error: string | null;
}

const initialState: State = {
    loading: false,
    user: null,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        updateUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
        }
    }
})

export const { updateError, updateUser } = authSlice.actions;
export default authSlice.reducer;