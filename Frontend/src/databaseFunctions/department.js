import axios from 'axios';
import { apiUrl } from '../../constants';


const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true, 
});


const getDeptList = async ({on , pat , page })=>{
    try {
        const response = await axiosInstance.get (`/department/list?PatternOn=${on}&Pattern=${pat}&page=${page}`)
        return response.data.data;
    } catch (error) {
        console.log ( "error is fetching emplist " , error )
        throw error 
    }
}

const registerDept = async ( formData ) => {
    try {
        await axiosInstance.post ( '/department/register'  , formData)
        return true
    } catch (error) {
        console.log ( "error in registering department");
        throw error ; 
    }
}

const getDepartmentDetails = async ( id ) =>{
    try {
        const res = await axiosInstance.get (`/department/details/?id=${id}`)
        return res.data ; 
    } catch (error) {
        console.log ( "error in getting details of department");
        throw error 
    }
}


const updateDepartment = async ( fData ) => {   
    try {
        const res = await axiosInstance.post (`/department/update` , fData)
        return res.data ; 
    } catch (error) {
        console.log ( "error in updating details of department");
        throw error 
    }
} 

const deleteDept = async ( id ) =>{
    try {
        await axiosInstance.get (`/department/delete/?id=${id}`)        
    } catch (error) {
        console.log ( "error in deleting department");
        throw error 
    }
}


export  { getDeptList , registerDept  , getDepartmentDetails , updateDepartment , deleteDept}
