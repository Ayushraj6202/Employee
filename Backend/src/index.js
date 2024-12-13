import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import ConnectDB from './db/ConnectDB.js'

dotenv.config();
const app = express();
ConnectDB();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

//Import All routes


//call all routes


const PORT = process.env.PORT||4000;
app.listen(PORT,()=>{
    console.log(`Server is Listining at ${PORT}`);
})