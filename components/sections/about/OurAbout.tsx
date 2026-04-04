"use client";

import Image from "next/image";

const OurAbout = () => {
  return (
    <div className="2xl:w-350 xl:w-310 lg:w-260 w-full m-auto flex justify-center items-center gap-10 py-10">
      {/* Left: Images */}
      <div className="lg:w-[45%] relative">
        <Image
          className="w-full h-90 rounded-2xl"
          src={"/about/img1.jpg"}
          width={500}
          height={300}
          alt="Image1"
        />
      </div>
      {/* Right: About info */}
      <div className="lg:w-[55%] space-y-4">
        <h3 className="text-xl text-charcoal">About Our Company</h3>
        <h1 className="text-2xl font-bold">The Company is very trasted.</h1>
        <p className="text-charcoal">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis cumque
          porro, nam numquam qui consequuntur nisi odit quibusdam quas maiores
          illo in architecto necessitatibus dolore laborum, quam nostrum, iure
          distinctio ipsum eius. Tenetur sit quasi modi architecto corrupti odit
          nostrum commodi ipsum fuga dolore. Est consequuntur a aut sit nobis
          ducimus, laborum saepe consequatur autem accusamus? Sint perspiciatis
          similique vero reprehenderit natus libero repellendus possimus veniam
          qui velit obcaecati autem fugiat odit accusantium suscipit eaque
          consectetur quaerat culpa, quos quisquam.
        </p>
      </div>
    </div>
  );
};

export default OurAbout;
