import axios from 'axios';
import { apiUrl } from '../../constants';


const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true, 
});


const getEmpList = async ({on , pat , page })=>{
    try {
        const response = await axiosInstance.get (`/employee/list?PatternOn=${on}&Pattern=${pat}&page=${page}`)
        // console.log ("emp list ", response.data.data , "response mila ye")
        return response.data.data;
    } catch (error) {
        console.log ( "error is fetching emplist " , error )
        throw error 
    }
}

const addEmp  = async ( formData )=>{
    try {        
        const res  = await axiosInstance.post (`/employee/register` , formData)  
        console.log ( res , " response from axios")      
        return res ; 
    } catch (error) {
        throw error 
    }
}

const getEmp = async ( {id})=>{
    try {
        const res = await  axiosInstance.get ( `employee/get-emp?id=${id}`);
        return res.data ; 
    } catch (error) {
        console.log ( error )
        throw error
    }
}

const updateEmp  = async ( formData )=>{
    try {        
        const res  = await axiosInstance.post (`/employee/update` , formData)             
        return res ; 
    } catch (error) {
        throw error 
    }
}

export  { getEmpList , addEmp , getEmp , updateEmp}
