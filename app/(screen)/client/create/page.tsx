"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const page = () => {
  const user = useUser();
  const [value, setValue] = useState<string>("");
  const [tag, setTag] = useState<string>("work");

  const ID = user?.user?.publicMetadata?.userId;
  const fetchData = async (formData: FormData) => {
    const url = "http://localhost:3000/api";

    const title = formData.get("title");

    await fetch(`${url}/${ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, tag, message: value }),
    }).then(() => {
      return redirect("/client/inbox");
    });

    revalidateTag("mail");
  };

  return (
    <div>
      <div className="mt-10 mb-8 pb-6 border-b">Create a Message</div>

      <form action={fetchData}>
        <div className="flex flex-col w-full mb-3">
          <label className="text-[13px]  ">Message Title</label>
          <input
            className="border rounded-md h-[45px] w-full bg-transparent text-[13px] pl-2"
            placeholder="Message Title"
            type="text"
            name="title"
          />
        </div>
        <div className="flex flex-col w-full mb-3">
          <label className="text-[13px]">Message Tag</label>
          <select
            className="border rounded-md h-[45px] w-full bg-transparent text-[13px] pl-2 max-w-[200px]"
            value={tag}
            onChange={(e: any) => {
              setTag(e.target.value);
            }}
          >
            <option value={""} disabled>
              Select One
            </option>
            <option value={"work"}>Work</option>
            <option value={"casual"}>Casual</option>
            <option value={"important"}>Important</option>
          </select>
        </div>

        <ReactQuill theme="snow" value={value} onChange={setValue} />

        <Button type="submit" variant="default" className="mt-10">
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default page;
