import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, UserPlus } from 'lucide-react';
import { createAdminAccount } from '../lib/adminAuth';
import { useToast } from '../context/ToastContext';

export default function AdminAccountCreate() {
  const notify = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  const [createdEmail, setCreatedEmail] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (password !== confirmation) {
      setError('The passwords do not match.');
      return;
    }
    setCreating(true);
    try {
      await createAdminAccount(email, password);
      setCreatedEmail(email.trim().toLowerCase());
      setEmail('');
      setPassword('');
      setConfirmation('');
      notify('Administrator account created.');
    } catch (createError) {
      setError(createError.message || 'Could not create administrator account.');
      notify(createError.message || 'Could not create administrator account.', 'error');
    } finally {
      setCreating(false);
    }
  };

  return <section className="grid min-h-[75vh] place-items-center bg-slate-50 px-4 pb-20 pt-28 sm:px-8">
    <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
      <a href="/admin/products" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-brand-blue"><ArrowLeft className="h-4 w-4" /> Product management</a>
      <div className="mt-7 grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft-blue text-brand-blue"><UserPlus className="h-5 w-5" /></div>
      <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-blue">Administrator access</p>
      <h1 className="mt-2 text-3xl font-heading font-bold text-brand-navy">Create an account</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">Add an administrator who can manage the product catalog and customer orders. Only signed-in administrators can create accounts.</p>

      {createdEmail && <div role="status" className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /><p>Account created for <strong>{createdEmail}</strong>. They can now sign in at <a href="/admin/login" className="font-semibold underline underline-offset-2">the admin login page</a>.</p></div>}

      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block text-xs font-semibold text-slate-700">Email address<input required type="email" maxLength={254} autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15" /></label>
        <label className="block text-xs font-semibold text-slate-700">Password <span className="font-normal text-slate-400">(12–200 characters)</span><input required type="password" minLength={12} maxLength={200} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15" /></label>
        <label className="block text-xs font-semibold text-slate-700">Confirm password<input required type="password" minLength={12} maxLength={200} autoComplete="new-password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15" /></label>
        {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700">{error}</p>}
        <button disabled={creating} className="w-full rounded-full bg-brand-navy px-5 py-3.5 text-xs font-bold text-white transition hover:bg-brand-blue disabled:opacity-60">{creating ? 'Creating account…' : 'Create administrator account'}</button>
      </form>
    </div>
  </section>;
}
