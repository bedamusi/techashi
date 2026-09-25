import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ArrowRight, ChevronRight, ShoppingBag } from 'lucide-react';
import SearchDrawer from './SearchDrawer';
import TechashiLogo from './TechashiLogo';
import { useCart } from '../context/CartContext';

export default function Navbar({ onOpenQuote, onSelectCategory }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeFlyout, setActiveFlyout] = useState(null);
  const { count: cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Product categories strictly aligned with the authentic brief
  const productLinks = [
    {
      id: 'laptops',
      label: 'Laptops',
      href: '/products/laptops',
      flyout: {
        title: 'Laptops & Portable Workstations',
        items: [
          'Brand-New Business Laptops',
          'Quality-Tested Refurbished Laptops',
          'Student & Everyday Portables',
          'Hardware Warranty Included',
        ],
        actionLabel: 'Explore All Laptops',
      }
    },
    {
      id: 'desktops',
      label: 'Desktops',
      href: '/products/desktops',
      flyout: {
        title: 'Desktop PCs & Workstations',
        items: [
          'Tower Office Computers',
          'All-in-One Space-Saving PCs',
          'High-Throughput Workstations',
          'Multi-Monitor Office Setups',
        ],
        actionLabel: 'Explore Desktops',
      }
    },
    {
      id: 'servers',
      label: 'Servers',
      href: '/products/servers',
      flyout: {
        title: 'Business Servers & Storage',
        items: ['Shared business platforms', 'Expandable storage systems', 'Network-ready infrastructure', 'Deployment support'],
        actionLabel: 'Explore Servers',
      }
    },
    {
      id: 'refurbished',
      label: 'Refurbished PCs',
      href: '/products/refurbished',
      flyout: {
        title: 'Certified Refurbished Hardware',
        items: [
          'Certified Multi-Point Tested Desktops',
          'Stress-Tested Refurbished Laptops',
          'Fast SSD & RAM Upgraded Units',
          'Full Warranty Coverage Guaranteed',
        ],
        actionLabel: 'Explore Refurbished PCs',
      }
    },
    {
      id: 'accessories',
      label: 'Accessories',
      href: '/products/accessories',
      flyout: {
        title: 'Peripherals & Gadgets',
        items: [
          'High-Grade Business Monitors',
          'Keyboards, Mice & Docks',
          'Chargers, Cables & Adapters',
          'Phones & Mobile Peripherals',
        ],
        actionLabel: 'Explore Accessories',
      }
    },
    {
      id: 'cctv',
      label: 'CCTV',
      href: '/products/cctv',
      flyout: {
        title: 'CCTV Security & Surveillance',
        items: [
          'HD & 4K Surveillance Cameras',
          'Network Video Recorders (NVR/DVR)',
          'Remote Smartphone Viewing Setup',
          'Installation & Preventative Servicing',
        ],
        actionLabel: 'Explore CCTV Systems',
      }
    },
    {
      id: 'networking',
      label: 'Networking',
      href: '/products/networking',
      flyout: {
        title: 'Enterprise & Office Networking',
        items: [
          'Structured Cabling (Cat6/Cat6A & Fiber)',
          'High-Density WiFi 6 Access Points',
          'Managed Switches & Smart Routers',
          'Hardware Firewalls & Security',
        ],
        actionLabel: 'Explore Networking Equipment',
      }
    },
    {
      id: 'support',
      label: 'Support',
      href: '/support',
      flyout: {
        title: 'PC Maintenance & IT Advisory',
        items: [
          'PC Maintenance & Diagnostic Repair',
          'Hardware Upgrades (RAM, SSD, GPU)',
          'Virus Removal & Servicing Contracts',
          'IT Consultancy & Technology Audits',
        ],
        actionLabel: 'Explore Maintenance & Support',
      }
    },
  ];

  const handleProductClick = (e, item) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setActiveFlyout(null);
    setMobileMenuOpen(false);
    window.location.assign(item.href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'apple-glass py-2 shadow-subtle'
            : 'bg-white/90 sm:bg-white/70 backdrop-blur-md py-3 border-b border-slate-100'
        }`}
        onMouseLeave={() => setActiveFlyout(null)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9 sm:h-10">
            
            {/* Left: Official Techashi Logo — horizontal lockup */}
            <a
              href="/"
              className="flex items-center h-9 sm:h-10 select-none group shrink-0"
              aria-label="Techashi Solutions Home"
            >
              <TechashiLogo
                variant="light"
                className="h-full text-sm sm:text-base"
              />
            </a>

            {/* Center: Apple-Style Product Navigation Bar */}
            <nav className="hidden lg:flex items-center gap-x-3 xl:gap-x-5 2xl:gap-x-7 mx-2 xl:mx-4 shrink min-w-0">
              {productLinks.map((item) => (
                <div
                  key={item.id}
                  className="relative py-2"
                  onMouseEnter={() => setActiveFlyout(item.id)}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleProductClick(e, item)}
                    aria-current={window.location.pathname === item.href ? 'page' : undefined}
                    className={`text-[12px] xl:text-[13.5px] font-normal tracking-tight whitespace-nowrap transition-colors duration-150 ${
                      (activeFlyout === item.id || window.location.pathname === item.href)
                        ? 'text-brand-blue font-semibold'
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </nav>

            {/* Right: Where to Buy / Quote & Search Icon */}
            <div className="hidden sm:flex items-center gap-x-3 xl:gap-x-5 shrink-0">
              <button
                onClick={onOpenQuote}
                className="text-[12px] xl:text-[13.5px] font-normal text-slate-700 hover:text-brand-blue transition-colors duration-150 whitespace-nowrap"
              >
                Where to Buy
              </button>

              <button
                onClick={() => setSearchOpen(true)}
                className="text-slate-600 hover:text-slate-900 transition-colors p-1"
                aria-label="Search products and services"
              >
                <Search className="w-4 h-4 stroke-[1.8]" />
              </button>
              <a href="/cart" aria-label={`Shopping bag, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`} className="relative grid h-9 w-9 place-items-center rounded-full text-slate-700 transition hover:bg-slate-100 hover:text-brand-blue">
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-brand-blue px-1 text-[9px] font-bold text-white">{cartCount > 99 ? '99+' : cartCount}</span>}
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex sm:hidden items-center space-x-2">
              <a href="/cart" aria-label={`Shopping bag, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`} className="relative grid h-9 w-9 place-items-center rounded-full text-slate-700 hover:bg-slate-100">
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-brand-blue px-1 text-[9px] font-bold text-white">{cartCount > 99 ? '99+' : cartCount}</span>}
              </a>
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 text-slate-600 hover:text-slate-900"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-slate-700 hover:text-slate-900"
                aria-label={mobileMenuOpen ? 'Close Navigation' : 'Open Navigation'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Apple-Style Desktop Mega Flyout Panel */}
        {activeFlyout && (
          <div
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-slate-200 shadow-xl transition-all animate-fadeIn"
            onMouseEnter={() => {}}
            onMouseLeave={() => setActiveFlyout(null)}
          >
            <div className="max-w-5xl mx-auto px-8 py-8">
              {(() => {
                const fly = productLinks.find(p => p.id === activeFlyout)?.flyout;
                const link = productLinks.find(p => p.id === activeFlyout);
                if (!fly || !link) return null;
                return (
                  <div className="grid grid-cols-12 gap-8 items-center">
                    <div className="col-span-5 border-r border-slate-100 pr-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                        Techashi Portfolio
                      </span>
                      <h4 className="text-xl font-heading font-bold text-brand-navy mt-1">
                        {fly.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-2">
                        Authentic enterprise-grade hardware, professional installation, and reliable after-sales support.
                      </p>
                      <button
                        onClick={(e) => handleProductClick(e, link)}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-brand-blue hover:text-brand-blue-hover"
                      >
                        <span>{fly.actionLabel}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="col-span-7 grid grid-cols-2 gap-3">
                      {fly.items.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={(e) => handleProductClick(e, link)}
                          className="p-3 rounded-xl bg-slate-50 hover:bg-brand-soft-blue hover:text-brand-blue text-xs font-medium text-slate-700 cursor-pointer transition-colors flex items-center justify-between"
                        >
                          <span>{item}</span>
                          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-brand-navy/60 backdrop-blur-md pt-16 px-4 pb-6 flex flex-col justify-between animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-heading font-bold text-slate-400 uppercase tracking-widest">
                Products & Support
              </span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="flex items-center gap-1.5 text-xs text-brand-blue font-semibold"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>

            <div className="space-y-1">
              {productLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleProductClick(e, item)}
                  aria-current={window.location.pathname === item.href ? 'page' : undefined}
                  className={`flex items-center justify-between py-3 px-2 text-sm font-heading font-medium border-b border-slate-100 last:border-none transition-colors ${window.location.pathname === item.href ? 'text-brand-blue' : 'text-slate-800 hover:text-brand-blue'}`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3 rounded-xl bg-brand-blue text-white font-heading font-semibold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Where to Buy / Request Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          <div className="text-center text-xs text-white/80 py-3">
            <p className="font-heading font-bold">TECHASHI SOLUTIONS L.T.D</p>
            <p className="text-[11px] text-white/60">Technology • Solutions • Support</p>
          </div>
        </div>
      )}

      {/* Apple-Style Interactive Search Drawer */}
      <SearchDrawer
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectCategory={onSelectCategory}
        onOpenQuote={onOpenQuote}
      />
    </>
  );
}
