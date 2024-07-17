"use client";

import { useUser } from "@clerk/nextjs";
import React, { FC, useEffect, useState } from "react";

interface iUser {
  userID: any;
}

const MainProfile: FC<iUser> = ({ userID }) => {
  const [readData, setReadData] = useState<any>({});
  const user = useUser();
  const ID = user?.user?.publicMetadata?.userId;

  const fetchData = async () => {
    const url = `http://localhost:3000/api/${ID}`;

    return await fetch(`http://localhost:3000/api/${ID}`, {
      cache: "no-cache",
    }).then((res) => {
      return res.json();
    });
  };

  useEffect(() => {
    fetchData().then((res) => {
      setReadData(res?.data);
    });
  }, [userID]);

  return <div>{readData?.name}</div>;
};

export default MainProfile;
