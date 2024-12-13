import mongoose from "mongoose";
const url = `${process.env.MONGO_DB_URL}/${process.env.DATABASE}`
console.log("db url ",url);
const ConnectDB = async ()=>{
    try {
        await mongoose.connect(url);
        console.log("DB Connected");
    } catch (error) {
        console.log("DB Connection Error ",error);
    }
}
export default ConnectDB;