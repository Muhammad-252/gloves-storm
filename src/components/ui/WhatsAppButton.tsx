"use client";

import { usePathname } from "next/navigation";
import { MessageSquare } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export default function WhatsAppButton({
  phoneNumber = "+923417146935",
  defaultMessage = "Hi Gloves Storm, I'm interested in custom manufacturing and would like to discuss a project.",
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
    <aside aria-label="Quick Communication" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center gap-3 bg-white hover:bg-neutral-50 text-neutral-900 w-13 h-13 sm:w-auto sm:h-auto sm:pl-4 sm:pr-5 sm:py-3 rounded-full border border-neutral-200 hover:border-[#25D366]/60 shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all transform hover:-translate-y-1 active:scale-95"
        aria-label="Contact GLOVES STORM via WhatsApp"
      >
        {/* Pulsing indicator */}
        <span className="absolute top-1 right-1 sm:static flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]" />
        </span>

        {/* WhatsApp Icon */}
        <div className="w-6 h-6 flex items-center justify-center text-[#25D366]">
          <MessageSquare className="w-6 h-6 sm:w-5 sm:h-5 fill-current" />
        </div>

        {/* Label (hidden on small mobile, visible on sm and above) */}
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono leading-none">
            Direct Factory Chat
          </span>
          <span className="text-xs font-bold text-neutral-900 tracking-wide leading-tight group-hover:text-[#25D366] transition-colors">
            WhatsApp Us
          </span>
        </div>
      </a>
    </aside>
  );
}
