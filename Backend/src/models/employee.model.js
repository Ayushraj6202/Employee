import { mongoose , Schema } from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const employeeSchema = new Schema (
    {
        firstname : {
            type : String ,
            required : true,
            trim : true            
        },
        lastname : {
            type : String ,
            trim : true 
        },
        email : {
            type : String ,
            required : true ,
            unique : true ,
            trim : true ,
        },
        avatar : {
            type : String 
        },
        dob : {
            type : Date ,
            required : true ,            
        },
        gender :{
            type : String ,
            enum : ['male' , 'female' , 'other'],
            required : true ,            
        },
        joiningdate :{
            type : Date ,
            required : true ,
        },
        department : {
            type: Schema.Types.ObjectId,
            ref: "Department"
        },
        mobileno : {
            type : String ,
            trim : true ,
            unique : true ,
        },
        address : {
            type : String 
        },
        designation : {
            type: Schema.Types.ObjectId,
            ref: "Designation"
        },
        workingdays : [
            {type : String }
        ],
        payfrom : {
            type: Date,
            required : true , 
            default: Date.now()
        }
    },
    {
        timestamps: true ,
    }
)
//1 for accending and -1 for decending
employeeSchema.index({ firstname: 1 });
employeeSchema.index({ email: 1 });

employeeSchema.plugin(mongooseAggregatePaginate)

export const Employee = mongoose.model("Employee" , employeeSchema)