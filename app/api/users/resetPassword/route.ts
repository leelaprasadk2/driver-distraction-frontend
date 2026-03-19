import User from "@/models/userModels";
import { connect } from "@/dbconfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
import bcryptjs from "bcryptjs";

export async function PATCH(request: NextRequest) {
  try {
    await connect();

    const reqBody = await request.json();
    const { password, token } = reqBody;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
