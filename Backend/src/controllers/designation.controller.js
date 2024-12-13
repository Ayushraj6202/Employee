import mongoose from "mongoose";
import { Designation } from './../models/designation.model.js';
import { Employee } from './../models/employee.model.js';


const registerDesignation = async (req, res) => {

    const { designationName, description } = req.body

    if (
        [designationName].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json({ message: "Fill the required feilds" });
        // throw new ApiError(400, "Fill the required fields")
    }
    const existed = await Designation.findOne({
        designationName,
    })
    if (existed) {
        return res.status(409).json({ message: "Designation already exists" });
        // throw new ApiError(409, "Designation allready exist ")
    }
    const designation = await Designation.create({
        designationName,
        description
    })
    const created = await Designation.findById(designation._id)
    if (!created) {
        return res.status(500).json({ message: "Something went wrong while registering the designation" });
        // throw new ApiError(500, "Something went wrong while registering the designation")
    }
    return res.status(201).json(
        {
            statusCode: 200,
            data: created,
            message: "Designationn registred successfully"
        }
        // new ApiResponse(200, created, "Designation registered Successfully")
    )
};
const upadateDesignation = async (req, res) => {
    const { id, designationName, description } = req.body
    if (
        [designationName, id].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json({ message: "Fill the required fields" });
        // throw new ApiError(400, "Fill the required fields")
    }
    const designation = await Designation.findByIdAndUpdate(
        id,
        {
            $set: {
                designationName,
                description,
            }
        },
        { new: true }
    )
    return res
        .status(200)
        .json(
            {
                statusCode: 200,
                data: designation,
                message: "Designation details updated successfuly"
            }
            // new ApiResponse(200, designation, "Designation details updated successfully")
        )
};
const getDesignation = async (req, res) => {
    const { page = 1, PatternOn, Pattern } = req.query;
    let matchQuery = {};
    if (PatternOn && Pattern) {
        const patternField = PatternOn;
        matchQuery[patternField] = { $regex: new RegExp(Pattern, 'i') };
    }
    const aggregateQuery = Designation.aggregate([
        { $match: matchQuery },
        {
            $project: {
                designationName: 1,
                description: 1,
            },
        },
    ]);
    const options = {
        page: parseInt(page),
        limit: 20,
    };
    const result = await Designation.aggregatePaginate(aggregateQuery, options);
    return res
        .status(200)
        .json(
            {
                statusCode: 200,
                data: result,
                message: "Designation list fetched successfully"
            }
            // new ApiResponse(200, result, "Designation List fetched successfully")
        )
};
const getDesignationDetails = async (req, res) => {
    const { id } = req.query;
    // Find the designation by id
    const designation = await Designation.findById(id);
    if (!designation) {
        return res.status(404).json({ message: `Designation not found with id ${id} ` });
        // throw new ApiError(404, `Designation not found with id: ${id}`);
    }
    const employeeCount = await Employee.countDocuments({ designation: id });
    // Combine department details with employee count
    const designationDetails = {
        designation,
        employeeCount
    };
    return res.status(200).json(
        {
            statusCode: 200,
            data: designationDetails,
            message: "Designation details fetched succesffuly"
        }
        // new ApiResponse(200, designationDetails, "Designation details fetched successfully")
    );
};
const deleteDesignation = async (req, res) => {
    const { id } = req.query;
    const designation = await Designation.findById(id);
    if (!designation) {
        return res.status(404).json({ message: "Designation not found" });
        // throw new ApiError(404, "Designation not found");
    }
    await Designation.findByIdAndDelete(id);
    return res.status(200).json(
        {
            statusCode: 200,
            message: "Desiganation deleted successfuly"
        }
        // new ApiResponse(200, null, "Designation deleted successfully")
    );
};
export {
    registerDesignation,
    upadateDesignation,
    getDesignation,
    getDesignationDetails,
    deleteDesignation
}