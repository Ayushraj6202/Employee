import axios from 'axios';
import { apiUrl } from '../../constants';

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true, 
});

const getDesigList = async ({ on, pat, page }) => {
  try {
    const response = await axiosInstance.get(`/designation/list?PatternOn=${on}&Pattern=${pat}&page=${page}`);
    return response.data.data;
  } catch (error) {
    console.log("error in fetching designation list", error);
    throw error;
  }
};

const registerDesig = async (formData) => {
    console.log ( formData , "Fdata h ye")
  try {
    await axiosInstance.post('/designation/register', {description : formData.desc, designationName: formData.designationname});
    return true;
  } catch (error) {
    console.log("error in registering designation");
    throw error;
  }
};

const getDesignationDetails = async (id) => {
  try {
    const res = await axiosInstance.get(`/designation/details/?id=${id}`);
    return res.data;
  } catch (error) {
    console.log("error in getting details of designation");
    throw error;
  }
};

const updateDesignation = async (fData) => {
  console.log("upd desg ",fData);
  
  try {
    const res = await axiosInstance.post('/designation/update', fData);
    return res.data;
  } catch (error) {
    console.log("error in updating details of designation");
    throw error;
  }
};

const deleteDesig = async (id) => {
  try {
    await axiosInstance.get(`/designation/delete/?id=${id}`);
  } catch (error) {
    console.log("error in deleting designation");
    throw error;
  }
};

export { getDesigList, registerDesig, getDesignationDetails, updateDesignation, deleteDesig };
