import { Clock, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { textClass } from '../utils/detectLanguage';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2">
        <section id="about" className="scroll-mt-24">
          <h2 className={`${textClass(t.about.title)} mb-2 text-lg font-bold text-brand-bright`}>{t.about.title}</h2>
          <p className={`${textClass(t.about.text)} text-sm text-white/80`}>{t.about.text}</p>
        </section>

        <section id="contact" className="scroll-mt-24">
          <h2 className={`${textClass(t.contact.title)} mb-2 text-lg font-bold text-brand-bright`}>
            {t.contact.title}
          </h2>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-brand-bright" />
              <a href="tel:+85512345678" className="english hover:text-white">
                +855 12 345 678
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0 text-brand-bright" />
              <span className={textClass(t.contact.addressValue)}>{t.contact.addressValue}</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={16} className="shrink-0 text-brand-bright" />
              <span className={textClass(t.hours)}>{t.hours}</span>
            </li>
          </ul>
        </section>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        <span className="english">© {year} pailin-Modern Menu. </span>
        <span className={textClass(t.footer.rights)}>{t.footer.rights}</span>
      </div>
    </footer>
  );
}
