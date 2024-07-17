import React from "react";
import PostContent from "./post/PostContent";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  return (
    <div>
      <PostContent />
    </div>
  );
};

export default page;
