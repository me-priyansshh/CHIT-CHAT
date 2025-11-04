import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        select: false,
    },
    profilePic: {
        type: String,
        default: '',
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        enum: ['male', 'female'],
    }
    
},{timestamps:true});

const User = mongoose.model("User", userModel);

export default User;