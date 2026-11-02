import { Clock, ShoppingCart } from 'lucide-react';
import { LANGUAGES, useLanguage } from '../hooks/useLanguage';
import { flags } from '../assets/icons/Flags';
import { textClass } from '../utils/detectLanguage';

export default function Header({ cartCount, onOpenCart }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-mint/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <h1 className="english truncate text-xl font-bold leading-tight text-ink sm:text-2xl">
            pailin-Modern Menu
          </h1>
          <p className={`${textClass(t.subtitle)} truncate text-xs text-ink-soft sm:text-sm`}>
            {t.subtitle}
          </p>
          <p className={`${textClass(t.hours)} mt-0.5 flex items-center gap-1 text-[11px] text-brand-dark sm:text-xs`}>
            <Clock size={13} className="shrink-0" />
            <span className="truncate">{t.hours}</span>
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2" role="group" aria-label="Language">
            {LANGUAGES.map((code) => {
              const Flag = flags[code];
              const active = lang === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={active}
                  aria-label={code}
                  title={code.toUpperCase()}
                  className={`h-6 w-9 overflow-hidden rounded-md shadow-soft transition duration-200 hover:-translate-y-0.5 sm:h-7 sm:w-10 ${
                    active ? 'ring-2 ring-brand ring-offset-2 ring-offset-mint' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Flag />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={t.cartButton}
            className="relative flex h-11 w-11 items-center justify-center rounded-pill bg-white text-ink shadow-soft transition duration-200 hover:scale-105 hover:shadow-lift active:scale-95"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="english absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-pill bg-brand px-1 text-[11px] font-bold text-white animate-pop-in">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
