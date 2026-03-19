import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModels";
import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const reqBody = await request.json();
    const { token } = reqBody;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      verifyToken: hashedToken,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    user.isVerfied = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
