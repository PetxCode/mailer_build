import { SignUp } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="mt-20 flex w-[100%] justify-center items-center h-[70vh] flex-col ">
      <p className="my-6">Sign Up</p>
      <p>
        <SignUp />
      </p>
    </div>
  );
};

export default page;
