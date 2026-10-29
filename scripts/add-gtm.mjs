import fs from 'fs';
import path from 'path';

const layoutPath = path.join(process.cwd(), 'src', 'app', 'layout.tsx');
let content = fs.readFileSync(layoutPath, 'utf8');

// 1. Add import Script from "next/script"; if not present
if (!content.includes('import Script from "next/script";')) {
  content = content.replace(
    'import WhatsAppButton from "@/components/ui/WhatsAppButton";',
    'import WhatsAppButton from "@/components/ui/WhatsAppButton";\r\nimport Script from "next/script";'
  );
}

// 2. Add GTM scripts in <head>
const gtmHeadSnippet = `        {/* Google Tag Manager */}
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-MRDB4P5J"
          strategy="afterInteractive"
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {\`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          \`}
        </Script>
      </head>`.replace(/\n/g, '\r\n');

if (!content.includes('GTM-MRDB4P5J')) {
  content = content.replace('      </head>', gtmHeadSnippet);
}

// 3. Add noscript iframe in <body>
const gtmBodyNoscript = `      <body
        className="min-h-full flex flex-col bg-[#F8FAFC] text-slate-900 relative"
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MRDB4P5J"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>`.replace(/\n/g, '\r\n');

const bodyTarget = `      <body
        className="min-h-full flex flex-col bg-[#F8FAFC] text-slate-900 relative"
        suppressHydrationWarning
      >`.replace(/\n/g, '\r\n');

if (!content.includes('ns.html?id=GTM-MRDB4P5J')) {
  content = content.replace(bodyTarget, gtmBodyNoscript);
}

fs.writeFileSync(layoutPath, content, 'utf8');
console.log("✅ Successfully added Google Tag Manager (GTM-MRDB4P5J) to src/app/layout.tsx!");
