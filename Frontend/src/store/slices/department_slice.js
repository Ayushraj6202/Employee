import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    deptlist: {},    
    headers: {
        "departmentname" : "Department Name",
        "location" : "Location",
        "desc":"Description" ,       
    },
    searchOn : { 
        "departmentname" : "Department Name",
        "location" : "Location",
    },
    loading: true ,
    patternOn : "", 
    pattern : "",
    pageno  : "1", 

};

const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        loading : (state, action) => {
            state.loading = action.payload;
        },
        deptlist: (state , action ) => {
            state.deptlist = action.payload
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

export const { loading , deptlist , pageno , pattern , patternOn } = departmentSlice.actions;
export default departmentSlice.reducer; 
