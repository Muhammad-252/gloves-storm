import React from "react";

export function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.9 12.03 8.02 12.19C8.14 12.35 9.74 14.83 12.19 15.89C12.77 16.14 13.23 16.29 13.58 16.4C14.17 16.59 14.71 16.56 15.13 16.5C15.61 16.43 16.6 15.9 16.81 15.31C17.02 14.72 17.02 14.22 16.96 14.11C16.9 14 16.74 13.94 16.5 13.82C16.26 13.7 15.08 13.12 14.86 13.04C14.64 12.96 14.48 12.92 14.32 13.16C14.16 13.4 13.7 13.94 13.56 14.11C13.42 14.27 13.28 14.29 13.04 14.17C12.8 14.05 11.83 13.73 10.68 12.71C9.79 11.91 9.18 10.93 9.06 10.73C8.94 10.53 9.05 10.42 9.17 10.3C9.28 10.19 9.42 10.01 9.54 9.87C9.66 9.73 9.7 9.63 9.78 9.47C9.86 9.31 9.82 9.17 9.76 9.05C9.7 8.93 9.24 7.8 9.05 7.33C8.86 6.88 8.67 6.94 8.53 6.93L8.1 6.93C7.94 6.93 7.68 6.99 7.45 7.24Z" />
    </svg>
  );
}
