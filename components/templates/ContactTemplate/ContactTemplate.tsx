"use client";

import ContactInfo from "@/components/sections/contact/ContactInfo";
import SendMessege from "@/components/sections/contact/SendMessege";
import HeaderSection from "@/components/shared/HeaderSection";

const ContactTemplate = () => {
  return (
    <div>
      <HeaderSection title="Contact" />
      <ContactInfo />
      <SendMessege />
    </div>
  );
};

export default ContactTemplate;
