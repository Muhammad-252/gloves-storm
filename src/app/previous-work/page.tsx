import { Metadata } from "next";
import { getProjects, getCategories } from "@/lib/data/store";
import PreviousWorkClient from "@/components/previous-work/PreviousWorkClient";

export const metadata: Metadata = {
  title: "Previous Work & Production Archive | GLOVES STORM",
  description:
    "Explore our factory archive of custom boxing equipment, sublimated sportswear, combat gear, and luxury streetwear manufactured for international brands.",
  alternates: {
    canonical: "/previous-work",
  },
  openGraph: {
    title: "Previous Work & Production Archive | GLOVES STORM",
    description:
      "Inspect real factory production runs, precision stitching close-ups, and export dispatches direct from our Sialkot manufacturing plant.",
    url: "https://glovesstorm.com/previous-work",
  },
};

export const revalidate = 60; // ISR revalidation

export default async function PreviousWorkPage() {
  const [projects, categories] = await Promise.all([
    getProjects(false),
    getCategories(),
  ]);

  return <PreviousWorkClient initialProjects={projects} categories={categories} />;
}
