import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    desiglist: {},    
    headers: {
        "designationName" : "Designation Name",        
        "description":"Description" ,       
    },
    searchOn : { 
       "designationName" : "Designation Name",        
        "description":"Description" ,
    },
    loading: true ,
    patternOn : "", 
    pattern : "",
    pageno  : "1", 

};

const designationSlice = createSlice({
    name: 'designation',
    initialState,
    reducers: {
        loading : (state, action) => {
            state.loading = action.payload;
        },
        desiglist: (state , action ) => {
            state.desiglist = action.payload
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

export const { loading , desiglist , pageno , pattern , patternOn } = designationSlice.actions;
export default designationSlice.reducer; 
