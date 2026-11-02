import { Coffee, Home, Info, LayoutGrid, Phone, Soup, GlassWater, X } from 'lucide-react';
import Overlay from './Overlay';
import { useLanguage } from '../hooks/useLanguage';
import { textClass } from '../utils/detectLanguage';

export default function Sidebar({ onClose, onNavigate }) {
  const { t } = useLanguage();

  const items = [
    { key: 'home', Icon: Home, label: t.sidebar.home, target: { type: 'home' } },
    { key: 'all', Icon: LayoutGrid, label: t.sidebar.all, target: { type: 'category', id: 'all' } },
    { key: 'food', Icon: Soup, label: t.sidebar.food, target: { type: 'category', id: 'food' } },
    { key: 'drinks', Icon: GlassWater, label: t.sidebar.drinks, target: { type: 'category', id: 'drink' } },
    { key: 'coffeeTea', Icon: Coffee, label: t.sidebar.coffeeTea, target: { type: 'category', id: 'coffee-tea' } },
    { key: 'about', Icon: Info, label: t.sidebar.about, target: { type: 'section', id: 'about' } },
    { key: 'contact', Icon: Phone, label: t.sidebar.contact, target: { type: 'section', id: 'contact' } },
  ];

  return (
    <Overlay variant="left" label={t.sidebar.title} onClose={onClose}>
      {(close) => (
        <>
          <div className="flex items-center justify-between bg-brand px-5 py-5 text-white">
            <div>
              <p className="english text-xl font-bold">pailin-Modern Menu</p>
              <p className={`${textClass(t.subtitle)} text-xs text-white/85`}>{t.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => close()}
              aria-label={t.sidebar.close}
              className="flex h-10 w-10 items-center justify-center rounded-pill bg-white/20 transition hover:bg-white/30 active:scale-95"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {items.map(({ key, Icon, label, target }) => (
              <button
                key={key}
                type="button"
                onClick={() => close(() => onNavigate(target))}
                className={`${textClass(label)} flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-base font-medium text-ink transition duration-200 hover:bg-mint hover:text-brand-dark active:scale-[0.98]`}
              >
                <Icon size={20} className="text-brand" />
                {label}
              </button>
            ))}
          </nav>
        </>
      )}
    </Overlay>
  );
}
