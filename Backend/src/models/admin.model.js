import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const adminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type:String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String,
        }
    },
    { timestamps: true }
)

adminSchema.pre ( 'save' , async function ( next ) {
    if ( !this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

adminSchema.methods.isPasswordCorrect = async function ( password ){
    return await bcrypt.compare(password, this.password);
}

adminSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

adminSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const Admin = mongoose.model('Admin', adminSchema) 