import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, PackageSearch, ShoppingBag } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/techashiData';
import { readProduct } from '../lib/productStore';
import { useCart } from '../context/CartContext';

export default function ProductDetail({ categoryId, productId, onOpenQuote }) {
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const category = PRODUCT_CATEGORIES.find((item) => item.id === categoryId);

  useEffect(() => {
    let active = true;
    readProduct(decodeURIComponent(productId), categoryId)
      .then((result) => { if (active) setProduct(result); })
      .catch(() => { if (active) setError('Product details are temporarily unavailable. Please try again later.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [categoryId, productId]);

  if (loading) return <section className="grid min-h-[65vh] place-items-center px-6 pt-24 text-sm text-slate-500">Loading product…</section>;
  if (!product) {
    return (
      <section className="grid min-h-[65vh] place-items-center px-6 pt-24 text-center">
        <div className="max-w-md">
          <PackageSearch className="mx-auto h-9 w-9 text-slate-300" />
          <p className="mt-5 text-xs font-bold uppercase tracking-widest text-brand-blue">{category?.name || 'Product'}</p>
          <h1 className="mt-2 text-3xl font-heading font-bold text-brand-navy">{error || 'Product not found'}</h1>
          <p className="mt-3 text-sm text-slate-500">This product may no longer be listed in the catalog.</p>
          <a href={`/products/${categoryId}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-xs font-semibold text-white"><ArrowLeft className="h-4 w-4" />Browse {category?.name || 'products'}</a>
        </div>
      </section>
    );
  }

  const images = product.images?.length ? product.images : [];
  return (
    <section className="min-h-[75vh] bg-white px-4 pb-20 pt-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <a href={`/products/${categoryId}`} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-brand-blue"><ArrowLeft className="h-4 w-4" />Back to {category?.name}</a>
        <div className="mt-7 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="grid gap-3 sm:grid-cols-2">
            {images.length ? images.map((image, index) => (
              <div key={`${image.path || image.src}-${index}`} className={`flex min-h-64 items-center justify-center overflow-hidden rounded-3xl bg-slate-50 p-5 ${index === 0 ? 'sm:col-span-2 sm:min-h-[460px]' : 'min-h-48'}`}>
                <img src={image.src} alt={image.name || product.name} className="max-h-[520px] w-full object-contain" />
              </div>
            )) : <div className="grid min-h-[360px] place-items-center rounded-3xl bg-slate-50 text-sm text-slate-400 sm:col-span-2">Product photos available on request</div>}
          </div>
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">{category?.name}</p>
            <h1 className="mt-3 text-3xl font-heading font-extrabold tracking-tight text-brand-navy sm:text-5xl">{product.name}</h1>
            <p className="mt-5 text-2xl font-heading font-bold text-brand-navy">KES {Number(product.price).toLocaleString()}</p>
            {product.stock != null && <p className="mt-2 text-xs text-slate-500">{product.stock > 0 ? 'Available' : 'Currently out of stock'}</p>}
            <p className="mt-6 text-sm leading-relaxed text-slate-600">{product.description}</p>
            {!!product.specs?.length && <div className="mt-8 border-t border-slate-200 pt-6"><h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Specifications</h2><ul className="mt-4 space-y-3">{product.specs.map((spec) => <li key={spec} className="flex items-start gap-2.5 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />{spec}</li>)}</ul></div>}
            {product.sku && <p className="mt-6 text-xs text-slate-400">SKU: {product.sku}</p>}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => addItem(product)} disabled={product.stock === 0} className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-7 py-3.5 text-sm font-bold text-white transition hover:bg-brand-blue disabled:cursor-not-allowed disabled:bg-slate-300">{product.stock === 0 ? 'Out of stock' : 'Add to bag'} <ShoppingBag className="h-4 w-4" /></button>
              <button onClick={onOpenQuote} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-3.5 text-sm font-semibold text-brand-navy transition hover:border-brand-blue hover:text-brand-blue">Ask a product question <ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
