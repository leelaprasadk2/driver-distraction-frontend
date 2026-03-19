import {connect} from "@/dbconfig/dbConfig";
import User from "@/models/userModels";
import { NextResponse, NextRequest } from "next/server";
import { sendEmailForForgetPassword } from "@/helpers/mailforforgetpassword";


export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqbody=await request.json();
        const {email}=reqbody;

        const user=await User.findOne({email});

        if(!user)
        {
            return NextResponse.json({message:"user doesn't exist"}, {status:400});
        }

        const mailresponse=await sendEmailForForgetPassword({email: user.email, emailType:"RESET", userId: user._id});

        if(mailresponse)
        {
            return NextResponse.json({message:"email sent successfully"}, {status:200});
        }
        

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });

    }
}