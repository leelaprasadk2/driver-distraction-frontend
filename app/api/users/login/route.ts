import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModels";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "User does not exist" }, // ✅ fixed message
                { status: 400 }
            );
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json(
                { message: "Invalid user password" }, // ✅ cleaned message
                { status: 400 }
            );
        }

        // ✅ CHECK EMAIL VERIFIED
        if (!user.isVerfied) {
            console.log("User email not verified:", user.email);
            return NextResponse.json(
                { message: "Please verify your email before login" },
                { status: 400 }
            );
        }

        // ✅ TOKEN DATA
        const tokendata = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        // ✅ CREATE TOKEN
        const token = jwt.sign(
            tokendata,
            process.env.SECRET_KEY as string,
            { expiresIn: "1h" }
        );

        // ✅ RESPONSE
        const response = NextResponse.json({
            message: "User successfully logged in", // ✅ fixed spelling
            success: true,
            user: {
                _id: user._id.toString(),
                username: user.username,
                email: user.email
            }
        });

        // ✅ SET COOKIE
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ✅ safer
            sameSite: "strict",
            maxAge: 3600,
            path: "/"
        });

        return response;

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}