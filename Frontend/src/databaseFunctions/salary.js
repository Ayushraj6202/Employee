import axios from 'axios';
import { apiUrl } from '../../constants';



const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true, 
});

const getSalary = async ( id  ) => {
    try {       
        const res = await axiosInstance.post ( "/salary/get" , {"employeeId" : id })
        return res.data.data;
       
    } catch (error) {
        console.log ( "error " , error );
    }
}

const calSalary = async ( id ,  date  )=>{
    try {
        const res = await axiosInstance.post ( "/salary/calculate" , {"employeeId" : id , "endDate" : date   });
        return res.data.data;

    } catch ( error ) {
        console.log ( error )
    }
}

const compTrans = async ( id , todate , fromdate , transactionId , payment )=>{
    try {
        const res = await axiosInstance.post ( "/salary/set-pay" , { "employeeId":id, "payfrom" : todate, "startDate" : fromdate, "transId" : transactionId, "paymentAmount" : payment})
        return res.data.data
    } catch ( error ) {
        console.log ( error );
    }
}

const register = async ( id , newSalary  )=>{   
    try {
        const res = await axiosInstance.post ( "/salary/register" , { "employee":id, "salary" : newSalary, })
        return res.data.data
    } catch ( error ) {
        console.log ( error );
    }
}

export {
    getSalary,
    calSalary,
    compTrans,
    register
}