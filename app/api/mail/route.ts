import { dbConfig } from "@/utils/dbConfig";
import mailModel from "@/utils/model/mailModel";
import userModel from "@/utils/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConfig();

    const mail = await mailModel.find().sort({ createdAt: -1 });

    return NextResponse.json({
      message: "success from GET",
      status: 200,
      data: mail,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error",
      status: 404,
      error: error.message,
    });
  }
};
