import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import React, { FC, ReactNode } from "react";
import DisplayPost from "./displayPost/DisplayPost";

interface iProps {
  children: ReactNode;
}

const MainPageLayout: FC<iProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default MainPageLayout;
