import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';

const EMBER = '#E8500A';

const fmt = (n: number) =>
  new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(n));

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
};

function Slider({ label, value, min, max, step, unit, onChange }: SliderProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <label className="uppercase tracking-[0.2em] text-[10px] font-bold text-zinc-500">
          {label}
        </label>
        <p className="font-mono text-2xl font-black text-zinc-100 tabular-nums">
          {fmt(value)}
          <span className="text-xs text-zinc-500 ml-1.5 font-medium">{unit}</span>
        </p>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-zinc-800 appearance-none cursor-pointer accent-[#E8500A]"
        style={{
          background: `linear-gradient(to right, ${EMBER} 0%, ${EMBER} ${
            ((value - min) / (max - min)) * 100
          }%, #27272a ${((value - min) / (max - min)) * 100}%, #27272a 100%)`,
        }}
      />
    </div>
  );
}

export function RoiCalculator() {
  const [hours, setHours] = useState(12);
  const [rate, setRate] = useState(45);
  const [people, setPeople] = useState(3);

  const weeklySavings = hours * rate * people;
  const monthlySavings = weeklySavings * 4.33;
  const yearlySavings = weeklySavings * 52;
  const yearlyHours = useMemo(() => hours * people * 52, [hours, people]);

  return (
    <div className="border border-zinc-800 bg-zinc-950/60 p-6 md:p-10 max-w-3xl">
      <div className="flex items-center gap-3 mb-2">
        <TrendingUp className="w-4 h-4" style={{ color: EMBER }} strokeWidth={2.2} />
        <p className="uppercase tracking-[0.25em] text-[10px] font-bold" style={{ color: EMBER }}>
          Calculateur ROI — Estimation
        </p>
      </div>
      <h4 className="text-2xl font-black tracking-tight mb-8">
        Combien pourriez-vous économiser<span style={{ color: EMBER }}>?</span>
      </h4>

      <div className="space-y-8 mb-10">
        <Slider
          label="Heures répétitives par semaine et par personne"
          value={hours}
          min={1}
          max={40}
          step={1}
          unit="h/sem"
          onChange={setHours}
        />
        <Slider
          label="Taux horaire chargé"
          value={rate}
          min={20}
          max={150}
          step={5}
          unit="€/h"
          onChange={setRate}
        />
        <Slider
          label="Personnes concernées"
          value={people}
          min={1}
          max={50}
          step={1}
          unit={people > 1 ? 'pers.' : 'pers.'}
          onChange={setPeople}
        />
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 gap-px bg-zinc-800">
        {[
          { label: 'Par semaine', value: weeklySavings, unit: '€' },
          { label: 'Par mois', value: monthlySavings, unit: '€' },
          { label: 'Par an', value: yearlySavings, unit: '€', highlight: true },
        ].map((r) => (
          <motion.div
            key={r.label}
            layout
            className="bg-zinc-950 p-5 text-center"
            style={r.highlight ? { backgroundColor: 'rgba(232,80,10,0.06)' } : undefined}
          >
            <p className="uppercase tracking-[0.2em] text-[9px] font-bold text-zinc-500 mb-2">
              {r.label}
            </p>
            <motion.p
              key={Math.round(r.value)}
              initial={{ opacity: 0.6, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xl md:text-2xl font-black tracking-tight tabular-nums"
              style={{ color: r.highlight ? EMBER : '#fafafa' }}
            >
              {fmt(r.value)}
              <span className="text-xs ml-1 font-medium opacity-60">{r.unit}</span>
            </motion.p>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-zinc-500 mt-6 leading-relaxed">
        Soit <span className="font-mono text-zinc-300 font-bold tabular-nums">{fmt(yearlyHours)} heures</span> récupérées
        chaque année pour des tâches à plus forte valeur. Estimation indicative — l'audit
        Agentic Readiness affine ce chiffre sur vos processus réels.
      </p>
    </div>
  );
}
