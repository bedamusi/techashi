import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import LocalNav from './components/LocalNav';
import Hero from './components/Hero';
import HighlightsSection from './components/HighlightsSection';
import InteractiveEcosystem from './components/InteractiveEcosystem';
import CapabilityHighlights from './components/CapabilityHighlights';
import DigitalSolutions from './components/DigitalSolutions';
import CinematicBrandMoment from './components/CinematicBrandMoment';
import HowWeWork from './components/HowWeWork';
import ProductShowcase from './components/ProductShowcase';
import { PRODUCT_CATEGORIES } from './data/techashiData';
import ProductManagement from './components/ProductManagement';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import OrderManagement from './components/OrderManagement';
import AdminRoute from './components/AdminRoute';
import AdminLogin from './components/AdminLogin';
import AdminAccountCreate from './components/AdminAccountCreate';
import ServiceDirectory from './components/ServiceDirectory';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import MobileQuickBar from './components/MobileQuickBar';
import QuoteModal from './components/QuoteModal';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

function HomePage({ onOpenQuote, selectedProductCategory, onSelectCategory }) {
  return <>
    <Hero onOpenQuote={onOpenQuote} />
    <HighlightsSection onOpenQuote={onOpenQuote} />
    <InteractiveEcosystem onOpenQuote={onOpenQuote} />
    <CapabilityHighlights onOpenQuote={onOpenQuote} />
    <DigitalSolutions onOpenQuote={onOpenQuote} />
    <CinematicBrandMoment />
    <HowWeWork onOpenQuote={onOpenQuote} />
    <ProductShowcase onOpenQuote={onOpenQuote} activeCategory={selectedProductCategory} onSelectCategory={onSelectCategory} />
    <FinalCTA onOpenQuote={onOpenQuote} />
  </>;
}

function RouteContent({ path, onOpenQuote, selectedProductCategory, onSelectCategory }) {
  if (path === '/') return <HomePage onOpenQuote={onOpenQuote} selectedProductCategory={selectedProductCategory} onSelectCategory={onSelectCategory} />;
  if (path === '/highlights') return <HighlightsSection onOpenQuote={onOpenQuote} />;
  if (path === '/solutions') return <CapabilityHighlights onOpenQuote={onOpenQuote} />;
  if (path === '/ecosystem') return <InteractiveEcosystem onOpenQuote={onOpenQuote} />;
  if (path === '/products') return <ProductShowcase key={path} onOpenQuote={onOpenQuote} initialCategory="all" />;
  if (path === '/cart') return <CartPage />;
  if (path.startsWith('/products/')) {
    const [, , categoryId, productId, ...extra] = path.split('/');
    const categoryExists = PRODUCT_CATEGORIES.some((category) => category.id === categoryId);
    if (!categoryExists || extra.length) return <NotFound />;
    if (productId) return <ProductDetail key={path} categoryId={categoryId} productId={productId} onOpenQuote={onOpenQuote} />;
    return <ProductShowcase key={path} onOpenQuote={onOpenQuote} initialCategory={categoryId} />;
  }
  if (path === '/admin') return <AdminRedirect />;
  if (path === '/admin/login') return <AdminLogin />;
  if (path === '/admin/accounts') return <AdminRoute><AdminAccountCreate /></AdminRoute>;
  if (path === '/admin/products') return <AdminRoute><ProductManagement /></AdminRoute>;
  if (path === '/admin/orders') return <AdminRoute><OrderManagement /></AdminRoute>;
  if (path === '/support') return <ServiceDirectory onOpenQuote={onOpenQuote} />;
  if (path === '/about') return <NotFound />;
  return <NotFound />;
}

function AdminRedirect() {
  useEffect(() => { window.location.replace('/admin/products'); }, []);
  return <div className="grid min-h-[60vh] place-items-center px-6 pt-28 text-sm text-slate-500" role="status">Opening product management…</div>;
}

function NotFound() {
  return <section className="grid min-h-[65vh] place-items-center px-6 pt-24 text-center"><div><p className="text-xs font-bold uppercase tracking-widest text-brand-blue">404 · Page not found</p><h1 className="mt-4 text-4xl font-heading font-bold text-brand-navy">This page isn’t here.</h1><a href="/" className="mt-6 inline-block rounded-full bg-brand-navy px-5 py-3 text-xs font-semibold text-white">Back to home</a></div></section>;
}

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const handleOpenQuote = () => setIsQuoteOpen(true);
  const handleCloseQuote = () => setIsQuoteOpen(false);

  return (
    <ToastProvider>
    <CartProvider>
      <div className="relative min-h-screen bg-white text-brand-charcoal selection:bg-brand-blue selection:text-white">
        <Navbar onOpenQuote={handleOpenQuote} />
        <LocalNav onOpenQuote={handleOpenQuote} />
        <main key={path} className="page-route-enter">
          <RouteContent path={path} onOpenQuote={handleOpenQuote} />
        </main>
        <Footer onOpenQuote={handleOpenQuote} />
        {path !== '/cart' && !path.startsWith('/admin') && <MobileQuickBar onOpenQuote={handleOpenQuote} />}
        <QuoteModal isOpen={isQuoteOpen} onClose={handleCloseQuote} />
      </div>
    </CartProvider>
    </ToastProvider>
  );
}
