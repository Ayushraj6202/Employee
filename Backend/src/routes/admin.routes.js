import express from 'express';
import { Router } from 'express';
import { 
  registerAdmin ,
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentAdmin,
  updateAdminDetails,
  allAdmin,
  deleteAdmin
} 
from '../controllers/admin.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const adminRouter = Router();

adminRouter.route('/register').post( registerAdmin); 
adminRouter.route ("/login").post ( loginAdmin );

// secure routes 

adminRouter.route ('/logout').post(verifyJWT , logoutAdmin)
adminRouter.route ('/refresh-token').post(verifyJWT , refreshAccessToken )
adminRouter.route ('/change-password').post(verifyJWT , changeCurrentPassword )
adminRouter.route ('/get-admin').get(verifyJWT , getCurrentAdmin )
adminRouter.route ('/update').post( verifyJWT , updateAdminDetails)
adminRouter.route('/all').get(verifyJWT, allAdmin)
adminRouter.route('/delete/:id').delete(verifyJWT,deleteAdmin)

export default adminRouter;