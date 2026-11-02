import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function BackToTop() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t.backToTop}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-pill bg-brand text-white shadow-lift transition duration-300 hover:bg-brand-dark hover:-translate-y-1 active:scale-95 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <ArrowUp size={22} />
    </button>
  );
}
