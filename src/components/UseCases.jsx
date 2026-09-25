import React, { useState } from 'react';
import { 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  Globe, 
  GraduationCap, 
  Check, 
  ArrowRight 
} from 'lucide-react';

export default function UseCases({ onOpenQuote }) {
  const [activeTab, setActiveTab] = useState('corporate');

  const useCases = [
    {
      id: 'corporate',
      title: 'Corporate Enterprises',
      eyebrow: 'Enterprise Scale',
      heading: 'High-availability infrastructure engineered for uninterrupted business.',
      description: 'Corporate organizations require zero-compromise network stability, verified surveillance security, and unified Microsoft 365 cloud environments.',
      points: [
        'Structured cabling and managed Gigabit switches',
        'Commercial multi-camera CCTV with secure remote monitoring',
        'Microsoft 365 tenant migration, Teams collaboration & user training',
        'Independent IT audits and long-term technology roadmapping',
      ],
      idealFor: 'Financial, legal, corporate headquarters, and institutional offices.',
      icon: Building2,
    },
    {
      id: 'growing',
      title: 'Growing Businesses & SMBs',
      eyebrow: 'Office Operations',
      heading: 'End-to-end technology setup so you can focus on scaling.',
      description: 'Small and medium businesses benefit from having a single technology partner managing workstation deployment, high-speed office WiFi, web platforms, and continuous maintenance.',
      points: [
        'Complete turnkey office IT setups and network cabling',
        'High-density WiFi ensuring coverage across all desks and boardrooms',
        'Custom business website design, hosting & maintenance',
        'Predictable PC maintenance and scheduled hardware servicing',
      ],
      idealFor: 'Retailers, professional practices, growing teams, and clinics.',
      icon: Briefcase,
    },
    {
      id: 'security',
      title: 'Commercial & Property Security',
      eyebrow: 'Asset Protection',
      heading: 'Crystal-clear surveillance that protects what matters most.',
      description: 'From monitoring inventory warehouses to securing main entrances, Techashi installs commercial-grade CCTV solutions paired with live mobile viewing.',
      points: [
        'Strategic camera placement for optimal field of view without blindspots',
        'Dedicated DVR/NVR video storage with motion-triggered recording',
        'Instant remote smartphone access for management on iOS and Android',
        'Ongoing camera lens cleaning, focus alignment, and health checks',
      ],
      idealFor: 'Warehouses, offices, residential properties, and retail storefronts.',
      icon: ShieldCheck,
    },
    {
      id: 'digital',
      title: 'Digital Startups & Modern Brands',
      eyebrow: 'Digital Presence',
      heading: 'From initial brand identity to a robust online presence.',
      description: 'Emerging ventures need a commanding market impression. Techashi crafts bespoke business websites, high-conversion e-commerce stores, and corporate brand assets.',
      points: [
        'Responsive, modern business websites engineered for speed and search',
        'E-commerce platforms with secure online payment gateway integration',
        'Professional graphic design: logos, typography, flyers & company profiles',
        'Company domain email setup and secure cloud productivity tools',
      ],
      idealFor: 'New ventures, consultancy firms, creative agencies, and e-commerce.',
      icon: Globe,
    },
    {
      id: 'individuals',
      title: 'Individuals & Students',
      eyebrow: 'Personal Computing',
      heading: 'High-performance laptops and gadgets at accessible price points.',
      description: 'Whether preparing for university coursework or upgrading your remote work setup, Techashi provides verified brand-new and warranty-tested refurbished PCs.',
      points: [
        'Quality-tested refurbished laptops and desktops with warranty protection',
        'Brand-new high-spec laptops and portable workstations',
        'Fast SSD speed upgrades and memory expansions for older systems',
        'Smart gadgets, monitors, wireless mice, chargers, and peripherals',
      ],
      idealFor: 'University students, freelance professionals, and home offices.',
      icon: GraduationCap,
    },
  ];

  const currentCase = useCases.find(u => u.id === activeTab) || useCases[0];
  const CurrentIcon = currentCase.icon;

  return (
    <section id="industries" className="min-h-screen h-auto bg-slate-50 relative border-t border-slate-200 flex flex-col justify-center py-12 sm:py-14 lg:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto mb-8 sm:mb-10 max-w-4xl text-center">
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-blue mb-3">
            Performance
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-brand-navy tracking-tight leading-[1.04] text-balance">
            THE TECHNOLOGY BEHIND THE WORK.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base sm:text-lg text-slate-600 leading-relaxed text-pretty">
            Every organization operates differently. Here is how Techashi's unified services power distinct environments.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 no-scrollbar">
          {useCases.map((u) => {
            const isSelected = activeTab === u.id;
            return (
              <button
                key={u.id}
                onClick={() => setActiveTab(u.id)}
                className={`whitespace-nowrap px-5 py-3 rounded-full text-xs font-heading font-bold transition-all ${
                  isSelected
                    ? 'bg-brand-navy text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {u.title}
              </button>
            );
          })}
        </div>

        {/* Selected Use Case Editorial Scene */}
        <div className="bg-white rounded-3xl sm:rounded-[36px] border border-slate-200/90 p-6 sm:p-9 lg:p-10 shadow-premium">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4 lg:space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-brand-soft-blue text-brand-blue text-[11px] font-bold uppercase tracking-wider">
                  {currentCase.eyebrow}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">Use Case Profile</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-heading font-extrabold text-brand-navy leading-tight">
                {currentCase.heading}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {currentCase.description}
              </p>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Implemented Technologies:
                </p>
                <div className="space-y-2">
                  {currentCase.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-brand-soft-green flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-brand-green" />
                      </div>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <div className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Ideal For: </span>
                  {currentCase.idealFor}
                </div>
              </div>
            </div>

            {/* Right Graphic Panel */}
            <div className="lg:col-span-5 bg-gradient-to-br from-brand-navy to-brand-navy-deep rounded-2xl p-6 lg:p-7 text-white relative overflow-hidden shadow-xl border border-white/10">
              <div className="relative z-10 space-y-4 lg:space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-brand-green shrink-0">
                    <CurrentIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-green">
                      Techashi Deployment
                    </p>
                    <p className="text-[11px] text-slate-300 font-medium">
                      Managed Implementation
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-heading font-bold text-white mt-1">
                    {currentCase.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Designed to eliminate IT friction, maximize uptime, and deliver clear cost efficiency.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Warranty & Support:</span>
                    <span className="text-brand-green font-semibold">Included</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Accountability:</span>
                    <span className="text-white font-semibold">Single Trusted Partner</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Implementation:</span>
                    <span className="text-white font-semibold">Certified Technicians</span>
                  </div>
                </div>

                <button
                  onClick={onOpenQuote}
                  className="w-full py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-heading font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Discuss This Solution</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
