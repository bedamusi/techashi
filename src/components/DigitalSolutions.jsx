import React from 'react';
import { 
  Globe, 
  Palette, 
  Cloud, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Layout, 
  Users, 
  Mail, 
  FileText 
} from 'lucide-react';

export default function DigitalSolutions({ onOpenQuote }) {
  return (
    <section className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-blue mb-3">
            Digital Capabilities
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-brand-navy tracking-tight leading-tight">
            FROM IDEA TO ONLINE.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Expand your brand presence and collaborate in the cloud. We design responsive websites, build compelling visual identities, and deploy Microsoft 365 environments.
          </p>
        </div>

        {/* 3 Major Digital Showcases */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. Website Design & Development */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200/90 p-8 flex flex-col justify-between hover:shadow-premium transition-all duration-300 group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-soft-blue flex items-center justify-center text-brand-blue mb-6 group-hover:scale-105 transition-transform">
                <Globe className="w-6 h-6" />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue">
                Web Systems
              </span>
              <h3 className="text-2xl font-heading font-bold text-brand-navy mt-1">
                Website Design & Development
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                Fast, responsive, and secure web platforms engineered to convert visitors into loyal clients.
              </p>

              {/* Realistic Browser Mockup Preview */}
              <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-3.5 shadow-sm">
                <div className="flex items-center gap-1.5 pb-2.5 border-b border-slate-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <div className="ml-2 px-2.5 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-400 font-mono flex-1 text-center truncate">
                    https://yourbusiness.com
                  </div>
                </div>

                <div className="pt-3 space-y-2">
                  <div className="h-16 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-[11px] font-heading font-semibold text-brand-blue">
                    Responsive Business Platform
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[9px] text-slate-500">
                    <div className="p-1 rounded bg-slate-50 border border-slate-100">E-Commerce</div>
                    <div className="p-1 rounded bg-slate-50 border border-slate-100">Fast Hosting</div>
                    <div className="p-1 rounded bg-slate-50 border border-slate-100">Maintenance</div>
                  </div>
                </div>
              </div>

              {/* Authentic Sub-items */}
              <div className="mt-6 space-y-2">
                {[
                  'Business & corporate websites',
                  'E-commerce & online store setups',
                  'High-speed hosting configuration',
                  'Ongoing maintenance & security updates',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-brand-green shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onOpenQuote}
                className="w-full py-3 rounded-xl bg-white border border-slate-200 hover:border-brand-blue hover:text-brand-blue text-slate-700 text-xs font-heading font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Request Web Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. Graphic Design & Branding */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200/90 p-8 flex flex-col justify-between hover:shadow-premium transition-all duration-300 group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-soft-green flex items-center justify-center text-brand-navy mb-6 group-hover:scale-105 transition-transform">
                <Palette className="w-6 h-6 text-brand-green" />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-green">
                Visual Identity
              </span>
              <h3 className="text-2xl font-heading font-bold text-brand-navy mt-1">
                Graphic Design & Branding
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                Memorable visual assets that elevate your brand and communicate authority across every medium.
              </p>

              {/* Brand Mockup Preview */}
              <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[11px] font-bold text-slate-800 font-heading">Brand Identity Suite</span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-brand-soft-green text-brand-navy font-bold">Vector Sharp</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-center">
                    <Sparkles className="w-5 h-5 text-amber-500 mb-1" />
                    <span className="text-[10px] font-bold text-slate-700">Logo Design</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-center">
                    <FileText className="w-5 h-5 text-blue-500 mb-1" />
                    <span className="text-[10px] font-bold text-slate-700">Company Profiles</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 text-[10px] text-center text-slate-500 border border-slate-100">
                  Flyers • Social Media Media Packs • Marketing Assets
                </div>
              </div>

              {/* Authentic Sub-items */}
              <div className="mt-6 space-y-2">
                {[
                  'Distinct corporate logos & identity systems',
                  'Comprehensive branding guidelines',
                  'Marketing flyers & corporate print collateral',
                  'Social media visual design kits',
                  'Structured company profile presentations',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-brand-green shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onOpenQuote}
                className="w-full py-3 rounded-xl bg-white border border-slate-200 hover:border-brand-green hover:text-brand-navy text-slate-700 text-xs font-heading font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Request Brand Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3. Microsoft 365 Consultation */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200/90 p-8 flex flex-col justify-between hover:shadow-premium transition-all duration-300 group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-700 mb-6 group-hover:scale-105 transition-transform">
                <Cloud className="w-6 h-6" />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                Cloud Productivity
              </span>
              <h3 className="text-2xl font-heading font-bold text-brand-navy mt-1">
                Microsoft 365 Consultation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                Connect your team securely with enterprise-level email, real-time collaboration, and cloud storage.
              </p>

              {/* M365 Ecosystem Preview */}
              <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[11px] font-bold text-slate-800 font-heading">Cloud Suite Setup</span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold">Official License</span>
                </div>

                <div className="space-y-1.5">
                  <div className="p-2 rounded-lg bg-sky-50/60 border border-sky-100 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-700">Teams & SharePoint</span>
                    <span className="text-sky-700 text-[10px] font-medium">Configured</span>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-50/60 border border-blue-100 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-700">Exchange Email & OneDrive</span>
                    <span className="text-brand-blue text-[10px] font-medium">Migrated</span>
                  </div>
                </div>
              </div>

              {/* Authentic Sub-items */}
              <div className="mt-6 space-y-2">
                {[
                  'Microsoft 365 business licensing & advisory',
                  'Zero-downtime mailbox & data migration',
                  'Business email & domain routing',
                  'Microsoft Teams & SharePoint intranets',
                  'OneDrive cloud storage & security policies',
                  'End-user onboarding and training',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-brand-green shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onOpenQuote}
                className="w-full py-3 rounded-xl bg-white border border-slate-200 hover:border-brand-blue hover:text-brand-blue text-slate-700 text-xs font-heading font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Request M365 Setup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
