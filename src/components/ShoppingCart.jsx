import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import Overlay from './Overlay';
import { useLanguage } from '../hooks/useLanguage';
import { formatPrice } from '../utils/formatPrice';
import { textClass } from '../utils/detectLanguage';
import { fallbackImage } from '../utils/fallbackImage';

function CartLine({ product, qty, onSetQty, onRemove }) {
  const { t, pick } = useLanguage();
  const name = pick(product.name);

  return (
    <li className="flex gap-3 rounded-2xl bg-mint/60 p-3 animate-fade-in">
      <img
        src={product.image || fallbackImage(product)}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallbackImage(product);
        }}
        alt={name}
        className="h-20 w-20 shrink-0 rounded-xl object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <p className={`${textClass(name)} line-clamp-2 text-sm font-semibold text-ink`}>{name}</p>
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            aria-label={t.cart.remove}
            className="shrink-0 rounded-full p-1.5 text-ink-soft transition hover:bg-white hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="khmer text-sm font-bold text-brand-dark">{formatPrice(product.price * qty)}</span>
          <div className="flex items-center gap-1.5 rounded-pill bg-white p-1">
            <button
              type="button"
              onClick={() => onSetQty(product.id, qty - 1)}
              aria-label={t.cart.decrease}
              className="flex h-8 w-8 items-center justify-center rounded-pill bg-mint text-ink transition active:scale-90"
            >
              <Minus size={14} />
            </button>
            <span className="english w-5 text-center text-sm font-bold">{qty}</span>
            <button
              type="button"
              onClick={() => onSetQty(product.id, qty + 1)}
              aria-label={t.cart.increase}
              className="flex h-8 w-8 items-center justify-center rounded-pill bg-mint text-ink transition active:scale-90"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function ShoppingCart({ cart, onClose, onCheckout }) {
  const { t } = useLanguage();
  const { items, count, subtotal, total } = cart;

  return (
    <Overlay variant="right" label={t.cart.title} onClose={onClose}>
      {(close) => (
        <>
          <div className="flex items-center justify-between border-b border-mint px-5 py-4">
            <h2 className={`${textClass(t.cart.title)} flex items-center gap-2 text-lg font-bold text-ink`}>
              <ShoppingBag size={22} className="text-brand" />
              {t.cart.title}
              {count > 0 && (
                <span className="english rounded-pill bg-brand px-2 py-0.5 text-xs text-white">{count}</span>
              )}
            </h2>
            <button
              type="button"
              onClick={() => close()}
              aria-label={t.cart.close}
              className="flex h-10 w-10 items-center justify-center rounded-pill bg-mint text-ink transition hover:scale-105 active:scale-95"
            >
              <X size={20} />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-mint">
                <ShoppingBag size={40} className="text-brand" />
              </div>
              <p className={`${textClass(t.cart.empty)} mt-4 text-lg font-semibold text-ink`}>{t.cart.empty}</p>
              <p className={`${textClass(t.cart.emptyHint)} mt-1 text-sm text-ink-soft`}>{t.cart.emptyHint}</p>
              <button
                type="button"
                onClick={() => close()}
                className={`${textClass(t.cart.continue)} mt-6 rounded-pill bg-brand px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark active:scale-95`}
              >
                {t.cart.continue}
              </button>
            </div>
          ) : (
            <>
              <ul className="flex-1 space-y-3 overflow-y-auto p-4">
                {items.map(({ product, qty }) => (
                  <CartLine
                    key={product.id}
                    product={product}
                    qty={qty}
                    onSetQty={cart.setQty}
                    onRemove={cart.removeItem}
                  />
                ))}
              </ul>

              <div className="space-y-3 border-t border-mint bg-white p-4">
                <div className="flex items-center justify-between text-sm text-ink-soft">
                  <span className={textClass(t.cart.subtotal)}>{t.cart.subtotal}</span>
                  <span className="khmer">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-lg font-bold text-ink">
                  <span className={textClass(t.cart.total)}>{t.cart.total}</span>
                  <span className="khmer text-brand-dark">{formatPrice(total)}</span>
                </div>

                <button
                  type="button"
                  onClick={() => close(onCheckout)}
                  className={`${textClass(t.cart.checkout)} h-14 w-full rounded-pill bg-brand text-base font-semibold text-white shadow-soft transition hover:bg-brand-dark hover:shadow-lift active:scale-[0.98]`}
                >
                  {t.cart.checkout}
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => close()}
                    className={`${textClass(t.cart.continue)} h-11 flex-1 rounded-pill bg-mint text-sm font-medium text-ink transition hover:bg-mint-soft active:scale-95`}
                  >
                    {t.cart.continue}
                  </button>
                  <button
                    type="button"
                    onClick={cart.clear}
                    className={`${textClass(t.cart.clear)} flex h-11 flex-1 items-center justify-center gap-1.5 rounded-pill border border-red-200 text-sm font-medium text-red-500 transition hover:bg-red-50 active:scale-95`}
                  >
                    <Trash2 size={15} />
                    {t.cart.clear}
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </Overlay>
  );
}
