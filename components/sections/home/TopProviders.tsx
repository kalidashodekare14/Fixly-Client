"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import providerData from "../../../data/providers.json";
import type { Provider } from "../../../types/Providers";

// -------------------- Provider Card Component -------------------
const ProviderCard = ({ provider }: { provider: Provider }) => {
  return (
    <div className="border p-5 rounded-2xl">
      {/* Header: Image + Name +  Location */}
      <div className="flex items-center gap-3 border-b border-[#c5c5c5bb] p-4">
        <Image
          className="w-18 h-18 rounded-full"
          src={provider.image}
          width={500}
          height={300}
          alt={provider.name}
        />
        <div>
          <h3 className="font-bold text-[18px]">{provider.name}</h3>
          <p className="text-charcoal text-[15px]">{provider.location}</p>
        </div>
      </div>
      {/* Main: Services + Rating + Job done */}
      <div className="border-b border-[#c5c5c5bb] py-3">
        {/* Service */}
        <div className="flex flex-wrap gap-3">
          {provider.services.map((service, index) => (
            <p
              className="border px-3 py-0.75 rounded-full text-charcoal text-[15px]"
              key={index}
            >
              {service}
            </p>
          ))}
        </div>
        {/* Rating and Jobs Done */}
        <div className="flex items-center gap-5 mt-3 text-[15px]">
          <div>
            <h3>Rating</h3>
            <div className="flex items-center gap-1 text-charcoal">
              <FaStar className="text-[#ddb60a]" />
              <p>{provider.rating}</p>
            </div>
          </div>
          <div>
            <h3>Jobs done</h3>
            <p className="text-charcoal">{provider.job_done}</p>
          </div>
        </div>
      </div>
      {/* Footer: Price + Hire Button */}
      <div className="flex justify-between items-center mt-5">
        <p>${provider.price}</p>
        <button className="bg-pink cursor-pointer text-white px-4 py-2 rounded-2xl">
          Hire me
        </button>
      </div>
    </div>
  );
};

const TopProviders = () => {
  const providers: Provider[] = providerData;

  return (
    <div className="2xl:w-350 xl:w-310 lg:w-260 w-full m-auto px-5 lg:-px-0 pt-20">
      {/* Section header */}
      <div className="space-y-3">
        <p className="text-pink">Top Providers</p>
        <h1 className="text-3xl font-bold">Highly rated professionals</h1>
        <p className="text-charcoal">
          Browse verified service providers, check their ratings and reviews,
          and hire directly.
        </p>
      </div>
      {/* Provider Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 gap-5 mt-10">
        {providers.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
    </div>
  );
};

export default TopProviders;
