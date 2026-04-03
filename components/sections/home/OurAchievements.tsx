"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const OurAchievements = () => {
  return (
    <div className="2xl:w-350 xl:w-310 lg:w-260 w-full m-auto px-5 lg:px-0 flex lg:flex-row flex-col items-center  gap-10 py-10 lg:h-130">
      {/* left side info */}
      <div className="xl:w-[55%] lg:w-[50%] space-y-5">
        <p className="text-[#E9237E] font-semibold">Our Achievements</p>
        <h1 className="text-3xl font-bold">
          How do I know the service provider is verified?
        </h1>
        <p className="text-[#4e4e4e]">
          All service providers are verified through our quality checks and
          community reviews.
        </p>
        <div>
          <Accordion defaultValue={["shipping"]} className="w-full">
            <AccordionItem value="shipping">
              <AccordionTrigger
                className={"hover:no-underline focus:no-underline text-[16px]"}
              >
                Can I trust the 5-star ratings?
              </AccordionTrigger>
              <AccordionContent>
                Yes! Ratings are based on real customer feedback from completed
                orders.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger
                className={"hover:no-underline focus:no-underline text-[16px]"}
              >
                What is “Friendly Shop”?
              </AccordionTrigger>
              <AccordionContent>
                Friendly Shop represents providers who offer reliable,
                approachable, and customer-focused services.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="support">
              <AccordionTrigger
                className={"hover:no-underline focus:no-underline text-[16px]"}
              >
                How can I ask a question before ordering?
              </AccordionTrigger>
              <AccordionContent>
                You can use the Question & Answer section to directly message
                the provider before placing an order.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      {/* right side info */}
      <div className="xl:w-[45%] lg:w-[50%] grid grid-cols-2 xl:grid-cols-2 lg:grid-cols-2  bg-[#ffdcec] p-5 rounded-2xl">
        <div className="flex flex-col justify-center items-center gap-2 p-5 border-r border-b border-[#bbb]">
          <h1 className="text-3xl font-bold text-[#e9237e]">5000+</h1>
          <p className="text-[#4e4e4e] text-xl">Service Providers</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 p-5 border-b border-[#bbb]">
          <h1 className="text-3xl font-bold text-[#e9237e]">10000+</h1>
          <p className="text-[#4e4e4e] text-xl">Order Served</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 p-5 border-r border-[#bbb]">
          <h1 className="text-3xl font-bold text-[#e9237e]">3000+</h1>
          <p className="text-[#4e4e4e] text-xl">5 Star Received</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 p-5">
          <h1 className="text-3xl font-bold text-[#e9237e]">5000+</h1>
          <p className="text-[#4e4e4e] text-xl">Friendly Shop</p>
        </div>
      </div>
    </div>
  );
};

export default OurAchievements;
