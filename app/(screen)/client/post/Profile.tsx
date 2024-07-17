"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [readData, setReadData] = useState<any>({});
  const user = useUser();
  const ID = user?.user?.publicMetadata?.userId;

  const fetchData = async () => {
    const url = `http://localhost:3000/api/${ID}`;
    return await fetch(url, {
      cache: "no-cache",
      next: {
        tags: ["mail"],
      },
    }).then((res) => {
      return res.json();
    });
  };

  useEffect(() => {
    fetchData().then((res) => {
      setReadData(res.data);
    });
  }, []);

  return <div>{readData?.name}</div>;
};

export default Profile;
