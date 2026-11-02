import { SearchX } from 'lucide-react';
import ProductCard from './ProductCard';
import { useLanguage } from '../hooks/useLanguage';
import { textClass } from '../utils/detectLanguage';

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-card bg-white shadow-soft">
      <div className="skeleton aspect-square w-full animate-shimmer" />
      <div className="space-y-2 p-4">
        <div className="skeleton h-4 w-3/4 animate-shimmer rounded" />
        <div className="skeleton h-3 w-full animate-shimmer rounded" />
        <div className="skeleton h-5 w-1/3 animate-shimmer rounded" />
      </div>
    </div>
  );
}

const GRID = 'grid grid-cols-1 gap-3 xs:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6';

export default function ProductGrid({ products, loading, onOpen, onReset }) {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className={GRID} aria-busy="true">
        {Array.from({ length: 6 }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="animate-fade-in flex flex-col items-center rounded-card bg-white px-6 py-14 text-center shadow-soft">
        <SearchX size={44} className="text-brand" />
        <p className={`${textClass(t.search.empty)} mt-4 text-lg font-semibold text-ink`}>{t.search.empty}</p>
        <p className={`${textClass(t.search.emptyHint)} mt-1 text-sm text-ink-soft`}>{t.search.emptyHint}</p>
        <button
          type="button"
          onClick={onReset}
          className={`${textClass(t.search.resetAll)} mt-5 rounded-pill bg-brand px-6 py-2.5 text-sm font-medium text-white transition hover:bg-brand-dark active:scale-95`}
        >
          {t.search.resetAll}
        </button>
      </div>
    );
  }

  return (
    <div className={GRID}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} onOpen={onOpen} />
      ))}
    </div>
  );
}
