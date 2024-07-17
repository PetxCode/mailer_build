import { dbConfig } from "@/utils/dbConfig";
import userModel from "@/utils/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConfig();

    const user = await userModel.find();

    return NextResponse.json({
      message: "success from GET",
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

export const POST = async (req: NextRequest) => {
  try {
    await dbConfig();
    const { name, email, role, clerkID } = await req.json();
    const user = await userModel.create({
      name,
      email,
      role: "client",
      clerkID,
    });

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
