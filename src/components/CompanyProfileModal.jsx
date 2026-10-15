import React from 'react';
import { 
  FileText, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  Eye, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck,
  Cpu,
  Network,
  Camera,
  Laptop,
  Wrench,
  Globe,
  Palette,
  Cloud,
  Fuel,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO, PROFILE_SERVICES } from '../data/techashiData';

export default function CompanyProfileModal({ isOpen, onClose, onOpenQuote }) {
  if (!isOpen) return null;

  const serviceIcons = {
    '01': Network,
    '02': Camera,
    '03': Cpu,
    '04': Laptop,
    '05': Wrench,
    '06': Globe,
    '07': Palette,
    '08': Cloud,
    '09': ShieldCheck,
    '10': Fuel,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-brand-charcoal animate-scaleUp"
      >
        {/* Header Hero Banner */}
        <div className="relative bg-gradient-to-br from-brand-navy via-brand-navy to-[#031B33] p-6 sm:p-10 text-white overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-green/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close"
          >
            ✕
          </button>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-green/20 border border-brand-green/30 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-brand-green mb-4">
              <FileText className="w-3.5 h-3.5" />
              <span>Official Company Profile · 2026</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Technology that keeps your business moving.
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Devices, networks, security, web and Microsoft 365 — one partner for every part of your ICT.
            </p>

            {/* Quick Action Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={COMPANY_INFO.profilePdf}
                download="Techashi-Company-Profile.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-xs sm:text-sm font-bold text-brand-navy shadow-md transition hover:bg-[#a2db4f] hover:shadow-lg"
              >
                <Download className="w-4 h-4" /> Download PDF (4.5 MB)
              </a>
              <a
                href={COMPANY_INFO.profilePdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <Eye className="w-4 h-4" /> View Full Document
              </a>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenQuote();
                }}
                className="inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2.5 text-xs sm:text-sm font-semibold text-brand-green hover:underline ml-auto"
              >
                Work with us <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-10 space-y-8">
          
          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-2xl bg-brand-soft-blue/60 border border-brand-blue/20 p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-brand-blue text-xs font-bold uppercase tracking-widest mb-2">
                  <Target className="w-4 h-4" />
                  <span>Our Mission</span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-brand-navy leading-relaxed">
                  {COMPANY_INFO.mission}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-brand-soft-green/60 border border-brand-green/30 p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#5e8e22] text-xs font-bold uppercase tracking-widest mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Our Vision</span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-brand-navy leading-relaxed">
                  {COMPANY_INFO.vision}
                </p>
              </div>
            </div>
          </div>

          {/* 10 Services at a Glance */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Complete Capability</span>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-brand-navy">
                  Our Services at a Glance
                </h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                10 Core Offerings
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {PROFILE_SERVICES.map((srv) => {
                const IconComponent = serviceIcons[srv.id] || CheckCircle2;
                return (
                  <div
                    key={srv.id}
                    className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border border-slate-200/90 bg-white hover:border-brand-blue/30 hover:shadow-xs transition-all"
                  >
                    <span className="font-heading font-extrabold text-xs text-brand-blue/40 mt-1">
                      {srv.id}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-brand-navy mt-0.5">
                      <IconComponent className="w-4 h-4 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-bold text-brand-navy leading-snug">
                        {srv.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {srv.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Forecourt Highlight Banner (New capability from profile) */}
          <div className="rounded-2xl bg-gradient-to-r from-brand-navy to-[#0a3f6f] p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-brand-green">
                <Fuel className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-green">Specialized Industry Solution</span>
                <h4 className="font-heading font-bold text-base sm:text-lg text-white">Forecourt Management Systems</h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  Automated pump control, wet stock tank gauging, cashless payments, real-time reporting & KRA eTIMS integration.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="shrink-0 rounded-full bg-brand-green px-4 py-2 text-xs font-bold text-brand-navy hover:bg-[#a2db4f] transition"
            >
              Ask about Fuel Systems
            </button>
          </div>

          {/* Why Clients Choose Us - 4 pillars from PDF page 7 */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">The Techashi Standard</span>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-brand-navy mb-4">
              Why Clients Choose Us
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {[
                { num: '01', title: 'One partner, end to end', text: 'Devices, networks, security and web from a single team that knows your setup.' },
                { num: '02', title: 'Business-first advice', text: 'We recommend what fits your needs and budget — not the most expensive option.' },
                { num: '03', title: 'Quality equipment', text: 'Genuine products and tested refurbished machines you can rely on.' },
                { num: '04', title: 'Support after the sale', text: 'Installation is the start. We stay on hand for servicing, upgrades and questions.' },
              ].map((pill) => (
                <div key={pill.num} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-heading font-bold text-xs text-brand-green">{pill.num}</span>
                  <h4 className="font-heading font-bold text-sm text-brand-navy mt-1">{pill.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{pill.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Official Contact & Location Card */}
          <div className="rounded-2xl border border-slate-200 p-5 sm:p-6 bg-slate-50 flex flex-col md:flex-row justify-between gap-6">
            <div className="space-y-2">
              <h4 className="font-heading font-bold text-base text-brand-navy">Techashi Solutions Ltd</h4>
              <p className="text-xs text-slate-600 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-blue shrink-0" />
                <span>{COMPANY_INFO.location}</span>
              </p>
              <p className="text-xs text-slate-600 flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline">{COMPANY_INFO.email}</a>
              </p>
              <p className="text-xs text-slate-600 flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-blue shrink-0" />
                <a href="tel:+254700357022" className="hover:underline">{COMPANY_INFO.phoneDisplay}</a>
              </p>
            </div>

            <div className="flex flex-col justify-center sm:items-end gap-2">
              <a
                href={COMPANY_INFO.profilePdf}
                download="Techashi-Company-Profile.pdf"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-brand-blue"
              >
                <Download className="w-4 h-4" /> Download Profile PDF
              </a>
              <span className="text-[11px] text-slate-500">Document Size: 4.5 MB · Updated 2026</span>
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500 hidden sm:block">
            One partner for all your ICT needs · techashisolutions.com
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="rounded-full bg-brand-green px-5 py-2 text-xs font-bold text-brand-navy hover:bg-[#a2db4f] transition"
            >
              Get a Fast Quote
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
