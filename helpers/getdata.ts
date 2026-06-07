import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const GetDataFromToken = (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decodedToken: any = jwt.verify(
    token,
    process.env.SECRET_KEY as string
  );

  return decodedToken.id;
};