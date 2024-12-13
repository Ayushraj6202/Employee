import { Employee } from "../models/employee.model.js"


const registerEmployee = async (req, res) => {
    const { dob, email, lastname, firstname, gender, joiningdate, department, mobileno, address, payfrom, workingdays, designation } = req.body
    if (
        [firstname, gender, email, dob, joiningdate, payfrom].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json({ message: "Fill the required feilds" });
        // throw new ApiError(400, "Fill the required fields")
    }

    const existedEmployee = await Employee.findOne({
        $or: [
            { email: email },
            { mobileno: mobileno }
        ]
    });


    if (existedEmployee) {
        return res.status(409).json({ message: "Employee with email already exists" });
        // throw new ApiError(409, "Employee with email already exists")
    }


    const employee = await Employee.create({
        dob,
        email,
        lastname,
        firstname,
        gender,
        joiningdate,
        department,
        mobileno,
        address,
        payfrom,
        workingdays,
        designation
    })

    const createdEmployee = await Employee.findById(employee._id)

    if (!createdEmployee) {
        return res.status(500).json({ message: "Somethign went wrong while registering empolyee" });
        // throw new ApiError(500, "Something went wrong while registering the employee")
    }

    return res.status(201).json(
        {
            statusCode: 200,
            data: createdEmployee,
            message: "Employee registered successfully"
        }
        // new ApiResponse(200, createdEmployee, "Employee registered Successfully")
    )

}

const updateEmployeeDetails = async (req, res) => {
    const { id, dob, email, lastname, firstname, gender, joiningdate, department, mobileno, address, payfrom, workingdays, designation } = req.body

    if (
        [id, firstname, gender, email, dob, joiningdate, payfrom].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json({ message: "Fill the required feilds" });
        // throw new ApiError(400, "Fill the required fields")
    }

    const employee = await Employee.findByIdAndUpdate(
        id,
        {
            $set: {
                dob,
                email,
                lastname,
                firstname,
                gender,
                joiningdate,
                department,
                mobileno,
                address,
                payfrom,
                workingdays,
                designation
            }
        },
        { new: true }

    )

    return res
        .status(200)
        .json(
            {
                statusCode: 200,
                data: employee,
                message: "Employee details updated successfully"
            }
            // new ApiResponse(200, employee, "Employee details updated successfully")
        )
};

const EmployeeList = async (req, res) => {
    const { page = 1, PatternOn, Pattern } = req.query;

    let matchQuery = {};

    if (PatternOn && Pattern) {
        const patternField = PatternOn;
        matchQuery[patternField] = { $regex: new RegExp(Pattern, 'i') };
    }

    const aggregateQuery = Employee.aggregate([
        { $match: matchQuery },
        {
            $project: {
                firstname: 1,
                lastname: 1,
                email: 1,
                gender: 1,
                payfrom: 1,
            },
        },
    ]);

    const options = {
        page: parseInt(page),
        limit: 20,
    };

    const result = await Employee.aggregatePaginate(aggregateQuery, options);

    return res
        .status(200)
        .json(
            {
                statusCode: 200,
                data: result,
                message: "Employee list fetched successfully"
            }
            // new ApiResponse(200, result, "Employee List fetched successfully")
        )

};

const getEmp = async (req, res) => {
    const { id } = req.query

    const employee = await Employee.findById(id)

    if (!employee) {
        return res.status(500).json({ message: `for this id ${id}  Something went wrong while fetching the employee` });
        // throw new ApiError(500, `for this id ${id}  Something went wrong while fetching the employee`)
    }

    return res
        .status(200)
        .json(
            {
                statusCode: 200,
                data: employee,
                message: "Employee data fetched successfully"
            }
            // new ApiResponse(200, employee, "Employee data fetched successfully")
        )
};

export {
    registerEmployee,
    EmployeeList,
    updateEmployeeDetails,
    getEmp
}