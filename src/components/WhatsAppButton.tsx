"use client";

import { client } from "@/data/client";

export function WhatsAppButton() {
  if (!client.whatsapp) return null;

  const number = (client.whatsapp as string).replace(/[^0-9]/g, "");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group pointer-events-none">
      {/* Tooltip — hidden on touch devices, fades in on desktop hover */}
      <div
        aria-hidden="true"
        className="
          hidden sm:flex
          items-center
          pointer-events-none
          opacity-0 translate-x-2
          group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-200 ease-out
          relative
        "
      >
        <span className="
          bg-white text-gray-800 text-sm font-medium
          px-3 py-2 rounded-lg shadow-md whitespace-nowrap
        ">
          Jetzt auf WhatsApp schreiben
        </span>
        {/* Arrow pointing right toward the button */}
        <span className="
          w-0 h-0 shrink-0
          border-t-[6px] border-t-transparent
          border-b-[6px] border-b-transparent
          border-l-[7px] border-l-white
        " />
      </div>

      {/* Button */}
      <a
        href={`https://wa.me/${number}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Per WhatsApp kontaktieren"
        className="pointer-events-auto flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50 shrink-0"
        style={{ backgroundColor: "#25D366" }}
      >
        {/* Official WhatsApp logo mark */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 175.216 175.552"
          className="w-8 h-8"
          aria-hidden="true"
          fill="white"
        >
          <path d="M87.4 0C39.1 0 0 39.1 0 87.4c0 15.3 4 29.7 11 42.2L0 175.6l47.5-11.1c12 6.4 25.6 10 40 10 48.3 0 87.4-39.1 87.4-87.4S135.7 0 87.4 0zm0 159.4c-13.5 0-26.1-3.7-36.9-10.2l-2.6-1.6-27.3 6.4 6.2-26.6-1.7-2.7C18.8 114 15 101 15 87.4 15 47.4 47.4 15 87.4 15c19.8 0 38.4 7.7 52.4 21.7 14 14 21.7 32.6 21.7 52.4-.1 40-32.5 72.3-74.1 72.3zm39.7-54.1c-2.2-1.1-12.9-6.4-14.9-7.1-2-.7-3.4-1.1-4.9 1.1-1.5 2.2-5.7 7.1-7 8.6-1.3 1.5-2.6 1.7-4.8.6-2.2-1.1-9.2-3.4-17.5-10.8-6.5-5.8-10.8-12.9-12.1-15.1-1.3-2.2-.1-3.4 1-4.5.9-.9 2.2-2.5 3.3-3.7 1.1-1.2 1.5-2.1 2.2-3.5.7-1.5.4-2.7-.2-3.8-.6-1.1-4.9-11.8-6.7-16.1-1.8-4.2-3.5-3.7-4.9-3.8-1.3 0-2.7-.1-4.2-.1s-3.8.6-5.8 2.7c-2 2.2-7.5 7.3-7.5 17.9s7.7 20.7 8.7 22.2c1.1 1.5 15.2 23.2 36.8 32.5 5.1 2.2 9.1 3.5 12.2 4.5 5.1 1.6 9.8 1.4 13.5.8 4.1-.6 12.9-5.3 14.7-10.4 1.8-5.1 1.8-9.4 1.3-10.4-.6-.9-2-1.5-4.2-2.6z" />
        </svg>
      </a>
    </div>
  );
}
