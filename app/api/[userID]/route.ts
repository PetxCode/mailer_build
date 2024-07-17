import { dbConfig } from "@/utils/dbConfig";
import mailModel from "@/utils/model/mailModel";
import userModel from "@/utils/model/userModel";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();
    const { userID } = params;

    const user = await userModel.findById(userID).populate({
      path: "mail",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return NextResponse.json({
      message: "success reading user mail GET",
      status: 200,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error",
      status: 404,
      error: error.message,
    });
  }
};

export const POST = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();
    const { userID } = params;

    const user = await userModel.findById(userID).populate({
      path: "mail",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });
    const { title, tag, message } = await req.json();

    const mail = await mailModel.create({
      title,
      tag,
      message,
      user,
      userID: userID,
    });

    user.mail.push(new Types.ObjectId(mail?._id));
    user?.save();

    return NextResponse.json({
      message: "success from POST",
      status: 200,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error",
      status: 404,
      error: error.message,
    });
  }
};
