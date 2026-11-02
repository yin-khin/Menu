import { useState } from 'react';
import { Banknote, CheckCircle2, QrCode, X } from 'lucide-react';
import Overlay from './Overlay';
import { useLanguage } from '../hooks/useLanguage';
import { formatPrice } from '../utils/formatPrice';
import { textClass } from '../utils/detectLanguage';

const ORDERS_KEY = 'pailin-orders';

/** Normalises Cambodian numbers (+855 / 855 / 0xx) and checks length. */
const isValidPhone = (value) => {
  let digits = value.replace(/[\s\-().]/g, '');
  if (!/^\+?\d+$/.test(digits)) return false;
  digits = digits.replace('+', '');
  if (digits.startsWith('855')) digits = `0${digits.slice(3)}`;
  return digits.length >= 8 && digits.length <= 10;
};

const validate = (form, t) => {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = t.checkout.nameErr;
  if (!isValidPhone(form.phone.trim())) errors.phone = t.checkout.phoneErr;
  if (form.address.trim().length < 5) errors.address = t.checkout.addressErr;
  return errors;
};

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className={`${textClass(label)} mb-1.5 block text-sm font-medium text-ink`}>
        {label}
      </label>
      {children}
      {error && <p className={`${textClass(error)} mt-1 text-xs text-red-500`}>{error}</p>}
    </div>
  );
}

const inputClass = (hasError, value) =>
  `${textClass(value)} w-full rounded-2xl border-2 bg-mint/50 px-4 py-3 text-base text-ink outline-none transition focus:bg-white ${
    hasError ? 'border-red-300 focus:border-red-400' : 'border-transparent focus:border-brand'
  }`;

export default function CheckoutModal({ cart, onClose, onPlaced }) {
  const { t, pick } = useLanguage();
  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '' });
  const [payment, setPayment] = useState('cash');
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(form, t);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const placed = {
      number: `PL${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      customer: { ...form, name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim() },
      payment,
      total: cart.total,
      items: cart.items.map(({ product, qty }) => ({
        id: product.id,
        name: product.name.en,
        qty,
        price: product.price,
      })),
    };

    try {
      const history = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
      localStorage.setItem(ORDERS_KEY, JSON.stringify([placed, ...history].slice(0, 50)));
    } catch {
      /* storage unavailable: ignore */
    }

    setOrder(placed);
    onPlaced(); // clears the cart
  };

  if (order) {
    return (
      <Overlay variant="center" label={t.checkout.successTitle} onClose={onClose}>
        {(close) => (
          <div className="flex flex-col items-center p-8 text-center">
            <CheckCircle2 size={64} className="text-brand animate-pop-in" />
            <h2 className={`${textClass(t.checkout.successTitle)} mt-4 text-2xl font-bold text-ink`}>
              {t.checkout.successTitle}
            </h2>
            <p className={`${textClass(t.checkout.successMsg)} mt-2 text-sm text-ink-soft`}>{t.checkout.successMsg}</p>
            <p className="mt-5 rounded-pill bg-mint px-5 py-2 text-sm text-ink">
              <span className={textClass(t.checkout.orderNo)}>{t.checkout.orderNo}: </span>
              <span className="english font-bold">{order.number}</span>
            </p>
            <button
              type="button"
              onClick={() => close()}
              className={`${textClass(t.checkout.done)} mt-6 h-12 w-full rounded-pill bg-brand font-semibold text-white transition hover:bg-brand-dark active:scale-[0.98]`}
            >
              {t.checkout.done}
            </button>
          </div>
        )}
      </Overlay>
    );
  }

  return (
    <Overlay variant="center" label={t.checkout.title} onClose={onClose}>
      {(close) => (
        <form onSubmit={submit} noValidate className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-mint px-5 py-4">
            <h2 className={`${textClass(t.checkout.title)} text-lg font-bold text-ink`}>{t.checkout.title}</h2>
            <button
              type="button"
              onClick={() => close()}
              aria-label={t.product.close}
              className="flex h-10 w-10 items-center justify-center rounded-pill bg-mint text-ink transition hover:scale-105 active:scale-95"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            <Field id="co-name" label={t.checkout.name} error={errors.name}>
              <input
                id="co-name"
                value={form.name}
                onChange={update('name')}
                placeholder={t.checkout.namePh}
                autoComplete="name"
                className={inputClass(errors.name, form.name)}
              />
            </Field>
            <Field id="co-phone" label={t.checkout.phone} error={errors.phone}>
              <input
                id="co-phone"
                type="tel"
                inputMode="tel"
                value={form.phone}
                onChange={update('phone')}
                placeholder={t.checkout.phonePh}
                autoComplete="tel"
                className={inputClass(errors.phone, form.phone)}
              />
            </Field>
            <Field id="co-address" label={t.checkout.address} error={errors.address}>
              <textarea
                id="co-address"
                rows={2}
                value={form.address}
                onChange={update('address')}
                placeholder={t.checkout.addressPh}
                autoComplete="street-address"
                className={`${inputClass(errors.address, form.address)} resize-none`}
              />
            </Field>
            <Field id="co-note" label={t.checkout.note}>
              <textarea
                id="co-note"
                rows={2}
                value={form.note}
                onChange={update('note')}
                placeholder={t.checkout.notePh}
                className={`${inputClass(false, form.note)} resize-none`}
              />
            </Field>

            <fieldset>
              <legend className={`${textClass(t.checkout.payment)} mb-2 text-sm font-medium text-ink`}>
                {t.checkout.payment}
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'cash', Icon: Banknote, label: t.checkout.cash, hint: t.checkout.cashHint },
                  { id: 'khqr', Icon: QrCode, label: t.checkout.khqr, hint: t.checkout.khqrHint },
                ].map(({ id, Icon, label, hint }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPayment(id)}
                    aria-pressed={payment === id}
                    className={`rounded-2xl border-2 p-3 text-left transition duration-200 ${
                      payment === id ? 'border-brand bg-mint' : 'border-mint bg-white hover:border-mint-soft'
                    }`}
                  >
                    <Icon size={22} className={payment === id ? 'text-brand-dark' : 'text-ink-soft'} />
                    <p className={`${textClass(label)} mt-1 text-sm font-semibold text-ink`}>{label}</p>
                    <p className={`${textClass(hint)} text-[11px] leading-snug text-ink-soft`}>{hint}</p>
                  </button>
                ))}
              </div>

              {payment === 'khqr' && (
                <div className="mt-3 flex items-center gap-3 rounded-2xl border-2 border-dashed border-brand/50 bg-mint/50 p-3 animate-fade-in">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white">
                    <QrCode size={40} className="text-ink-soft/50" />
                  </div>
                  <p className={`${textClass(t.checkout.khqrNotice)} text-xs text-ink-soft`}>
                    {t.checkout.khqrNotice}
                  </p>
                </div>
              )}
            </fieldset>

            <div>
              <p className={`${textClass(t.checkout.summary)} mb-2 text-sm font-medium text-ink`}>
                {t.checkout.summary}
              </p>
              <ul className="space-y-2 rounded-2xl bg-mint/50 p-3">
                {cart.items.map(({ product, qty }) => {
                  const name = pick(product.name);
                  return (
                    <li key={product.id} className="flex items-center justify-between gap-3 text-sm">
                      <span className={`${textClass(name)} min-w-0 truncate text-ink`}>
                        <span className="english font-bold">{qty}×</span> {name}
                      </span>
                      <span className="khmer shrink-0 text-ink-soft">{formatPrice(product.price * qty)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="border-t border-mint p-4">
            <div className="mb-3 flex items-center justify-between text-lg font-bold text-ink">
              <span className={textClass(t.cart.total)}>{t.cart.total}</span>
              <span className="khmer text-brand-dark">{formatPrice(cart.total)}</span>
            </div>
            <button
              type="submit"
              className={`${textClass(t.checkout.placeOrder)} h-14 w-full rounded-pill bg-brand text-base font-semibold text-white shadow-soft transition hover:bg-brand-dark hover:shadow-lift active:scale-[0.98]`}
            >
              {t.checkout.placeOrder}
            </button>
          </div>
        </form>
      )}
    </Overlay>
  );
}
