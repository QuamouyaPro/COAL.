import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft, ArrowRight, Check, ChevronRight,
  Cpu, LayoutDashboard, BookOpen, Zap, Package,
  Repeat, Search, Workflow, Shield, MapPin, Clock,
  FileText, PenLine, Rocket, X,
} from 'lucide-react';
import { QuizFunnel } from '../components/quiz-funnel';
import { ContactModal } from '../components/contact-modal';
import { WorkflowDemo } from '../components/workflow-demo';
import { RoiCalculator } from '../components/roi-calculator';

const EMBER = '#E8500A';

export default function Products() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const onQuiz = () => setQuizOpen(true);
    const onContact = () => setContactOpen(true);
    window.addEventListener('coal:open-quiz', onQuiz);
    window.addEventListener('coal:open-contact', onContact);
    return () => {
      window.removeEventListener('coal:open-quiz', onQuiz);
      window.removeEventListener('coal:open-contact', onContact);
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section id="contenu" className="pt-28 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="uppercase tracking-[0.4em] text-xs text-zinc-500 mb-6">
              L'Écosystème COAL
            </p>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-10">
              Deux offres<span style={{ color: EMBER }}>.</span>
              <br />
              <span className="text-zinc-500">Un seul objectif.</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
              Un modèle pensé pour deux profils :{' '}
              <span className="text-zinc-100 font-medium">l'offre Générique</span> pour tester sans engagement,
              et{' '}
              <span className="text-zinc-100 font-medium">l'offre Custom</span> pour les organisations
              qui veulent une vraie plus-value livrée en 7 jours.
            </p>
          </motion.div>

          {/* Overview cards */}
          <div className="grid md:grid-cols-2 gap-px bg-zinc-800 mt-20">
            {[
              {
                num: '01',
                badge: 'One-time Payment ★',
                badgeColor: EMBER,
                title: 'Offre Custom\nSur-Mesure',
                desc: "Votre orchestration conçue pour vos processus réels, déployée sur votre propre infrastructure en 7 jours ouvrés. Audit terrain gratuit — vous signez uniquement si le devis vous convient.",
                anchor: 'product-01',
              },
              {
                num: '02',
                badge: 'Abonnement mensuel',
                badgeColor: '#71717a',
                title: 'Offre Générique\nSans Engagement',
                desc: "L'entrée zéro risque. Questionnaire en ligne → rapport personnalisé avec 3 quick wins → abonnement 199–399 € HT/mois résiliable à tout moment. Hébergé et maintenu par COAL.",
                anchor: 'product-02',
              },
            ].map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
                className="bg-zinc-950 hover:bg-zinc-900/50 transition-colors duration-500 p-10 group cursor-pointer"
                onClick={() =>
                  document.getElementById(p.anchor)?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[88px] font-black text-zinc-800/80 group-hover:text-zinc-700/80 transition-colors leading-none select-none">
                    {p.num}
                  </span>
                  <ChevronRight className="w-6 h-6 text-zinc-700 group-hover:text-zinc-400 transition-colors mt-3" />
                </div>
                <p
                  className="uppercase tracking-[0.2em] text-xs mb-3 font-bold"
                  style={{ color: p.badgeColor }}
                >
                  {p.badge}
                </p>
                <h2 className="text-2xl font-black tracking-tight mb-4 leading-tight whitespace-pre-line">
                  {p.title}
                </h2>
                <p className="text-zinc-400 leading-relaxed text-sm">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PRODUCT 01 — CUSTOM
      ══════════════════════════════════════════════════════════ */}
      <section id="product-01" className="scroll-mt-24 py-32 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section header */}
            <div className="flex items-end gap-6 mb-4 overflow-hidden">
              <span
                className="text-[10rem] font-black leading-none select-none flex-shrink-0"
                style={{ color: 'rgba(232,80,10,0.08)' }}
              >
                01
              </span>
              <div className="pb-4">
                <p
                  className="uppercase tracking-[0.25em] text-xs font-bold mb-3"
                  style={{ color: EMBER }}
                >
                  One-time Payment — Offre Principale ★
                </p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  Offre Custom
                  <br />
                  Sur-Mesure<span style={{ color: EMBER }}>.</span>
                </h2>
              </div>
            </div>

            <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed mb-16 pl-8 border-l-2 border-zinc-800">
              Un paiement unique. Votre orchestration est conçue entièrement sur mesure pour vos
              processus réels, déployée sur votre propre infrastructure, et opérationnelle en{' '}
              <span className="text-zinc-100">7 jours ouvrés</span> à partir de la signature.
              Pas d'abonnement COAL — l'infrastructure vous appartient.
            </p>

            {/* ── Tunnel commercial (5 étapes) ── */}
            <div className="mb-20">
              <p className="uppercase tracking-[0.3em] text-xs text-zinc-500 mb-8">Le parcours client</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-zinc-800">
                {[
                  { icon: <FileText className="w-5 h-5" strokeWidth={1.5} />, step: '01', label: 'Formulaire', sub: 'de demande' },
                  { icon: <MapPin className="w-5 h-5" strokeWidth={1.5} />, step: '02', label: 'Audit terrain', sub: 'gratuit' },
                  { icon: <PenLine className="w-5 h-5" strokeWidth={1.5} />, step: '03', label: 'Devis', sub: '& signature' },
                  { icon: <Clock className="w-5 h-5" strokeWidth={1.5} />, step: '04', label: 'Conception', sub: '7 jours' },
                  { icon: <Rocket className="w-5 h-5" strokeWidth={1.5} />, step: '05', label: 'Livraison', sub: '& formation' },
                ].map((s, i) => (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-zinc-950 p-6 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-600">{s.icon}</span>
                      <span className="font-mono text-xs text-zinc-600">{s.step}</span>
                    </div>
                    <div>
                      <p className="font-black text-sm text-zinc-100">{s.label}</p>
                      <p className="text-xs text-zinc-500">{s.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Phases ── */}
            <div className="relative">
              <div className="absolute left-[2rem] top-10 bottom-10 w-px bg-zinc-800 hidden md:block" />
              <div className="space-y-2">

                {/* ─ Phase 01 — Audit terrain ─ */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="grid md:grid-cols-[4.5rem_1fr] gap-8"
                >
                  <div className="flex justify-center md:justify-start">
                    <div className="w-16 h-16 border border-zinc-700 bg-zinc-950 flex items-center justify-center flex-shrink-0 z-10">
                      <MapPin className="w-6 h-6 text-zinc-400" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="pb-16">
                    <p className="uppercase tracking-[0.2em] text-xs text-zinc-500 mb-2">
                      Gratuit · Sans engagement
                    </p>
                    <h3 className="text-3xl font-black tracking-tight mb-5">
                      Audit Terrain<span style={{ color: EMBER }}>.</span>
                    </h3>
                    <p className="text-zinc-400 leading-relaxed mb-8 max-w-2xl">
                      Avant tout engagement financier, COAL se déplace sur site pour comprendre vos
                      processus réels. Le client signe <span className="text-zinc-100">uniquement s'il valide le devis</span>{' '}
                      remis à l'issue de cette rencontre.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-px bg-zinc-800 max-w-2xl mb-10">
                      {[
                        { label: 'Rencontre sur site', desc: 'Découverte des processus métier en conditions réelles' },
                        { label: 'Mapping des workflows', desc: 'Identification des points de friction et des quick wins' },
                        { label: 'Matrice impact / effort', desc: 'Priorisation rigoureuse des automatisations à fort ROI' },
                        { label: 'ROI personnalisé chiffré', desc: 'Temps gagné par mois, coût évité — chiffres réels' },
                      ].map((item) => (
                        <div key={item.label} className="bg-zinc-950 p-6 hover:bg-zinc-900/40 transition-colors">
                          <div className="flex items-start gap-3 mb-2">
                            <Check
                              className="w-4 h-4 mt-0.5 flex-shrink-0"
                              style={{ color: EMBER }}
                              strokeWidth={2.5}
                            />
                            <p className="font-bold text-zinc-100 text-sm">{item.label}</p>
                          </div>
                          <p className="text-zinc-500 text-sm leading-relaxed pl-7">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10">
                      <RoiCalculator />
                    </div>
                  </div>
                </motion.div>

                {/* ─ Phase 02 — Conception 7 jours ─ */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="grid md:grid-cols-[4.5rem_1fr] gap-8"
                >
                  <div className="flex justify-center md:justify-start">
                    <div className="w-16 h-16 border border-zinc-700 bg-zinc-950 flex items-center justify-center flex-shrink-0 z-10">
                      <Workflow className="w-6 h-6 text-zinc-400" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="pb-16">
                    <p className="uppercase tracking-[0.2em] text-xs text-zinc-500 mb-2">
                      Après signature du devis
                    </p>
                    <h3 className="text-3xl font-black tracking-tight mb-5">
                      Conception & Déploiement<span style={{ color: EMBER }}>.</span>
                      <span className="block text-xl text-zinc-500 font-bold mt-1">7 jours ouvrés · Livraison garantie</span>
                    </h3>
                    <p className="text-zinc-400 leading-relaxed mb-8 max-w-2xl">
                      À la réception du paiement, un mail de lancement est envoyé au client.
                      La conception démarre ce jour-là — pas de délai, pas d'attente.
                    </p>

                    <div className="grid md:grid-cols-2 gap-px bg-zinc-800 max-w-2xl mb-10">
                      <div className="bg-zinc-950 p-6">
                        <p className="font-mono text-xs text-zinc-500 mb-3 uppercase tracking-widest">Remote — 5 jours</p>
                        <ul className="space-y-2">
                          {[
                            'Setup VPS & installation n8n',
                            'Développement des workflows',
                            'Intégration APIs (CRM, Drive…)',
                            'Documentation technique complète',
                          ].map((t) => (
                            <li key={t} className="flex items-start gap-2 text-sm text-zinc-300">
                              <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-zinc-500" strokeWidth={2.5} />
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-zinc-950 p-6" style={{ borderLeft: `2px solid ${EMBER}30` }}>
                        <p className="font-mono text-xs mb-3 uppercase tracking-widest" style={{ color: EMBER }}>Sur site — 2 jours</p>
                        <ul className="space-y-2">
                          {[
                            'Tests en conditions réelles',
                            'Ajustements finaux avec les équipes',
                            'Formation des utilisateurs',
                            'Remise docs + conditions de garantie',
                          ].map((t) => (
                            <li key={t} className="flex items-start gap-2 text-sm text-zinc-300">
                              <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: EMBER }} strokeWidth={2.5} />
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <WorkflowDemo />
                  </div>
                </motion.div>

                {/* ─ Phase 03 — Command Center ─ */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="grid md:grid-cols-[4.5rem_1fr] gap-8"
                >
                  <div className="flex justify-center md:justify-start">
                    <div
                      className="w-16 h-16 bg-zinc-950 flex items-center justify-center flex-shrink-0 z-10"
                      style={{ border: `2px solid ${EMBER}` }}
                    >
                      <Cpu className="w-6 h-6" style={{ color: EMBER }} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div>
                    <p
                      className="uppercase tracking-[0.2em] text-xs font-bold mb-2"
                      style={{ color: EMBER }}
                    >
                      Inclus dans chaque orchestration
                    </p>
                    <h3 className="text-3xl font-black tracking-tight mb-5">
                      COAL Orchestrator &<br />
                      Command Center<span style={{ color: EMBER }}>.</span>
                    </h3>
                    <p className="text-zinc-400 leading-relaxed mb-10 max-w-2xl">
                      L'agent IA interprète vos demandes en langage naturel via Slack, WhatsApp ou email,
                      agit sur vos outils existants et lance les workflows — pendant que vous supervisez
                      depuis votre tableau de bord Command Center.
                    </p>

                    <div className="space-y-px bg-zinc-800">
                      <div className="bg-zinc-950 p-8 hover:bg-zinc-900/50 transition-colors duration-500">
                        <div className="flex items-start gap-6">
                          <Cpu className="w-8 h-8 text-zinc-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h4 className="text-xl font-black">Agent IA Multicanal</h4>
                              <span className="px-2 py-0.5 text-xs font-bold tracking-wider uppercase" style={{ backgroundColor: `${EMBER}20`, color: EMBER, border: `1px solid ${EMBER}40` }}>Inclus</span>
                            </div>
                            <p className="text-zinc-400 leading-relaxed mb-4">
                              Accessible via <strong className="text-zinc-100">Slack, WhatsApp et email</strong>.
                              Interprète le langage naturel. Agit sur vos outils — CRM, Google Drive, et plus.
                              Propulsé par <strong className="text-zinc-100">Claude API via OpenRouter</strong>.
                            </p>
                            <div className="flex gap-3 flex-wrap">
                              {['Slack', 'WhatsApp', 'Email', 'CRM', 'Google Drive'].map((c) => (
                                <span key={c} className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs tracking-widest uppercase font-medium">{c}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-zinc-950 p-8 hover:bg-zinc-900/50 transition-colors duration-500">
                        <div className="flex items-start gap-6">
                          <LayoutDashboard className="w-8 h-8 text-zinc-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h4 className="text-xl font-black">Command Center</h4>
                              <span className="px-2 py-0.5 text-xs font-bold tracking-wider uppercase" style={{ backgroundColor: `${EMBER}20`, color: EMBER, border: `1px solid ${EMBER}40` }}>Inclus</span>
                            </div>
                            <p className="text-zinc-400 leading-relaxed mb-4">
                              Interface de supervision : logs en temps réel, KPI opérationnels, approbation
                              des actions critiques. <strong className="text-zinc-100">Gouvernance totale</strong> — l'humain décide toujours.
                            </p>
                            <div className="grid grid-cols-3 gap-px bg-zinc-800 max-w-lg">
                              {['Logs temps réel', 'KPI & Métriques', 'Approbation actions'].map((f) => (
                                <div key={f} className="bg-zinc-950 px-4 py-3 text-zinc-300 text-xs font-bold text-center tracking-wide uppercase">{f}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-zinc-950 p-8 hover:bg-zinc-900/50 transition-colors duration-500">
                        <div className="flex items-start gap-6">
                          <BookOpen className="w-8 h-8 text-zinc-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h4 className="text-xl font-black">Playbooks Sur-Mesure</h4>
                              <span className="px-2 py-0.5 text-xs font-bold tracking-wider uppercase" style={{ backgroundColor: `${EMBER}20`, color: EMBER, border: `1px solid ${EMBER}40` }}>Inclus</span>
                            </div>
                            <p className="text-zinc-400 leading-relaxed">
                              Livrés à la remise, les playbooks expliquent comment comprendre COAL et
                              connecter de nouveaux processus — <strong className="text-zinc-100">autonomie totale, zéro dépendance</strong>.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ── Pricing Custom ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-20 pt-16 border-t border-zinc-900"
            >
              <p className="uppercase tracking-[0.3em] text-xs text-zinc-500 mb-10">Tarification transparente</p>

              {/* 3 composantes */}
              <div className="space-y-px bg-zinc-800 max-w-3xl mb-8">
                {[
                  {
                    num: '01',
                    label: 'Mise en place de l\'écosystème technique',
                    detail: 'Serveur VPS Hostinger (2 ans) + provision OpenRouter + installation n8n, DNS, sécurisation',
                    price: '280 €',
                    note: 'Coûts réels refacturés · Disparaît dès la 2e orchestration',
                    highlight: false,
                  },
                  {
                    num: '02',
                    label: 'Conception & déploiement',
                    detail: '5j remote (setup, développement, intégrations, docs) + 2j sur site (tests, formation, livraison)',
                    price: '2 450 €',
                    note: '350 €/j × 7 jours ouvrés',
                    highlight: false,
                  },
                  {
                    num: '03',
                    label: 'Garantie de bon fonctionnement — 1 an',
                    detail: 'Bugs liés à la conception COAL couverts 12 mois · Intervention sous 48h ouvrées',
                    price: '490 €',
                    note: '1ʳᵉ orchestration · +90 € par orchestration suivante',
                    highlight: true,
                  },
                ].map((row) => (
                  <div
                    key={row.num}
                    className="bg-zinc-950 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 hover:bg-zinc-900/40 transition-colors"
                    style={row.highlight ? { borderLeft: `3px solid ${EMBER}` } : {}}
                  >
                    <span className="font-mono text-3xl font-black text-zinc-700 flex-shrink-0">{row.num}</span>
                    <div className="flex-1">
                      <p className="font-black text-zinc-100 mb-1">{row.label}</p>
                      <p className="text-sm text-zinc-400 leading-relaxed">{row.detail}</p>
                      <p className="text-xs text-zinc-600 mt-1">{row.note}</p>
                    </div>
                    <p className="font-mono text-2xl font-black text-zinc-100 flex-shrink-0 md:text-right tabular-nums">{row.price}</p>
                  </div>
                ))}
              </div>

              {/* Totaux */}
              <div className="grid md:grid-cols-2 gap-px bg-zinc-800 max-w-3xl">
                <div className="bg-zinc-950 p-8">
                  <p className="uppercase tracking-[0.2em] text-xs text-zinc-500 mb-2">1ʳᵉ orchestration</p>
                  <p className="font-mono text-5xl font-black tabular-nums mb-2">3 220 €</p>
                  <p className="text-zinc-500 text-sm">HT · One-time payment · Paiement à la signature</p>
                  <p className="text-zinc-600 text-xs mt-3">Écosystème (280) + Conception (2 450) + Garantie (490)</p>
                </div>
                <div className="bg-zinc-900/50 p-8">
                  <p className="uppercase tracking-[0.2em] text-xs text-zinc-500 mb-2">2ᵉ orchestration & suivantes</p>
                  <p className="font-mono text-5xl font-black tabular-nums mb-2" style={{ color: EMBER }}>2 540 €</p>
                  <p className="text-zinc-500 text-sm">HT · One-time payment · L'écosystème est déjà en place</p>
                  <p className="text-zinc-600 text-xs mt-3">Conception (2 450) + Extension garantie (90)</p>
                </div>
              </div>

              {/* Règles */}
              <div className="mt-8 max-w-3xl grid sm:grid-cols-2 gap-4">
                {[
                  'Audit terrain gratuit — sans engagement',
                  'Paiement à la signature du devis',
                  'Livraison garantie en 7 jours ouvrés',
                  'Tout le périmètre est écrit avant démarrage',
                  'Modification majeure = 50 % de la main d\'œuvre',
                  'Nouvelle orchestration = nouveau devis',
                ].map((r) => (
                  <div key={r} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-zinc-600" strokeWidth={2} />
                    <p className="text-sm text-zinc-400">{r}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product 01 CTA */}
            <div className="mt-16 flex flex-col sm:flex-row gap-5">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setContactOpen(true)}
                className="px-12 py-5 bg-zinc-100 text-zinc-950 font-black text-base tracking-wide hover:bg-zinc-300 transition-colors"
              >
                Demander un Audit Terrain
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setQuizOpen(true)}
                className="px-12 py-5 bg-transparent text-zinc-100 font-black text-base border-2 border-zinc-700 hover:border-zinc-400 transition-colors"
              >
                Estimer mon ROI en ligne
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="px-6">
        <div className="max-w-6xl mx-auto">
          <div className="h-px bg-zinc-800" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          PRODUCT 02 — GÉNÉRIQUE
      ══════════════════════════════════════════════════════════ */}
      <section id="product-02" className="scroll-mt-24 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section header */}
            <div className="flex items-end gap-6 mb-4 overflow-hidden">
              <span className="text-[10rem] font-black leading-none select-none flex-shrink-0 text-zinc-900">02</span>
              <div className="pb-4">
                <p className="uppercase tracking-[0.25em] text-xs text-zinc-500 font-bold mb-3">
                  Abonnement mensuel — Porte d'entrée
                </p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  Offre Générique
                  <br />Sans Engagement<span style={{ color: EMBER }}>.</span>
                </h2>
              </div>
            </div>

            <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed mb-16 pl-8 border-l-2 border-zinc-800">
              L'offre Générique capte un maximum de volume avec une friction minimale.
              Le client démarre avec un questionnaire gratuit en ligne, reçoit un rapport personnalisé
              en 20 minutes, puis souscrit à un abonnement mensuel résiliable à tout moment.{' '}
              <span className="text-zinc-100">Pas d'engagement minimum.</span>
            </p>

            {/* Comment ça fonctionne */}
            <div className="mb-16">
              <p className="uppercase tracking-[0.3em] text-xs text-zinc-500 mb-8">Comment ça fonctionne</p>
              <div className="grid md:grid-cols-3 gap-px bg-zinc-800">
                {[
                  {
                    step: '01',
                    label: 'Questionnaire guidé',
                    desc: '20 minutes en ligne. COAL génère automatiquement un rapport identifiant vos 3 quick wins prioritaires avec une estimation du temps gagné par mois.',
                    tag: 'Gratuit · Sans inscription',
                  },
                  {
                    step: '02',
                    label: 'Restitution & devis',
                    desc: 'Un call de restitution de 30 minutes est offert. Si vous souhaitez activer vos workflows, vous souscrivez à l\'abonnement mensuel selon votre secteur.',
                    tag: '30 min · Offert',
                  },
                  {
                    step: '03',
                    label: 'Activation immédiate',
                    desc: 'Workflows standards pré-configurés déployés sur l\'infrastructure COAL. Accès au Command Center pour superviser. Résiliable à tout moment.',
                    tag: 'Dès la souscription',
                  },
                ].map((s, i) => (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-zinc-950 p-10 hover:bg-zinc-900/50 transition-colors duration-500"
                  >
                    <p className="font-mono text-5xl font-black text-zinc-800 mb-6 select-none">{s.step}</p>
                    <h3 className="text-xl font-black mb-3">{s.label}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                    <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase text-zinc-400 border border-zinc-800">{s.tag}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Ce qui est inclus */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-zinc-800 mb-16">
              {[
                {
                  icon: <Workflow className="w-8 h-8" strokeWidth={1.5} />,
                  label: 'Workflows par secteur',
                  desc: "Workflows pré-configurés pour votre secteur d'activité (comptabilité, immobilier, médical, PME).",
                },
                {
                  icon: <Repeat className="w-8 h-8" strokeWidth={1.5} />,
                  label: 'Hébergement & Maintenance',
                  desc: 'Infrastructure hébergée et maintenue par COAL. Mises à jour et corrections incluses.',
                },
                {
                  icon: <LayoutDashboard className="w-8 h-8" strokeWidth={1.5} />,
                  label: 'Command Center',
                  desc: "Accès à l'interface de supervision COAL pour monitorer vos workflows actifs.",
                },
                {
                  icon: <Zap className="w-8 h-8" strokeWidth={1.5} />,
                  label: 'Coûts d\'API inclus',
                  desc: "Les coûts d'API sont inclus dans l'abonnement pour un usage standard. Pas de surprise.",
                },
                {
                  icon: <Package className="w-8 h-8" strokeWidth={1.5} />,
                  label: 'Support standard',
                  desc: 'Accompagnement inclus pour la prise en main et les questions de configuration.',
                },
                {
                  icon: <Shield className="w-8 h-8" strokeWidth={1.5} />,
                  label: 'Zéro engagement',
                  desc: "Résiliable à tout moment. Pas d'engagement minimum. Vous payez mois par mois.",
                },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="bg-zinc-950 p-10 hover:bg-zinc-900/50 transition-colors duration-500"
                >
                  <div className="text-zinc-500 mb-6">{f.icon}</div>
                  <h3 className="text-lg font-black mb-3 tracking-tight">{f.label}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Prix Générique */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-px bg-zinc-800 max-w-2xl mb-14"
            >
              <div className="bg-zinc-950 p-8">
                <p className="uppercase tracking-[0.2em] text-xs text-zinc-500 mb-2">Audit de départ</p>
                <p className="font-mono text-5xl font-black tabular-nums mb-2">Gratuit</p>
                <p className="text-zinc-500 text-sm">Questionnaire en ligne + rapport + call 30 min</p>
              </div>
              <div className="bg-zinc-900/50 p-8">
                <p className="uppercase tracking-[0.2em] text-xs text-zinc-500 mb-2">Abonnement mensuel</p>
                <p className="font-mono text-5xl font-black tabular-nums mb-2">
                  199<span className="text-2xl text-zinc-500"> – </span>399 €
                </p>
                <p className="text-zinc-500 text-sm">HT · Mensuel · Résiliable à tout moment</p>
              </div>
            </motion.div>

            {/* Product 02 CTA */}
            <div className="flex flex-col sm:flex-row gap-5">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setQuizOpen(true)}
                className="px-12 py-5 bg-zinc-100 text-zinc-950 font-black text-base tracking-wide hover:bg-zinc-300 transition-colors"
              >
                Faire mon Audit Gratuit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setContactOpen(true)}
                className="px-12 py-5 bg-transparent text-zinc-100 font-black text-base border-2 border-zinc-700 hover:border-zinc-400 transition-colors"
              >
                En savoir plus
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TABLEAU COMPARATIF
      ══════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="uppercase tracking-[0.3em] text-xs text-zinc-500 mb-6">Récapitulatif</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-16">
              Comparer les deux offres<span style={{ color: EMBER }}>.</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-zinc-900">
                    <th className="text-left p-5 text-xs uppercase tracking-widest text-zinc-500 font-bold w-1/3">Critère</th>
                    <th className="text-left p-5 text-xs uppercase tracking-widest text-zinc-400 font-bold w-1/3">Générique</th>
                    <th className="text-left p-5 text-xs uppercase tracking-widest font-bold w-1/3" style={{ color: EMBER }}>Custom ★</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { critere: 'Audit', gen: 'Questionnaire en ligne — 20 min', custom: 'Rencontre sur site — gratuit', customHighlight: false },
                    { critere: 'Workflows', gen: 'Standards, pré-configurés par secteur', custom: 'Sur-mesure, conçus pour vos processus réels', customHighlight: false },
                    { critere: 'IA embarquée', gen: 'Non — automatisations simples', custom: 'Oui — Claude API via OpenRouter', customHighlight: true },
                    { critere: 'Infrastructure', gen: 'Hébergée chez COAL', custom: 'Chez le client (Hostinger + OpenRouter)', customHighlight: false },
                    { critere: 'Paiement', gen: '199–399 € HT / mois', custom: 'One-time par orchestration', customHighlight: false },
                    { critere: 'Délai', gen: 'Immédiat après souscription', custom: '7 jours ouvrés après signature', customHighlight: false },
                    { critere: 'Garantie', gen: 'Support standard inclus', custom: '1 an sur bugs COAL (490 € + 90 €/orch.)', customHighlight: true },
                    { critere: 'Engagement', gen: 'Mensuel, résiliable à tout moment', custom: 'Aucun — paiement à la livraison', customHighlight: false },
                    { critere: 'Cible', gen: 'PME · Volume · Test sans risque', custom: 'Organisations avec besoin structuré', customHighlight: false },
                  ].map((row, i) => (
                    <tr key={row.critere} className={i % 2 === 0 ? 'bg-zinc-950' : 'bg-zinc-900/30'}>
                      <td className="p-5 text-xs uppercase tracking-wider text-zinc-500 font-bold border-t border-zinc-900">{row.critere}</td>
                      <td className="p-5 text-sm text-zinc-400 border-t border-zinc-900">{row.gen}</td>
                      <td className="p-5 text-sm border-t border-zinc-900 font-medium" style={row.customHighlight ? { color: EMBER } : { color: '#e4e4e7' }}>{row.custom}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 p-6 border border-zinc-800 max-w-2xl">
              <p className="text-zinc-400 text-sm leading-relaxed italic">
                "Un client Générique satisfait est un futur client Custom. Un client Custom satisfait
                revient commander l'orchestration suivante — sans qu'il soit nécessaire de le reconquérir."
              </p>
              <p className="text-zinc-600 text-xs mt-3 uppercase tracking-widest">COAL — Note commerciale interne</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Final ─────────────────────────────────────────── */}
      <section className="py-32 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
          >
            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-zinc-500 mb-4">
                Prêt à passer à l'action
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Trouvez le produit
                <br />
                <span className="text-zinc-500">adapté à votre contexte</span>
                <span style={{ color: EMBER }}>.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-4 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setContactOpen(true)}
                className="px-12 py-5 bg-zinc-100 text-zinc-950 font-black text-base tracking-wide hover:bg-zinc-300 transition-colors flex items-center gap-3"
              >
                Demander un Audit Terrain
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setQuizOpen(true)}
                className="px-12 py-5 bg-transparent text-zinc-100 font-black text-base border-2 border-zinc-700 hover:border-zinc-400 transition-colors"
              >
                Faire mon Audit en ligne (gratuit)
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="py-10 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm tracking-wider text-zinc-600">
            COAL © 2026 — Orchestration par Intelligence Artificielle
          </p>
          <nav className="flex items-center gap-6 flex-wrap justify-center">
            <Link
              to="/mentions-legales"
              className="text-zinc-600 hover:text-zinc-300 transition-colors text-xs tracking-widest uppercase font-medium"
            >
              Mentions légales
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-100 transition-colors text-xs tracking-widest uppercase font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Retour à l'accueil
            </Link>
          </nav>
        </div>
      </footer>

      <QuizFunnel open={quizOpen} onClose={() => setQuizOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
