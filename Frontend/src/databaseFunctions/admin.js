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
  console.log("login from ", apiUrl);

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

const getAdmin = async () => {

  try {
    const response = await axiosInstance.get('/admin/get-admin');
    return response.data;
  } catch (error) {
    console.error('Admin not found ', error.response ? error.response.data : error.message);
    throw error;
  }

}

const logout = async () => {

  try {
    const response = await axiosInstance.post('/admin/logout');
    return response.data;
  } catch (error) {
    console.error('logout not performed', error.response ? error.response.data : error.message);
    throw error;
  }

}
const changeCurrentPassword = async (oldpass, newpass) => {
  try {
    const result = await axiosInstance.post('/admin/change-password', {
      oldPassword: oldpass,
      newPassword: newpass
    });
    // console.log(result);
    return result;
  } catch (error) {
    console.log("change password ", error);
    throw error;
  }
}
const updateAdminDetails = async (fullname, email) => {
  try {
    const res = await axiosInstance.post('/admin/update', {
      fullname: fullname,
      email: email
    });
    console.log("update res ", res);
    return res;
  } catch (error) {
    console.log('update admin ', error);
    throw error;
  }
}
const registerAdmin = async (fullname, email, username, password) => {
  try {
    const response = await axiosInstance.post('/admin/register', {
      fullname: fullname,
      email: email,
      username: username,
      password: password,
    });
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
}

const getAllAdmins = async () => {
  try {
    const response = await axiosInstance.get('/admin/all');
    return response;
  } catch (error) {
    throw error;
  }
}
const deleteAdmins = async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/delete/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export {
  login,
  getAdmin,
  getAllAdmins,
  logout,
  changeCurrentPassword,
  updateAdminDetails,
  registerAdmin,
  deleteAdmins
};
