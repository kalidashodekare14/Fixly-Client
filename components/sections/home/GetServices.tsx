"use client";

import Image from "next/image";
import { useState } from "react";

const GetServices = () => {
  const [toggle, setToggle] = useState<string>("customar");

  // Handle customar and provider toggle
  const handleToggle = (value: string) => {
    if (value === "customar") {
      setToggle("customar");
    }
    if (value === "provider") {
      setToggle("provider");
    }
  };

  return (
    <div className="2xl:w-350 xl:w-310 lg:w-260 w-full m-auto px-5 lg:px-0 lg:h-230 pb-10">
      {/* section header */}
      <div className="space-y-3 mb-10">
        <p>How it works</p>
        <h1 className="text-3xl font-bold">Two ways to get help</h1>
        <p>
          Whether you want to receive competing offers or hire directly, Fixly
          makes it easy.
        </p>
      </div>
      <div className="flex lg:flex-row flex-col justify-center items-center gap-10 w-full">
        {/* left side info */}
        <div className="lg:w-[50%] space-y-5">
          <div>
            {/* buttons */}
            <div className="flex items-center gap-5 my-5">
              <button
                onClick={() => handleToggle("customar")}
                className={`${toggle === "customar" && "text-white bg-pink"} px-5 py-2 rounded-2xl text-black border border-pink cursor-pointer`}
              >
                For Customers
              </button>
              <button
                onClick={() => handleToggle("provider")}
                className={`${toggle === "provider" && "text-white bg-pink"} px-5 py-2 rounded-2xl text-black border border-pink cursor-pointer`}
              >
                For Services Providers
              </button>
            </div>
          </div>
          {/* Toggle customar and provider */}
          {toggle === "customar" && (
            <div className="space-y-5">
              <div className="border p-5 rounded-2xl space-y-2">
                <div className="flex items-end gap-3">
                  <h1 className="text-4xl font-semibold text-pink">01</h1>
                  <h3 className="text-xl font-bold">Send Post Request</h3>
                </div>
                <p className="text-charcoal">
                  Post a service request with job details, your location, and
                  estimated budget. Takes under 2 minutes.
                </p>
              </div>
              <div className="border p-5 rounded-2xl space-y-2">
                <div className="flex items-end gap-3">
                  <h1 className="text-4xl font-semibold text-pink">02</h1>
                  <h3 className="text-xl font-bold">Receive offers</h3>
                </div>
                <p className="text-charcoal">
                  Nearby verified providers review your request and submit
                  competitive offers with pricing and availability.
                </p>
              </div>
              <div className="border p-5 rounded-2xl space-y-2">
                <div className="flex items-end gap-3">
                  <h1 className="text-4xl font-semibold text-pink">03</h1>
                  <h3 className="text-xl font-bold">Compare & choose</h3>
                </div>
                <p className="text-charcoal">
                  Compare offers side by side — price, ratings, past work. Pick
                  the provider who best fits your needs.
                </p>
              </div>
              <div className="border p-5 rounded-2xl space-y-2">
                <div className="flex items-end gap-3">
                  <h1 className="text-4xl font-semibold text-pink">03</h1>
                  <h3 className="text-xl font-bold">Job done, review</h3>
                </div>
                <p className="text-charcoal">
                  Your provider completes the job. Pay securely through the
                  platform and leave an honest review.
                </p>
              </div>
            </div>
          )}
          {toggle === "provider" && (
            <div className="space-y-5">
              <div className="border p-5 rounded-2xl space-y-2">
                <div className="flex items-end gap-3">
                  <h1 className="text-4xl font-semibold text-pink">01</h1>
                  <h3 className="text-xl font-bold">Create your profile</h3>
                </div>
                <p className="text-charcoal">
                  Sign up, add your services, set your service area, and upload
                  your certifications and past work.
                </p>
              </div>
              <div className="border p-5 rounded-2xl space-y-2">
                <div className="flex items-end gap-3">
                  <h1 className="text-4xl font-semibold text-pink">02</h1>
                  <h3 className="text-xl font-bold">Get notified</h3>
                </div>
                <p className="text-charcoal">
                  Receive real-time alerts for new job requests in your area
                  matching your service categories.
                </p>
              </div>
              <div className="border p-5 rounded-2xl space-y-2">
                <div className="flex items-end gap-3">
                  <h1 className="text-4xl font-semibold text-pink">03</h1>
                  <h3 className="text-xl font-bold">Submit your offer</h3>
                </div>
                <p className="text-charcoal">
                  Respond with your price, timeline, and a short message about
                  your approach to win the job.
                </p>
              </div>
              <div className="border p-5 rounded-2xl space-y-2">
                <div className="flex items-end gap-3">
                  <h1 className="text-4xl font-semibold text-pink">03</h1>
                  <h3 className="text-xl font-bold">Complete & get paid</h3>
                </div>
                <p className="text-charcoal">
                  Do great work, collect payment, and build your reputation with
                  verified customer reviews.
                </p>
              </div>
            </div>
          )}
        </div>
        {/* right side image */}
        <div className="lg:w-[50%] lg:flex hidden">
          <Image
            className="rounded-2xl w-140 h-150"
            src={"/works/img1.jpg"}
            width={500}
            height={300}
            alt="Image"
          />
        </div>
      </div>
    </div>
  );
};

export default GetServices;
