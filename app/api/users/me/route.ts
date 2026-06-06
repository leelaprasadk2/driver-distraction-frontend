import { connect } from "@/dbconfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { GetDataFromToken } from "@/helpers/getdata";

export async function GET(request: NextRequest) {
  try {
    await connect();

    const userId = GetDataFromToken(request);

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User fetched successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          distractedCount: user.distractedCount || 0, // ✅ IMPORTANT
        },
      },
      { status: 200 }
    );

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}