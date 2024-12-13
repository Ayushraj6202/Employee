import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data : {},
  isAuthenticated: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      console.log ( "putting in store" , action.payload)
      state.data = action.payload;      
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.data = {};    
    },
  },
});

export const { login, logout } = adminSlice.actions; 
export default adminSlice.reducer; 
