import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide a username"],
        unique:true,
        trim:true,   
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],

        // ✅ ADD THIS VALIDATION
        match: [
            /^(?=.*[0-9])(?=.*[!@#$%^&*]).{7,}$/,
            "Password must be at least 7 characters and include at least 1 number and 1 special character"
        ]
    },

    isVerfied:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },

    distractedCount: {
        type: Number,
        default: 0,
    },

    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date, 
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;