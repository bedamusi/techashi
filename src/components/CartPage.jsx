import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, MapPin, Minus, PackageCheck, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { placeOrder, readProducts } from '../lib/productStore';
import { useToast } from '../context/ToastContext';

const money = (amount) => `KES ${Number(amount || 0).toLocaleString('en-KE')}`;
const makeRequestKey = () => window.crypto?.randomUUID?.() || 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (digit) => {
  const random = Math.floor(Math.random() * 16);
  return (digit === 'x' ? random : (random & 0x3) | 0x8).toString(16);
});

export default function CartPage() {
  const { items, setQuantity, removeItem, clearCart } = useCart();
  const notify = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [step, setStep] = useState('cart');
  const [fulfillment, setFulfillment] = useState('delivery');
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [placedOrder, setPlacedOrder] = useState(null);
  const [requestKey, setRequestKey] = useState(makeRequestKey);

  const loadCatalog = () => {
    setLoading(true);
    setLoadError('');
    readProducts().then(setProducts)
      .catch(() => setLoadError('We couldn’t refresh product availability. Check your connection and retry.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadCatalog(); }, []);

  const catalog = useMemo(() => new Map(products.map((product) => [product.id, product])), [products]);
  const lines = items.map((item) => ({ ...item, product: catalog.get(item.productId) }));
  const subtotal = lines.reduce((sum, item) => sum + (item.product ? Number(item.product.price) * item.quantity : 0), 0);
  const hasUnavailable = lines.some((item) => !item.product || (item.product.stock != null && item.quantity > item.product.stock));

  const submitOrder = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      const response = await placeOrder({
        idempotencyKey: requestKey,
        customer: { name: form.name, email: form.email, phone: form.phone, address: fulfillment === 'delivery' ? form.address : '', notes: form.notes },
        fulfillment,
        expectedSubtotal: subtotal,
        items: items.map(({ productId, quantity }) => ({ productId, quantity })),
      });
      setPlacedOrder(response);
      setStep('complete');
      clearCart();
      setRequestKey(makeRequestKey());
      notify(`Order ${response.orderNumber} received successfully.`);
    } catch (error) {
      setSubmitError(error.message || 'We couldn’t place your order. Please try again.');
      notify(error.message || 'We couldn’t place your order. Please try again.', 'error');
      loadCatalog();
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 'complete' && placedOrder) {
    return <section className="min-h-[70vh] bg-[#f5f8fb] px-4 pb-20 pt-28 sm:px-8"><div className="mx-auto max-w-2xl rounded-[28px] bg-white px-6 py-12 text-center shadow-[0_24px_80px_-48px_rgba(6,47,85,.36)] sm:px-12 sm:py-16">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-700"><PackageCheck className="h-8 w-8" /></span>
      <p className="mt-7 text-xs font-bold uppercase tracking-[.18em] text-brand-blue">Order received</p>
      <h1 className="mt-3 text-3xl font-heading font-bold tracking-tight text-brand-navy sm:text-4xl">Thank you, {form.name.split(' ')[0]}.</h1>
      <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-600">Your request is in. A Techashi specialist will confirm availability, delivery details, and payment arrangements with you.</p>
      <div className="mt-8 border-y border-slate-200 py-5 text-left">
        <div className="flex justify-between gap-4 text-sm"><span className="text-slate-500">Order reference</span><strong className="font-heading text-brand-navy">{placedOrder.orderNumber}</strong></div>
        <div className="mt-3 flex justify-between gap-4 text-sm"><span className="text-slate-500">Items total</span><strong className="font-heading text-brand-navy">{money(placedOrder.total)}</strong></div>
        <p className="mt-3 text-xs leading-relaxed text-slate-500">Delivery cost is confirmed separately before dispatch. Payment is arranged directly with Techashi; no payment details were collected on this page.</p>
      </div>
      <a href="/products" className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-blue">Continue browsing <ArrowRight className="h-4 w-4" /></a>
    </div></section>;
  }

  return (
    <section className="min-h-[75vh] bg-[#f5f8fb] px-4 pb-24 pt-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-slate-200 pb-7">
          <a href="/products" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-brand-blue"><ArrowLeft className="h-4 w-4" /> Continue shopping</a>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[.18em] text-brand-blue">Techashi store</p><h1 className="mt-2 text-3xl font-heading font-bold tracking-tight text-brand-navy sm:text-5xl">{step === 'checkout' ? 'Your details.' : 'Your bag.'}</h1></div>
            {step === 'cart' && <p className="text-sm text-slate-500">{items.reduce((n, item) => n + item.quantity, 0)} {items.reduce((n, item) => n + item.quantity, 0) === 1 ? 'item' : 'items'}</p>}
          </div>
          <div className="mt-6 flex max-w-sm items-center gap-3 text-xs font-semibold">
            <span className={`flex items-center gap-2 ${step === 'cart' ? 'text-brand-blue' : 'text-emerald-700'}`}><span className="grid h-6 w-6 place-items-center rounded-full bg-brand-blue text-white">{step === 'checkout' ? <Check className="h-3.5 w-3.5" /> : '1'}</span>Bag</span>
            <span className="h-px flex-1 bg-slate-300" />
            <span className={`flex items-center gap-2 ${step === 'checkout' ? 'text-brand-blue' : 'text-slate-400'}`}><span className={`grid h-6 w-6 place-items-center rounded-full ${step === 'checkout' ? 'bg-brand-blue text-white' : 'bg-slate-200 text-slate-500'}`}>2</span>Checkout</span>
          </div>
        </div>

        {loadError && <div role="alert" className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"><span>{loadError}</span><button onClick={loadCatalog} className="font-semibold underline underline-offset-2">Retry</button></div>}
        {loading && <div className="grid min-h-64 place-items-center text-sm text-slate-500" role="status">Refreshing your bag…</div>}

        {!loading && !items.length && <div className="mt-12 rounded-[28px] bg-white px-6 py-16 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blue-50 text-brand-blue"><ShoppingBag className="h-6 w-6" /></span><h2 className="mt-5 text-2xl font-heading font-bold text-brand-navy">Your bag is ready for something good.</h2><p className="mt-2 text-sm text-slate-500">Explore the catalog and add products you’d like to order.</p><a href="/products" className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white hover:bg-brand-blue">Explore products <ArrowRight className="h-4 w-4" /></a></div>}

        {!loading && items.length > 0 && step === 'cart' && <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white px-4 sm:px-7">
            {lines.map(({ product, productId, quantity }) => product ? (
              <article key={productId} className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[132px_minmax(0,1fr)_auto] sm:gap-6 sm:py-7">
                <a href={`/products/${product.category}/${encodeURIComponent(product.id)}`} className="grid h-24 place-items-center overflow-hidden rounded-2xl bg-slate-50 p-2 sm:h-32">{product.images?.[0]?.src ? <img src={product.images[0].src} alt={product.images[0].name || product.name} className="h-full w-full object-contain" /> : <ShoppingBag className="h-6 w-6 text-slate-300" />}</a>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[.14em] text-brand-blue">{product.category}</p>
                  <a href={`/products/${product.category}/${encodeURIComponent(product.id)}`} className="mt-1 block font-heading text-base font-bold text-brand-navy hover:text-brand-blue sm:text-lg">{product.name}</a>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">{product.description}</p>
                  {product.stock != null && <p className="mt-2 text-[11px] font-medium text-slate-500">{product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>}
                  <div className="mt-4 flex items-center gap-2 sm:hidden">
                    <QuantityControl quantity={quantity} onChange={(next) => setQuantity(productId, next)} max={product.stock ?? 99} />
                    <button onClick={() => removeItem(productId)} aria-label={`Remove ${product.name}`} className="ml-auto rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-between sm:col-span-1 sm:flex-col sm:items-end sm:justify-between sm:py-1">
                  <strong className="font-heading text-sm font-bold text-brand-navy">{money(product.price * quantity)}</strong>
                  <div className="hidden items-center gap-3 sm:flex"><QuantityControl quantity={quantity} onChange={(next) => setQuantity(productId, next)} max={product.stock ?? 99} /><button onClick={() => removeItem(productId)} aria-label={`Remove ${product.name}`} className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div>
                </div>
              </article>
            ) : <div key={productId} className="flex items-center justify-between gap-4 py-6"><div><p className="font-semibold text-brand-navy">This product is no longer available.</p><p className="mt-1 text-xs text-slate-500">Remove it from your bag to continue.</p></div><button onClick={() => removeItem(productId)} className="text-xs font-semibold text-red-600">Remove</button></div>)}
          </div>
          <OrderSummary subtotal={subtotal} onContinue={() => setStep('checkout')} disabled={!items.length || hasUnavailable || !!loadError} />
        </div>}

        {!loading && items.length > 0 && step === 'checkout' && <form onSubmit={submitOrder} className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="space-y-7 rounded-[28px] bg-white p-5 sm:p-8">
            <div><h2 className="text-lg font-heading font-bold text-brand-navy">Contact details</h2><p className="mt-1 text-xs text-slate-500">We’ll use these to confirm your order and coordinate fulfillment.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold text-slate-700">Full name *<input required maxLength={120} autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15" /></label>
              <label className="text-xs font-semibold text-slate-700">Email address *<input required type="email" maxLength={254} autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15" /></label>
              <label className="text-xs font-semibold text-slate-700 sm:col-span-2">Phone / WhatsApp *<input required type="tel" maxLength={40} autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15" /></label>
            </div>
            <fieldset><legend className="text-xs font-semibold text-slate-700">How should we get it to you?</legend><div className="mt-3 grid gap-3 sm:grid-cols-2">
              <FulfillmentOption active={fulfillment === 'delivery'} onClick={() => setFulfillment('delivery')} icon={Truck} title="Deliver to me" text="Delivery details and fee confirmed with you." />
              <FulfillmentOption active={fulfillment === 'pickup'} onClick={() => setFulfillment('pickup')} icon={MapPin} title="I’ll collect" text="We’ll confirm collection location and timing." />
            </div></fieldset>
            {fulfillment === 'delivery' && <label className="block text-xs font-semibold text-slate-700">Delivery address / area *<textarea required maxLength={500} rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Town, neighbourhood, building or delivery instructions" className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15" /></label>}
            <label className="block text-xs font-semibold text-slate-700">Order note <span className="font-normal text-slate-400">(optional)</span><textarea maxLength={1000} rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Anything we should know about this order?" className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15" /></label>
            <div className="flex items-start gap-3 rounded-2xl bg-blue-50/80 p-4 text-xs leading-relaxed text-slate-600"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" /><p><strong className="text-brand-navy">Payment arranged directly.</strong> We’ll verify stock and confirm payment options with you. No card or mobile-money details are collected here.</p></div>
            {submitError && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</p>}
            <button disabled={submitting || hasUnavailable || !!loadError} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-navy px-6 py-4 text-sm font-bold text-white shadow-lg shadow-brand-navy/15 transition hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-50">{submitting ? 'Placing your order…' : 'Place order'} <ArrowRight className="h-4 w-4" /></button>
            <button type="button" onClick={() => setStep('cart')} className="mx-auto flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-brand-blue"><ArrowLeft className="h-3.5 w-3.5" /> Back to bag</button>
          </div>
          <OrderSummary subtotal={subtotal} compact lines={lines} />
        </form>}
      </div>
    </section>
  );
}

function QuantityControl({ quantity, onChange, max }) {
  return <div className="inline-flex h-9 items-center rounded-full border border-slate-200 bg-white">
    <button type="button" onClick={() => onChange(quantity - 1)} aria-label="Decrease quantity" className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-slate-50"><Minus className="h-3.5 w-3.5" /></button>
    <span className="min-w-6 text-center text-xs font-semibold tabular-nums text-brand-navy">{quantity}</span>
    <button type="button" onClick={() => onChange(quantity + 1)} disabled={quantity >= max} aria-label="Increase quantity" className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-slate-50 disabled:opacity-30"><Plus className="h-3.5 w-3.5" /></button>
  </div>;
}

function OrderSummary({ subtotal, onContinue, disabled, compact = false, lines = [] }) {
  return <aside className="rounded-[24px] bg-white p-5 sm:p-6 lg:sticky lg:top-28">
    <h2 className="font-heading text-lg font-bold text-brand-navy">Order summary</h2>
    {compact && <div className="mt-5 max-h-56 space-y-3 overflow-y-auto border-b border-slate-200 pb-4">{lines.filter((line) => line.product).map((line) => <div key={line.productId} className="flex justify-between gap-3 text-xs"><span className="line-clamp-2 text-slate-600">{line.quantity} × {line.product.name}</span><strong className="shrink-0 text-brand-navy">{money(line.product.price * line.quantity)}</strong></div>)}</div>}
    <div className="mt-5 space-y-3 border-b border-slate-200 pb-5 text-sm"><div className="flex justify-between gap-4"><span className="text-slate-500">Items subtotal</span><strong className="text-brand-navy">{money(subtotal)}</strong></div><div className="flex justify-between gap-4"><span className="text-slate-500">Delivery</span><span className="text-right text-xs text-slate-500">Confirmed before dispatch</span></div></div>
    <div className="flex justify-between gap-4 py-5"><span className="font-semibold text-brand-navy">Items total</span><strong className="font-heading text-lg text-brand-navy">{money(subtotal)}</strong></div>
    <p className="mb-5 text-[11px] leading-relaxed text-slate-500">Delivery fee is confirmed with you before dispatch. Total shown covers the products only.</p>
    {onContinue && <button onClick={onContinue} disabled={disabled} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-navy px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-50">Continue to checkout <ArrowRight className="h-4 w-4" /></button>}
    <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400"><ShieldCheck className="h-3.5 w-3.5 text-emerald-700" /> Secure order submission</p>
  </aside>;
}

function FulfillmentOption({ active, onClick, icon: Icon, title, text }) {
  return <button type="button" onClick={onClick} aria-pressed={active} className={`flex min-h-24 items-start gap-3 rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${active ? 'border-brand-blue bg-blue-50/70' : 'border-slate-200 hover:border-slate-300'}`}>
    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${active ? 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-600'}`}><Icon className="h-4 w-4" /></span>
    <span className="min-w-0 flex-1"><strong className="block text-sm text-brand-navy">{title}</strong><span className="mt-1 block text-xs leading-relaxed text-slate-500">{text}</span></span>
    <span className={`mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${active ? 'border-brand-blue bg-brand-blue text-white' : 'border-slate-300'}`}>{active && <CheckCircle2 className="h-3.5 w-3.5" />}</span>
  </button>;
}
