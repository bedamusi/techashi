import React from 'react';
import { Phone, MessageSquare, FileText } from 'lucide-react';

export default function MobileQuickBar({ onOpenQuote }) {
  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-30">
      <div className="bg-brand-navy/95 backdrop-blur-xl border border-white/15 rounded-2xl p-2 shadow-2xl flex items-center justify-around gap-2 text-white">
        
        {/* Call Action */}
        <button
          onClick={onOpenQuote}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold active:scale-95 transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-brand-green" />
          <span>Call</span>
        </button>

        {/* WhatsApp Action */}
        <button
          onClick={onOpenQuote}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold active:scale-95 transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5 text-brand-green" />
          <span>WhatsApp</span>
        </button>

        {/* Get a Quote Action */}
        <button
          onClick={onOpenQuote}
          className="flex-1.2 flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl bg-brand-blue text-white text-xs font-heading font-bold shadow-sm active:scale-95 transition-all"
        >
          <FileText className="w-3.5 h-3.5 text-brand-green" />
          <span>Get Quote</span>
        </button>

      </div>
    </div>
  );
}
