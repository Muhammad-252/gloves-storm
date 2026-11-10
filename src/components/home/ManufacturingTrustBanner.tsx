import { BUSINESS_CONFIG } from "@/lib/business";

const credentials = [
  "Direct factory, no middlemen",
  `From ${BUSINESS_CONFIG.moqShort} per style`,
  `Samples in ${BUSINESS_CONFIG.samplingDaysShort}`,
  "Tajima embroidery",
  "Italian Kiian sublimation",
  "AQL 2.5 inspection",
  "DDP delivery on request",
];

export default function ManufacturingTrustBanner() {
  // Rendered twice so the marquee loops seamlessly
  const items = [...credentials, ...credentials];

  return (
    <div className="relative overflow-hidden border-y border-line py-5 sm:py-7" aria-label="Manufacturing capabilities">
      <div className="flex w-max animate-marquee">
        {items.map((item, index) => (
          <span
            key={index}
            aria-hidden={index >= credentials.length}
            className="flex items-center gap-6 sm:gap-10 pr-6 sm:pr-10 text-xl sm:text-3xl tracking-[-0.03em] text-ink whitespace-nowrap"
          >
            <span className={index % 2 === 0 ? "font-medium" : "accent-serif text-ink/70"}>{item}</span>
            <span className="w-2 h-2 rounded-full bg-[#FFB900] shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
