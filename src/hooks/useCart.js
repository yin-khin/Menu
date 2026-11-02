import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "pailin-cart";

const readStoredCart = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed)
      ? parsed.filter((i) => i && typeof i.id === "string" && Number(i.qty) > 0)
      : [];
  } catch {
    return [];
  }
};

/**
 * Cart state persisted to localStorage. Only ids + quantities are stored;
 * product details are looked up from the live product list so language
 * changes and price updates always apply.
 */
export function useCart(products) {
  const [lines, setLines] = useState(readStoredCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable: ignore */
    }
  }, [lines]);

  const items = useMemo(() => {
    const byId = new Map(products.map((p) => [p.id, p]));
    return lines
      .map((l) => ({ product: byId.get(l.id), qty: l.qty }))
      .filter((l) => l.product);
  }, [lines, products]);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items],
  );
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [items],
  );
  const total = subtotal; // delivery fee / tax can be added here later

  const addItem = useCallback((id, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === id);
      return found
        ? prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
        : [...prev, { id, qty }];
    });
  }, []);

  const setQty = useCallback((id, qty) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const removeItem = useCallback(
    (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
    [],
  );
  const clear = useCallback(() => setLines([]), []);

  return { items, count, subtotal, total, addItem, setQty, removeItem, clear };
}
