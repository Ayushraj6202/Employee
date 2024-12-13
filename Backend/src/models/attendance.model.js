import mongoose from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const attendeceSchema = new mongoose.Schema(
    {
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
            index: true,
        },
        date: {
            type: Date,
            index: true,
        },
        workday: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
)

attendeceSchema.plugin(mongooseAggregatePaginate);

export const Attendance = mongoose.model("Attendance", attendeceSchema);
