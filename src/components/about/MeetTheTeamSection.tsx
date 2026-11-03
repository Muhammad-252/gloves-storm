import Image from "next/image";
import { User } from "lucide-react";
import { BUSINESS_CONFIG } from "@/lib/business";

export default function MeetTheTeamSection() {
  const team = BUSINESS_CONFIG.teamMembers;
  // Hidden until filled by the business owner
  if (!team || team.length === 0) {
    return null;
  }

  return (
    <section className="mb-16 sm:mb-24">
      <div className="max-w-2xl mb-8 sm:mb-12">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-slate-500 font-mono block mb-2 font-bold">
          Factory Leadership
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3 sm:mb-4 uppercase">
          Meet the production &amp; export team
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The engineers, pattern masters, and export directors responsible for delivering your apparel orders on schedule and to exact specifications.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member: any, index: number) => (
          <div
            key={index}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all"
          >
            <div className="relative aspect-[4/5] w-full rounded-xl bg-slate-100 overflow-hidden mb-4 border border-slate-200/60 flex items-center justify-center">
              {member.photoUrl ? (
                <Image
                  src={member.photoUrl}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-slate-400" />
              )}
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              {member.name}
            </h3>
            <span className="text-xs font-mono text-[#FFB900] font-bold block mb-2">
              {member.role}
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
