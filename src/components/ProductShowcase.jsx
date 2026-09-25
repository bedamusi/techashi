import React, { useEffect, useState } from 'react';
import { PRODUCT_CATEGORIES } from '../data/techashiData';
import { readProducts } from '../lib/productStore';
import { useCart } from '../context/CartContext';
import { 
  ArrowRight, 
  Laptop, 
  Monitor, 
  ShieldCheck, 
  Network, 
  Headphones, 
  Check, 
} from 'lucide-react';

export default function ProductShowcase({ onOpenQuote, initialCategory = 'all' }) {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadError('');
    readProducts(initialCategory).then((items) => { if (active) setProducts(items); })
      .catch(() => { if (active) setLoadError('The product catalog is temporarily unavailable. Please try again later.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [initialCategory]);

  const activeCategory = initialCategory;
  const isCategoryPage = activeCategory !== 'all';
  const activeCategoryInfo = PRODUCT_CATEGORIES.find((item) => item.id === activeCategory);

  const categoryIcons = {
    laptops: Laptop,
    desktops: Monitor,
    refurbished: Laptop,
    accessories: Headphones,
    cctv: ShieldCheck,
    networking: Network,
    servers: Monitor,
  };

  // Real product and workplace photography for each catalog category.
  const renderProductGraphic = (id) => {
    const categoryPhotos = {
      laptops: {
        src: 'https://images.unsplash.com/photo-1655226569940-b0ed83f6e268?auto=format&fit=crop&w=1200&q=85',
        alt: 'Photograph of a silver laptop on a clean white surface',
      },
      desktops: {
        src: 'https://images.unsplash.com/photo-1634571799202-619a5d4c086e?auto=format&fit=crop&w=1200&q=85',
        alt: 'Photograph of a desktop monitor and computer workspace',
      },
      servers: {
        src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85',
        alt: 'Photograph of a server rack and enterprise computing equipment',
      },
      refurbished: {
        src: 'https://images.unsplash.com/photo-1695480549117-e5b36e4767ca?auto=format&fit=crop&w=1200&q=85',
        alt: 'Photograph of desktop computer equipment in a technology showroom',
      },
      accessories: {
        src: 'https://images.unsplash.com/photo-1708481480582-9793278e36ab?auto=format&fit=crop&w=1200&q=85',
        alt: 'Photograph of a computer desk with keyboard, mouse, and monitor',
      },
      cctv: {
        src: 'https://images.unsplash.com/photo-1686678652918-8b235f8b9415?auto=format&fit=crop&w=1200&q=85',
        alt: 'Photograph of an installed outdoor CCTV camera',
      },
      networking: {
        src: 'https://images.unsplash.com/photo-1698668975271-2ba9a323be6b?auto=format&fit=crop&w=1200&q=85',
        alt: 'Photograph of a managed network switch rack with connected cables',
      },
    };
    const photo = categoryPhotos[id] ?? categoryPhotos.laptops;
    return (
      <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={photo.src}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover blur-xl scale-125 opacity-30 saturate-150 pointer-events-none transform-gpu"
          />
          <div className="absolute inset-0 bg-white/40" />
        </div>
        <img
          src={photo.src}
          alt={photo.alt}
          loading="eager"
          decoding="async"
          className="relative z-10 h-full w-full object-contain p-2 drop-shadow-md transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  };

  const filteredCategories = isCategoryPage ? [] : PRODUCT_CATEGORIES;
  const filteredProducts = products;

  return (
    <section id="products" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-blue mb-3">
            Hardware & Systems
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-brand-navy tracking-tight leading-tight">
            {activeCategoryInfo ? activeCategoryInfo.name.toUpperCase() : 'EXPLORE TECHNOLOGY.'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {activeCategoryInfo?.tagline || 'From brand-new laptops and warranty-tested refurbished PCs to commercial CCTV and networking hardware.'}
          </p>
        </div>

        {!isCategoryPage && <div className="mb-10 flex flex-col justify-between gap-4 border-y border-slate-200 py-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-heading font-bold text-brand-navy">{filteredProducts.length ? `${filteredProducts.length} available products` : 'Your next setup starts here'}</p>
            <p className="mt-1 text-xs text-slate-500">Browse product categories from one public catalog.</p>
          </div>
          <a href="/products" className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-xs font-bold text-brand-navy transition hover:border-brand-blue hover:text-brand-blue">View all products <ArrowRight className="h-3.5 w-3.5" /></a>
        </div>}

        {isCategoryPage && <a href="/products" className="mb-7 inline-flex items-center gap-2 text-xs font-semibold text-brand-blue"><ArrowRight className="h-3.5 w-3.5 rotate-180" /> All product categories</a>}
        {loadError && <p role="alert" className="mb-8 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{loadError}</p>}


        {!loading && !loadError && filteredProducts.length === 0 && isCategoryPage && <div className="border-y border-slate-200 py-16 text-center"><h3 className="font-heading text-xl font-bold text-brand-navy">No products listed yet</h3><p className="mt-2 text-sm text-slate-500">Contact us to ask about {activeCategoryInfo?.name.toLowerCase()}.</p><button onClick={onOpenQuote} className="mt-5 rounded-full bg-brand-navy px-5 py-3 text-xs font-bold text-white">Request a quote</button></div>}
        {filteredProducts.length > 0 && (
          <div className="mb-16">
            <div className="mb-5 flex items-end justify-between"><h3 className="text-2xl font-heading font-bold text-brand-navy">Products</h3><span className="text-xs sm:text-sm text-slate-500">{filteredProducts.length} items</span></div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <article key={product.id} className="overflow-hidden border-y border-slate-200 bg-white transition-colors hover:bg-slate-50">
                  <a
                    href={`/products/${product.category}/${encodeURIComponent(product.id)}`}
                    className="group relative flex aspect-[4/3] sm:aspect-[5/4] w-full items-center justify-center overflow-hidden bg-slate-50/60 p-2 sm:p-3 transition-colors hover:bg-slate-100/50"
                  >
                    {product.images?.[0]?.src ? (
                      <img
                        src={product.images[0].src}
                        alt={product.images[0].name || product.name}
                        className="relative z-10 h-full w-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                        loading="eager"
                        decoding="async"
                      />
                    ) : (
                      <div className="relative z-10 text-sm text-slate-400">Image coming soon</div>
                    )}
                    {product.offer_price != null && Number(product.offer_price) > 0 && (
                      <span className="absolute top-3 right-3 z-20 rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                        Offer
                      </span>
                    )}
                  </a>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-blue">{PRODUCT_CATEGORIES.find((category) => category.id === product.category)?.name}</p>
                    <h4 className="mt-1 font-heading font-bold text-brand-navy">{product.name}</h4>
                    <p className="mt-2 line-clamp-2 text-xs sm:text-sm leading-relaxed text-slate-600">{product.description}</p>
                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      {product.offer_price != null && Number(product.offer_price) > 0 ? (
                        <div className="flex flex-wrap items-baseline gap-1.5">
                          <span className="text-xs text-slate-400 line-through">KES {Number(product.price).toLocaleString()}</span>
                          <span className="font-heading text-sm sm:text-base font-bold text-red-600">KES {Number(product.offer_price).toLocaleString()}</span>
                        </div>
                      ) : (
                        <span className="font-heading text-sm font-bold text-brand-navy">KES {Number(product.price).toLocaleString()}</span>
                      )}
                      <div className="flex items-center gap-2"><a href={`/products/${product.category}/${encodeURIComponent(product.id)}`} className="px-2.5 py-2 text-xs font-semibold text-brand-blue hover:underline">Details</a><button onClick={() => addItem(product)} disabled={product.stock === 0} className="rounded-full bg-brand-navy px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-blue disabled:cursor-not-allowed disabled:bg-slate-300">{product.stock === 0 ? 'Out of stock' : 'Add to bag'}</button></div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Product category guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Laptop;
            return (
              <div
                key={cat.id}
                className="group rounded-3xl bg-slate-50 border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:shadow-premium hover:border-slate-300 transition-all duration-300"
              >
                {/* Card Top Details */}
                <div className="p-8 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full bg-white border border-slate-200 text-brand-blue shadow-2xs">
                      {cat.badge}
                    </span>
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-brand-blue transition-colors" />
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-brand-navy">
                    {cat.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>

                {/* Minimalist Apple Visual Stage */}
                <div className="px-8 py-6 my-auto flex items-center justify-center">
                  <div className="w-full aspect-[16/10] rounded-2xl bg-gradient-to-b from-white to-slate-100/70 border border-slate-200/80 flex items-center justify-center group-hover:scale-[1.02] transition-transform overflow-hidden">
                    {renderProductGraphic(cat.id)}
                  </div>
                </div>

                {/* Specs & Category Action */}
                <div className="p-8 pt-4 border-t border-slate-100 bg-white">
                  <div className="space-y-1.5 mb-6">
                    {cat.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                        <Check className="w-3 h-3 text-brand-green shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={onOpenQuote}
                    className="w-full py-3 rounded-xl bg-slate-50 hover:bg-brand-blue hover:text-white border border-slate-200 hover:border-transparent text-slate-800 text-xs sm:text-sm font-heading font-semibold transition-all flex items-center justify-center gap-1.5 group-hover:bg-brand-blue group-hover:text-white"
                  >
                    <span>Inquire About {cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Note on Authenticity */}
        <div className="mt-12 text-center text-sm text-slate-500">
          Stock availability, custom specifications, and wholesale fleet orders available upon inquiry.
        </div>

      </div>
    </section>
  );
}
