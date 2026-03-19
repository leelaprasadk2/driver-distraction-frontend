import {connect} from "@/dbconfig/dbConfig";
import User from "@/models/userModels";
import { NextResponse,NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";



export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        
    

        //Check user is existing or not in database
        const user =  await User.findOne({email})
        if(user)
        {
            return NextResponse.json({message:"User already exists"}, {status: 400});
        }
        //Hash password
        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);

        //Create new user
        const newUser=new User({
            username,
            email,
            password:hashedPassword
        });

        await newUser.save();
        //send verification email
        



        await sendEmail({email,emailType:"VERIFY",userId:newUser._id})
        return NextResponse.json({message:"User created successfully"}, {status: 201});
        
    } catch (error:any) {
       console.error("Error in signup route:", error);
       return NextResponse.json({message:error.message}, {status: 500});    
    }
}