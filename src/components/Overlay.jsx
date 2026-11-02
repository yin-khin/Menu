import { useCallback, useEffect, useRef, useState } from 'react';

const PANEL = {
  center: {
    wrap: 'items-end justify-center sm:items-center p-0 sm:p-4',
    panel: 'w-full max-w-lg rounded-t-[28px] sm:rounded-[28px] max-h-[92vh]',
    on: 'opacity-100 translate-y-0 scale-100',
    off: 'opacity-0 translate-y-8 scale-95',
  },
  right: {
    wrap: 'items-stretch justify-end',
    panel: 'h-full w-full max-w-md',
    on: 'translate-x-0',
    off: 'translate-x-full',
  },
  left: {
    wrap: 'items-stretch justify-start',
    panel: 'h-full w-[85%] max-w-xs',
    on: 'translate-x-0',
    off: '-translate-x-full',
  },
};

const DURATION = 260;

/**
 * Shared modal / drawer shell: dim backdrop, slide or scale animation (in and out),
 * Escape to close, body scroll lock. `children` is a function receiving close(afterFn).
 */
export default function Overlay({ variant = 'center', label, onClose, children }) {
  const [shown, setShown] = useState(false);
  const timer = useRef(null);
  const v = PANEL[variant];

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true));
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer.current);
      document.body.style.overflow = previous;
    };
  }, []);

  const close = useCallback(
    (afterFn) => {
      setShown(false);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        onClose();
        if (typeof afterFn === 'function') afterFn();
      }, DURATION);
    },
    [onClose]
  );

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  return (
    <div className={`fixed inset-0 z-50 flex ${v.wrap}`} role="dialog" aria-modal="true" aria-label={label}>
      <div
        onClick={() => close()}
        className={`absolute inset-0 bg-ink/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`relative flex flex-col overflow-hidden bg-white shadow-2xl transition duration-[260ms] ease-out ${v.panel} ${
          shown ? v.on : v.off
        }`}
      >
        {children(close)}
      </div>
    </div>
  );
}
