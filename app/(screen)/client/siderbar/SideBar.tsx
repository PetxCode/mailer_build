"use client";

import { Button } from "@/components/ui/button";
import {
  ButtonIcon,
  FaceIcon,
  HeadingIcon,
  ImageIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { SignedIn, UserButton } from "@clerk/nextjs";

const SideBar = () => {
  const pathname = usePathname();
  const navData = [
    {
      id: 1,
      name: "Inbox",
      icon: <ButtonIcon />,
      path: "/client/inbox",
    },
    {
      id: 1,
      name: "Draft",
      icon: <ImageIcon />,
      path: "/client/create",
    },
    {
      id: 1,
      name: "Inbox",
      icon: <FaceIcon />,
      path: "/admin",
    },
    {
      id: 1,
      name: "Inbox",
      icon: <HeadingIcon />,
      path: "/admin",
    },
  ];
  let width = 50;
  return (
    <div className="h-full flex flex-col w-full">
      <div className="my-4">Menu</div>

      <div className={`flex flex-col gap-2 flex-1`}>
        {navData.map((navItem) => (
          <Link
            href={navItem.path}
            key={navItem.id}
            className={
              pathname === navItem.path
                ? "w-full rounded-md transition-all duration-300 font-semibold text-white bg-blue-950 "
                : "w-full"
            }
          >
            <Button
              className="w-full flex justify-start gap-2"
              variant={"ghost"}
            >
              {navItem.icon} <span>{navItem.name}</span>
            </Button>
          </Link>
        ))}
      </div>

      <div>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </div>
    </div>
  );
};

export default SideBar;
