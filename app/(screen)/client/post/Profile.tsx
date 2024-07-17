"use client";

import { useUser } from "@clerk/nextjs";
import React, { FC, useEffect, useState } from "react";

interface iUser {
  userID: any;
}

const Profile: FC<iUser> = ({ userID }) => {
  const [readData, setReadData] = useState<any>({});
  const user = useUser();
  const ID = user?.user?.publicMetadata?.userId;

  const fetchData = async () => {
    const url = `http://localhost:3000/api/${userID?.user}`;
    return await fetch(url, {
      cache: "no-cache",
      next: {
        tags: ["mail"],
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setReadData(res.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log("reading ID: ", userID?.user);

  return <div>{readData?.name}</div>;
};

export default Profile;
