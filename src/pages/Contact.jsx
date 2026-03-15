import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'

export default function Contact() {
  const phone = "+32470303019"
  const formattedPhone = "+32 470 30 30 19"
  const [formStatus, setFormStatus] = useState('idle') // idle, sending, sent

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sending')
    setTimeout(() => setFormStatus('sent'), 1200)
  }

  return (
    <div className="pt-24 md:pt-32 px-6 md:px-20 min-h-screen mb-12 max-w-7xl mx-auto">
      
      <div className="text-center md:text-left mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest text-texte mb-4">
          Nous <span className="text-cyan glow-text">Contacter</span>
        </h1>
        <p className="font-body text-lg md:text-xl text-texte-muted max-w-2xl leading-relaxed">
          Pour toute demande de devis, prise en charge immédiate ou renseignement technique.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* ── Form & Actions ── */}
        <div className="flex flex-col gap-8 order-2 lg:order-1">
          
          {/* Pro Form */}
          <div className="bg-anthracite/50 border border-anthracite-clair rounded-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/5 blur-[80px] rounded-full pointer-events-none" />
            
            <h3 className="font-heading text-xl font-bold text-texte mb-6 flex items-center gap-3">
              <span className="w-4 h-4 bg-cyan rounded-sm cyan-neon-shadow inline-block"></span>
              Message Privé
            </h3>

            {formStatus === 'sent' ? (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="py-10 text-center">
                <div className="text-cyan text-4xl mb-4">✓</div>
                <h4 className="font-heading text-lg font-bold text-texte mb-2">Message Envoyé</h4>
                <p className="font-body text-base text-texte-muted">Notre équipe vous répondra dans les plus brefs délais.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="font-body text-sm font-bold tracking-widest text-texte-muted uppercase">Nom Complet</label>
                    <input required type="text" className="w-full bg-fond border border-anthracite-clair rounded-lg px-4 py-4 text-texte font-body text-base focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all" placeholder="Jean Dupont"/>
                  </div>
                  <div className="space-y-1">
                    <label className="font-body text-sm font-bold tracking-widest text-texte-muted uppercase">Immatriculation</label>
                    <input type="text" className="w-full bg-fond border border-anthracite-clair rounded-lg px-4 py-4 text-texte font-body text-base focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all" placeholder="1-DGG-256"/>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="font-body text-sm font-bold tracking-widest text-texte-muted uppercase">Message / Demande</label>
                  <textarea required rows="5" className="w-full bg-fond border border-anthracite-clair rounded-lg px-4 py-4 text-texte font-body text-base focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all resize-none" placeholder="Détaillez votre besoin..."></textarea>
                </div>
                
                <Button primary={true} className="w-full" onClick={() => {}}>
                  {formStatus === 'sending' ? 'Envoi...' : 'Envoyer la demande'}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Direct */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <a href={`tel:${phone}`} className="group flex items-center gap-4 bg-anthracite border border-anthracite-clair hover:border-cyan/50 p-6 rounded-2xl transition-all hover:shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                <div className="w-12 h-12 rounded-full bg-fond flex items-center justify-center text-cyan group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.077-7.077l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <span className="block font-heading text-xs font-bold tracking-widest text-texte-muted uppercase mb-1">Appel Direct</span>
                  <span className="font-body text-base md:text-lg font-bold text-texte group-hover:text-cyan transition-colors">{formattedPhone}</span>
                </div>
             </a>

             <div className="flex gap-4">
               {/* WhatsApp */}
               <a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer" className="flex-1 flex flex-col justify-center items-center gap-2 bg-anthracite border border-anthracite-clair hover:border-[#25D366] rounded-2xl transition-all hover:shadow-[0_0_15px_rgba(37,211,102,0.15)] group">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#25D366] group-hover:scale-110 transition-transform">
                    <path d="M12.012 2C6.475 2 1.983 6.476 1.983 12.018c0 1.77.464 3.497 1.347 5.018L1.93 22l5.105-1.332a9.96 9.96 0 004.978 1.328h.004C17.55 21.996 22 17.525 22 11.98 22 9.299 20.954 6.786 19.055 4.88 17.156 2.973 14.636 1.996 12.012 2zm0 18.31h-[.004]c-1.487 0-2.949-.398-4.228-1.155l-.304-.178-3.14.821.838-3.056-.196-.312a8.312 8.312 0 01-1.272-4.41c0-4.603 3.748-8.351 8.358-8.351 2.235 0 4.33.87 5.903 2.443A8.307 8.307 0 0120.354 12c0 4.6-3.746 8.31-8.339 8.31z" />
                  </svg>
                  <span className="font-heading text-xs mt-2 font-bold tracking-widest text-texte-muted uppercase">WhatsApp</span>
               </a>
               {/* Instagram */}
               <a href="#" className="flex-1 flex flex-col justify-center items-center gap-2 bg-anthracite border border-anthracite-clair hover:border-[#E1306C] rounded-2xl transition-all hover:shadow-[0_0_15px_rgba(225,48,108,0.15)] group">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#E1306C] group-hover:scale-110 transition-transform">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  <span className="font-heading text-xs mt-2 font-bold tracking-widest text-texte-muted uppercase">Instagram</span>
               </a>
             </div>
          </div>
        </div>

        {/* ── Dark Filtered Map ── */}
        <div className="order-1 lg:order-2">
          <div className="w-full h-[400px] lg:h-full min-h-[500px] rounded-2xl overflow-hidden border border-anthracite-clair relative sticky top-32">
            
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,1)] z-10" />
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.8647008104863!2d4.358204615962047!3d50.83362146755498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c48624bdc8bd%3A0xc3ec78e4dccaf8aa!2sAv.%20Louise%2C%20Bruxelles%2C%20Belgique!5e0!3m2!1sfr!2sfr!4v1689234056262!5m2!1sfr!2sfr"
              className="w-full h-full border-0 grayscale opacity-90 mix-blend-screen"
              style={{ filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(120%)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Garage"
            ></iframe>

            {/* Float Info Box over Map */}
            <div className="absolute bottom-6 left-6 right-6 bg-fond/90 backdrop-blur-md border border-anthracite-clair rounded-xl p-5 z-20">
               <h4 className="font-heading font-black tracking-widest text-cyan text-sm mb-2">G PREMIUM GARAGE</h4>
               <p className="font-body text-texte-muted text-sm leading-relaxed mb-4">
                 Av. Louise 350, 1050 Bruxelles
               </p>
               <div className="flex justify-between items-center text-xs font-bold font-heading uppercase text-texte pt-4 border-t border-anthracite-clair">
                 <span>Lun-Sam</span>
                 <span className="text-cyan">08:00 — 19:00</span>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
