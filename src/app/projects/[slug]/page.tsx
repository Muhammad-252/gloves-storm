import { redirect } from "next/navigation";
import type { Metadata } from "next";

// This page redirects to /previous-work — tell search engines not to index it
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ProjectSlugRedirectPage() {
  redirect("/previous-work");
}
