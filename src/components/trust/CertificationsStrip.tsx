import Image from "next/image";
import { Award, ShieldCheck } from "lucide-react";
import { BUSINESS_CONFIG } from "@/lib/business";

export default function CertificationsStrip() {
  const certs = BUSINESS_CONFIG.certifications;
  // Renders only when the config lists certifications (empty by default)
  if (!certs || certs.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-white border-y border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 shrink-0">
            <Award className="w-5 h-5 text-[#FFB900]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900">
              Verified Factory Certifications
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            {certs.map((c: any, i: number) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200"
              >
                {c.badgeUrl ? (
                  <Image
                    src={c.badgeUrl}
                    alt={c.name}
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-neutral-700" />
                )}
                <div>
                  <span className="text-xs font-bold text-neutral-900 block">
                    {c.name}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {c.issuer} {c.year ? `• ${c.year}` : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
