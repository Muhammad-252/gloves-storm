import { Mail, MessageSquare } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "./SocialIcons";
import { whatsappHref, type PublicSiteSettings } from "@/lib/siteSettings";

interface SocialLinksProps {
  settings: PublicSiteSettings;
  /** Tailwind classes for each round icon button. */
  buttonClassName: string;
  iconClassName?: string;
  showEmail?: boolean;
}

// Renders only the channels that are filled in under Admin → Site Settings.
export default function SocialLinks({
  settings,
  buttonClassName,
  iconClassName = "w-4 h-4",
  showEmail = false,
}: SocialLinksProps) {
  const name = settings.company_name || "Gloves Storm";
  const links = [
    settings.instagram && {
      href: settings.instagram,
      label: `Follow ${name} on Instagram`,
      icon: <InstagramIcon className={iconClassName} />,
    },
    settings.linkedin && {
      href: settings.linkedin,
      label: `Connect with ${name} on LinkedIn`,
      icon: <LinkedInIcon className={iconClassName} />,
    },
    settings.facebook && {
      href: settings.facebook,
      label: `Follow ${name} on Facebook`,
      icon: <FacebookIcon className={iconClassName} />,
    },
    settings.youtube && {
      href: settings.youtube,
      label: `Watch ${name} on YouTube`,
      icon: <YouTubeIcon className={iconClassName} />,
    },
    settings.whatsapp && {
      href: whatsappHref(settings.whatsapp),
      label: `Chat with ${name} on WhatsApp`,
      icon: <MessageSquare className={iconClassName} />,
    },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[];

  return (
    <>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClassName}
          aria-label={link.label}
        >
          {link.icon}
        </a>
      ))}
      {showEmail && settings.email && (
        <a href={`mailto:${settings.email}`} className={buttonClassName} aria-label={`Email ${name}`}>
          <Mail className={iconClassName} />
        </a>
      )}
    </>
  );
}
