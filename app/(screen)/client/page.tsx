import React from "react";
import PostContent from "./post/PostContent";
import { currentUser } from "@clerk/nextjs/server";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SideBar from "./siderbar/SideBar";
import DisplayPost from "./displayPost/DisplayPost";

const page = async () => {
  return (
    <div>
      <div className="relative h-[97.5vh] w-full bg-slate-50">
        <ResizablePanelGroup
          direction="horizontal"
          className=" w-full rounded-lg border"
        >
          <ResizablePanel minSize={5} maxSize={20} defaultSize={20}>
            <div className="flex h-full items-center justify-center p-2">
              <span className="h-full font-semibold w-full">
                <SideBar />
              </span>
            </div>
          </ResizablePanel>

          {/* <MainPageLayout children={children} /> */}

          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center w-full justify-center p-2">
              <span className="h-full w-full font-semibold">
                {/* {children} */}
                <PostContent />
              </span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30} minSize={25} maxSize={60}>
            <div className="flex h-full w-full items-center justify-center p-2">
              <span className="w-full h-full font-semibold ">
                <DisplayPost />
              </span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      {/* <PostContent /> */}
    </div>
  );
};

export default page;
