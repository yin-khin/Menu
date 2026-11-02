import { Search, X } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { textClass } from '../utils/detectLanguage';

export default function SearchBar({ value, onChange }) {
  const { t } = useLanguage();

  return (
    <div className="relative">
      <Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.search.placeholder}
        aria-label={t.search.placeholder}
        className={`${textClass(value || t.search.placeholder)} h-12 w-full rounded-pill border-2 border-transparent bg-white pl-12 pr-12 text-base text-ink shadow-soft outline-none transition duration-200 placeholder:text-ink-soft/70 focus:border-brand focus:shadow-lift`}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label={t.search.clear}
          className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-pill text-ink-soft transition hover:bg-mint hover:text-ink"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
