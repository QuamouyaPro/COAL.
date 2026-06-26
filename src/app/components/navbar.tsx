import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';

const EMBER = '#E8500A';

const NAV_LINKS = [
  { label: 'Accueil', to: '/' },
  { label: 'Nos solutions', to: '/produits' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const fire = (event: string) => {
    window.dispatchEvent(new CustomEvent(event));
    setMobileOpen(false);
  };

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-900/60'
          : 'bg-gradient-to-b from-zinc-950/65 to-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <Link
          to="/"
          className="font-black text-xl tracking-tight text-zinc-100 hover:opacity-80 transition-opacity flex-shrink-0"
        >
          COAL<span style={{ color: EMBER }}>.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm tracking-widest uppercase font-medium transition-colors ${
                isActive(to) ? '' : 'text-zinc-400 hover:text-zinc-100'
              }`}
              style={isActive(to) ? { color: EMBER } : undefined}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => fire('coal:open-contact')}
            className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm tracking-widest uppercase font-medium"
          >
            Contact
          </button>
        </nav>

        {/* Desktop CTA */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => fire('coal:open-quiz')}
          className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-zinc-100 text-zinc-950 font-bold text-xs tracking-widest uppercase hover:bg-zinc-300 transition-colors"
        >
          Demander un audit
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-1 text-zinc-400 hover:text-zinc-100 transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-zinc-950/98 border-t border-zinc-900/60"
          >
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm tracking-widest uppercase font-medium transition-colors ${
                    isActive(to) ? '' : 'text-zinc-400'
                  }`}
                  style={isActive(to) ? { color: EMBER } : undefined}
                >
                  {label}
                </Link>
              ))}
              <button
                onClick={() => fire('coal:open-contact')}
                className="text-left text-zinc-400 text-sm tracking-widest uppercase font-medium"
              >
                Contact
              </button>
              <div className="pt-3 border-t border-zinc-900">
                <button
                  onClick={() => fire('coal:open-quiz')}
                  className="flex items-center gap-2 text-sm tracking-widest uppercase font-bold text-zinc-100"
                >
                  Demander un audit
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
