import {connect} from "@/dbconfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import {GetDataFromToken} from "@/helpers/getdata";

export async function GET(request:NextRequest){
    try {
        await connect();
        const userId=GetDataFromToken(request);
        const userData=await User.findById(userId).select('-password');
        return NextResponse.json({user:userData},{status:200})

        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}