"use client";

import { useState } from "react";
import { Inquiry, InquiryStatus } from "@/types/database";
import { updateInquiryStatus } from "@/lib/data/store";
import { formatDate } from "@/lib/utils";
import {
  Inbox,
  Eye,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  ExternalLink,
  X,
  Clock,
  Shield,
  Save,
  Search,
  Download,
  Star,
  Layers,
  Box,
  Building2,
  Calendar,
  CheckCircle2,
} from "lucide-react";

const statuses: InquiryStatus[] = [
  "New",
  "Reviewing",
  "Contacted",
  "In Progress",
  "Quoted",
  "Sample",
  "Production",
  "Completed",
  "Archived",
];

interface AdminInquiriesClientProps {
  initialInquiries: Inquiry[];
}

export default function AdminInquiriesClient({
  initialInquiries,
}: AdminInquiriesClientProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priorityOnly, setPriorityOnly] = useState<boolean>(false);
  const [internalNotes, setInternalNotes] = useState<string>("");
  const [savingNote, setSavingNote] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Filter inquiries
  const filtered = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    const matchesPriority = !priorityOnly || inq.priority;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !q ||
      inq.name.toLowerCase().includes(q) ||
      inq.company.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      (inq.product_name && inq.product_name.toLowerCase().includes(q)) ||
      inq.product_category.toLowerCase().includes(q) ||
      inq.country.toLowerCase().includes(q);

    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleOpenDetail = (inq: Inquiry) => {
    setActiveInquiry(inq);
    setInternalNotes(inq.internal_notes || "");
  };

  const handleStatusChange = async (newStatus: InquiryStatus) => {
    if (!activeInquiry) return;
    await updateInquiryStatus(activeInquiry.id, newStatus, internalNotes);

    const updated = {
      ...activeInquiry,
      status: newStatus,
      internal_notes: internalNotes,
    };
    setActiveInquiry(updated);
    setInquiries((prev) =>
      prev.map((i) => (i.id === activeInquiry.id ? updated : i))
    );

    setNotice(`Pipeline stage updated to: ${newStatus}`);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleSaveNotes = async () => {
    if (!activeInquiry) return;
    setSavingNote(true);
    await updateInquiryStatus(
      activeInquiry.id,
      activeInquiry.status,
      internalNotes
    );

    const updated = { ...activeInquiry, internal_notes: internalNotes };
    setActiveInquiry(updated);
    setInquiries((prev) =>
      prev.map((i) => (i.id === activeInquiry.id ? updated : i))
    );

    setSavingNote(false);
    setNotice("Internal notes logged to factory dossier.");
    setTimeout(() => setNotice(null), 3000);
  };

  const togglePriority = (inqId: string) => {
    setInquiries((prev) =>
      prev.map((i) =>
        i.id === inqId ? { ...i, priority: !i.priority } : i
      )
    );
    if (activeInquiry && activeInquiry.id === inqId) {
      setActiveInquiry({ ...activeInquiry, priority: !activeInquiry.priority });
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Date",
      "Client Name",
      "Company",
      "Email",
      "Phone",
      "Country",
      "Category",
      "Product",
      "Quantity",
      "Timeline",
      "Status",
    ];

    const rows = inquiries.map((inq) => [
      `"${inq.id}"`,
      `"${new Date(inq.created_at).toLocaleDateString()}"`,
      `"${inq.name}"`,
      `"${inq.company}"`,
      `"${inq.email}"`,
      `"${inq.phone}"`,
      `"${inq.country}"`,
      `"${inq.product_category}"`,
      `"${inq.product_name || 'N/A'}"`,
      `"${inq.estimated_quantity || 'N/A'}"`,
      `"${inq.target_delivery_date || 'N/A'}"`,
      `"${inq.status}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `gloves_storm_inquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search Controls */}
      <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-bold block mb-1">
            Manufacturing Pipeline CRM
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0f172a] flex items-center gap-2">
            <span>Project Inquiries</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-mono font-bold">
              {filtered.length} Leads
            </span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client, brand, product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-full pl-9 pr-4 py-1.5 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500/20"
            />
          </div>

          {/* Priority Filter */}
          <button
            onClick={() => setPriorityOnly(!priorityOnly)}
            className={`px-3 py-1.5 rounded-full border text-xs font-mono uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
              priorityOnly
                ? "border-amber-600 bg-amber-500 text-white font-bold"
                : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:text-[#0f172a]"
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Priority</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-mono uppercase text-neutral-700 hover:text-[#0f172a] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Pipeline Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
            statusFilter === "all"
              ? "bg-[#0f172a] text-white font-bold"
              : "bg-white text-neutral-600 hover:text-[#0f172a] border border-neutral-200 shadow-2xs"
          }`}
        >
          All ({inquiries.length})
        </button>

        {statuses.map((s) => {
          const count = inquiries.filter((i) => i.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                statusFilter === s
                  ? "bg-amber-500 text-neutral-950 font-bold shadow-2xs"
                  : "bg-white text-neutral-600 hover:text-[#0f172a] border border-neutral-200 shadow-2xs"
              }`}
            >
              <span>{s}</span>
              <span className="text-[10px] opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Notice Banner */}
      {notice && (
        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2 animate-in fade-in font-medium">
          <CheckCircle2 className="w-4 h-4 text-amber-600" />
          <span>{notice}</span>
        </div>
      )}

      {/* Inquiries Table */}
      <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-sm">
        {filtered.length === 0 ? (
          <div className="p-16 text-center text-neutral-500">
            <Inbox className="w-10 h-10 mx-auto mb-3 opacity-30 text-neutral-400" />
            <span className="text-sm font-bold uppercase text-[#0f172a] block mb-1">
              No Inquiries Match Filter
            </span>
            <span className="text-xs">Adjust your search keyword or pipeline status filter.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-neutral-200 bg-neutral-50/60 text-neutral-500 font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Client / Brand</th>
                  <th className="py-3 px-4">Product / Category</th>
                  <th className="py-3 px-4">Units</th>
                  <th className="py-3 px-4">Timeline</th>
                  <th className="py-3 px-4">Pipeline Status</th>
                  <th className="py-3 px-4">Received</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filtered.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => handleOpenDetail(inq)}
                    className="hover:bg-neutral-50/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-4" onClick={(e) => { e.stopPropagation(); togglePriority(inq.id); }}>
                      <button className="text-neutral-300 hover:text-amber-500 cursor-pointer">
                        <Star
                          className={`w-4 h-4 ${
                            inq.priority ? "text-amber-500 fill-amber-500" : ""
                          }`}
                        />
                      </button>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-bold text-[#0f172a] block group-hover:text-amber-600 transition-colors">
                        {inq.company || inq.name}
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        {inq.name} • {inq.country}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="text-[#0f172a] block font-medium">
                        {inq.product_name || "Custom Development"}
                      </span>
                      <span className="text-[10px] font-mono text-amber-700 font-bold">
                        {inq.product_category}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono text-neutral-800 font-medium">
                      {inq.estimated_quantity ? `${inq.estimated_quantity}+` : "Sample"}
                    </td>

                    <td className="py-4 px-4 text-neutral-600">
                      {inq.target_delivery_date || inq.timeline || "Flexible"}
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-neutral-100 border border-neutral-200 text-neutral-800 font-medium">
                        {inq.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono text-[11px] text-neutral-400">
                      {formatDate(inq.created_at)}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDetail(inq);
                        }}
                        className="p-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-[#0f172a] inline-flex items-center gap-1 text-[11px] cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Brief</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SLIDE-OUT EXECUTIVE PROJECT BRIEF DOSSIER */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs p-0 sm:p-4">
          <div className="w-full sm:max-w-2xl h-full sm:h-[94vh] bg-white border-l sm:border border-neutral-200 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Dossier Header */}
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-bold block mb-1">
                  Executive Project Dossier
                </span>
                <h3 className="text-xl font-bold uppercase text-[#0f172a]">
                  {activeInquiry.company || activeInquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveInquiry(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-[#0f172a] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dossier Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
              {/* Status Pipeline Buttons */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block font-medium">
                  Update Production Pipeline Status
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        activeInquiry.status === s
                          ? "bg-amber-500 text-neutral-950 font-bold shadow-xs"
                          : "bg-white text-neutral-600 hover:text-[#0f172a] border border-neutral-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Client & Communication Quick Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1 font-medium">
                    Direct Contact
                  </span>
                  <span className="text-[#0f172a] font-bold text-sm block mb-1">
                    {activeInquiry.name}
                  </span>
                  <span className="text-neutral-600 block mb-3">
                    {activeInquiry.country}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${activeInquiry.email}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-all font-medium"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Email Client</span>
                    </a>
                    {activeInquiry.phone && (
                      <a
                        href={`https://wa.me/${activeInquiry.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-all font-medium"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1 font-medium">
                    Product Order Target
                  </span>
                  <span className="text-[#0f172a] font-bold text-sm block mb-0.5">
                    {activeInquiry.product_name || "Bespoke Cut"}
                  </span>
                  <span className="text-amber-700 font-mono block mb-1 font-bold">
                    {activeInquiry.product_category}
                  </span>
                  <span className="text-neutral-600 block">
                    Estimated Run: {activeInquiry.estimated_quantity ? `${activeInquiry.estimated_quantity} Units` : "Prototype"}
                  </span>
                </div>
              </div>

              {/* Customization Details Breakdown */}
              {activeInquiry.customization_details && (
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 font-bold block">
                    Customization Specifications
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {Object.entries(activeInquiry.customization_details).map(([k, v]) => (
                      <div key={k} className="p-2 rounded-xl bg-white border border-neutral-200">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase block font-medium">
                          {k}
                        </span>
                        <span className="text-[#0f172a] font-medium">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Message & Scope of Work */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-2 font-medium">
                  Client Project Scope & Notes
                </span>
                <p className="text-[#0f172a] leading-relaxed whitespace-pre-wrap">
                  {activeInquiry.message}
                </p>
              </div>

              {/* Attached Files & Tech Pack */}
              {(activeInquiry.tech_pack_url ||
                (activeInquiry.reference_files && activeInquiry.reference_files.length > 0)) && (
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-2 font-medium">
                    Attached Files & Tech Packs
                  </span>
                  {activeInquiry.tech_pack_url && (
                    <a
                      href={activeInquiry.tech_pack_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-amber-700 hover:underline mb-2 block font-medium"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open External Cloud Tech Pack</span>
                    </a>
                  )}
                  {activeInquiry.reference_files?.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-[#0f172a] text-xs mt-1">
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Internal Factory Notes */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-2 font-medium">
                  Internal Factory Notes (Private)
                </span>
                <textarea
                  rows={4}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Record pattern master assigned, leather batch number, sample tracking link, or quote breakdown..."
                  className="w-full bg-white border border-neutral-300 rounded-2xl p-3 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-amber-600 resize-none mb-3"
                />
                <button
                  onClick={handleSaveNotes}
                  disabled={savingNote}
                  className="px-4 py-2 rounded-full bg-[#0f172a] hover:bg-neutral-800 text-white font-bold uppercase text-[11px] font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savingNote ? "Saving..." : "Save Internal Notes"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
