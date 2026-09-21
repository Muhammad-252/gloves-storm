import { Metadata } from "next";
import PreviousWorkClient from "@/components/previous-work/PreviousWorkClient";

export const metadata: Metadata = {
  title: "Previous Work & Client Production Archive (@glovesstorm) | GLOVES STORM",
  description:
    "Explore our official Instagram archive of custom boxing equipment, combat gear, and heavyweight streetwear manufactured for international brands and athletes.",
  alternates: {
    canonical: "/previous-work",
  },
  openGraph: {
    title: "Previous Work & Client Production Archive | GLOVES STORM",
    description:
      "Watch real client production runs, unboxings, Tajima embroidery close-ups, and export dispatches direct from our Sialkot manufacturing plant.",
    url: "https://glovesstorm.com/previous-work",
  },
};

export default function PreviousWorkPage() {
  return <PreviousWorkClient />;
}
