import axios from 'axios';
import { apiUrl } from '../../constants';


const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true, 
});

const login = async (formData) => {
  const email = formData.emailOrUsername;
  const password = formData.password;
  const username = email;
  console.log("login from ",apiUrl);
  
  try {
    const response = await axiosInstance.post('/admin/login', {
      email: email,
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error('Login or fetching user failed:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const getAdmin  = async ()=>{

  try {
    const response = await axiosInstance.get('/admin/get-admin');
    return response.data;
  } catch (error) {
    console.error('Admin not found ', error.response ? error.response.data : error.message);
    throw error;
  }
  
}


const logout   = async ()=>{

  try {
    const response = await axiosInstance.post('/admin/logout');
    return response.data;
  } catch (error) {
    console.error('logout not performed', error.response ? error.response.data : error.message);
    throw error;
  }
  
}

export { login , getAdmin , logout};
