import express from 'express';
import {  
    markAttendance,
    getAttendanceForMonth
} 
from '../controllers/attendance.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const Router = express.Router();


Router.route ( "/mark").post ( verifyJWT , markAttendance )
Router.route ( "/get").post ( verifyJWT , getAttendanceForMonth )

export default Router;