import nodemailer, { type Transporter } from "nodemailer";
import { Inquiry } from "@/types/database";

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  reason?: string;
}

const DEFAULT_RECIPIENT = "glovesstorm@gmail.com";

/**
 * Creates a configured Nodemailer transporter based on available environment variables.
 */
function getTransporter(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER || process.env.GMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

  // If no password or token is provided, SMTP cannot authenticate
  if (!pass) {
    return null;
  }

  if (host) {
    return nodemailer.createTransport({
      host,
      port: port || 465,
      secure: process.env.SMTP_SECURE === "true" || port === 465 || !port,
      auth: {
        user: user || DEFAULT_RECIPIENT,
        pass,
      },
    });
  }

  // Default to standard Gmail service transport
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user || DEFAULT_RECIPIENT,
      pass,
    },
  });
}

/**
 * Generates an executive HTML template for the factory notification email.
 */
function buildInquiryHtml(inquiry: Partial<Inquiry>): string {
  const customerName = inquiry.name || "Prospective Client";
  const customerEmail = inquiry.email || "N/A";
  const customerPhone = inquiry.phone || "N/A";
  const company = inquiry.company || inquiry.brand_name || "N/A";
  const country = inquiry.country || "International";
  const productCategory = inquiry.product_category || "Custom Manufacturing";
  const productName = inquiry.product_name || "Unspecified Garment";
  const quantity = inquiry.estimated_quantity ? `${inquiry.estimated_quantity} Units` : "Custom / Sample";
  const timeline = inquiry.target_delivery_date || inquiry.timeline || "Standard production slot";
  const message = inquiry.message || "No additional comments provided.";
  const techPack = inquiry.tech_pack_url;
  const files = inquiry.reference_files && inquiry.reference_files.length > 0
    ? inquiry.reference_files.join(", ")
    : null;

  const customSpecs = inquiry.customization_details;
  let customSpecsHtml = "";
  if (customSpecs && typeof customSpecs === "object") {
    const rows = Object.entries(customSpecs)
      .filter(([_, val]) => val && typeof val === "string" && val.trim().length > 0)
      .map(([key, val]) => `
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #475569; text-transform: capitalize;">${key.replace(/_/g, " ")}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a;">${val}</td>
        </tr>
      `)
      .join("");

    if (rows) {
      customSpecsHtml = `
        <div style="margin-top: 24px;">
          <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #0f172a; border-left: 3px solid #f59e0b; padding-left: 8px;">Customization & Material Specs</h3>
          <table style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 8px; overflow: hidden;">
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      `;
    }
  }

  const cleanPhone = customerPhone.replace(/[^0-9+]/g, "");
  const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone.replace("+", "")}` : "";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Manufacturing Inquiry - Gloves Storm</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0f172a;">
  <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
    
    <!-- Top Header -->
    <div style="background-color: #0f172a; padding: 28px 32px; color: #ffffff;">
      <div style="display: inline-block; background-color: #f59e0b; color: #000000; font-size: 10px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px;">
        GLOVES STORM • FACTORY NOTIFICATION
      </div>
      <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.2; text-transform: uppercase;">
        New Manufacturing Inquiry
      </h1>
      <p style="margin: 6px 0 0; font-size: 13px; color: #94a3b8;">
        Received on ${new Date().toUTCString()} via website form.
      </p>
    </div>

    <div style="padding: 32px;">
      
      <!-- Buyer Information Section -->
      <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #0f172a; border-left: 3px solid #f59e0b; padding-left: 8px;">
          Buyer & Contact Information
        </h3>
        <table style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 8px; overflow: hidden;">
          <tbody>
            <tr>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #475569; width: 35%;">Client Name:</td>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 700; color: #0f172a;">${customerName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #475569;">Company / Brand:</td>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a;">${company}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #475569;">Direct Email:</td>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #2563eb;">
                <a href="mailto:${customerEmail}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${customerEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #475569;">Phone / WhatsApp:</td>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a;">
                <a href="tel:${customerPhone}" style="color: #0f172a; text-decoration: none;">${customerPhone}</a>
                ${whatsappUrl ? ` &nbsp;•&nbsp; <a href="${whatsappUrl}" style="color: #16a34a; text-decoration: none; font-weight: 600;" target="_blank">Chat on WhatsApp →</a>` : ""}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #475569;">Market / Country:</td>
              <td style="padding: 10px 14px; font-size: 13px; color: #0f172a;">${country}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Project Scope Section -->
      <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #0f172a; border-left: 3px solid #f59e0b; padding-left: 8px;">
          Product & Order Specifications
        </h3>
        <table style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 8px; overflow: hidden;">
          <tbody>
            <tr>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #475569; width: 35%;">Product Model:</td>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 700; color: #0f172a;">${productName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #475569;">Category Division:</td>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a;">${productCategory}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #475569;">Estimated Volume:</td>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 700; color: #d97706;">${quantity}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #475569;">Target Timeline:</td>
              <td style="padding: 10px 14px; font-size: 13px; color: #0f172a;">${timeline}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Custom Specs (if any) -->
      ${customSpecsHtml}

      <!-- Tech Pack & Uploads -->
      ${techPack || files ? `
        <div style="margin-top: 24px;">
          <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #0f172a; border-left: 3px solid #f59e0b; padding-left: 8px;">
            Tech Pack & File Attachments
          </h3>
          <div style="background-color: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 13px; color: #0f172a;">
            ${techPack ? `<p style="margin: 0 0 6px;"><strong>Tech Pack Link / File:</strong> <a href="${techPack}" target="_blank" style="color: #2563eb; word-break: break-all;">${techPack}</a></p>` : ""}
            ${files ? `<p style="margin: 0;"><strong>Attached Files:</strong> ${files}</p>` : ""}
          </div>
        </div>
      ` : ""}

      <!-- Message / Notes -->
      <div style="margin-top: 24px;">
        <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #0f172a; border-left: 3px solid #f59e0b; padding-left: 8px;">
          Project Notes & Requirements
        </h3>
        <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 13px; line-height: 1.6; color: #334155; white-space: pre-wrap;">
${message}
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0; text-align: center;">
        <a href="mailto:${customerEmail}?subject=Re:%20Manufacturing%20Quote%20-%20Gloves%20Storm&body=Dear%20${encodeURIComponent(customerName)},%0D%0A%0D%0AThank%20you%20for%20contacting%20Gloves%20Storm.%20We%20have%20reviewed%20your%20inquiry%20for%20${encodeURIComponent(productName)}.%0D%0A%0D%0A"
           style="display: inline-block; background-color: #f59e0b; color: #000000; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; padding: 12px 24px; border-radius: 9999px; text-decoration: none; margin-right: 8px;">
          Reply to Customer via Email
        </a>
        ${whatsappUrl ? `
          <a href="${whatsappUrl}"
             target="_blank"
             style="display: inline-block; background-color: #0f172a; color: #ffffff; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 12px 24px; border-radius: 9999px; text-decoration: none; margin-top: 8px;">
            Open WhatsApp
          </a>
        ` : ""}
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 32px; font-size: 11px; color: #64748b; text-align: center;">
      This email was automatically generated and sent to <strong>${DEFAULT_RECIPIENT}</strong> from the Gloves Storm website.
    </div>

  </div>
</body>
</html>
  `;
}

/**
 * Builds a plain text fallback for email clients that do not render HTML.
 */
function buildInquiryText(inquiry: Partial<Inquiry>): string {
  return `
NEW MANUFACTURING INQUIRY (GLOVES STORM)
========================================

BUYER INFORMATION:
- Name: ${inquiry.name || "N/A"}
- Company/Brand: ${inquiry.company || inquiry.brand_name || "N/A"}
- Email: ${inquiry.email || "N/A"}
- Phone: ${inquiry.phone || "N/A"}
- Country: ${inquiry.country || "International"}

PRODUCT SPECIFICATIONS:
- Category: ${inquiry.product_category || "N/A"}
- Product: ${inquiry.product_name || "N/A"}
- Quantity: ${inquiry.estimated_quantity || "Sample / Custom"}
- Timeline: ${inquiry.target_delivery_date || inquiry.timeline || "N/A"}

ATTACHMENTS & TECH PACK:
- Tech Pack URL: ${inquiry.tech_pack_url || "None"}
- Attached Files: ${inquiry.reference_files?.join(", ") || "None"}

PROJECT NOTES / MESSAGE:
${inquiry.message || "None"}

---------------------------------------------------------
Delivered to: ${DEFAULT_RECIPIENT}
  `.trim();
}

/**
 * Sends a notification email to glovesstorm@gmail.com for every form submission.
 * Uses a multi-tier delivery strategy:
 * 1. Resend API (if RESEND_API_KEY is defined)
 * 2. Nodemailer SMTP (if SMTP_PASS or GMAIL_APP_PASSWORD is defined)
 * 3. FormSubmit HTTP API (automated fallback to guarantee delivery)
 */
export async function sendInquiryNotificationEmail(
  inquiry: Partial<Inquiry>
): Promise<EmailSendResult> {
  const recipient = process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || DEFAULT_RECIPIENT;
  const productName = inquiry.product_name || inquiry.product_category || "Custom Manufacturing";
  const clientName = inquiry.name || "Prospective Client";
  const subject = `🏷️ New Inquiry: ${productName} from ${clientName}`;

  // 1. Attempt Resend if configured
  if (process.env.RESEND_API_KEY) {
    try {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "Gloves Storm <onboarding@resend.dev>",
          to: [recipient],
          reply_to: inquiry.email,
          subject,
          html: buildInquiryHtml(inquiry),
          text: buildInquiryText(inquiry),
        }),
      });
      const resendData = await resendRes.json();
      if (resendRes.ok) {
        console.log(`[Email Service] ✅ Delivered via Resend to ${recipient}:`, resendData.id);
        return { success: true, messageId: resendData.id };
      }
    } catch (e: any) {
      console.warn("[Email Service] Resend attempt warning:", e?.message || e);
    }
  }

  // 2. Attempt Nodemailer SMTP if credentials configured
  const transporter = getTransporter();
  if (transporter) {
    try {
      const sender = process.env.SMTP_FROM || process.env.SMTP_USER || process.env.EMAIL_USER || `"Gloves Storm Inquiries" <${DEFAULT_RECIPIENT}>`;

      const info = await transporter.sendMail({
        from: sender,
        to: recipient,
        replyTo: inquiry.email || undefined,
        subject,
        text: buildInquiryText(inquiry),
        html: buildInquiryHtml(inquiry),
      });

      console.log(`[Email Service] ✅ Delivered via SMTP to ${recipient} (Message ID: ${info.messageId})`);
      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (err: any) {
      console.warn(`[Email Service] SMTP transport failed, trying automated fallback:`, err?.message || err);
    }
  }

  // 3. Automated Webhook / FormSubmit fallback to guarantee delivery to glovesstorm@gmail.com
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://glovesstorm.com";
    const customSpecsSummary = inquiry.customization_details
      ? Object.entries(inquiry.customization_details)
          .map(([k, v]) => `${k}: ${v}`)
          .join(" | ")
      : "";

    const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Referer": `${siteUrl}/contact`,
        "Origin": siteUrl,
      },
      body: JSON.stringify({
        _subject: subject,
        _template: "table",
        _captcha: "false",
        "Customer Name": inquiry.name || "N/A",
        "Company / Brand": inquiry.company || inquiry.brand_name || "N/A",
        "Email Address": inquiry.email || "N/A",
        "Phone / WhatsApp": inquiry.phone || "N/A",
        "Destination Country": inquiry.country || "International",
        "Product Name": inquiry.product_name || "N/A",
        "Category Division": inquiry.product_category || "N/A",
        "Order Volume": inquiry.estimated_quantity ? `${inquiry.estimated_quantity} Units` : "Custom / Sample",
        "Timeline / Target Delivery": inquiry.target_delivery_date || inquiry.timeline || "Standard production slot",
        "Customization Details": customSpecsSummary || "None",
        "Tech Pack / Attached Files": inquiry.tech_pack_url || inquiry.reference_files?.join(", ") || "None",
        "Project Notes": inquiry.message || "None",
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (data.success === "true" || data.success === true) {
      console.log(`[Email Service] ✅ Inquiry notification sent via FormSubmit to ${recipient}`);
      return {
        success: true,
        messageId: `formsubmit-${Date.now()}`,
      };
    } else {
      console.warn(`[Email Service] FormSubmit notice:`, data.message);
      return {
        success: false,
        reason: data.message || "FormSubmit pending one-time activation",
      };
    }
  } catch (httpErr: any) {
    console.error(`[Email Service] ❌ All delivery attempts failed:`, httpErr?.message || httpErr);
    return {
      success: false,
      error: httpErr?.message || "Delivery failed",
    };
  }
}
