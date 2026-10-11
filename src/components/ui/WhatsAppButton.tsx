"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "./SocialIcons";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export default function WhatsAppButton({
  phoneNumber = "+923417146935",
  defaultMessage = "Hi Gloves Storm, I'm interested in custom apparel manufacturing and would like to discuss a project.",
}: WhatsAppButtonProps) {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  const encodedMsg = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  return (
    <aside aria-label="Direct WhatsApp Contact" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat directly on WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.5)] transition-all transform hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        <WhatsAppIcon className="w-7 h-7 sm:w-7.5 sm:h-7.5 fill-current" />
      </a>
    </aside>
  );
}
