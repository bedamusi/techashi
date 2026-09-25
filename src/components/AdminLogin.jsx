import React, { useState } from 'react';
import { LockKeyhole } from 'lucide-react';
import { signInAdmin } from '../lib/adminAuth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInAdmin(email, password);
      const requestedPath = new URLSearchParams(window.location.search).get('next');
      const safeNext = requestedPath?.startsWith('/admin/') && requestedPath !== '/admin/login' ? requestedPath : '/admin/products';
      window.location.replace(safeNext);
    } catch (loginError) {
      setError(loginError.message || 'Sign-in failed. Check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid min-h-[75vh] place-items-center bg-slate-50 px-4 pb-16 pt-28">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft-blue text-brand-blue"><LockKeyhole className="h-5 w-5" /></div>
        <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-blue">Restricted area</p>
        <h1 className="mt-2 text-3xl font-heading font-bold text-brand-navy">Administrator sign-in</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">Sign in with an approved administrator account to manage the product catalog.</p>

        <form onSubmit={submit} className="mt-7 space-y-4">
            <label className="block text-xs font-semibold text-slate-700">Email<input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-brand-blue" /></label>
            <label className="block text-xs font-semibold text-slate-700">Password<input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-brand-blue" /></label>
            {error && <p role="alert" className="rounded-xl bg-red-50 px-3 py-2.5 text-xs text-red-700">{error}</p>}
            <button disabled={loading} className="w-full rounded-full bg-brand-navy px-5 py-3.5 text-xs font-bold text-white transition hover:bg-brand-blue disabled:opacity-60">{loading ? 'Signing in…' : 'Sign in securely'}</button>
        </form>
        <a href="/products" className="mt-6 inline-block text-xs font-semibold text-brand-blue hover:underline">Return to public catalog</a>
      </div>
    </section>
  );
}
