"use client";
import { GlobalProvider } from "@/app/global/GlobalContext";
import React, { useContext, useEffect, useState } from "react";
import { MdCheckCircle, MdSearch } from "react-icons/md";
import Profile from "./Profile";
import moment from "moment";
import { currentUser } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

const PostContent = () => {
  const user = useUser();
  const { setID }: any = useContext(GlobalProvider);
  const userID = user?.user?.publicMetadata?.userId;
  const [readData, setReadData] = useState<Array<{}>>([]);

  const fetchData = async () => {
    const url = "http://localhost:3000/api/mail";
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

  console.log(
    "reading: ",
    readData?.map((el: any) => {
      return el.read?.some((el: any) => el === userID);
    })
  );

  return (
    <div className="w-full h-full  overflow-x-auto">
      <div className="w-[100%] h-[150vh] ">
        <div className="flex mx-1 w-[98%] items-center justify-between border-b pb-2 mb-2">
          <p>Inbox</p>

          <div className="flex text-[12px] items-center bg-slate-100 gap-2 p-1">
            <p className="cursor-pointer py-1 px-2 rounded-sm bg-gray-200">
              All Mail
            </p>
            <p className="cursor-pointer ">Unread</p>
          </div>
        </div>

        <div className="w-[98.7%] h-[45px] border rounded-md items-center flex justify-between px-2">
          <MdSearch className="text-gray-500 mx-2 text-[20px]" />
          <input
            className=" bg-transparent flex-1 outline-none border-0 font-extralight"
            placeholder="search"
          />
        </div>

        <div className="w-[98.7%] mt-10">
          {readData.length === 0 ? (
            <div className="w-full flex-col items-center flex mt-20">
              <div>
                <MdCheckCircle />
              </div>
              <div>No Mail Yet</div>
            </div>
          ) : (
            <div>
              {readData?.map((el: any, i: number) => (
                <div
                  onClick={() => {
                    setID(el._id);
                  }}
                  key={i}
                  className="w-full flex flex-col p-2 min-h-[200px] border rounded-md hover:bg-gray-100 duration-300 my-2 transition-all cursor-pointer"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-5 ">
                      <p className="">
                        <Profile />
                      </p>
                      {el?.read?.some(
                        (props: any) =>
                          props !== userID && (
                            <div>
                              <div className="w-2 h-2 rounded-full bg-red-500" />
                            </div>
                          )
                      )}

                      <div>
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                      </div>
                    </div>
                    <p className="text-[12px] text-gray-500 font-semibold">
                      {moment(el?.createdAt).format("lll")}
                    </p>
                  </div>
                  <p className="text-[14px] my-2 text-[gray]">Title</p>
                  <div className="flex-1 text-[12px] text-gray-500">
                    <div dangerouslySetInnerHTML={{ __html: el?.message }} />
                  </div>

                  <div className="flex text-[12px] capitalize gap-4">
                    <p className="px-4 py-1 text-white  rounded-sm bg-red-600">
                      {el.tag}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostContent;
