import { useState } from 'react';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Overlay from './Overlay';
import { useLanguage } from '../hooks/useLanguage';
import { formatPrice } from '../utils/formatPrice';
import { textClass } from '../utils/detectLanguage';
import { fallbackImage } from '../utils/fallbackImage';

export default function ProductDetailsModal({ product, onClose, onAdd }) {
  const { t, pick } = useLanguage();
  const [qty, setQty] = useState(1);
  const [failed, setFailed] = useState(false);

  const name = pick(product.name);
  const desc = pick(product.desc);
  const src = !product.image || failed ? fallbackImage(product) : product.image;

  return (
    <Overlay variant="center" label={name} onClose={onClose}>
      {(close) => (
        <>
          <div className="relative aspect-square max-h-[48vh] w-full shrink-0 bg-mint-soft sm:max-h-none">
            <img
              src={src}
              alt={name}
              onError={() => setFailed(true)}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => close()}
              aria-label={t.product.close}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-pill bg-white/90 text-ink shadow-soft transition hover:scale-105 active:scale-95"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-3 overflow-y-auto p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className={`${textClass(name)} text-xl font-bold text-ink`}>{name}</h2>
              <span
                className={`${textClass(t.product.available)} shrink-0 rounded-pill px-3 py-1 text-xs font-medium ${
                  product.available ? 'bg-mint text-brand-dark' : 'bg-black text-white'
                }`}
              >
                {product.available ? t.product.available : t.product.soldOut}
              </span>
            </div>
            <p className={`${textClass(desc)} text-sm text-ink-soft`}>{desc}</p>
            <p className="khmer text-2xl font-bold text-brand-dark">{formatPrice(product.price)}</p>

            <div className="flex items-center justify-between gap-4 pt-1">
              <span className={`${textClass(t.product.quantity)} text-sm font-medium text-ink`}>
                {t.product.quantity}
              </span>
              <div className="flex items-center gap-3 rounded-pill bg-mint p-1">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label={t.cart.decrease}
                  className="flex h-10 w-10 items-center justify-center rounded-pill bg-white text-ink shadow-soft transition active:scale-90 disabled:opacity-40"
                >
                  <Minus size={18} />
                </button>
                <span className="english w-6 text-center text-lg font-bold text-ink">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  aria-label={t.cart.increase}
                  className="flex h-10 w-10 items-center justify-center rounded-pill bg-white text-ink shadow-soft transition active:scale-90"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <button
              type="button"
              disabled={!product.available}
              onClick={() => {
                onAdd(product, qty);
                close();
              }}
              className={`${textClass(t.product.addToCart)} flex h-14 w-full items-center justify-center gap-2 rounded-pill bg-brand text-base font-semibold text-white shadow-soft transition duration-200 hover:bg-brand-dark hover:shadow-lift active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-ink-soft/40 disabled:shadow-none`}
            >
              <ShoppingBag size={20} />
              <span>{product.available ? t.product.addToCart : t.product.soldOut}</span>
              {product.available && <span className="khmer">· {formatPrice(product.price * qty)}</span>}
            </button>
          </div>
        </>
      )}
    </Overlay>
  );
}
