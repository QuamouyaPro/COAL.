import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Loader2, CheckCircle2, Mail, Lock, AlertCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setForm({ name: '', email: '', company: '', subject: '', message: '' });
      setDone(false);
      setError(null);
    }
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-80f7bc56/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        console.error('Contact form submission failed:', data);
        throw new Error(data?.error || `Server responded ${res.status}`);
      }
      setDone(true);
    } catch (err) {
      console.error('Contact form error:', err);
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
            <div className="flex items-center gap-4 px-6 md:px-10 pt-6">
              <div className="flex-1 h-[2px] bg-zinc-800 overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: '#E8500A' }}
                  animate={{ width: done ? '100%' : '25%' }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <button onClick={onClose} className="text-zinc-500 hover:text-zinc-100 transition-colors" aria-label="Fermer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 md:px-10 py-10 min-h-[460px] flex flex-col">
              <AnimatePresence mode="wait">
                {!done ? (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="flex-1 flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Mail className="w-4 h-4" style={{ color: '#E8500A' }} />
                      <p className="uppercase tracking-[0.3em] text-xs" style={{ color: '#E8500A' }}>
                        Prendre contact
                      </p>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-100 mb-4">
                      Parlons de votre opération<span style={{ color: '#E8500A' }}>.</span>
                    </h3>
                    <p className="text-zinc-400 leading-relaxed mb-8">
                      Un message, une question, un projet. Un consultant COAL vous répond sous 24h ouvrées.
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          required
                          placeholder="Nom complet"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="px-5 py-4 bg-zinc-950 border border-zinc-800 focus:border-zinc-500 outline-none text-zinc-100 placeholder:text-zinc-600 transition-colors"
                        />
                        <input
                          placeholder="Société (optionnel)"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className="px-5 py-4 bg-zinc-950 border border-zinc-800 focus:border-zinc-500 outline-none text-zinc-100 placeholder:text-zinc-600 transition-colors"
                        />
                      </div>
                      <input
                        required
                        type="email"
                        placeholder="Email professionnel"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-5 py-4 bg-zinc-950 border border-zinc-800 focus:border-zinc-500 outline-none text-zinc-100 placeholder:text-zinc-600 transition-colors"
                      />
                      <input
                        required
                        placeholder="Objet du message"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-5 py-4 bg-zinc-950 border border-zinc-800 focus:border-zinc-500 outline-none text-zinc-100 placeholder:text-zinc-600 transition-colors"
                      />
                      <textarea
                        required
                        rows={5}
                        placeholder="Votre message…"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-5 py-4 bg-zinc-950 border border-zinc-800 focus:border-zinc-500 outline-none text-zinc-100 placeholder:text-zinc-600 transition-colors resize-none"
                      />
                    </div>
                    <div className="flex items-start gap-2 text-xs text-zinc-500 mb-6">
                      <Lock className="w-3 h-3 mt-0.5 shrink-0" />
                      <p>Vos informations restent confidentielles. Conforme RGPD.</p>
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
                        <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours…</>
                      ) : (
                        <>Envoyer le message <ChevronRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 flex flex-col items-center justify-center text-center"
                  >
                    <CheckCircle2 className="w-16 h-16 mb-6" style={{ color: '#E8500A' }} strokeWidth={1.5} />
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-100 mb-4">
                      Message envoyé<span style={{ color: '#E8500A' }}>.</span>
                    </h3>
                    <p className="text-zinc-400 max-w-md leading-relaxed mb-8">
                      Nous revenons vers vous sous 24h ouvrées à l'adresse indiquée.
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
