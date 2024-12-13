import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import ConnectDB from './db/ConnectDB.js';

dotenv.config({
    path: './.env'
})
const app = express();
ConnectDB();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

//Import All routes
import adminRouter  from "./routes/admin.routes.js"
import employeeRouter from "./routes/employee.routes.js"
import departmentRouter  from "./routes/department.routes.js"
import designationRoute  from "./routes/designation.routes.js"
import attendanceRoute from "./routes/attendance.routes.js"
// import salaryRoute from "./routes/salary.routes.js"
// import feedbackRoute from "./routes/feedback.routes.js"



//routes declaration
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/employee", employeeRouter)
app.use("/api/v1/department", departmentRouter)
app.use("/api/v1/designation", designationRoute)
app.use("/api/v1/attendance", attendanceRoute)
// app.use("/api/v1/salary", salaryRoute)
// app.use("/api/v1/feedback", feedbackRoute)


const PORT = process.env.PORT||4000;
app.listen(PORT,()=>{
    console.log(`Server is Listining at ${PORT}`);
})