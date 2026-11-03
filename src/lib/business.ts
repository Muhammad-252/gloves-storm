// Single Source of Truth for Business Information
// Gloves Storm — B2B Custom Apparel & Sportswear Manufacturer

export const BUSINESS_CONFIG = {
  name: "Gloves Storm",
  legalName: "Gloves Storm",
  tagline: "Custom Apparel & Sportswear Manufacturer",

  // TODO-CONFIRM: Confirm exact minimum order quantity with owner (currently set to 30 pieces per style)
  moq: 30,
  moqText: "30 pieces per style",
  moqShort: "30 pcs",

  // TODO-CONFIRM: Confirm sample turnaround time with owner (currently set to 5–7 working days)
  sampleLeadTime: "5–7 working days",
  samplingDaysShort: "5–7 days",

  // TODO-CONFIRM: Confirm bulk production timeline with owner (currently set to 12–18 working days)
  bulkLeadTime: "12–18 working days",
  bulkDaysShort: "12–18 days",

  // Contact Information
  // TODO-CONFIRM: Switch to a domain address (e.g. sales@glovesstorm.com) once that mailbox exists.
  // Inquiry notifications are delivered separately (see lib/email/sendInquiryEmail.ts).
  email: "glovesstorm@gmail.com",
  phone: "+92-341-7146935",
  phoneDisplay: "+92 341 7146935",
  phoneRaw: "+923417146935",
  whatsapp: "+923417146935",
  whatsappUrl:
    "https://wa.me/923417146935?text=Hi%20Gloves%20Storm%2C%20I'm%20interested%20in%20custom%20manufacturing%20and%20would%20like%20to%20discuss%20a%20project.",

  // Physical Factory Location
  address: {
    street: "Industrial Estate",
    city: "Sialkot",
    state: "Punjab",
    region: "Punjab",
    postalCode: "51310",
    country: "PK",
    countryName: "Pakistan",
    full: "Industrial Estate, Sialkot 51310, Punjab, Pakistan",
    mapUrl: "https://maps.google.com/?q=Sialkot+Industrial+Estate",
  },

  // Operating Hours
  operatingHours: {
    days: "Mon - Sat",
    hours: "08:00 - 18:00 PKT (UTC +5)",
    opens: "08:00",
    closes: "18:00",
  },

  // Social Channels
  social: {
    instagram: "https://www.instagram.com/glovesstorm/",
    linkedin: "https://www.linkedin.com/company/gloves-storm/",
    facebook: "https://facebook.com/glovesstorm",
  },

  // Certifications list (Empty by default until owner provides verified documentation)
  // TODO-CONFIRM: Provide verified factory certifications (e.g. ISO 9001, OEKO-TEX Standard 100, BSCI, WRAP, SEDEX)
  certifications: [] as Array<{
    name: string;
    issuer: string;
    year?: string;
    badgeUrl?: string;
  }>,

  // Testimonials list (Empty by default until real verified client reviews exist)
  // TODO-CONFIRM: Provide authentic customer reviews & testimonials with explicit client permission
  testimonials: [] as Array<{
    id: string;
    quote: string;
    author: string;
    role: string;
    company: string;
    country: string;
    rating: number;
    avatarUrl?: string;
  }>,

  // Team members list for About page (Empty by default until real team info and photos provided)
  // TODO-CONFIRM: Provide actual team leadership member names, roles, and headshots for the About page
  teamMembers: [] as Array<{
    name: string;
    role: string;
    bio: string;
    photoUrl?: string;
  }>,
} as const;

export default BUSINESS_CONFIG;
