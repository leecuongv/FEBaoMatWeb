import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        auth: {
            active: false,
            login:true
        }
    },
    reducers: {
        authLoginActive: (state) => {
            state.auth.active = true
            state.auth.login = true
        },
        authRegisterActive: (state) => {
            state.auth.active = true
            state.auth.login = false
        },
        authInactive: (state) => {
            state.auth.active = false
        }
    }
})

export const {
    authLoginActive,
    authRegisterActive,
    authInactive
}=modalSlice.actions

export default modalSlice.reducer