import express from 'express';
import { 
    registerFeedback,
    deleteFeedback,
    getEmployeeFeedback
} 
from '../controllers/feedback.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const Router = express.Router();

Router.route ( "/register").post ( verifyJWT , registerFeedback )
Router.route ( "/delete").post ( verifyJWT , deleteFeedback )
Router.route ( "/get-feedback").get ( verifyJWT , getEmployeeFeedback )

export default Router;