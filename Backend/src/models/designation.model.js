import { mongoose , Schema } from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const designationSchema = new Schema (
    {
        designationName: {
            type: String,
            required: true,
            trim: true , 
            index : true ,
            unique : true , 
        },
        description: {
            type: String,
            default: ''
        }        
    },
    {
        timestamps: true ,
    }
)

designationSchema.plugin(mongooseAggregatePaginate)


export const Designation = mongoose.model("Designation" , designationSchema)