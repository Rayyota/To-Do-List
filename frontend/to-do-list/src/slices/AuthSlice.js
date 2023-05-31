import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authorized: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.authorized = action.payload
        },
        logout(state) {
            state.authorized = false;
        }
    }
})

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;