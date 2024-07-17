"use client";

import { GlobalContext, GlobalProvider } from "@/app/global/GlobalContext";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { FcDeleteDatabase } from "react-icons/fc";
import { MdDelete, MdDeleteForever } from "react-icons/md";
import MainProfile from "../post/MailProfile";
import Profile from "../post/Profile";

const DisplayPost = () => {
  const user = useUser();
  const [value, setValue] = useState<string>("");
  const [tag, setTag] = useState<string>("work");

  const { id }: any = useContext(GlobalProvider);

  const userID = user?.user?.publicMetadata?.userId;

  const fetchData = async (formData: FormData) => {
    const url = "http://localhost:3000/api";

    const title = formData.get("title");

    await fetch(`${url}/${userID}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, tag, message: value }),
    }).then(() => {
      return redirect("/client/inbox");
    });

    revalidateTag("mail");
  };

  const [data, setData] = useState<any>({});

  const readData = async () => {
    const url = "http://localhost:3000/api/mail";
    return await fetch(`${url}/${id}`, {
      cache: "no-cache",
      next: {
        tags: ["mail"],
      },
    }).then((res) => {
      return res.json();
    });
  };

  const makeAsSeen = async () => {
    const url = `http://localhost:3000/api/${userID}/${id}`;

    return await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify({}),
    }).then((res) => {
      return res.json();
    });
  };

  useEffect(() => {
    makeAsSeen();
    readData().then((res) => {
      setData(res?.data);
    });
  }, [id]);

  return (
    <div className="h-full">
      <div className="flex mx-1 w-[98%] items-center  border-b pb-2 mb-2 h-[45px] text-[25px] gap-5">
        <MdDeleteForever className="cursor-pointer" />
        <FcDeleteDatabase className="cursor-pointer" />
        <MdDelete className="cursor-pointer mr-4 border-r" />
      </div>
      <div className=" py-3 border-b mb-4 flex w-full  justify-between">
        <div className="flex gap-5">
          <div className="w-8 h-8 flex items-center justify-center rounded-full text-white bg-black">
            U
          </div>
          <div className="text-[12px]">
            <p className="text-[15px] font-semibold">
              <Profile userID={data} />
            </p>
            <div className="text-gray-300">
              <p>Re: Peter</p>
              <p>Reply-To: peter@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="text-[8px] text-gray-400 ">
          {moment(data?.createdAt).format("llll")}
        </div>
      </div>
      <div className=" p-4 text-gray-500 text-[12px]">
        <div dangerouslySetInnerHTML={{ __html: data?.message }} />
      </div>
    </div>
  );
};

export default DisplayPost;
