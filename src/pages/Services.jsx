import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/Button'

const services = [
  {
    id: 'revision',
    title: 'Révision & Entretien Premium',
    price: 'À partir de 250€',
    desc: 'L\'entretien scrupuleux des mécaniques de précision exige rigueur et expertise. Nos forfaits incluent la vidange avec des huiles haute performance, le remplacement des filtres (OEM), et un diagnostic OBD complet de 52 points de contrôle. Carnet d\'entretien électronique préservé.',
  },
  {
    id: 'stage1',
    title: 'Préparation Stage 1 & 2',
    price: 'À partir de 590€',
    desc: 'Optimisation de la cartographie moteur pour libérer la puissance et le couple de votre véhicule. Flash calculateur sur mesure sur banc de puissance. Possibilité de désactivation des limiteurs (Vmax) et crackles (pops & bangs) sur demande. Garantie logicielle 5 ans.',
  },
  {
    id: 'geometrie',
    title: 'Géométrie & Liaisons au Sol',
    price: 'À partir de 120€',
    desc: 'Réglage ultra-précis du parallélisme, du carrossage et de la chasse à l\'aide de notre banc laser 3D de dernière génération. Idéal après un rabaissement, un changement de jantes ou pour corriger un comportement instable sur piste.',
  },
  {
    id: 'detailing',
    title: 'Detailing & Protection Céramique',
    price: 'À partir de 800€',
    desc: 'Correction des défauts de la carrosserie (micro-rayures, hologrammes) par polissage en plusieurs passes. Application d\'un traitement céramique 9H garantissant une brillance extrême, un effet déperlant et une protection anti-UV pour 3 à 5 ans.',
  }
]

function Accordion({ service, isOpen, onClick }) {
  return (
    <div className="border border-anthracite-clair bg-anthracite/50 rounded-xl overflow-hidden mb-4 transition-colors hover:border-cyan/30">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <div>
          <h3 className="font-heading text-lg font-bold text-texte uppercase tracking-wide">
            {service.title}
          </h3>
          <p className="font-body text-base font-semibold text-cyan mt-2">
            {service.price}
          </p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 rounded-full bg-anthracite-clair flex items-center justify-center shrink-0 ml-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-cyan">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 pt-0 border-t border-anthracite-clair">
               <p className="font-body text-base text-texte-muted leading-relaxed mt-4">
                 {service.desc}
               </p>
               <div className="mt-6 flex flex-col sm:flex-row gap-3">
                 <Button href="/atelier" size="sm">Demander un Diagnostic</Button>
                 <Button href="/contact" primary={false} size="sm">Nous contacter</Button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Services() {
  const [openId, setOpenId] = useState('revision')

  return (
    <div className="pt-24 md:pt-32 px-6 md:px-20 min-h-screen flex flex-col mb-12">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="font-heading text-5xl md:text-6xl font-black uppercase tracking-widest text-texte mb-6">
            Nos <span className="text-cyan glow-text">Prestations</span>
          </h1>
          <p className="font-body text-lg text-texte-muted max-w-3xl leading-relaxed">
            De l'entretien courant à la préparation extrême sur banc de puissance, explorez notre catalogue de services dédiés à l'automobile de prestige. Transparence totale, expertise absolue.
          </p>
        </div>

        {/* Accordions */}
        <div className="max-w-3xl">
          {services.map((service) => (
            <Accordion 
              key={service.id} 
              service={service} 
              isOpen={openId === service.id} 
              onClick={() => setOpenId(openId === service.id ? null : service.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
