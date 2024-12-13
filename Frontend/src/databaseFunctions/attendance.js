import axios from 'axios';
import { apiUrl } from '../../constants';


const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true, 
});


const getAttendance = async ( selectedYear , selectedMonth , id )=>{
    try {        
        const res = await axiosInstance.post ("/attendance/get" , { "id":id , "year" : selectedYear , "month" : selectedMonth});
        return res.data.data;
    } catch (error) {
        console.log ( "error" , error );
        throw error ;
    }
}


const markAttendance = async ( date , workday , id  )=>{
    try {
        const res = await axiosInstance.post ("/attendance/mark" , {"date" : date  , "workday":  workday, "id": id })        
        console.log ( res.data.data , "response aaya h ye ")
    } catch (error) {
        console.log ( "error" , error);
        throw error ;
    }
}

export {getAttendance , markAttendance}