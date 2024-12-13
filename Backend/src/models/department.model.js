import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';


const departmentSchema = new mongoose.Schema(
    {
        departmentname: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        desc: {
            type: String,
        }
    },
    { timestamps: true }
)

//Prevents duplicates and speeds up queries on departmentname and location
//1 for accending and -1 for decending
departmentSchema.index({ departmentname: 1, location: 1 }, { unique: true });
//Pagination
departmentSchema.plugin(mongooseAggregatePaginate)

export const Department = mongoose.model('Department', departmentSchema);