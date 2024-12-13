import express from 'express';
import {
    registerDepartment,
    updateDepartment,
    getDepartment,
    getDepartmentDetails,
    deleteDepartment
}
from '../controllers/department.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const Router = express.Router();

Router.route("/register").post(verifyJWT, registerDepartment)
Router.route("/update").post(verifyJWT, updateDepartment)
Router.route("/list").get(verifyJWT, getDepartment)
Router.route("/details").get(verifyJWT, getDepartmentDetails)
Router.route("/delete").get(verifyJWT, deleteDepartment)


export default Router;