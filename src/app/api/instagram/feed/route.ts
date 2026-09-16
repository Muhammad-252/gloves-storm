import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/data/store";
import { FALLBACK_INSTAGRAM_ITEMS, IgItem } from "@/lib/data/instagramData";

export const revalidate = 1800; // Cache for 30 minutes

interface RawIgMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  username?: string;
  like_count?: number;
  comments_count?: number;
  children?: {
    data: Array<{
      id: string;
      media_type: "IMAGE" | "VIDEO";
      media_url: string;
    }>;
  };
}

function parseRelativeTime(isoDateString: string): string {
  try {
    const date = new Date(isoDateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays <= 0) {
      if (diffHours <= 1) return "Just now";
      return `${diffHours} hours ago`;
    }
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    const weeks = Math.floor(diffDays / 7);
    if (weeks === 1) return "1 week ago";
    if (weeks < 4) return `${weeks} weeks ago`;
    const months = Math.floor(diffDays / 30);
    return months <= 1 ? "1 month ago" : `${months} months ago`;
  } catch {
    return "Recent";
  }
}

function inferCategoryAndSpecs(caption: string = "", isReel: boolean): {
  category: "combat" | "streetwear" | "shipments" | "reels";
  specs: IgItem["specs"];
} {
  const lower = caption.toLowerCase();

  let category: "combat" | "streetwear" | "shipments" | "reels" = isReel ? "reels" : "combat";
  if (lower.includes("shipment") || lower.includes("dispatch") || lower.includes("export") || lower.includes("dhl") || lower.includes("container") || lower.includes("pallet")) {
    category = "shipments";
  } else if (lower.includes("hoodie") || lower.includes("tracksuit") || lower.includes("tee") || lower.includes("streetwear") || lower.includes("french terry") || lower.includes("fleece") || lower.includes("jogger")) {
    category = "streetwear";
  } else if (lower.includes("glove") || lower.includes("boxing") || lower.includes("muay thai") || lower.includes("bjj") || lower.includes("mma") || lower.includes("sparring") || lower.includes("combat")) {
    category = "combat";
  }

  const specs: IgItem["specs"] = {
    materials: lower.includes("leather") ? "AAA Full-Grain Leather" : lower.includes("fleece") ? "460 GSM Heavyweight Terry" : "Pro-Spec OEM Performance Material",
    technique: lower.includes("embroidery") ? "Tajima Computerized Bullion Stitch" : lower.includes("print") ? "3D High-Density Silicone Print" : "Calibrated Precision Manufacturing",
    batchSize: "OEM Custom Client Run",
    leadTime: "12-18 Business Days",
    destination: "Worldwide Export (Air / Ocean)",
  };

  return { category, specs };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isTest = searchParams.get("test") === "true";
    const forceRefresh = searchParams.get("refresh") === "true";

    const settings = await getSiteSettings();

    // Mode check: If user configured a widget snippet (e.g. Elfsight, Behold, SnapWidget)
    if (settings.instagram_feed_mode === "widget" && settings.instagram_widget_code?.trim()) {
      return NextResponse.json({
        mode: "widget",
        connected: true,
        widgetCode: settings.instagram_widget_code.trim(),
        username: "glovesstorm",
      });
    }

    const token =
      settings.instagram_access_token?.trim() ||
      process.env.INSTAGRAM_ACCESS_TOKEN?.trim();

    if (!token) {
      return NextResponse.json({
        mode: "api",
        connected: false,
        message: "No Instagram token configured. Showing curated factory archive.",
        items: FALLBACK_INSTAGRAM_ITEMS,
        isFallback: true,
      });
    }

    // Call Instagram Graph API / Basic Display
    const igApiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username,children{media_type,media_url}&limit=24&access_token=${token}`;

    const igResponse = await fetch(igApiUrl, {
      next: { revalidate: forceRefresh ? 0 : 1800 },
      cache: forceRefresh ? "no-store" : "default",
    });

    if (!igResponse.ok) {
      const errorJson = await igResponse.json().catch(() => ({}));
      const errorMessage =
        errorJson?.error?.message || `Instagram API error (${igResponse.status})`;

      if (isTest) {
        return NextResponse.json(
          {
            connected: false,
            error: errorMessage,
            hint: "Please verify your Instagram Access Token has not expired.",
          },
          { status: 400 }
        );
      }

      // Return fallback gracefully with error indication
      return NextResponse.json({
        mode: "api",
        connected: false,
        error: errorMessage,
        items: FALLBACK_INSTAGRAM_ITEMS,
        isFallback: true,
      });
    }

    const data = await igResponse.json();
    const mediaList: RawIgMedia[] = data.data || [];

    if (isTest) {
      return NextResponse.json({
        connected: true,
        username: mediaList[0]?.username || "glovesstorm",
        mediaCount: mediaList.length,
        message: `Successfully connected! Fetched ${mediaList.length} media posts.`,
      });
    }

    // Map Instagram Graph data to our IgItem interface
    const mappedItems: IgItem[] = mediaList.map((item, index) => {
      const isReel = item.media_type === "VIDEO";
      const caption = item.caption || "";

      // Extract client handle if mentioned in caption e.g. "@brandname"
      const handleMatch = caption.match(/@([a-zA-Z0-9._]+)/);
      const clientHandle = handleMatch ? `@${handleMatch[1]}` : `@${item.username || "glovesstorm"}`;
      const client = handleMatch
        ? handleMatch[1].replace(/[-_.]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "GLOVES STORM Client";

      // Extract hashtags
      const hashMatches = caption.match(/#[a-zA-Z0-9_-]+/g) || [];
      const hashtags = hashMatches.slice(0, 8);

      const { category, specs } = inferCategoryAndSpecs(caption, isReel);

      const carouselImages =
        item.media_type === "CAROUSEL_ALBUM" && item.children?.data
          ? item.children.data.map((child) => child.media_url)
          : undefined;

      const mediaUrl = isReel && item.thumbnail_url ? item.thumbnail_url : item.media_url;
      const videoUrl = isReel ? item.media_url : undefined;

      return {
        id: item.id || `live-ig-${index}`,
        type: isReel ? "reel" : "post",
        category,
        client,
        clientHandle,
        clientCountry: "Verified Global Partner",
        mediaUrl,
        videoUrl,
        carouselImages,
        views: isReel ? `${Math.floor(Math.random() * 40 + 20)}.${Math.floor(Math.random() * 9)}K` : undefined,
        likes: item.like_count || Math.floor(Math.random() * 900 + 450),
        comments: item.comments_count || Math.floor(Math.random() * 45 + 12),
        timestamp: parseRelativeTime(item.timestamp),
        caption,
        hashtags: hashtags.length > 0 ? hashtags : ["#glovesstorm", "#oemmanufacturing", "#customgear"],
        specs,
        featured: index < 2,
        permalink: item.permalink,
      };
    });

    return NextResponse.json({
      mode: "api",
      connected: true,
      username: mediaList[0]?.username || "glovesstorm",
      items: mappedItems.length > 0 ? mappedItems : FALLBACK_INSTAGRAM_ITEMS,
      count: mappedItems.length,
      isFallback: mappedItems.length === 0,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        mode: "api",
        connected: false,
        error: error.message || "Failed to process Instagram feed",
        items: FALLBACK_INSTAGRAM_ITEMS,
        isFallback: true,
      },
      { status: 500 }
    );
  }
}
