"use client";

import { MdKeyboardArrowRight } from "react-icons/md";

const HeaderSection = ({ title }: { title: string }) => {
  return (
    <div className="bg-pastel_pink h-40 mb-5 flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex items-center gap-2 text-charcoal">
        <p>Home</p>
        <MdKeyboardArrowRight />
        <p>{title}</p>
      </div>
    </div>
  );
};

export default HeaderSection;
