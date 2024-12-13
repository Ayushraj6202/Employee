import express from 'express';
import { 
    registerDesignation,
    upadateDesignation ,
    getDesignation,
    getDesignationDetails,
    deleteDesignation
} 
from '../controllers/designation.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const Router = express.Router();

Router.route ( "/register").post ( verifyJWT , registerDesignation )
Router.route ( "/update").post ( verifyJWT , upadateDesignation )
Router.route ( "/list").get ( verifyJWT , getDesignation )
Router.route ( "/details").get ( verifyJWT , getDesignationDetails )
Router.route ( "/delete").get ( verifyJWT , deleteDesignation )

export default Router;