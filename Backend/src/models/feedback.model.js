import { mongoose, Schema } from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const feedbackSchema = new Schema(
    {
        employee: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
            index: true,
        },
        date: {
            type: Date,            
        },
        feedback : { 
            type : String
        }
    },
    {
        timestamps: true,
    }
);

feedbackSchema.plugin(mongooseAggregatePaginate)


export const Feedback = mongoose.model("Feedback", feedbackSchema)