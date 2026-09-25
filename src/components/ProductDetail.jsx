import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Maximize2, PackageSearch, ShoppingBag, X } from 'lucide-react';
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

  if (loading && !product) {
    return <section className="min-h-[75vh] bg-white px-4 pb-20 pt-28 sm:px-8 lg:px-12" />;
  }
  if (!loading && !product) {
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
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const activeImage = images[activeIdx] || images[0];

  return (
    <section className="min-h-[75vh] bg-white px-4 pb-20 pt-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <a href={`/products/${categoryId}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-brand-blue"><ArrowLeft className="h-4 w-4" />Back to {category?.name}</a>
        <div className="mt-7 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            {images.length ? (
              <div className="space-y-4">
                {/* Main Creative Visual Stage with Ambient Canvas Fill */}
                <div className="group relative flex min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] items-center justify-center overflow-hidden rounded-3xl sm:rounded-[2.25rem] border border-slate-200/90 bg-slate-100/80 shadow-xl shadow-brand-navy/5">
                  {/* Ambient Blurred Backdrop - creatively occupies all remaining spaces */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={activeImage.src}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover blur-2xl scale-125 opacity-40 saturate-150 pointer-events-none transform-gpu transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-white/35 backdrop-blur-md" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/30 pointer-events-none" />
                  </div>

                  {/* Foreground Crisp Uncropped Product Image with Physical Shadow */}
                  <img
                    src={activeImage.src}
                    alt={activeImage.name || product.name}
                    className="relative z-10 max-h-[440px] sm:max-h-[480px] w-auto max-w-[92%] object-contain drop-shadow-2xl transition-all duration-500 ease-out group-hover:scale-[1.03] cursor-zoom-in"
                    onClick={() => setIsZoomOpen(true)}
                    loading="eager"
                    decoding="async"
                  />

                  {/* Fullscreen Expand Action */}
                  <button
                    type="button"
                    onClick={() => setIsZoomOpen(true)}
                    className="absolute top-4 right-4 z-20 rounded-full bg-white/85 backdrop-blur-md p-2.5 text-slate-700 shadow-md transition hover:bg-white hover:text-brand-blue hover:scale-105"
                    title="View fullscreen"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>

                  {/* Previous / Next Controls if multiple images */}
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/85 backdrop-blur-md p-2.5 text-slate-700 shadow-md transition hover:bg-white hover:text-brand-blue hover:scale-110"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/85 backdrop-blur-md p-2.5 text-slate-700 shadow-md transition hover:bg-white hover:text-brand-blue hover:scale-110"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                      <span className="absolute bottom-4 right-4 z-20 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white shadow-xs">
                        {activeIdx + 1} / {images.length}
                      </span>
                    </>
                  )}
                </div>

                {/* Thumbnails Strip */}
                {images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-1 pt-1">
                    {images.map((img, idx) => (
                      <button
                        key={`${img.path || img.src}-${idx}`}
                        type="button"
                        onClick={() => setActiveIdx(idx)}
                        className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
                          activeIdx === idx
                            ? 'border-brand-blue ring-2 ring-brand-blue/30 scale-105 shadow-md'
                            : 'border-slate-200/90 opacity-70 hover:opacity-100 hover:border-slate-300'
                        }`}
                      >
                        <div className="absolute inset-0">
                          <img src={img.src} alt="" className="h-full w-full object-cover blur-xs opacity-35" />
                        </div>
                        <img src={img.src} alt="" className="relative z-10 h-full w-full object-contain p-1" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid min-h-[380px] sm:min-h-[460px] place-items-center rounded-3xl bg-slate-50 text-sm text-slate-400">
                Product photos available on request
              </div>
            )}
          </div>
          <div className="lg:sticky lg:top-28">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-brand-blue">{category?.name}</p>
            <h1 className="mt-3 text-3xl font-heading font-extrabold tracking-tight text-brand-navy sm:text-5xl">{product.name}</h1>
            {product.offer_price != null && Number(product.offer_price) > 0 ? (
              <div className="mt-5 flex flex-wrap items-baseline gap-3">
                <span className="text-xl sm:text-2xl text-slate-400 line-through">KES {Number(product.price).toLocaleString()}</span>
                <span className="text-3xl sm:text-4xl font-heading font-extrabold text-red-600">KES {Number(product.offer_price).toLocaleString()}</span>
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                  Special Offer · Save KES {(Number(product.price) - Number(product.offer_price)).toLocaleString()}
                </span>
              </div>
            ) : (
              <p className="mt-5 text-2xl font-heading font-bold text-brand-navy">KES {Number(product.price).toLocaleString()}</p>
            )}
            {product.stock != null && <p className="mt-2 text-sm font-medium text-slate-600">{product.stock > 0 ? 'Available' : 'Currently out of stock'}</p>}
            <p className="mt-6 text-base leading-relaxed text-slate-700">{product.description}</p>
            {!!product.specs?.length && <div className="mt-8 border-t border-slate-200 pt-6"><h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">Specifications</h2><ul className="mt-4 space-y-3">{product.specs.map((spec) => <li key={spec} className="flex items-start gap-2.5 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />{spec}</li>)}</ul></div>}
            {product.sku && <p className="mt-6 text-xs sm:text-sm text-slate-500">SKU: {product.sku}</p>}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => addItem(product)} disabled={product.stock === 0} className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-7 py-3.5 text-sm font-bold text-white transition hover:bg-brand-blue disabled:cursor-not-allowed disabled:bg-slate-300">{product.stock === 0 ? 'Out of stock' : 'Add to bag'} <ShoppingBag className="h-4 w-4" /></button>
              <button onClick={onOpenQuote} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-3.5 text-sm font-semibold text-brand-navy transition hover:border-brand-blue hover:text-brand-blue">Ask a product question <ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        {isZoomOpen && activeImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-lg animate-in fade-in duration-200"
            onClick={() => setIsZoomOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-5 right-5 z-50 rounded-full bg-white/20 p-3 text-white backdrop-blur-md transition hover:bg-white/30"
              aria-label="Close fullscreen"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
              <img
                src={activeImage.src}
                alt={activeImage.name || product.name}
                className="max-h-[88vh] max-w-[88vw] rounded-2xl object-contain shadow-2xl"
              />
              {images.length > 1 && (
                <div className="mt-3 text-center text-sm font-medium text-white/80">
                  {activeIdx + 1} of {images.length}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
