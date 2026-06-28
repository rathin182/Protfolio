"use client";

import { Send } from "lucide-react";
import ContactInput from "./ContactInput";
import SendButton from "./SendButton";

export default function ContactForm() {
  return (
    <form
      className="
        mt-10
        flex
        max-w-[520px]
        flex-col
        gap-5
      "
    >
      {/* Name */}

      <ContactInput
        type="text"
        placeholder="Your Name"
      />

      {/* Email */}

      <ContactInput
        type="email"
        placeholder="Your Email"
      />

      {/* Message */}

      <textarea
        rows={5}
        placeholder="Your Message"
        className="
          w-full
          resize-none
          rounded-xl
          border
          border-[#39ff5a]/10
          bg-[#071018]/70
          px-5
          py-4
          text-[15px]
          text-white
          placeholder:text-white/30
          outline-none
          transition-all
          duration-300
          backdrop-blur-xl

          hover:border-[#39ff5a]/20

          focus:border-[#39ff5a]/50
          focus:shadow-[0_0_18px_rgba(57,255,90,.15)]
        "
      />

      {/* Button */}

      <div className="pt-3">
        <SendButton>
          <span>Send Message</span>

          <Send
            size={16}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </SendButton>
      </div>
    </form>
  );
}