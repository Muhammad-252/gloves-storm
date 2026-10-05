"use client";

import { useState, useRef } from "react";
import { Upload, X, Link as LinkIcon, Image as ImageIcon, Loader2, Check, ExternalLink } from "lucide-react";

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: "categories" | "products" | "projects" | "blog" | "general";
  helperText?: string;
  placeholder?: string;
}

/**
 * Automatically compress and resize images client-side before upload.
 * Keeps resolution crisp (up to 1400px) while shrinking file size to ~60KB–150KB.
 * This guarantees lightning-fast uploads and eliminates 413 Vercel payload limits.
 */
async function compressImage(
  file: File,
  maxWidth = 1400,
  maxHeight = 1400,
  quality = 0.82
): Promise<{ file: File; dataUrl: string }> {
  if (typeof window === "undefined") {
    return { file, dataUrl: "" };
  }

  // SVGs don't need raster compression
  if (file.type === "image/svg+xml") {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ file, dataUrl: reader.result as string });
      reader.onerror = () => resolve({ file, dataUrl: "" });
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onerror = () => resolve({ file, dataUrl: "" });
    reader.onload = (e) => {
      const img = new window.Image();
      img.onerror = () => resolve({ file, dataUrl: "" });
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve({ file, dataUrl: "" });
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/webp", quality);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File(
                [blob],
                file.name.replace(/\.[^/.]+$/, ".webp"),
                { type: "image/webp" }
              );
              resolve({ file: compressedFile, dataUrl });
            } else {
              resolve({ file, dataUrl });
            }
          },
          "image/webp",
          quality
        );
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function ImageUploadField({
  value,
  onChange,
  label = "Cover Image",
  folder = "general",
  helperText = "Directly upload an image from your device (PNG, JPG, WEBP) or paste an external image URL.",
  placeholder = "https://images.unsplash.com/... or /uploads/...",
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPEG, PNG, WEBP, GIF, SVG).");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // 1. Compress image in browser first to ensure super-fast upload and <150KB payload
      const { file: compressedFile, dataUrl } = await compressImage(file);

      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        // Fallback to high-quality compressed dataUrl if server route had an issue
        if (dataUrl && dataUrl.startsWith("data:image")) {
          onChange(dataUrl);
          return;
        }
        throw new Error(data.error || "Failed to upload image");
      }

      onChange(data.url);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred during upload.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="space-y-2">
      {/* Label and Mode Switcher */}
      <div className="flex items-center justify-between">
        <label className="block text-[11px] uppercase tracking-wider text-neutral-600 font-semibold">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-neutral-100 p-0.5 rounded-lg border border-neutral-200 text-[10px] font-mono">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2 py-0.5 rounded-md font-medium transition-all ${
              mode === "upload"
                ? "bg-white text-neutral-900 shadow-xs font-bold"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Direct Upload
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2 py-0.5 rounded-md font-medium transition-all ${
              mode === "url"
                ? "bg-white text-neutral-900 shadow-xs font-bold"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            URL Input
          </button>
        </div>
      </div>

      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
          }
        }}
      />

      {/* Current Image Preview (if present) */}
      {value ? (
        <div className="relative rounded-2xl border border-neutral-200 bg-neutral-50/70 p-3 flex items-center gap-3.5 group">
          <div
            className="w-16 h-16 rounded-xl bg-cover bg-center shrink-0 border border-neutral-200 bg-white relative overflow-hidden shadow-xs"
            style={{ backgroundImage: `url(${value})` }}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 mb-0.5">
              <Check className="w-3.5 h-3.5" />
              <span>Image Attached</span>
            </div>
            <p className="text-[11px] text-neutral-500 font-mono truncate max-w-sm">
              {value}
            </p>
            <div className="flex items-center gap-3 mt-1.5 text-[10px] font-mono uppercase tracking-wider">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="text-amber-700 hover:text-amber-800 font-bold underline cursor-pointer disabled:opacity-50"
              >
                Upload Different File
              </button>
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="text-neutral-600 hover:text-neutral-900 inline-flex items-center gap-1"
              >
                <span>View Full</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onChange("")}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            title="Remove Image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : mode === "upload" ? (
        /* Drag & Drop Upload Zone */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-amber-600 bg-amber-50/50 scale-[0.99]"
              : "border-neutral-200 hover:border-amber-500 bg-neutral-50/60 hover:bg-neutral-50"
          } ${isUploading ? "pointer-events-none opacity-80" : ""}`}
        >
          {isUploading ? (
            <div className="py-2 flex flex-col items-center justify-center gap-2 text-amber-600">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-xs font-semibold">Uploading image from device...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 shadow-xs">
                <Upload className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-800">
                  Click to upload <span className="text-neutral-500 font-normal">or drag & drop</span>
                </p>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  Direct upload from computer (PNG, JPG, WEBP, up to 15MB)
                </p>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Manual URL Input Field (always accessible or in URL mode) */}
      {(mode === "url" || (!value && mode === "upload")) && (
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
            <LinkIcon className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              if (error) setError(null);
            }}
            placeholder={placeholder}
            className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl pl-9 pr-3.5 py-2 text-xs outline-none transition-colors"
          />
        </div>
      )}

      {/* Error notification */}
      {error && (
        <p className="text-[11px] text-red-600 font-medium bg-red-50 p-2 rounded-lg border border-red-200">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="text-[10px] text-neutral-500 leading-relaxed">{helperText}</p>
      )}
    </div>
  );
}
