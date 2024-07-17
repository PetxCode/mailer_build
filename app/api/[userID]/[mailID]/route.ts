import { dbConfig } from "@/utils/dbConfig";
import mailModel from "@/utils/model/mailModel";
import userModel from "@/utils/model/userModel";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();
    const { userID, mailID } = params;

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

export const PATCH = async (req: NextRequest, { params }: any) => {
  try {
    await dbConfig();
    const { mailID, userID } = params;

    const user = await userModel.findById(userID);
    const mailer = await mailModel.findById(mailID);

    // console.log(mailer.data.read);
    const check = mailer?.read?.some((el: any) => {
      return el._id.toString() === userID;
    });

    if (check) {
      return NextResponse.json({
        message: "success from POST",
        status: 200,
        data: mailer,
      });
    } else {
      const mail = await mailModel.findByIdAndUpdate(
        mailID,
        {
          read: [...mailer?.read, user._id],
        },
        { new: true }
      );

      user.mail.push(new Types.ObjectId(mail?._id));
      user?.save();

      return NextResponse.json({
        message: "success from POST",
        status: 200,
        data: mailer,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      message: "Error",
      status: 404,
      error: error.message,
    });
  }
};
