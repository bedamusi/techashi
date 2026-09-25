import React, { useState, useEffect } from 'react';
import { X, Check, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/techashiData';
import { useToast } from '../context/ToastContext';

export default function QuoteModal({ isOpen, onClose }) {
  const notify = useToast();
  const [selectedServices, setSelectedServices] = useState(['networking']);
  const [customerType, setCustomerType] = useState('smb');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    notify('Quote request received. We’ll be in touch soon.');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-brand-charcoal/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
        aria-describedby="quote-modal-description"
        className="relative z-10 my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl flex-col overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_32px_100px_-36px_rgba(2,18,38,0.72)] sm:max-h-[calc(100dvh-3rem)] sm:rounded-[30px]"
      >
        
        {/* Header */}
        <div className="relative shrink-0 bg-brand-navy px-5 py-5 text-white sm:px-8 sm:py-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
              <p className="text-xs font-semibold tracking-widest uppercase text-brand-green">
                Direct Inquiries
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 id="quote-modal-title" className="mt-4 text-2xl font-heading font-bold tracking-tight text-white sm:text-3xl">
            Request a Tailored Quote
          </h3>
          <p id="quote-modal-description" className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Tell us about your hardware, networking, security, or digital needs. Our technicians will prepare a structured proposal.
          </p>
        </div>

        {/* Content Body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* 1. Client Type */}
              <fieldset>
                <legend className="mb-3 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  1. I am representing:
                </legend>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {[
                    { id: 'smb', label: 'SMB / Business' },
                    { id: 'corporate', label: 'Corporate' },
                    { id: 'startup', label: 'Startup' },
                    { id: 'individual', label: 'Individual / Student' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setCustomerType(type.id)}
                      aria-pressed={customerType === type.id}
                      className={`min-h-12 rounded-xl border px-3 py-2.5 text-xs font-semibold text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 sm:text-sm ${
                        customerType === type.id
                          ? 'border-brand-blue bg-brand-blue text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-brand-blue/50 hover:bg-blue-50/60'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* 2. Services Needed */}
              <fieldset>
                <legend className="mb-3 flex w-full items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  <span>
                    2. Select solutions required:
                  </span>
                  <span className="text-[11px] text-slate-400">Select all that apply</span>
                </legend>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {SERVICES.map((s) => {
                    const isSelected = selectedServices.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleService(s.id)}
                        aria-pressed={isSelected}
                        className={`flex min-h-[88px] items-start justify-between gap-4 rounded-2xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${
                          isSelected
                            ? 'border-brand-blue bg-blue-50/80 text-brand-navy'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <p className="text-sm font-bold font-heading leading-snug">{s.title}</p>
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">{s.subtitle}</p>
                        </div>
                        <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                          isSelected ? 'border-brand-blue bg-brand-blue text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* 3. Contact Details */}
              <fieldset>
                <legend className="mb-3 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  3. Contact Information:
                </legend>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      id="quote-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      aria-label="Your name or organization"
                      placeholder="Your Name / Organization *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-brand-navy placeholder:text-slate-400 transition focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                    />
                  </div>
                  <div>
                    <input
                      id="quote-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      aria-label="Email address"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-brand-navy placeholder:text-slate-400 transition focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      id="quote-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      aria-label="Phone or WhatsApp number, optional"
                      placeholder="Phone / WhatsApp Number (Optional)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-brand-navy placeholder:text-slate-400 transition focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <textarea
                      id="quote-notes"
                      name="notes"
                      rows={3}
                      aria-label="Describe your requirements"
                      placeholder="Describe your requirements (e.g. number of PCs, office size, or specific timeline)..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-brand-navy placeholder:text-slate-400 transition focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Action buttons */}
              <div className="flex flex-col items-stretch justify-between gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                  <span>Your details are kept strictly confidential.</span>
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-7 py-3.5 text-sm font-heading font-semibold text-white shadow-md shadow-brand-blue/15 transition hover:bg-brand-blue-hover hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 sm:w-auto"
                >
                  <span>Submit Quote Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation State */
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 bg-brand-soft-green rounded-full flex items-center justify-center mx-auto text-brand-green">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-2xl font-heading font-bold text-brand-navy">
                  Thank You, {formData.name || 'Valued Client'}!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-2">
                  Your request has been received. A Techashi technology specialist will review your requirements and reach out with a detailed estimate.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-1">
                <p className="font-semibold text-slate-700">Selected Solutions:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedServices.map(id => {
                    const match = SERVICES.find(s => s.id === id);
                    return match ? (
                      <span key={id} className="bg-white border border-slate-200 px-2 py-1 rounded text-slate-600 font-medium">
                        {match.title}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-2.5 bg-brand-blue text-white rounded-xl text-xs font-semibold hover:bg-brand-blue-hover transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
