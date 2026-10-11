import { redirect } from "next/navigation";
import type { Metadata } from "next";

// This page just redirects to /previous-work — tell Google not to index it
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ProjectsRedirectPage() {
  redirect("/previous-work");
}
