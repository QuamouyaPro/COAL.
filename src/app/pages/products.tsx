import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft, ArrowRight, Check, ChevronRight,
  Cpu, LayoutDashboard, BookOpen, Zap, Package,
  Repeat, Search, Workflow, Shield,
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
              Deux produits<span style={{ color: EMBER }}>.</span>
              <br />
              <span className="text-zinc-500">Une stratégie.</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
              Notre écosystème hybride stratégiquement{' '}
              <span className="text-zinc-100 font-medium">le service premium sur-mesure</span>,{' '}
              la création de contenu et{' '}
              <span className="text-zinc-100 font-medium">le logiciel SaaS scalable</span>{' '}
              pour asseoir notre positionnement d'orchestrateur IA de référence.
            </p>
          </motion.div>

          {/* Overview cards */}
          <div className="grid md:grid-cols-2 gap-px bg-zinc-800 mt-20">
            {[
              {
                num: '01',
                badge: 'One Time Payment',
                badgeColor: EMBER,
                title: 'La Prestation COAL\nSur-Mesure',
                desc: "L'offre premium d'installation complète — audit stratégique, workflows personnalisés, orchestrateur IA multicanal, Command Center et playbooks. Votre bras droit numérique, clé en main.",
                anchor: 'product-01',
              },
              {
                num: '02',
                badge: 'Abonnement récurrent',
                badgeColor: '#71717a',
                title: 'Workflows Main Stream\n& Playbooks',
                desc: "Le produit scalable. Bibliothèque de workflows pré-conçus et playbooks no-code (Make, n8n, Zapier) en libre accès, hébergés et maintenus par COAL pour adresser un public plus large.",
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
          PRODUCT 01
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
                  One Time Payment — Offre Premium
                </p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  La Prestation COAL
                  <br />
                  Sur-Mesure<span style={{ color: EMBER }}>.</span>
                </h2>
              </div>
            </div>

            <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed mb-20 pl-8 border-l-2 border-zinc-800">
              Une prestation packagée en paiement unique qui comprend l'installation complète de
              l'agent COAL en tant que bras droit numérique, la configuration de workflows
              ultra-personnalisés, la fourniture des playbooks, et une{' '}
              <span className="text-zinc-100">garantie de résultats</span>.
            </p>

            {/* ── Phases timeline ── */}
            <div className="relative">
              {/* Connector line (desktop) */}
              <div className="absolute left-[2rem] top-10 bottom-10 w-px bg-zinc-800 hidden md:block" />

              <div className="space-y-2">

                {/* ─ Phase 01 ─ */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="grid md:grid-cols-[4.5rem_1fr] gap-8"
                >
                  <div className="flex justify-center md:justify-start">
                    <div className="w-16 h-16 border border-zinc-700 bg-zinc-950 flex items-center justify-center flex-shrink-0 z-10">
                      <Search className="w-6 h-6 text-zinc-400" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="pb-16">
                    <p className="uppercase tracking-[0.2em] text-xs text-zinc-500 mb-2">
                      Le point d'entrée stratégique
                    </p>
                    <h3 className="text-3xl font-black tracking-tight mb-5">
                      Audit "Agentic Readiness"
                      <span style={{ color: EMBER }}>.</span>
                    </h3>
                    <p className="text-zinc-400 leading-relaxed mb-8 max-w-2xl">
                      Plutôt que de vendre une technologie abstraite, nous vendons un{' '}
                      <span className="text-zinc-100">diagnostic métier</span>. Ce service cartographie les
                      processus actuels du client pour identifier les gisements de productivité et
                      calculer un retour sur investissement potentiel.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-px bg-zinc-800 max-w-2xl">
                      {[
                        {
                          label: 'Cartographie des processus',
                          desc: 'Analyse complète de vos flux opérationnels actuels',
                        },
                        {
                          label: 'Calcul du ROI potentiel',
                          desc: 'Quantification précise des gains de productivité',
                        },
                        {
                          label: '3 à 5 quick-wins ciblés',
                          desc: 'Qualification leads, relances, tris de tickets…',
                        },
                        {
                          label: 'Déployables en < 14 jours',
                          desc: 'Résultats concrets visibles en moins de deux semaines',
                        },
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

                {/* ─ Phase 02 ─ */}
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
                      Sur-mesure & ultra-personnalisé
                    </p>
                    <h3 className="text-3xl font-black tracking-tight mb-5">
                      Conception des Workflows
                      <span style={{ color: EMBER }}>.</span>
                    </h3>
                    <p className="text-zinc-400 leading-relaxed mb-8 max-w-2xl">
                      À partir des quick-wins identifiés lors de l'audit, nous concevons et déployons
                      des workflows entièrement personnalisés à votre secteur, votre stack et vos
                      processus spécifiques.
                    </p>
                    <WorkflowDemo />

                    <div className="flex flex-wrap gap-3 mb-6">
                      {[
                        'Qualification de leads',
                        'Relance client automatisée',
                        'Tri de tickets support',
                        'Reporting automatique',
                        'Onboarding client',
                        'Suivi contrats',
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 border border-zinc-700 text-zinc-300 text-sm tracking-wide hover:border-zinc-500 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* ─ Phase 03 — The big one ─ */}
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
                      Le cœur SaaS récurrent
                    </p>
                    <h3 className="text-3xl font-black tracking-tight mb-5">
                      COAL Orchestrator &<br />
                      Command Center<span style={{ color: EMBER }}>.</span>
                    </h3>
                    <p className="text-zinc-400 leading-relaxed mb-10 max-w-2xl">
                      La plateforme d'orchestration récurrente animée par un agent IA multicanal. Il
                      interprète vos demandes en langage naturel, agit sur vos outils existants et
                      lance les workflows — pendant que vous supervisez depuis votre tableau de bord.
                    </p>

                    {/* Sub-components */}
                    <div className="space-y-px bg-zinc-800">

                      {/* Agent Multicanal */}
                      <div className="bg-zinc-950 p-8 hover:bg-zinc-900/50 transition-colors duration-500">
                        <div className="flex items-start gap-6">
                          <div className="flex-shrink-0 mt-0.5">
                            <Cpu className="w-8 h-8 text-zinc-400" strokeWidth={1.5} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h4 className="text-xl font-black">Agent IA Multicanal</h4>
                              <span
                                className="px-2 py-0.5 text-xs font-bold tracking-wider uppercase"
                                style={{ backgroundColor: `${EMBER}20`, color: EMBER, border: `1px solid ${EMBER}40` }}
                              >
                                Inclus
                              </span>
                            </div>
                            <p className="text-zinc-400 leading-relaxed mb-5">
                              Accessible via{' '}
                              <strong className="text-zinc-100">Slack, WhatsApp et email</strong>,
                              l'agent interprète vos demandes en langage naturel et exécute les
                              actions sur vos outils existants — CRM, Google Drive, et plus.
                            </p>
                            <div className="flex gap-3 flex-wrap">
                              {['Slack', 'WhatsApp', 'Email', 'CRM', 'Google Drive'].map((c) => (
                                <span
                                  key={c}
                                  className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs tracking-widest uppercase font-medium"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Command Center */}
                      <div className="bg-zinc-950 p-8 hover:bg-zinc-900/50 transition-colors duration-500">
                        <div className="flex items-start gap-6">
                          <div className="flex-shrink-0 mt-0.5">
                            <LayoutDashboard className="w-8 h-8 text-zinc-400" strokeWidth={1.5} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h4 className="text-xl font-black">Command Center</h4>
                              <span
                                className="px-2 py-0.5 text-xs font-bold tracking-wider uppercase"
                                style={{ backgroundColor: `${EMBER}20`, color: EMBER, border: `1px solid ${EMBER}40` }}
                              >
                                Inclus
                              </span>
                            </div>
                            <p className="text-zinc-400 leading-relaxed mb-5">
                              L'interface de supervision vitale où le dirigeant suit les{' '}
                              <strong className="text-zinc-100">logs en temps réel</strong>, pilote ses{' '}
                              <strong className="text-zinc-100">KPI opérationnels</strong> et approuve
                              les actions critiques en attente — garantissant une gouvernance totale.
                            </p>
                            <div className="grid grid-cols-3 gap-px bg-zinc-800 max-w-lg">
                              {['Logs temps réel', 'KPI & Métriques', 'Approbation actions'].map((f) => (
                                <div
                                  key={f}
                                  className="bg-zinc-950 px-4 py-3 text-zinc-300 text-xs font-bold text-center tracking-wide uppercase"
                                >
                                  {f}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Playbooks */}
                      <div className="bg-zinc-950 p-8 hover:bg-zinc-900/50 transition-colors duration-500">
                        <div className="flex items-start gap-6">
                          <div className="flex-shrink-0 mt-0.5">
                            <BookOpen className="w-8 h-8 text-zinc-400" strokeWidth={1.5} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h4 className="text-xl font-black">Playbooks Sur-Mesure</h4>
                              <span
                                className="px-2 py-0.5 text-xs font-bold tracking-wider uppercase"
                                style={{ backgroundColor: `${EMBER}20`, color: EMBER, border: `1px solid ${EMBER}40` }}
                              >
                                Inclus
                              </span>
                            </div>
                            <p className="text-zinc-400 leading-relaxed">
                              Livrés avec chaque installation, les playbooks expliquent au client{' '}
                              <strong className="text-zinc-100">comment comprendre COAL</strong> et
                              comment{' '}
                              <strong className="text-zinc-100">
                                connecter lui-même de nouveaux processus
                              </strong>{' '}
                              à l'orchestrateur. L'autonomie totale, sans dépendance permanente au
                              prestataire.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Product 01 CTA */}
            <div className="mt-16 flex flex-col sm:flex-row gap-5">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setQuizOpen(true)}
                className="px-12 py-5 bg-zinc-100 text-zinc-950 font-black text-base tracking-wide hover:bg-zinc-300 transition-colors"
              >
                Demander mon Audit
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
          DIVIDER
      ══════════════════════════════════════════════════════════ */}
      <div className="px-6">
        <div className="max-w-6xl mx-auto">
          <div className="h-px bg-zinc-800" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          PRODUCT 02
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
              <span className="text-[10rem] font-black leading-none select-none flex-shrink-0 text-zinc-900">
                02
              </span>
              <div className="pb-4">
                <p className="uppercase tracking-[0.25em] text-xs text-zinc-500 font-bold mb-3">
                  Abonnement — Produit Scalable
                </p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  Workflows Main Stream
                  <br />& Playbooks<span style={{ color: EMBER }}>.</span>
                </h2>
              </div>
            </div>

            <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed mb-20 pl-8 border-l-2 border-zinc-800">
              Pour adresser un public plus large, nous proposons des workflows déjà conçus en libre
              accès sur abonnement, que nous hébergeons et maintenons. Accompagnés de bibliothèques
              de Playbooks — guides d'implémentation et{' '}
              <span className="text-zinc-100">templates no-code</span> pour Make, n8n et Zapier.
            </p>

            {/* Features grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-zinc-800 mb-16">
              {[
                {
                  icon: <Workflow className="w-8 h-8" strokeWidth={1.5} />,
                  label: 'Bibliothèque de workflows',
                  desc: "Des workflows opérationnels déjà testés et validés, couvrant les cas d'usage les plus fréquents par secteur.",
                },
                {
                  icon: <Repeat className="w-8 h-8" strokeWidth={1.5} />,
                  label: 'Hébergement & Maintenance',
                  desc: "COAL héberge et maintient vos workflows actifs. Mises à jour, corrections et évolutions incluses dans l'abonnement.",
                },
                {
                  icon: <Package className="w-8 h-8" strokeWidth={1.5} />,
                  label: 'Libre accès sur abonnement',
                  desc: "Accédez à l'intégralité de la bibliothèque sans limite. De nouveaux workflows sont ajoutés chaque mois.",
                },
                {
                  icon: <BookOpen className="w-8 h-8" strokeWidth={1.5} />,
                  label: 'Playbooks no-code',
                  desc: 'Guides d\'implémentation pas à pas pour Make, n8n et Zapier. Connectez vous-mêmes vos processus sans expertise technique.',
                },
                {
                  icon: <Zap className="w-8 h-8" strokeWidth={1.5} />,
                  label: 'Templates clé en main',
                  desc: 'Templates directement importables dans votre stack no-code préféré. Zéro configuration complexe requise.',
                },
                {
                  icon: <Shield className="w-8 h-8" strokeWidth={1.5} />,
                  label: 'Compatibilité universelle',
                  desc: 'Conçus pour s\'intégrer avec Make (Integromat), n8n, Zapier et les principales solutions du marché.',
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

            {/* Platform compatibility banner */}
            <div className="border border-zinc-800 p-8 mb-14">
              <p className="uppercase tracking-[0.35em] text-xs text-zinc-600 mb-8 text-center">
                Plateformes compatibles
              </p>
              <div className="flex justify-center items-center gap-12 md:gap-20 flex-wrap">
                {[
                  { name: 'Make', sub: 'Integromat' },
                  { name: 'n8n', sub: 'Open-source' },
                  { name: 'Zapier', sub: 'No-code' },
                ].map((p) => (
                  <motion.div
                    key={p.name}
                    whileHover={{ y: -2 }}
                    className="text-center group"
                  >
                    <p className="text-3xl font-black text-zinc-600 group-hover:text-zinc-200 transition-colors tracking-tight">
                      {p.name}
                    </p>
                    <p className="text-xs text-zinc-700 group-hover:text-zinc-500 transition-colors tracking-widest uppercase mt-1">
                      {p.sub}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Product 02 CTA */}
            <div className="flex flex-col sm:flex-row gap-5">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setContactOpen(true)}
                className="px-12 py-5 bg-zinc-100 text-zinc-950 font-black text-base tracking-wide hover:bg-zinc-300 transition-colors"
              >
                Explorer les Workflows
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setQuizOpen(true)}
                className="px-12 py-5 bg-transparent text-zinc-100 font-black text-base border-2 border-zinc-700 hover:border-zinc-400 transition-colors"
              >
                Demander un Audit
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────── */}
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
                onClick={() => setQuizOpen(true)}
                className="px-12 py-5 bg-zinc-100 text-zinc-950 font-black text-base tracking-wide hover:bg-zinc-300 transition-colors flex items-center gap-3"
              >
                Démarrer par l'Audit
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setContactOpen(true)}
                className="px-12 py-5 bg-transparent text-zinc-100 font-black text-base border-2 border-zinc-700 hover:border-zinc-400 transition-colors"
              >
                Parler à un expert COAL
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
