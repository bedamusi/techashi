import React from 'react';
import { Users, UserCheck, Smile, Shield } from 'lucide-react';

export default function HumanSection() {
  const personas = [
    { role: 'Business Owners', benefit: 'Peace of mind with a reliable, single-source IT partner.' },
    { role: 'Office Teams', benefit: 'Seamless collaboration with fast WiFi and Microsoft 365 cloud tools.' },
    { role: 'Students & Individuals', benefit: 'Dependable computing power backed by warranty for study and work.' },
    { role: 'Field Technicians', benefit: 'Dedicated certified professionals on-site when systems need care.' },
  ];

  return (
    <section className="py-24 sm:py-32 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Container */}
        <div className="bg-white rounded-3xl sm:rounded-[40px] p-8 sm:p-16 border border-slate-200/90 shadow-premium max-w-5xl mx-auto text-center">
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-brand-navy tracking-tight leading-tight max-w-3xl mx-auto">
            TECHNOLOGY IS HUMAN.
          </h2>

          <p className="mt-6 text-lg sm:text-2xl text-slate-700 font-sans font-medium max-w-2xl mx-auto leading-snug">
            “Behind every system is a person trying to do something better.”
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Technology is never just hardware or cables. It is the teacher preparing coursework, the founder pitching their first client, the security officer safeguarding property, and the team closing end-of-quarter goals.
          </p>

          {/* Persona Grid */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {personas.map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-brand-soft-blue/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-brand-blue mb-3">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-heading font-bold text-brand-navy">
                  {p.role}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {p.benefit}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
