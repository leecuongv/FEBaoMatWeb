
import { createSlice } from "@reduxjs/toolkit"
export const languageSlice = createSlice({
    name:"lang",
    initialState:{
        "Wrong password":"Sai mật khẩu"
    },
    reducers:{
        
    }
})


export const {
    
}=languageSlice.actions

export default languageSlice.reducer