import { unstable_cache } from "next/cache";
import { getDbSiteSettings } from "@/lib/data/fileDb";

export const SITE_SETTINGS_TAG = "site-settings";

// What the public site is allowed to see from admin Settings. Never includes
// the Instagram access token or widget code.
export interface PublicSiteSettings {
  company_name: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  instagram: string | null;
  facebook: string | null;
  linkedin: string | null;
  youtube: string | null;
}

// Cached across requests so pages stay static/ISR; the settings API clears
// the tag on every save, so admin changes show on the next page load.
export const getPublicSiteSettings = unstable_cache(
  async (): Promise<PublicSiteSettings> => {
    const s = await getDbSiteSettings();
    return {
      company_name: s.company_name,
      email: s.email,
      phone: s.phone,
      whatsapp: s.whatsapp,
      address: s.address,
      instagram: s.instagram || null,
      facebook: s.facebook || null,
      linkedin: s.linkedin || null,
      youtube: s.youtube || null,
    };
  },
  ["public-site-settings"],
  { tags: [SITE_SETTINGS_TAG], revalidate: 3600 }
);

export const digitsOnly = (value: string) => value.replace(/[^0-9]/g, "");

export const telHref = (phone: string) => `tel:+${digitsOnly(phone)}`;

export const whatsappHref = (number: string, message?: string) =>
  `https://wa.me/${digitsOnly(number)}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const mapsHref = (address: string) =>
  `https://maps.google.com/?q=${encodeURIComponent(address)}`;
