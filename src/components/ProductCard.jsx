import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { formatPrice } from '../utils/formatPrice';
import { textClass } from '../utils/detectLanguage';
import { fallbackImage } from '../utils/fallbackImage';

export default function ProductCard({ product, index, onOpen }) {
  const { t, pick } = useLanguage();
  const [failed, setFailed] = useState(false);

  const name = pick(product.name);
  const desc = pick(product.desc);
  const src = !product.image || failed ? fallbackImage(product) : product.image;

  return (
    <button
      type="button"
      onClick={() => onOpen(product)}
      style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
      className="group animate-fade-up overflow-hidden rounded-card bg-white text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-mint-soft">
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition duration-500 group-hover:scale-110 ${
            product.available ? '' : 'grayscale'
          }`}
        />
        <span
          className={`${textClass(product.available ? t.product.available : t.product.soldOut)} absolute left-3 top-3 rounded-pill px-3 py-1 text-xs font-medium shadow-soft ${
            product.available ? 'bg-white/90 text-brand-dark' : 'bg-black/80 text-white'
          }`}
        >
          {product.available ? t.product.available : t.product.soldOut}
        </span>
      </div>

      <div className="p-3 sm:p-4">
        <h3 className={`${textClass(name)} line-clamp-2 min-h-[3.2em] text-base font-semibold text-ink sm:text-lg`}>
          {name}
        </h3>
        <p className={`${textClass(desc)} mt-0.5 line-clamp-2 text-xs text-ink-soft sm:text-sm`}>{desc}</p>
        <p className="khmer mt-2 text-lg font-bold text-brand-dark">{formatPrice(product.price)}</p>
      </div>
    </button>
  );
}
