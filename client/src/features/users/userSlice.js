import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username : ""
}

const userSlice = createSlice({
    name : "users",
    initialState,
    reducers : {
        storeUserInfo : (state,action) => {
            state.username = action.payload;
        },
        logoutUser : (state,action) => {
            state.username = null;
        }
    }
})

export const {storeUserInfo , logoutUser} = userSlice.actions;

export default userSlice.reducer;