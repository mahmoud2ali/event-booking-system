import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")? 
  JSON.parse(localStorage.getItem("user")) : null,
  registerMessage: null,
  loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
        register: (state, action) => {  
            state.registerMessage = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload; 
        },
    },
}); 


const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export {authActions, authReducer}