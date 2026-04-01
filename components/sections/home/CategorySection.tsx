import { motion } from "motion/react";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

const CategorySection = () => {
  return (
    <div className="lg:w-300 m-auto h-160">
      {/* Header info */}
      <div className="flex items-end justify-between">
        <div className="w-110  space-y-5">
          <p className="text-[#F72585]">Top categories</p>
          <h1 className="text-4xl font-bold">Browse by service type</h1>
          <p className="text-[#4e4e4e]">
            From quick fixes to major renovations — find specialists in every
            home service category.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[#F72585]">
          <p className="cursor-pointer">See more</p>
          <FaArrowRightLong />
        </div>
      </div>
      {/* Services */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5 my-10">
        <motion.div
          whileHover={{
            y: -5,
            boxShadow: "3px 3px 10px #bbbb",
          }}
          transition={{
            duration: 0.2,
          }}
          className="flex flex-col justify-center items-center rounded-xl"
        >
          <Image
            className="w-full h-36 rounded-t-xl"
            src={"/category/electrician.jpg"}
            width={500}
            height={300}
            alt="Electrician"
          />
          <div className="bg-[#F72585] p-3 w-full text-center text-[16px] text-white rounded-b-xl">
            <h1 className="">Electrician</h1>
          </div>
        </motion.div>
        <motion.div
          whileHover={{
            y: -5,
            boxShadow: "3px 3px 10px #bbbb",
          }}
          transition={{
            duration: 0.2,
          }}
          className="flex flex-col justify-center items-center"
        >
          <Image
            className="w-full h-36 rounded-t-xl"
            src={"/category/plumber.jpg"}
            width={500}
            height={300}
            alt="Electrician"
          />
          <div className="bg-[#F72585] p-3 w-full text-center text-[16px] text-white rounded-b-xl">
            <h1 className="">Plumber</h1>
          </div>
        </motion.div>
        <motion.div
          whileHover={{
            y: -5,
            boxShadow: "3px 3px 10px #bbbb",
          }}
          transition={{
            duration: 0.2,
          }}
          className="flex flex-col justify-center items-center"
        >
          <Image
            className="w-full h-36 rounded-t-xl"
            src={"/category/painter.jpg"}
            width={500}
            height={300}
            alt="Electrician"
          />
          <div className="bg-[#F72585] p-3 w-full text-center text-[16px] text-white rounded-b-xl">
            <h1 className="">Painter</h1>
          </div>
        </motion.div>
        <motion.div
          whileHover={{
            y: -5,
            boxShadow: "3px 3px 10px #bbbb",
          }}
          transition={{
            duration: 0.2,
          }}
          className="flex flex-col justify-center items-center"
        >
          <Image
            className="w-full h-36 rounded-t-xl"
            src={"/category/cleaner.jpg"}
            width={500}
            height={300}
            alt="Electrician"
          />
          <div className="bg-[#F72585] p-3 w-full text-center text-[16px] text-white rounded-b-xl">
            <h1 className="">Cleaner</h1>
          </div>
        </motion.div>
        <motion.div
          whileHover={{
            y: -5,
            boxShadow: "3px 3px 10px #bbbb",
          }}
          transition={{
            duration: 0.2,
          }}
          className="flex flex-col justify-center items-center"
        >
          <Image
            className="w-full h-36 rounded-t-xl"
            src={"/category/security.jpg"}
            width={500}
            height={300}
            alt="Electrician"
          />
          <div className="bg-[#F72585] p-3 w-full text-center text-[16px] text-white rounded-b-xl">
            <h1 className="">Security</h1>
          </div>
        </motion.div>
        <motion.div
          whileHover={{
            y: -5,
            boxShadow: "3px 3px 10px #bbbb",
          }}
          transition={{
            duration: 0.2,
          }}
          className="flex flex-col justify-center items-center"
        >
          <Image
            className="w-full h-36 rounded-t-xl"
            src={"/category/carpenter.jpg"}
            width={500}
            height={300}
            alt="Electrician"
          />
          <div className="bg-[#F72585] p-3 w-full text-center text-[16px] text-white rounded-b-xl">
            <h1 className="">Carpenter</h1>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CategorySection;
