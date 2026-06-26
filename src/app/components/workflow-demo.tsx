import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail, Cpu, Database, Send, CheckCircle2, FileSearch,
} from 'lucide-react';

const EMBER = '#E8500A';

type Node = {
  id: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
};

const NODES: Node[] = [
  { id: 'trigger', label: 'Email entrant', sub: 'Lead capté', icon: <Mail className="w-5 h-5" strokeWidth={1.8} /> },
  { id: 'parse',   label: 'Analyse IA',    sub: 'Extraction & scoring', icon: <FileSearch className="w-5 h-5" strokeWidth={1.8} /> },
  { id: 'enrich',  label: 'Enrichissement', sub: 'Données CRM',         icon: <Database className="w-5 h-5" strokeWidth={1.8} /> },
  { id: 'agent',   label: 'Agent COAL',    sub: 'Décision & action',    icon: <Cpu className="w-5 h-5" strokeWidth={1.8} /> },
  { id: 'send',    label: 'Réponse',       sub: 'Email personnalisé',   icon: <Send className="w-5 h-5" strokeWidth={1.8} /> },
  { id: 'done',    label: 'Synchronisé',   sub: 'CRM mis à jour',       icon: <CheckCircle2 className="w-5 h-5" strokeWidth={1.8} /> },
];

export function WorkflowDemo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % NODES.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="border border-zinc-800 bg-zinc-950/60 p-6 md:p-10 mb-10">
      <div className="flex items-center justify-between mb-8">
        <p className="uppercase tracking-[0.25em] text-[10px] font-bold text-zinc-500">
          Workflow en exécution — Qualification de leads
        </p>
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: EMBER }}
          />
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-bold" style={{ color: EMBER }}>
            Live
          </span>
        </div>
      </div>

      {/* Desktop : horizontal flow */}
      <div className="hidden md:flex items-center gap-2">
        {NODES.map((n, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <div key={n.id} className="flex items-center flex-1 min-w-0">
              <motion.div
                animate={{
                  borderColor: isActive ? EMBER : isPast ? '#3f3f46' : '#27272a',
                  backgroundColor: isActive ? 'rgba(232,80,10,0.08)' : 'rgba(232,80,10,0)',
                  scale: isActive ? 1.04 : 1,
                }}
                transition={{ duration: 0.4 }}
                className="flex-1 min-w-0 border bg-zinc-950 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <motion.div
                    animate={{ color: isActive ? EMBER : isPast ? '#a1a1aa' : '#52525b' }}
                    transition={{ duration: 0.4 }}
                  >
                    {n.icon}
                  </motion.div>
                  {isPast && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500 ml-auto" strokeWidth={2.2} />
                  )}
                </div>
                <p className="text-xs font-black text-zinc-100 truncate">{n.label}</p>
                <p className="text-[10px] text-zinc-500 truncate uppercase tracking-wider mt-1">{n.sub}</p>
              </motion.div>
              {i < NODES.length - 1 && (
                <div className="relative h-px w-6 bg-zinc-800 flex-shrink-0">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key={`pulse-${active}`}
                        initial={{ x: '-100%', opacity: 1 }}
                        animate={{ x: '100%', opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: 'linear' }}
                        className="absolute inset-y-0 w-6"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${EMBER}, transparent)`,
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile : vertical compact list */}
      <div className="md:hidden space-y-2">
        {NODES.map((n, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <motion.div
              key={n.id}
              animate={{
                borderColor: isActive ? EMBER : isPast ? '#3f3f46' : '#27272a',
                backgroundColor: isActive ? 'rgba(232,80,10,0.08)' : 'rgba(232,80,10,0)',
              }}
              transition={{ duration: 0.4 }}
              className="border p-3 flex items-center gap-3"
            >
              <motion.div
                animate={{ color: isActive ? EMBER : isPast ? '#a1a1aa' : '#52525b' }}
              >
                {n.icon}
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-zinc-100">{n.label}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{n.sub}</p>
              </div>
              {isPast && <CheckCircle2 className="w-4 h-4 text-zinc-500" strokeWidth={2.2} />}
              {isActive && (
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: EMBER }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs text-zinc-500 mt-6 leading-relaxed">
        Exemple simplifié — chaque workflow réel est conçu sur-mesure à partir des quick-wins
        identifiés lors de l'audit.
      </p>
    </div>
  );
}
