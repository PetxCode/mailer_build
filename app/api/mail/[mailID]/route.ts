import { dbConfig } from "@/utils/dbConfig";
import mailModel from "@/utils/model/mailModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();
    const { mailID } = params;

    const mail = await mailModel.findById(mailID);

    return NextResponse.json({
      message: "success reading user mail GET",
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
