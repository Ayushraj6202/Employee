import { Admin } from "../models/admin.model.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";


const generateAccessAndRefereshTokens = async (adminId) => {
    try {
        const admin = await Admin.findById(adminId);
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();
        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong while generating referesh and access token" });
    }
}

const registerAdmin = async (req, res) => {

    const { fullname, email, username, password } = req.body;

    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existedAdmin = await Admin.findOne({
        $or: [{ username }, { email }]
    })

    if (existedAdmin) {
        return res.status(409).json({ message: "Admin with email or username already exists" });
    }


    const admin = await Admin.create({
        fullname,
        email: email.toLowerCase(),
        password,
        username: username.toLowerCase()
    })

    const createdAdmin = await Admin.findById(admin._id).select(
        "-password -refreshToken"
    )

    if (!createdAdmin) {
        return res.status(500).json({ message: "Something went wrong while registering the user" });
    }

    return res.status(201).json(
        {
            statusCode: 200,
            data: createdAdmin,
            message: "User registered successfully"
        }
    );
}

const loginAdmin = async (req, res) => {
    const { email, username, password } = req.body

    if (!username && !email) {
        return res.status(400).json({ message: "username or email is required" });
    }

    const admin = await Admin.findOne({
        $or: [{ username }, { email }]
    })

    if (!admin) {
        return res.status(304).json({ message: "User does not exist" });
    }

    const isPasswordValid = await admin.isPasswordCorrect(password)

    if (!isPasswordValid) {
        return res.status(306).json({ message: "Invalid user credentials" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(admin._id)

    const loggedInUser = await Admin.findById(admin._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: false
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            {
                statusCode: 200,
                data: {
                    user: loggedInUser, accessToken, refreshToken
                },
                message: "User logged in successfully"
            }
        )

}

const logoutAdmin = async (req, res) => {
    await Admin.findByIdAndUpdate(
        req.admin._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: false,
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({
            statusCode: 200,
            data: {},
            message: "User logged out"
        })
}

const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        return res.status(401).json({ message: "unauthorzed request" });
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const admin = await Admin.findById(decodedToken?._id)

        if (!admin) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        if (incomingRefreshToken !== admin?.refreshToken) {
            return res.status(401).json({ message: "Refresh token is expired or used" });
        }

        const options = {
            httpOnly: true,
            secure: false
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(admin._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                {
                    statusCode: 200,
                    data: { accessToken, refreshToken: newRefreshToken },
                    message: "Access token refreshed"
                }
            )
    } catch (error) {
        return res.status(401).json({ message: error?.message || "Invalid refresh token" })
    }

}

const changeCurrentPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body


    // console.log("backendd pass ",oldPassword,newPassword);
    
    const admin = await Admin.findById(req.admin?._id)
    const isPasswordCorrect = await admin.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid old password" });
    }

    admin.password = newPassword
    await admin.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            {
                statusCode: 200,
                data: {},
                message: "Password changed successfully"
            }
        )
}

const getCurrentAdmin = async (req, res) => {
    console.log("get current admin ",req.admin);
    
    return res
        .status(200)
        .json(
            {
                statusCode: 200,
                data: req.admin,
                message: "User fetched succesfully"
            }
        )
}

const updateAdminDetails = async (req, res) => {
    const { fullname, email } = req.body

    if (!fullname || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const admin = await Admin.findByIdAndUpdate(
        req.admin?._id,
        {
            $set: {
                fullname,
                email,
            }
        },
        { new: true }

    ).select("-password")
    // console.log(admin);
    
    return res
        .status(200)
        .json(
            {
                statusCode: 200,
                data: admin,
                message: "Admin details updated successfully"
            }
        )
};

const allAdmin = async (req,res)=>{
    try {
        const all = await Admin.find();
        // console.log(all);
        return res.status(200).json({
            statusCode:200,
            data:all,
            message:"All Admin fetched successfully"
        });
    } catch (error) {
        return res.status(500).json({message:"Internal Error"});
    }
}

const deleteAdmin = async (req,res)=>{
    const id = req.params.id;
    // console.log(id);
    try {
        await Admin.findByIdAndDelete(id);
        return res.status(200).json({message:"Deleted"});
    } catch (error) {
        return res.status(500).json({message:"Internal Error"});
    }
}
export {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentAdmin,
    updateAdminDetails,
    allAdmin,
    deleteAdmin
}