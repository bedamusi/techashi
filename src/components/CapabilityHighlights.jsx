import React from 'react';
import { 
  Network, 
  ShieldCheck, 
  Laptop, 
  ArrowUpRight, 
  Check, 
Radio, 
  Camera, 
  Smartphone, 
  Layers, 
  Cpu, 
  Monitor, 
Sparkles,
} from 'lucide-react';
import { SERVICES } from '../data/techashiData';

export default function CapabilityHighlights({ onOpenQuote }) {
  return (
    <section id="solutions" className="w-full bg-white relative">
      <div className="w-full">
        
        {/* Section Header */}
        <div className="mx-auto w-full max-w-[1600px] px-5 py-14 text-center sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16">
          <p className="mb-3 text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.2em] text-brand-blue">
            Core Capabilities
          </p>
          <h2 className="mx-auto max-w-4xl text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-brand-navy tracking-tight leading-[1.04] text-balance">
            GET TO KNOW TECHASHI.
          </h2>
          <p className="mx-auto mt-4 max-w-5xl text-base sm:text-lg text-slate-600 leading-relaxed text-pretty">
            Four foundational technology pillars engineered to connect, secure, and accelerate your personal and commercial operations.
          </p>
        </div>

        {/* 4 Large Visual Panels */}
        <div className="w-full">
          
          {/* PANEL 01: TECHNOLOGY THAT CONNECTS (Networking) */}
          <div data-capability-stack-card="1" style={{ '--stack-offset': '0px', zIndex: 1 }} className="capability-fullwidth-stack lg:sticky w-full border-y border-slate-200/80 bg-white transition-colors duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
              
              {/* Text Side */}
              <div className="lg:col-span-6 p-8 sm:p-14 flex flex-col justify-between z-10">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl sm:text-5xl font-heading font-extrabold text-brand-blue/30 tracking-tight">
                      01
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-brand-blue text-xs sm:text-sm font-bold tracking-wider uppercase">
                      Infrastructure
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-heading font-extrabold text-brand-navy leading-tight">
                    TECHNOLOGY THAT CONNECTS.
                  </h3>
                  
                  <p className="text-sm sm:text-base font-medium text-brand-blue mt-2">
                    Networking Design & Installation
                  </p>

                  <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                    A reliable business begins with flawless connectivity. We engineer structured cabling architectures, robust business WiFi, smart switching, and impenetrable firewalls for seamless office communication.
                  </p>

                  {/* Authentic Service Bullets */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      'Structured cabling (Cat6/Cat6A & fiber)',
                      'High-density office WiFi systems',
                      'Enterprise routers & smart switches',
                      'Hardware & software firewalls',
                      'Turnkey office network setup',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={onOpenQuote}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-navy hover:bg-brand-blue text-white text-xs sm:text-sm font-heading font-semibold transition-all shadow-sm group"
                  >
                    <span>Request Network Architecture</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Visual Architectural Side - Full photography visible without obscuring overlays */}
              <div className="lg:col-span-6 relative min-h-[360px] sm:min-h-[440px] lg:min-h-full overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1698668975271-2ba9a323be6b?auto=format&fit=crop&w=1400&q=85"
                  alt="Real network switches and structured cabling in an equipment rack"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

            </div>
          </div>

          {/* PANEL 02: TECHNOLOGY THAT PROTECTS (CCTV) */}
          <div data-capability-stack-card="2" style={{ '--stack-offset': '18px', zIndex: 2 }} className="capability-fullwidth-stack lg:sticky w-full border-y border-slate-200/80 bg-slate-50 transition-colors duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
              
              {/* Visual Side First on Desktop for Variety - Full photography visible without obscuring overlays */}
              <div className="lg:col-span-6 order-2 lg:order-1 relative min-h-[360px] sm:min-h-[440px] lg:min-h-full overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1686678652918-8b235f8b9415?auto=format&fit=crop&w=1400&q=85"
                  alt="Real outdoor CCTV camera installed on a building wall"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              {/* Text Side */}
              <div className="lg:col-span-6 order-1 lg:order-2 p-8 sm:p-14 flex flex-col justify-between z-10">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl sm:text-5xl font-heading font-extrabold text-brand-blue/30 tracking-tight">
                      02
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold tracking-wider uppercase">
                      Physical Security
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-heading font-extrabold text-brand-navy leading-tight">
                    TECHNOLOGY THAT PROTECTS.
                  </h3>
                  
                  <p className="text-sm sm:text-base font-medium text-brand-blue mt-2">
                    CCTV Sales & Installation
                  </p>

                  <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                    Protect your property, inventory, and personnel with commercial-grade surveillance systems. We provide hardware sourcing, neat multi-point installation, DVR/NVR configuration, and instant mobile viewing setup.
                  </p>

                  {/* Authentic Service Bullets */}
                  <div className="mt-6 space-y-2.5">
                    {[
                      'High-definition security cameras (dome, bullet, PTZ)',
                      'DVR / NVR storage and recording setup',
                      'Anywhere remote viewing on iOS and Android smartphones',
                      'Scheduled camera alignment, lens cleaning & maintenance',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={onOpenQuote}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-navy hover:bg-brand-blue text-white text-xs sm:text-sm font-heading font-semibold transition-all shadow-sm group"
                  >
                    <span>Request CCTV Installation</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* PANEL 03: TECHNOLOGY THAT PERFORMS (PCs & Gadgets) */}
          <div data-capability-stack-card="3" style={{ '--stack-offset': '36px', zIndex: 3 }} className="capability-fullwidth-stack lg:sticky w-full border-y border-slate-200/80 bg-white transition-colors duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
              
              {/* Text Side */}
              <div className="lg:col-span-6 p-8 sm:p-14 flex flex-col justify-between z-10">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl sm:text-5xl font-heading font-extrabold text-brand-blue/30 tracking-tight">
                      03
                    </span>
                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs sm:text-sm font-bold tracking-wider uppercase">
                      Hardware & Systems
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-heading font-extrabold text-brand-navy leading-tight">
                    TECHNOLOGY THAT PERFORMS.
                  </h3>
                  
                  <p className="text-sm sm:text-base font-medium text-brand-blue mt-2">
                    PCs (New & Refurbished) & Tech Gadgets
                  </p>

                  <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                    Work demands speed and reliability. Techashi supplies rigorously tested refurbished computers, brand-new enterprise desktops and laptops, and essential peripherals—complete with warranty confidence.
                  </p>

                  {/* Authentic Service Bullets */}
                  <div className="mt-6 space-y-2.5">
                    {[
                      'Quality-tested refurbished and brand-new desktops & laptops',
                      'Comprehensive hardware warranty on verified machines',
                      'Laptops, phones, accessories, and workspace peripherals',
                      'Workstation RAM, NVMe SSD upgrades & preventative servicing',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <a
                    href="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-navy hover:bg-brand-blue text-white text-xs sm:text-sm font-heading font-semibold transition-all shadow-sm group"
                  >
                    <span>Browse Product Categories</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Visual Hardware Showcase */}
              <div className="lg:col-span-6 bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50/50 p-8 sm:p-14 flex items-center justify-center relative overflow-hidden">
                <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6 shadow-xl space-y-4">
                  
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-heading font-bold text-slate-800 uppercase tracking-wider">
                      Hardware Quality Assurance
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-brand-soft-green text-brand-navy">
                      Warranty Guaranteed
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="flex h-24 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-2 sm:h-28">
                      <img src="https://images.unsplash.com/photo-1655226569940-b0ed83f6e268?auto=format&fit=crop&w=800&q=85" alt="Silver business laptop product photograph" loading="lazy" className="h-full w-full object-contain" />
                    </div>
                    <div className="flex h-24 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-2 sm:h-28">
                      <img src="https://images.unsplash.com/photo-1642655825268-137758d008e8?auto=format&fit=crop&w=800&q=85" alt="Desktop workstation with monitor and keyboard" loading="lazy" className="h-full w-full object-contain" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <Laptop className="w-6 h-6 text-brand-blue mb-2" />
                      <p className="text-xs font-bold font-heading text-slate-800">Business Laptops</p>
                      <p className="text-xs text-slate-600 mt-1">New & Tested Refurbished</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <Monitor className="w-6 h-6 text-brand-navy mb-2" />
                      <p className="text-xs font-bold font-heading text-slate-800">Tower Desktops</p>
                      <p className="text-xs text-slate-600 mt-1">High-Throughput Office PCs</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <Smartphone className="w-6 h-6 text-emerald-600 mb-2" />
                      <p className="text-xs font-bold font-heading text-slate-800">Gadgets & Phones</p>
                      <p className="text-xs text-slate-600 mt-1">Original Peripherals</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <Cpu className="w-6 h-6 text-purple-600 mb-2" />
                      <p className="text-xs font-bold font-heading text-slate-800">Component Upgrades</p>
                      <p className="text-xs text-slate-600 mt-1">RAM & SSD Enhancements</p>
                    </div>
                  </div>

                  <div className="text-center pt-1 text-xs sm:text-sm text-slate-600 font-medium">
                    Every refurbished unit is benchmarked, cleaned, and warranty-backed.
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* PANEL 04: TECHNOLOGY THAT MOVES YOUR BUSINESS FORWARD (Digital & Cloud) */}
          <div data-capability-stack-card="4" style={{ '--stack-offset': '54px', zIndex: 4 }} className="capability-fullwidth-stack lg:sticky w-full border-y border-slate-200/80 bg-slate-50 transition-colors duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
              
              {/* Visual Side First - Full photography visible without obscuring overlays */}
              <div className="lg:col-span-6 order-2 lg:order-1 relative min-h-[360px] sm:min-h-[440px] lg:min-h-full overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1708481480582-9793278e36ab?auto=format&fit=crop&w=1400&q=85"
                  alt="Real workplace computer setup with monitor and peripherals"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              {/* Text Side */}
              <div className="lg:col-span-6 order-1 lg:order-2 p-8 sm:p-14 flex flex-col justify-between z-10">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl sm:text-5xl font-heading font-extrabold text-brand-blue/30 tracking-tight">
                      04
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold tracking-wider uppercase">
                      Cloud & Digital
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-heading font-extrabold text-brand-navy leading-tight">
                    TECHNOLOGY THAT MOVES YOUR BUSINESS FORWARD.
                  </h3>
                  
                  <p className="text-sm sm:text-base font-medium text-brand-blue mt-2">
                    Digital Solutions, Microsoft 365 & IT Consultancy
                  </p>

                  <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                    Build a distinct online presence and empower your team with cloud collaboration. From responsive corporate websites to smooth Microsoft 365 migrations and strategic IT advisory, we propel your brand.
                  </p>

                  {/* Authentic Service Bullets */}
                  <div className="mt-6 space-y-2.5">
                    {[
                      'Website design & development (business sites, e-commerce, hosting, maintenance)',
                      'Microsoft 365 consultation (licensing, migration, Teams, SharePoint, OneDrive)',
                      'Graphic design (logos, branding, flyers, social media, company profiles)',
                      'IT consultancy (technology planning, system selection, IT audits, advisory)',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={onOpenQuote}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-navy hover:bg-brand-blue text-white text-xs sm:text-sm font-heading font-semibold transition-all shadow-sm group"
                  >
                    <span>Consult on Digital Solutions</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
