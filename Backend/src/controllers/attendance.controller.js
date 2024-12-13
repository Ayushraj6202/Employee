import  {Attendance}  from './../models/attendance.model.js';


const markAttendance = async (req, res) => {
    const { date, workday, id } = req.body;

    if (!id || !date || !workday) {
        return res.status(400).json({message:"Employee ID,date and workday are required"});
        // throw new ApiError(400, "Employee ID, date, and workday are required.");
    }

    const attendance = await Attendance.findOneAndUpdate(
        { employee: id, date },
        { workday },
        { upsert: true, new: true }
    );

    if (!attendance) {
        return res.status(500).json({message:"Error n marking attendence"});
        // throw new ApiError(500, "Error in marking attendance");
    }
    return res.status(201).json(
        {
            statusCode:200,
            data:attendance,
            message:"Attendence registered successfully"
        }
        // new ApiResponse(200, attendance, "Attendance registered successfully")
    );

};

const getAttendanceForMonth = async (req, res) => {
    const { id, year, month } = req.body;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // Fetch only the `workday` and `date` fields
    // console.log("attedn get bAack");
    
    const attendanceRecords = await Attendance.find({
        employee: id,
        date: { $gte: startDate, $lte: endDate }
    }).select("workday date"); // Selecting only `workday` and `date` fields

    return res.status(200).json(
        {
            statusCode:200,
            data:attendanceRecords,
            message:"Attendence fetched successfully",
        }
        // new ApiResponse(200, attendanceRecords, "Attendance fetched successfully")
    );
};


export {
    markAttendance,
    getAttendanceForMonth
};