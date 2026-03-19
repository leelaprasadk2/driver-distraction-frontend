import {connect} from "@/dbconfig/dbConfig";
import User from "@/models/userModels";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "user doesn't exist" }, { status: 400 });
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({ message: "Invalid User Password" }, { status: 400 });
        }

        // ✅ ADDED THIS CHECK HERE
        if (!user.isVerfied) {
            console.log("User email not verified:", user.email);
            return NextResponse.json(
                { message: "Please verify your email before login" },
                { status: 400 }
            );
        }


        //create token data
        const tokendata = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        //create jwt token
        const token = jwt.sign(tokendata, process.env.SECRET_KEY as string, { expiresIn: '1h' });

        //set cookie
        const response = NextResponse.json({ message: "user sucessfully Login", success: true });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 3600,
            path: "/"
        });

        return response;

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
