import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    emplist: {},
    headers: {
        "firstname" : "First Name",
        "lastname" : "Last Name",
        "email":"Email" ,
        "gender":"Gender" ,
        "payfrom":"Payment From",
    },
    searchOn : { 
        "firstname" : "First Name",
        "lastname" : "Last Name",
        "email":"Email" ,
    },
    loading: true ,
    patternOn : "", 
    pattern : "" ,
    pageno  : "1", 

};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        loading : (state, action) => {
            state.loading = action.payload;
        },
        emplist: (state , action ) => {
            state.emplist = action.payload
        },
        patternOn : ( state , action ) => {
            state.patternOn = action.payload
        },
        pattern : ( state , action ) => {
            state.pattern = action.payload
        },
        pageno : ( state , action ) => {
            state.pageno = action.payload 
        }
    },
});

export const { loading , emplist , pageno , pattern , patternOn } = employeeSlice.actions;
export default employeeSlice.reducer; 
