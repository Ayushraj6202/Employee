import mongoose from "mongoose";
import { Department } from './../models/department.model.js';
import { Employee } from "./../models/employee.model.js"

const registerDepartment = async (req, res) => {
    const { departmentname, location, desc } = req.body
    if (
        [departmentname, location].some((field) => field?.trim() === "")
    ) {
        res.json({
            statusCode: 400,
            message: "Fill the required fields"
        })
    }
    const existed = await Department.findOne({
        departmentname,
        location
    })
    if (existed) {
        return res.status(409).json({ message: "Department already exist with email already exists" });
        // throw new ApiError(409, "department allready exist with email already exists")
    }
    const department = await Department.create({
        departmentname,
        location,
        desc
    })
    const created = await Department.findById(department._id)
    if (!created) {
        return res.status(404).json({ message: "Something went wrong while registering the department" });
        // throw new ApiError(500, "Something went wrong while registering the department")
    }
    return res.status(201).json(
        {
            statusCode: 200,
            data: created,
            message: "Department registered successfully"
        }
        // new ApiResponse(200, created, "Department registered Successfully")
    )
}

const updateDepartment = async (req, res) => {
    const { id, departmentname, location, head, desc } = req.body

    if (
        [id, departmentname, location].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json({ message: "Fill the required feilds" });
        // throw new ApiError(400, "Fill the required fields")
    }

    const department = await Department.findByIdAndUpdate(
        id,
        {
            $set: {
                departmentname,
                location,
                head,
                desc
            }
        },
        { new: true }

    )

    return res
        .status(200)
        .json(
            {
                statusCode: 200,
                data: department,
                message: "Department details updated successfully"
            }
            // new ApiResponse(200, department, "Department details updated successfully")
        )
};
const getDepartment = async (req, res) => {
    const { page = 1, PatternOn, Pattern } = req.query;

    let matchQuery = {};

    if (PatternOn && Pattern) {
        const patternField = PatternOn;
        matchQuery[patternField] = { $regex: new RegExp(Pattern, 'i') };
    }

    const aggregateQuery = Department.aggregate([
        { $match: matchQuery },
        {
            $project: {
                departmentname: 1,
                location: 1,
                desc: 1,
            },
        },
    ]);

    const options = {
        page: parseInt(page),
        limit: 20,
    };

    const result = await Department.aggregatePaginate(aggregateQuery, options);

    return res
        .status(200)
        .json(
            {
                statusCode: 200,
                data: result,
                message: "Department List fetched successfully"
            }
            // new ApiResponse(200, result, "Department List fetched successfully")
        )
};


const getDepartmentDetails = async (req, res) => {
    const { id } = req.query;

    // Find the department by id
    const department = await Department.findById(id);

    if (!department) {
        return res.status(404).json({ message: `Department not found ${id} id` });
        // throw new ApiError(404, `Department not found ${id} id `);
    }

    // Count the number of employees in this department
    const employeeCount = await Employee.countDocuments({ department: id });

    // Combine department details with employee count
    const departmentDetails = {
        department,
        employeeCount
    };

    return res.status(200).json(
        {
            statusCode: 200,
            data: departmentDetails,
            message: "Department details fetched successfully"
        }
        // new ApiResponse(200, departmentDetails, "Department details fetched successfully")
    );
};


const deleteDepartment = async (req, res) => {
    const { id } = req.query;

    const department = await Department.findById(id);

    if (!department) {
        return res.status(404).json({ message: "Department not found" });
        // throw new ApiError(404, "Department not found");
    }

    await Department.findByIdAndDelete(id);
    return res.status(200).json(
        {
            statusCode: 200,
            message: "Department deleted successfull"
        }
        // new ApiResponse(200, null, "Department deleted successfully")
    );
};



export {
    registerDepartment,
    updateDepartment,
    getDepartment,
    getDepartmentDetails,
    deleteDepartment,
}