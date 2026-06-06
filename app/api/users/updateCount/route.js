import { NextResponse } from "next/server";
import User from "@/models/userModels";
import { connect } from "@/dbconfig/dbConfig";

connect();

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId } = body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { distractedCount: 1 } },
      { returnDocument: "after" } // ✅ FIX
    );

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Count updated",
      count: user.distractedCount,
    });

  } catch (error) {
    console.log(error); // 🔥 IMPORTANT (debug)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}