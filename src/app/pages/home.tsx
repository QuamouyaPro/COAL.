import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, Search, Zap, Gauge, Check, X, Shield, ArrowRight } from 'lucide-react';
import coalImage from '../../imports/Gemini_Generated_Image_wio0tawio0tawio0.png';
import coalImageClean from '../../imports/Gemini_Generated_Image_syac7isyac7isyac.png';
import coalImageCTA from '../../imports/bg_final_cta.png';
import coalImageSection3 from '../../imports/bg_section3.PNG';
import coalLogo from '../../imports/logo_with_COAL.png';
import coalLogoClean from '../../imports/logo_without_COAL.png';
import { QuizFunnel } from '../components/quiz-funnel';
import { ContactModal } from '../components/contact-modal';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showLogo, setShowLogo] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setShowLogo(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
      {/* Fixed Logo — appears when scrolled past hero */}
      <div
        className="fixed top-6 left-6 z-50 flex items-center gap-3"
        onMouseEnter={() => setLogoHover(true)}
        onMouseLeave={() => setLogoHover(false)}
      >
        <motion.div
          className="h-12 overflow-hidden"
          initial={false}
          animate={{
            maxWidth: showLogo ? 200 : 0,
            marginRight: showLogo ? 0 : -12,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative h-12 cursor-pointer"
            initial={false}
            animate={{
              opacity: showLogo ? 1 : 0,
              y: showLogo ? 0 : -12,
              scale: showLogo ? 1 : 0.9,
              pointerEvents: showLogo ? 'auto' : 'none',
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={coalLogo}
              alt="COAL"
              className="h-12 w-auto block transition-opacity duration-300"
              style={{ opacity: logoHover ? 0 : 1 }}
            />
            <img
              src={coalLogoClean}
              alt=""
              className="h-12 w-auto absolute top-0 left-0 transition-opacity duration-300"
              style={{ opacity: logoHover ? 1 : 0 }}
            />
          </motion.div>
        </motion.div>
        <motion.span
          className="font-black text-2xl tracking-tight text-zinc-100 whitespace-nowrap"
          initial={false}
          animate={{
            opacity: !showLogo || logoHover ? 1 : 0,
            x: !showLogo || logoHover ? 0 : -8,
            letterSpacing: !showLogo || logoHover ? '-0.02em' : '0.1em',
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          COAL<span style={{ color: '#E8500A' }}>.</span>
        </motion.span>
      </div>

      {/* Fixed Nav — top right */}
      <motion.div
        className="fixed top-6 right-6 z-50 flex items-center gap-6"
        initial={false}
        animate={{ opacity: showLogo ? 1 : 0, y: showLogo ? 0 : -8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          to="/produits"
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors text-sm tracking-widest uppercase font-medium"
        >
          Nos produits
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={() => setContactOpen(true)}
          className="text-zinc-500 hover:text-zinc-100 transition-colors text-sm tracking-widest uppercase font-medium"
        >
          Contact
        </button>
      </motion.div>

      {/* Hero Section */}
      <section id="contenu" className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden">
        {/* Dynamic Background Image — COAL reveal effect */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ opacity, scale }}
        >
          {/* Base layer: charbon AVEC écriture COAL (révélé au curseur) */}
          <div
            className="absolute inset-0 bg-no-repeat [background-size:100%_auto] [background-position:center_40%] md:[background-size:cover] md:[background-position:center]"
            style={{
              backgroundImage: `url(${coalImage})`,
            }}
          />
          {/* Top layer: charbon SANS écriture (masqué au curseur) */}
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              backgroundImage: `url(${coalImageClean})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maskImage: `radial-gradient(circle 180px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, rgba(0,0,0,0.3) 40%, black 80%)`,
              WebkitMaskImage: `radial-gradient(circle 180px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, rgba(0,0,0,0.3) 40%, black 80%)`,
            }}
          />
          {/* Darkening overlay — pierced by the cursor to reveal the image (desktop only) */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/60 to-zinc-950 pointer-events-none hidden md:block"
            style={{
              maskImage: `radial-gradient(circle 220px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, rgba(0,0,0,0.4) 45%, black 85%)`,
              WebkitMaskImage: `radial-gradient(circle 220px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, rgba(0,0,0,0.4) 45%, black 85%)`,
            }}
          />
          {/* Static darkening overlay — mobile only (no mouse interaction) */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-zinc-950/50 to-zinc-950 pointer-events-none md:hidden" />
        </motion.div>

        {/* Readability scrim — always on (not pierced by the cursor), guarantees text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-[70%] z-[5] pointer-events-none bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-full md:w-2/3 z-[5] pointer-events-none bg-gradient-to-r from-zinc-950/70 via-zinc-950/10 to-transparent" />

        {/* Hero Content — bottom-left editorial block */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-24 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 flex-shrink-0" style={{ backgroundColor: '#E8500A' }} />
              <p className="uppercase tracking-[0.3em] text-[11px] md:text-xs text-zinc-300">
                L'ère des chatbots génériques est révolue
              </p>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95] mb-7 [text-shadow:0_2px_30px_rgba(9,9,11,0.7)]">
              Votre bras droit numérique<span style={{ color: '#E8500A' }}>.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 leading-relaxed max-w-2xl mb-3 [text-shadow:0_1px_16px_rgba(9,9,11,0.85)]">
              COAL transforme vos processus chronophages en workflows exécutables, supervisés et gouvernés.
            </p>
            <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mb-10 [text-shadow:0_1px_16px_rgba(9,9,11,0.85)]">
              Vous demandez, la machine s'exécute. Vous gardez le contrôle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setQuizOpen(true)}
                className="px-10 py-4 bg-zinc-100 text-zinc-950 font-bold text-lg rounded-none border-2 border-zinc-100 hover:bg-transparent hover:text-zinc-100 transition-all duration-300"
              >
                Demander un Audit "Agentic Readiness"
              </motion.button>
              <Link to="/produits">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-10 py-4 bg-transparent text-zinc-200 font-bold text-lg border-2 border-zinc-600 hover:border-zinc-300 hover:text-zinc-100 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                >
                  Nos produits
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue — anchored to the section, out of the text's way */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 right-6 md:right-10 z-10"
        >
          <ChevronDown className="w-7 h-7 animate-bounce text-zinc-500" />
        </motion.div>
      </section>

      {/* Product Section — Command Center */}
      <section className="py-32 px-6 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="uppercase tracking-[0.3em] text-xs text-zinc-500 mb-6">Le produit</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-8 max-w-4xl">
              L'orchestration centralisée, pas l'automatisation aveugle<span style={{ color: '#E8500A' }}>.</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed mb-20">
              Nous n'ajoutons pas un outil complexe de plus. Nous créons un centre de commandement.
              COAL vit sur vos canaux (Slack, Email, WhatsApp) et pilote vos outils existants (CRM, Drive) pour exécuter vos tâches.
            </p>
            <div className="grid md:grid-cols-3 gap-px bg-zinc-800">
              <div className="p-10 bg-zinc-950 hover:bg-zinc-900/50 transition-colors duration-500">
                <Search className="w-10 h-10 mb-8 text-zinc-300" strokeWidth={1.5} />
                <p className="uppercase tracking-[0.2em] text-xs text-zinc-500 mb-3">01 — Phase 1</p>
                <h3 className="text-2xl font-bold mb-4">Audit & Cartographie</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Nous ciblons les gisements de productivité et identifions les processus à automatiser.
                </p>
              </div>
              <div className="p-10 bg-zinc-950 hover:bg-zinc-900/50 transition-colors duration-500">
                <Zap className="w-10 h-10 mb-8 text-zinc-300" strokeWidth={1.5} />
                <p className="uppercase tracking-[0.2em] text-xs text-zinc-500 mb-3">02 — Phase 2</p>
                <h3 className="text-2xl font-bold mb-4">Déploiement Éclair</h3>
                <p className="text-zinc-400 leading-relaxed">
                  En moins de 14 jours, 3 à 5 workflows "quick-wins" — qualification de leads, relances, tris — sont opérationnels.
                </p>
              </div>
              <div className="p-10 bg-zinc-950 hover:bg-zinc-900/50 transition-colors duration-500">
                <Gauge className="w-10 h-10 mb-8 text-zinc-300" strokeWidth={1.5} />
                <p className="uppercase tracking-[0.2em] text-xs text-zinc-500 mb-3">03 — Phase 3</p>
                <h3 className="text-2xl font-bold mb-4">Le Command Center</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Vous supervisez. L'IA prépare le travail, vous validez l'exécution d'un simple clic.
                </p>
              </div>
            </div>

            {/* CTA to products page */}
            <div className="mt-12 flex justify-end">
              <Link to="/produits">
                <motion.span
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-3 text-zinc-400 hover:text-zinc-100 transition-colors text-sm tracking-widest uppercase font-bold cursor-pointer"
                >
                  Voir tous nos produits
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Anti-Pitch Section */}
      <section className="relative py-32 px-6 border-t border-zinc-900 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${coalImageSection3})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/85 to-zinc-950/90 z-0" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="uppercase tracking-[0.3em] text-xs text-zinc-500 mb-6">Notre ligne rouge</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-8 max-w-4xl">
              Ce que nous refusons d'automatiser<span style={{ color: '#E8500A' }}>.</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed mb-16">
              Le marché est saturé de promesses magiques. C'est dangereux. Chez COAL, la confiance repose sur la transparence radicale et la gouvernance.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ x: -4 }}
                className="border-l-4 border-red-500/70 bg-zinc-950 p-10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <X className="w-7 h-7 text-red-500" strokeWidth={2.5} />
                  <p className="uppercase tracking-[0.2em] text-xs text-red-500/80 font-bold">Zéro boîte noire</p>
                </div>
                <p className="text-xl text-zinc-200 leading-relaxed">
                  Nous n'automatisons <span className="font-bold">aucune décision</span> financière, médicale ou stratégique sans supervision humaine.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ x: 4 }}
                className="border-l-4 border-emerald-500/70 bg-zinc-950 p-10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Check className="w-7 h-7 text-emerald-500" strokeWidth={2.5} />
                  <p className="uppercase tracking-[0.2em] text-xs text-emerald-500/80 font-bold">Human-in-the-loop</p>
                </div>
                <p className="text-xl text-zinc-200 leading-relaxed">
                  Chaque action sensible est <span className="font-bold">tracée, journalisée</span> et nécessite votre approbation finale.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Target & ROI Section */}
      <section className="py-32 px-6 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-16 items-start"
          >
            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-zinc-500 mb-6">Pour qui</p>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-8">
                Conçu pour les opérations<span style={{ color: '#E8500A' }}>.</span>
                <span className="block text-zinc-500">Pensé pour la rentabilité.</span>
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed mb-10">
                COAL est l'orchestrateur des PME, des cabinets comptables, immobiliers et cliniques qui veulent grandir sans exploser leur masse salariale.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Comptabilité', 'Immobilier', 'Médical', 'PME'].map((sector) => (
                  <span
                    key={sector}
                    className="px-4 py-2 border border-zinc-700 text-zinc-300 text-sm tracking-wide"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-px bg-zinc-800">
              {[
                { k: '—70%', v: 'Réduction drastique des tâches manuelles répétitives' },
                { k: '1x', v: 'Un single point of control pour toutes vos opérations' },
                { k: '30j', v: 'ROI visible dès les 30 premiers jours' },
              ].map((b, i) => (
                <motion.div
                  key={b.v}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-zinc-950 p-8 flex items-baseline gap-8"
                >
                  <span className="font-mono text-4xl font-black text-zinc-100 min-w-[5rem] tabular-nums">{b.k}</span>
                  <p className="text-zinc-400 leading-relaxed">{b.v}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section with Coal Image */}
      <section className="relative py-40 px-6 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${coalImageCTA})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Darkening overlay with cursor halo effect */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950 pointer-events-none z-0"
          style={{
            maskImage: `radial-gradient(circle 220px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, rgba(0,0,0,0.4) 45%, black 85%)`,
            WebkitMaskImage: `radial-gradient(circle 220px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, rgba(0,0,0,0.4) 45%, black 85%)`,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <Shield className="w-16 h-16 mx-auto mb-8 text-zinc-400" strokeWidth={1.5} />
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
            Reprenez la main
            <span className="block text-zinc-500">sur vos processus.</span>
          </h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Commençons par auditer ce qui vous fait perdre du temps aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setQuizOpen(true)}
              className="px-12 py-5 bg-zinc-100 text-zinc-950 font-bold text-lg rounded-none border-2 border-zinc-100 hover:bg-transparent hover:text-zinc-100 transition-all duration-300"
            >
              Obtenir mon Audit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setContactOpen(true)}
              className="px-12 py-5 bg-transparent text-zinc-100 font-bold text-lg rounded-none border-2 border-zinc-600 hover:border-zinc-100 transition-all duration-300"
            >
              Prendre contact
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm tracking-wider text-zinc-600">
            COAL © 2026 — Orchestration par Intelligence Artificielle
          </p>
          <nav className="flex items-center gap-6 flex-wrap justify-center">
            <Link
              to="/produits"
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-100 transition-colors text-sm tracking-widest uppercase"
            >
              Nos produits
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setContactOpen(true)}
              className="text-zinc-500 hover:text-zinc-100 transition-colors text-sm tracking-widest uppercase"
            >
              Contact
            </button>
            <Link
              to="/mentions-legales"
              className="text-zinc-600 hover:text-zinc-300 transition-colors text-sm tracking-widest uppercase"
            >
              Mentions légales
            </Link>
          </nav>
        </div>
      </footer>

      <QuizFunnel open={quizOpen} onClose={() => setQuizOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}