import { SignIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="mt-10 flex w-[100%] justify-center items-center h-[70vh] flex-col ">
      <p className="my-6">Sign In</p>
      <p>
        <SignIn />
      </p>
    </div>
  );
};

export default page;
