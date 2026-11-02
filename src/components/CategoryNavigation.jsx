import { useRef } from 'react';
import { Menu } from 'lucide-react';
import { categories } from '../data/categories';
import { useLanguage } from '../hooks/useLanguage';
import { textClass } from '../utils/detectLanguage';

export default function CategoryNavigation({ active, onSelect, onOpenMenu }) {
  const { t } = useLanguage();
  const scroller = useRef(null);
  const drag = useRef({ down: false, moved: false, startX: 0, startScroll: 0 });

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return; // touch uses native scrolling
    drag.current = { down: true, moved: false, startX: e.clientX, startScroll: scroller.current.scrollLeft };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 4) d.moved = true;
    scroller.current.scrollLeft = d.startScroll - dx;
  };

  const endDrag = () => {
    drag.current.down = false;
  };

  const handleClick = (e, id) => {
    if (drag.current.moved) {
      drag.current.moved = false;
      e.preventDefault();
      return; // it was a drag, not a click
    }
    onSelect(id);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label={t.menuButton}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-white text-ink shadow-soft transition duration-200 hover:scale-105 active:scale-95"
      >
        <Menu size={20} />
      </button>

      <div
        ref={scroller}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="no-scrollbar -my-2 flex min-w-0 flex-1 cursor-grab select-none gap-2 overflow-x-auto scroll-smooth py-2 active:cursor-grabbing"
        role="tablist"
      >
        {categories.map((cat) => {
          const label = t.categories[cat.labelKey];
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={(e) => handleClick(e, cat.id)}
              className={`${textClass(label)} h-11 shrink-0 whitespace-nowrap rounded-pill px-5 text-sm font-medium shadow-soft transition duration-200 ${
                isActive
                  ? 'bg-black text-brand-bright'
                  : 'bg-white text-ink hover:-translate-y-0.5 hover:shadow-lift'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
