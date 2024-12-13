import express from 'express';
import { 
  registerEmployee,
  updateEmployeeDetails,
  EmployeeList,
  getEmp
} 
from '../controllers/employee.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const employeeRouter = express.Router();

employeeRouter.route ( "/register").post ( verifyJWT , registerEmployee )
employeeRouter.route ( "/update").post ( verifyJWT , updateEmployeeDetails )
employeeRouter.route ( "/list").get ( verifyJWT , EmployeeList )
employeeRouter.route ( "/get-emp").get ( verifyJWT , getEmp )

export default employeeRouter;