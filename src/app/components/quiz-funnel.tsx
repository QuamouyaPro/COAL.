import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Loader2, TrendingUp, Zap, Target, Lock, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

type QuizStep =
  | { type: 'question'; id: string; label: string; question: string; options: { value: string; label: string; hint?: string }[] }
  | { type: 'slider'; id: string; label: string; question: string; min: number; max: number; step: number; unit: string; defaultValue: number }
  | { type: 'insight'; id: string; headline: string; body: string; metric?: { value: string; label: string } };

const STEPS: QuizStep[] = [
  {
    type: 'question',
    id: 'sector',
    label: 'Profilage — 01 / 06',
    question: 'Dans quel secteur opérez-vous ?',
    options: [
      { value: 'accounting', label: 'Comptabilité / Expertise', hint: 'Cabinets, fiscalistes, audit' },
      { value: 'realestate', label: 'Immobilier', hint: 'Agences, gestion, promotion' },
      { value: 'medical', label: 'Médical', hint: 'Cliniques, cabinets, paramédical' },
      { value: 'other', label: 'Autre PME', hint: 'Services, conseil, B2B' },
    ],
  },
  {
    type: 'question',
    id: 'size',
    label: 'Profilage — 02 / 06',
    question: "Combien d'opérateurs traitent vos flux quotidiens ?",
    options: [
      { value: 'xs', label: '1 — 5 personnes' },
      { value: 'sm', label: '6 — 20 personnes' },
      { value: 'md', label: '21 — 50 personnes' },
      { value: 'lg', label: '50+ personnes' },
    ],
  },
  {
    type: 'insight',
    id: 'insight-1',
    headline: 'Premier marqueur détecté',
    body: "Votre profil correspond à un segment à forte densité opérationnelle. Les cabinets de votre typologie subissent en moyenne 23h hebdomadaires de tâches à faible valeur ajoutée par opérateur.",
    metric: { value: '23h', label: 'perdues / semaine / opérateur' },
  },
  {
    type: 'slider',
    id: 'manual',
    label: 'Diagnostic — 03 / 06',
    question: "Quelle part de vos processus est encore 100% manuelle ?",
    min: 0,
    max: 100,
    step: 5,
    unit: '%',
    defaultValue: 60,
  },
  {
    type: 'question',
    id: 'pain',
    label: 'Diagnostic — 04 / 06',
    question: 'Quel est votre gisement de productivité le plus critique ?',
    options: [
      { value: 'leads', label: 'Qualification & relance de leads' },
      { value: 'admin', label: 'Traitement administratif / documents' },
      { value: 'support', label: 'Support client & tri des demandes' },
      { value: 'reporting', label: 'Reporting & consolidation de données' },
    ],
  },
  {
    type: 'insight',
    id: 'insight-2',
    headline: 'Gisement identifié',
    body: "Analyse croisée : votre pattern présente une signature de déperdition typique des organisations pré-orchestration. Un déploiement COAL ciblé récupère en moyenne 68% de ce temps en moins de 14 jours.",
    metric: { value: '—68%', label: 'tâches manuelles éliminées' },
  },
  {
    type: 'question',
    id: 'stack',
    label: 'Infrastructure — 05 / 06',
    question: "Quels canaux opérationnels utilisez-vous ?",
    options: [
      { value: 'slack', label: 'Slack / Teams + Email' },
      { value: 'email', label: 'Email principalement' },
      { value: 'mixed', label: 'Email + WhatsApp / SMS' },
      { value: 'crm', label: 'CRM centralisé (HubSpot, Salesforce)' },
    ],
  },
  {
    type: 'question',
    id: 'maturity',
    label: 'Infrastructure — 06 / 06',
    question: "Où en êtes-vous avec l'IA aujourd'hui ?",
    options: [
      { value: 'none', label: 'Aucun déploiement' },
      { value: 'explore', label: 'Tests exploratoires (ChatGPT, etc.)' },
      { value: 'light', label: 'Automatisations ponctuelles (Zapier, Make)' },
      { value: 'advanced', label: 'Workflows IA en production' },
    ],
  },
];

export function QuizFunnel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [computing, setComputing] = useState(false);
  const [phase, setPhase] = useState<'quiz' | 'lead' | 'done'>('quiz');
  const [lead, setLead] = useState({ name: '', email: '', company: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setStepIndex(0);
      setAnswers({});
      setPhase('quiz');
      setLead({ name: '', email: '', company: '', phone: '' });
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const step = STEPS[stepIndex];
  const progress = ((stepIndex + 1) / (STEPS.length + 1)) * 100;

  const advance = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex((i) => i + 1);
    } else {
      setComputing(true);
      setTimeout(() => {
        setComputing(false);
        setPhase('lead');
      }, 2200);
    }
  };

  const handleAnswer = (id: string, value: string | number) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    setTimeout(advance, 180);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-80f7bc56/quiz-lead`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ lead, answers }),
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        console.error('Quiz lead submission failed:', data);
        throw new Error(data?.error || `Server responded ${res.status}`);
      }
      setPhase('done');
    } catch (err) {
      console.error('Quiz lead error:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-zinc-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 shadow-2xl"
          >
            {/* Top bar: progress + close */}
            <div className="flex items-center gap-4 px-6 md:px-10 pt-6">
              <div className="flex-1 h-[2px] bg-zinc-800 overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: '#E8500A' }}
                  animate={{ width: phase === 'done' ? '100%' : phase === 'lead' ? '92%' : `${progress}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <button
                onClick={onClose}
                className="text-zinc-500 hover:text-zinc-100 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 md:px-10 py-10 min-h-[460px] flex flex-col">
              <AnimatePresence mode="wait">
                {computing && (
                  <motion.div
                    key="computing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center"
                  >
                    <Loader2 className="w-10 h-10 animate-spin mb-6" style={{ color: '#E8500A' }} />
                    <p className="uppercase tracking-[0.3em] text-xs text-zinc-500 mb-4">Analyse en cours</p>
                    <ComputingLines />
                  </motion.div>
                )}

                {!computing && phase === 'quiz' && step?.type === 'question' && (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 flex flex-col"
                  >
                    <p className="uppercase tracking-[0.3em] text-xs text-zinc-500 mb-6">{step.label}</p>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-100 mb-8">
                      {step.question}
                    </h3>
                    <div className="space-y-3">
                      {step.options.map((opt) => (
                        <motion.button
                          key={opt.value}
                          whileHover={{ x: 4 }}
                          onClick={() => handleAnswer(step.id, opt.value)}
                          className="w-full text-left p-5 border border-zinc-800 hover:border-zinc-600 bg-zinc-950/50 hover:bg-zinc-950 transition-all group flex items-center justify-between gap-4"
                        >
                          <div>
                            <p className="text-zinc-100 font-bold">{opt.label}</p>
                            {opt.hint && <p className="text-sm text-zinc-500 mt-1">{opt.hint}</p>}
                          </div>
                          <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-zinc-100 transition-colors" />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {!computing && phase === 'quiz' && step?.type === 'slider' && (
                  <SliderStep
                    key={step.id}
                    step={step}
                    value={(answers[step.id] as number) ?? step.defaultValue}
                    onChange={(v) => setAnswers((a) => ({ ...a, [step.id]: v }))}
                    onNext={() => advance()}
                  />
                )}

                {!computing && phase === 'quiz' && step?.type === 'insight' && (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="flex-1 flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <Sparkles className="w-4 h-4" style={{ color: '#E8500A' }} />
                      <p className="uppercase tracking-[0.3em] text-xs" style={{ color: '#E8500A' }}>
                        Signal détecté
                      </p>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-100 mb-6">
                      {step.headline}<span style={{ color: '#E8500A' }}>.</span>
                    </h3>
                    {step.metric && (
                      <div className="border-l-2 py-4 pl-6 mb-6" style={{ borderColor: '#E8500A' }}>
                        <p className="font-mono text-5xl font-black text-zinc-100 tabular-nums">{step.metric.value}</p>
                        <p className="text-sm text-zinc-500 uppercase tracking-wider mt-2">{step.metric.label}</p>
                      </div>
                    )}
                    <p className="text-zinc-400 leading-relaxed mb-10">{step.body}</p>
                    <div className="mt-auto">
                      <button
                        onClick={advance}
                        className="w-full px-6 py-4 bg-zinc-100 text-zinc-950 font-bold hover:bg-transparent hover:text-zinc-100 border-2 border-zinc-100 transition-all flex items-center justify-center gap-2"
                      >
                        Poursuivre le diagnostic <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {!computing && phase === 'lead' && (
                  <motion.form
                    key="lead"
                    onSubmit={handleLeadSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Lock className="w-4 h-4" style={{ color: '#E8500A' }} />
                      <p className="uppercase tracking-[0.3em] text-xs" style={{ color: '#E8500A' }}>
                        Diagnostic prêt
                      </p>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-100 mb-4">
                      Votre rapport personnalisé est calculé<span style={{ color: '#E8500A' }}>.</span>
                    </h3>
                    <p className="text-zinc-400 leading-relaxed mb-8">
                      8 pages d'analyse : cartographie de vos gisements, benchmark sectoriel, plan de déploiement 14 jours et estimation ROI chiffrée. Recevez-le immédiatement par email.
                    </p>
                    <div className="space-y-3 mb-6">
                      <input
                        required
                        placeholder="Nom complet"
                        value={lead.name}
                        onChange={(e) => setLead({ ...lead, name: e.target.value })}
                        className="w-full px-5 py-4 bg-zinc-950 border border-zinc-800 focus:border-zinc-500 outline-none text-zinc-100 placeholder:text-zinc-600 transition-colors"
                      />
                      <input
                        required
                        type="email"
                        placeholder="Email professionnel"
                        value={lead.email}
                        onChange={(e) => setLead({ ...lead, email: e.target.value })}
                        className="w-full px-5 py-4 bg-zinc-950 border border-zinc-800 focus:border-zinc-500 outline-none text-zinc-100 placeholder:text-zinc-600 transition-colors"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          required
                          placeholder="Société"
                          value={lead.company}
                          onChange={(e) => setLead({ ...lead, company: e.target.value })}
                          className="px-5 py-4 bg-zinc-950 border border-zinc-800 focus:border-zinc-500 outline-none text-zinc-100 placeholder:text-zinc-600 transition-colors"
                        />
                        <input
                          placeholder="Téléphone (optionnel)"
                          value={lead.phone}
                          onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                          className="px-5 py-4 bg-zinc-950 border border-zinc-800 focus:border-zinc-500 outline-none text-zinc-100 placeholder:text-zinc-600 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-zinc-500 mb-6">
                      <Lock className="w-3 h-3 mt-0.5 shrink-0" />
                      <p>Données chiffrées. Aucun spam. Désinscription en un clic. Conforme RGPD.</p>
                    </div>
                    {error && (
                      <div className="flex items-start gap-2 text-sm text-red-400 bg-red-950/30 border border-red-900/50 p-3 mb-4">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <p>Envoi impossible : {error}</p>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full px-6 py-4 bg-zinc-100 text-zinc-950 font-bold hover:bg-transparent hover:text-zinc-100 border-2 border-zinc-100 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {submitting ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Génération en cours…</>
                      ) : (
                        <>Débloquer mon diagnostic <ChevronRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </motion.form>
                )}

                {phase === 'done' && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 flex flex-col items-center justify-center text-center"
                  >
                    <CheckCircle2 className="w-16 h-16 mb-6" style={{ color: '#E8500A' }} strokeWidth={1.5} />
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-100 mb-4">
                      Rapport envoyé<span style={{ color: '#E8500A' }}>.</span>
                    </h3>
                    <p className="text-zinc-400 max-w-md leading-relaxed mb-8">
                      Vérifiez votre boîte mail dans les 2 prochaines minutes. Un consultant COAL vous contactera sous 24h pour explorer les quick-wins identifiés.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-8 py-3 border border-zinc-700 text-zinc-300 hover:border-zinc-100 hover:text-zinc-100 transition-colors"
                    >
                      Fermer
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer back button */}
            {phase === 'quiz' && !computing && stepIndex > 0 && (
              <button
                onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                className="absolute bottom-5 left-6 md:left-10 text-xs uppercase tracking-[0.2em] text-zinc-600 hover:text-zinc-300 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-3 h-3" /> Précédent
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SliderStep({
  step,
  value,
  onChange,
  onNext,
}: {
  step: Extract<QuizStep, { type: 'slider' }>;
  value: number;
  onChange: (v: number) => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35 }}
      className="flex-1 flex flex-col"
    >
      <p className="uppercase tracking-[0.3em] text-xs text-zinc-500 mb-6">{step.label}</p>
      <h3 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-100 mb-10">
        {step.question}
      </h3>
      <div className="text-center mb-8">
        <motion.p
          key={value}
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-mono text-7xl font-black text-zinc-100 tabular-nums"
        >
          {value}<span style={{ color: '#E8500A' }}>{step.unit}</span>
        </motion.p>
      </div>
      <input
        type="range"
        min={step.min}
        max={step.max}
        step={step.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-zinc-100 mb-10"
        style={{ accentColor: '#E8500A' }}
      />
      <div className="mt-auto">
        <button
          onClick={onNext}
          className="w-full px-6 py-4 bg-zinc-100 text-zinc-950 font-bold hover:bg-transparent hover:text-zinc-100 border-2 border-zinc-100 transition-all flex items-center justify-center gap-2"
        >
          Valider <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function ComputingLines() {
  const lines = [
    { icon: Target, text: 'Cartographie des flux opérationnels' },
    { icon: TrendingUp, text: 'Benchmark sectoriel croisé' },
    { icon: Zap, text: 'Identification des quick-wins' },
    { icon: Sparkles, text: 'Calibration du plan de déploiement' },
  ];
  return (
    <div className="space-y-3 w-full max-w-sm">
      {lines.map((l, i) => (
        <motion.div
          key={l.text}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.4 }}
          className="flex items-center gap-3 text-sm text-zinc-400"
        >
          <l.icon className="w-4 h-4" style={{ color: '#E8500A' }} />
          <span>{l.text}</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.4 + 0.3 }}
            className="ml-auto text-xs text-zinc-600"
          >
            OK
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}
