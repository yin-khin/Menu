import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryNavigation from './components/CategoryNavigation';
import ProductGrid from './components/ProductGrid';
import ProductDetailsModal from './components/ProductDetailsModal';
import ShoppingCart from './components/ShoppingCart';
import CheckoutModal from './components/CheckoutModal';
import Sidebar from './components/Sidebar';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';
import { LanguageProvider, useLanguage } from './hooks/useLanguage';
import { useCart } from './hooks/useCart';
import { products } from './data/products';
import { textClass } from './utils/detectLanguage';

function Toast({ message }) {
  if (!message) return null;
  return (
    <div
      className={`${textClass(message)} fixed bottom-24 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-pill bg-ink px-5 py-3 text-sm text-white shadow-lift animate-pop-in`}
      role="status"
    >
      <CheckCircle2 size={18} className="text-brand-bright" />
      {message}
    </div>
  );
}

function AppContent() {
  const { t, pick } = useLanguage();
  const cart = useCart(products);

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);
  const menuRef = useRef(null);

  // Short loading state so the skeletons are visible on first paint.
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const inCategory = category === 'all' || p.category === category;
      const matches = !q || pick(p.name).toLowerCase().includes(q);
      return inCategory && matches;
    });
  }, [category, query, pick]);

  const showToast = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 1800);
  }, []);

  const handleAdd = useCallback(
    (product, qty) => {
      cart.addItem(product.id, qty);
      showToast(`${t.product.added} · ${pick(product.name)}`);
    },
    [cart, showToast, t, pick]
  );

  const resetFilters = () => {
    setQuery('');
    setCategory('all');
  };

  const scrollToMenu = () =>
    requestAnimationFrame(() => menuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));

  const handleNavigate = (target) => {
    if (target.type === 'home') {
      resetFilters();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target.type === 'category') {
      setQuery('');
      setCategory(target.id);
      scrollToMenu();
    } else if (target.type === 'section') {
      document.getElementById(target.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-mint text-ink">
      <Header cartCount={cart.count} onOpenCart={() => setCartOpen(true)} />

      <main className="mx-auto max-w-6xl space-y-4 px-4 pb-4 pt-5 sm:px-6">
        <SearchBar value={query} onChange={setQuery} />
        <div ref={menuRef} className="scroll-mt-24">
          <CategoryNavigation active={category} onSelect={setCategory} onOpenMenu={() => setSidebarOpen(true)} />
        </div>
        <div className="pt-1">
          <ProductGrid products={filtered} loading={loading} onOpen={setSelected} onReset={resetFilters} />
        </div>
      </main>

      <Footer />
      <BackToTop />
      <Toast message={toast} />

      {selected && (
        <ProductDetailsModal key={selected.id} product={selected} onClose={() => setSelected(null)} onAdd={handleAdd} />
      )}
      {cartOpen && (
        <ShoppingCart
          cart={cart}
          onClose={() => setCartOpen(false)}
          onCheckout={() => setCheckoutOpen(true)}
        />
      )}
      {checkoutOpen && (
        <CheckoutModal cart={cart} onClose={() => setCheckoutOpen(false)} onPlaced={cart.clear} />
      )}
      {sidebarOpen && <Sidebar onClose={() => setSidebarOpen(false)} onNavigate={handleNavigate} />}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
