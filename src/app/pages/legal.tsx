import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

const EMBER = '#E8500A';

/**
 * Page Mentions légales / Confidentialité.
 * Structure conforme aux obligations FR + RGPD.
 * Les champs entre crochets [ ] sont à compléter par COAL.
 */
export default function Legal() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
      {/* Nav minimale */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-900/70">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-black text-xl tracking-tight">
            COAL<span style={{ color: EMBER }}>.</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-100 transition-colors text-xs tracking-[0.2em] uppercase font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Accueil
          </Link>
        </div>
      </nav>

      <main id="contenu" className="pt-36 pb-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <p className="uppercase tracking-[0.4em] text-xs text-zinc-500 mb-6">Informations légales</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-16">
            Mentions légales
            <span style={{ color: EMBER }}>.</span>
          </h1>

          <div className="space-y-14 text-zinc-400 leading-relaxed">
            <section>
              <h2 className="text-xl font-black text-zinc-100 mb-4 tracking-tight">Éditeur du site</h2>
              <p>
                Le présent site est édité par <span className="text-zinc-200">COAL</span>, [forme juridique]
                au capital de [montant] €, immatriculée au RCS de [ville] sous le numéro [SIREN].
                <br />
                Siège social : [adresse complète].
                <br />
                Numéro de TVA intracommunautaire : [FR XX XXX XXX XXX].
                <br />
                Directeur de la publication : [nom du responsable].
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-zinc-100 mb-4 tracking-tight">Contact</h2>
              <p>
                Email : [contact@coal.xx]
                <br />
                Téléphone : [+33 X XX XX XX XX]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-zinc-100 mb-4 tracking-tight">Hébergement</h2>
              <p>
                Ce site est hébergé par [nom de l'hébergeur], [adresse de l'hébergeur]. Les fonctions
                serveur et la base de données sont opérées via Supabase.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-zinc-100 mb-4 tracking-tight">
                Données personnelles (RGPD)
              </h2>
              <p className="mb-4">
                Les informations transmises via les formulaires (audit, contact) sont collectées par
                COAL aux seules fins de répondre à votre demande et de vous adresser le diagnostic
                sollicité. Elles ne sont ni revendues, ni cédées à des tiers à des fins commerciales.
              </p>
              <p>
                Conformément au Règlement Général sur la Protection des Données, vous disposez d'un
                droit d'accès, de rectification, d'effacement et de portabilité de vos données, ainsi
                que d'un droit d'opposition. Pour l'exercer, écrivez à [dpo@coal.xx]. Vous pouvez
                également introduire une réclamation auprès de la CNIL.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-zinc-100 mb-4 tracking-tight">Cookies</h2>
              <p>
                Ce site utilise uniquement les cookies strictement nécessaires à son fonctionnement.
                Aucun cookie publicitaire ou de traçage tiers n'est déposé sans votre consentement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-zinc-100 mb-4 tracking-tight">
                Propriété intellectuelle
              </h2>
              <p>
                L'ensemble des contenus présents sur ce site (textes, visuels, logo, identité COAL)
                est protégé par le droit de la propriété intellectuelle. Toute reproduction sans
                autorisation préalable est interdite.
              </p>
            </section>
          </div>

          <div className="mt-20 pt-10 border-t border-zinc-900">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors text-sm tracking-widest uppercase font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
