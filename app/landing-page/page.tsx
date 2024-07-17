import { SignedOut, SignIn, SignInButton } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center mt-10">
      <div className="my-10">Landing Page</div>

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default page;
