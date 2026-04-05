"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const SendMessege = () => {
  return (
    <div className="2xl:w-350 xl:w-310 lg:w-260 w-full m-auto my-10 flex justify-center items-center">
      {/* Left: Images */}
      <div className="w-[50%]">
        <Image
          className="rounded-3xl w-100 h-110"
          src={"/contact/img1.jpeg"}
          width={500}
          height={300}
          alt="Image"
        />
      </div>
      {/* Right: Input filed => Name, Email, Messege, Submit */}
      <div className="w-[60%] border h-80 p-5">
        <div className="flex items-center gap-5 w-full mb-5">
          <Input className="p-5 w-full" placeholder="Name" />
          <Input className="p-5 w-full" placeholder="Email" />
        </div>
        <Textarea className="h-30" placeholder="Messege" />
        <div className="flex justify-center items-center mt-5">
          <Button
            className="w-80 h-12 cursor-pointer bg-pink text-white"
            variant="outline"
          >
            Button
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SendMessege;
