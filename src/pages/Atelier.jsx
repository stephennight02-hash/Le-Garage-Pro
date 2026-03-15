import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/Button'

// Diagnostic Zones with Sub-categories & Schedule logic
const zones = [
  {
    id: 'moteur',
    label: 'Moteur & Électronique',
    subcategories: [
      { id: 'vidange', label: 'Vidange & Filtres' },
      { id: 'obd', label: 'Diagnostic OBD complet' },
      { id: 'bougies', label: 'Bougies & Allumage' },
      { id: 'distribution', label: 'Courroie & Distribution' }
    ],
    slots: {
      matin: [{ time: '08:30', available: true }, { time: '09:00', available: true }, { time: '10:30', available: false }, { time: '11:15', available: true }],
      apresMidi: [{ time: '14:00', available: true }, { time: '15:30', available: false }, { time: '17:00', available: true }]
    }
  },
  {
    id: 'roues',
    label: 'Trains Roulants (Freins/Pneus)',
    subcategories: [
      { id: 'freins', label: 'Disques & Plaquettes' },
      { id: 'pneus', label: 'Changement Pneus' },
      { id: 'geometrie', label: 'Géométrie 3D' }
    ],
    slots: {
      matin: [{ time: '09:00', available: true }, { time: '11:00', available: false }],
      apresMidi: [{ time: '13:30', available: true }, { time: '15:00', available: true }, { time: '16:45', available: false }]
    }
  },
  {
    id: 'carrosserie',
    label: 'Carrosserie / Esthétique',
    subcategories: [
      { id: 'ppf', label: 'Film PPF de protection' },
      { id: 'polish', label: 'Polissage & Detailing' },
      { id: 'cuir', label: 'Soin des Cuirs' }
    ],
    slots: {
      matin: [{ time: '08:00', available: false }, { time: '10:00', available: true }],
      apresMidi: [{ time: '14:30', available: true }, { time: '16:00', available: true }]
    }
  },
  {
    id: 'echappement',
    label: 'Échappement',
    subcategories: [
      { id: 'ligne', label: 'Ligne Complète Inox' },
      { id: 'silencieux', label: 'Changement Silencieux' },
      { id: 'cata', label: 'Catalyseur / FAP' }
    ],
    slots: {
      matin: [{ time: '10:30', available: true }, { time: '11:45', available: true }],
      apresMidi: [{ time: '15:00', available: false }, { time: '17:30', available: true }]
    }
  }
]

export default function Atelier() {
  const [activeZone, setActiveZone] = useState(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const sheetRef = useRef(null)

  const handleZoneClick = (zoneId) => {
    const zone = zones.find(z => z.id === zoneId)
    setActiveZone(activeZone?.id === zoneId ? null : zone)
    setSelectedSubCategory(null)
    setSelectedSlot(null)
    setConfirmed(false)
    
    // Smooth scroll to the sheet when opened
    if (zone && window.innerWidth < 768) {
       setTimeout(() => {
          sheetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
       }, 200)
    }
  }

  const handleBooking = () => {
    setConfirmed(true)
  }

  return (
    <div className="pt-24 md:pt-32 px-6 md:px-20 min-h-screen flex flex-col items-center pb-24">
      <div className="max-w-4xl text-center mb-10">
         <h1 className="font-heading text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-texte drop-shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            Plan <span className="text-cyan glow-text">Interactif</span>
          </h1>
          <p className="font-body text-base md:text-lg text-texte-muted mt-4 max-w-2xl mx-auto leading-relaxed">
            Sélectionnez la zone d'intervention directement sur votre véhicule pour accéder aux pièces et planifier immédiatement votre rendez-vous.
          </p>
      </div>

      {/* ── User Image Background with Clickable Bounding Regions ── */}
      <div className="relative w-full max-w-6xl aspect-[4/3] md:aspect-[21/9] bg-gradient-to-br from-gray-100 to-gray-300 rounded-3xl border border-white/20 mb-12 flex justify-center items-center overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.1),0_15px_50px_rgba(0,229,255,0.05)] group">
        
        {/* The Base Photo provided by the user (Black lines SVG) */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none w-full h-full p-6 md:p-12 lg:p-16 flex items-center justify-center">
          <img 
            src="/img/carprofile.png" 
            alt="Profil Voiture" 
            className="w-full h-full object-contain object-center transition-transform duration-1000 group-hover:scale-105 opacity-90 drop-shadow-xl"
          />
          {/* Light radial glow behind the car to make the dark lines pop even more */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_70%)] pointer-events-none mix-blend-overlay" />
        </div>

        {/* Moteur (Capot Avant) */}
        <div onClick={() => handleZoneClick('moteur')} className="absolute left-[8%] top-[38%] w-[25%] h-[25%] group/zone cursor-pointer z-10 transition-transform hover:scale-105 hover:z-20">
           <div className={`w-full h-full border-2 rounded-2xl transition-all flex items-center justify-center backdrop-blur-md shadow-2xl
                ${activeZone?.id === 'moteur' ? 'bg-cyan/40 border-cyan' : 'bg-gray-800/40 border-gray-400/50 hover:border-cyan hover:bg-cyan/50'}
           `}>
              <span className={`font-bold text-xs md:text-base font-heading tracking-widest text-shadow transition-all
                ${activeZone?.id === 'moteur' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white group-hover/zone:text-white drop-shadow-md'}
              `}>
                + MOTEUR
              </span>
           </div>
        </div>

        {/* Roues (Freins et Jantes) - Front Wheel */}
        <div onClick={() => handleZoneClick('roues')} className="absolute left-[17%] top-[68%] w-[18%] h-[28%] group/zone cursor-pointer z-10 hover:z-20">
           <div className={`w-full h-full border-2 rounded-full transition-all flex items-center justify-center backdrop-blur-md shadow-2xl
                ${activeZone?.id === 'roues' ? 'bg-cyan/40 border-cyan' : 'bg-gray-800/40 border-gray-400/50 hover:border-cyan hover:bg-cyan/50'}
           `}>
              <span className={`font-bold text-xs md:text-base font-heading tracking-widest text-shadow transition-all
                ${activeZone?.id === 'roues' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white group-hover/zone:text-white drop-shadow-md'}
              `}>
                + FREINS
              </span>
           </div>
        </div>
        
        {/* Roues (Freins et Jantes) - Rear Wheel */}
        <div onClick={() => handleZoneClick('roues')} className="absolute right-[17%] top-[68%] w-[18%] h-[28%] group/zone cursor-pointer z-10 hover:z-20">
           <div className={`w-full h-full border-2 rounded-full transition-all flex items-center justify-center backdrop-blur-md shadow-2xl
                ${activeZone?.id === 'roues' ? 'bg-cyan/40 border-cyan' : 'bg-gray-800/40 border-gray-400/50 hover:border-cyan hover:bg-cyan/50'}
           `}>
              <span className={`font-bold text-xs md:text-base font-heading tracking-widest text-shadow transition-all
                ${activeZone?.id === 'roues' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white group-hover/zone:text-white drop-shadow-md'}
              `}>
                + FREINS
              </span>
           </div>
        </div>

        {/* Habitacle / Carrosserie */}
        <div onClick={() => handleZoneClick('carrosserie')} className="absolute left-[38%] top-[22%] w-[30%] h-[35%] group/zone cursor-pointer z-10 transition-transform hover:scale-105 hover:z-20">
           <div className={`w-full h-full border-2 rounded-2xl transition-all flex items-center justify-center backdrop-blur-md shadow-2xl
                ${activeZone?.id === 'carrosserie' ? 'bg-cyan/40 border-cyan' : 'bg-gray-800/40 border-gray-400/50 hover:border-cyan hover:bg-cyan/50'}
           `}>
              <span className={`font-bold text-xs md:text-base font-heading tracking-widest text-shadow transition-all
                ${activeZone?.id === 'carrosserie' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white group-hover/zone:text-white drop-shadow-md'}
              `}>
                + HABITACLE
              </span>
           </div>
        </div>

        {/* Échappement (Arrière bas) */}
        <div onClick={() => handleZoneClick('echappement')} className="absolute right-[2%] top-[58%] w-[12%] h-[15%] group/zone cursor-pointer z-10 transition-transform hover:scale-105 hover:z-20">
           <div className={`w-full h-full border-2 rounded-xl transition-all flex items-center justify-center backdrop-blur-md shadow-2xl
                ${activeZone?.id === 'echappement' ? 'bg-cyan/40 border-cyan' : 'bg-gray-800/40 border-gray-400/50 hover:border-cyan hover:bg-cyan/50'}
           `}>
              <span className={`font-bold text-[10px] md:text-sm font-heading tracking-widest text-shadow transition-all text-center
                ${activeZone?.id === 'echappement' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white group-hover/zone:text-white drop-shadow-md'}
              `}>
                + ÉCHAPPEMENT
              </span>
           </div>
        </div>
      </div>

      {/* ── Dynamic Booking Sheet ── */}
      <div className="w-full flex justify-center" ref={sheetRef}>
        <AnimatePresence mode="wait">
          {activeZone && (
            <motion.div
              layout
              key="booking-sheet"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="w-full max-w-3xl bg-anthracite/90 backdrop-blur-2xl border border-cyan/40 rounded-2xl p-6 md:p-10 shadow-[0_10px_40px_rgba(0,229,255,0.15)] relative overflow-hidden"
            >
              {/* Background cyan accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 blur-[80px] rounded-full pointer-events-none" />

              <div className="flex justify-between items-start mb-8 relative z-10 border-b border-anthracite-clair pb-6">
                 <div>
                   <span className="font-heading text-sm text-cyan uppercase tracking-[0.2em] font-extrabold mb-1 block">Configuration requise :</span>
                   <h2 className="font-heading text-3xl md:text-4xl font-bold text-texte">{activeZone.label}</h2>
                 </div>
                 <button onClick={() => setActiveZone(null)} className="text-texte-muted hover:text-cyan p-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                 </button>
              </div>

              {confirmed ? (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                   className="py-12 text-center flex flex-col items-center relative z-10"
                >
                   <div className="w-20 h-20 rounded-full border border-cyan bg-cyan/10 flex items-center justify-center mb-6 text-cyan cyan-neon-shadow">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                   </div>
                   <h3 className="font-heading text-3xl font-extrabold text-texte mb-3 tracking-wide">Demande Envoyée</h3>
                   <p className="font-body text-base md:text-lg text-texte-muted px-4 leading-relaxed font-medium">
                     Un technicien expert analysera votre requête <strong className="text-texte">"{selectedSubCategory?.label}"</strong> et vous rappellera rapidement pour finaliser le rendez-vous de <span className="text-cyan font-bold inline-block">{selectedSlot?.time}</span>.
                   </p>
                </motion.div>
              ) : (
                <div className="relative z-10">
                  
                  {/* STEP 1 : CHOISIR LA PIECE (SOUS-CATEGORIE) */}
                  <div className="mb-10">
                     <h4 className="font-body text-base text-texte font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                       <span className="w-6 h-6 rounded-full bg-cyan text-fond flex items-center justify-center text-xs">1</span>
                       Précisez l'intervention
                     </h4>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                       {activeZone.subcategories.map(subItem => (
                         <button
                           key={subItem.id}
                           onClick={() => { setSelectedSubCategory(subItem); setSelectedSlot(null); }}
                           className={`
                             py-4 px-5 text-left rounded-xl font-heading text-base font-bold tracking-wide transition-all duration-200 border
                             ${selectedSubCategory?.id === subItem.id 
                               ? 'border-cyan bg-cyan/20 text-cyan shadow-[0_0_15px_rgba(0,229,255,0.2)]' 
                               : 'border-anthracite-clair bg-anthracite hover:border-texte-muted text-texte-muted'}
                           `}
                         >
                           {subItem.label}
                         </button>
                       ))}
                     </div>
                  </div>

                  {/* STEP 2 : CHOISIR LE CRENEAU (APPARAIT SEULEMENT SI SOUS-CAT SELECTIONNEE) */}
                  <AnimatePresence>
                     {selectedSubCategory && (
                       <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: 'auto' }} 
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-6 border-t border-anthracite-clair/50"
                        >
                          <h4 className="font-body text-base text-texte font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                             <span className="w-6 h-6 rounded-full bg-cyan text-fond flex items-center justify-center text-xs">2</span>
                             Choisissez une disponibilité
                          </h4>
                          
                          {/* MATIN */}
                          <div className="mb-6">
                            <div className="flex items-center gap-3 mb-4">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-cyan">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                              </svg>
                              <span className="font-body text-sm text-texte uppercase tracking-widest font-bold">Matin</span>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                              {activeZone.slots.matin.map((slot, idx) => (
                                <button
                                  key={`m-${idx}`}
                                  disabled={!slot.available}
                                  onClick={() => setSelectedSlot(slot)}
                                  className={`
                                    py-4 rounded-xl font-heading text-base font-bold tracking-widest transition-all duration-200 border
                                    ${!slot.available 
                                      ? 'border-transparent bg-anthracite-clair/10 text-texte-muted/30 cursor-not-allowed' 
                                      : selectedSlot === slot 
                                        ? 'border-cyan bg-cyan text-fond shadow-[0_0_15px_rgba(0,229,255,0.4)]' 
                                        : 'border-anthracite-clair bg-anthracite hover:border-cyan hover:text-cyan text-texte'}
                                  `}
                                >
                                  {slot.time}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* APRES MIDI */}
                          <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-red-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                              </svg>
                              <span className="font-body text-sm text-texte uppercase tracking-widest font-bold">Après-midi</span>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                              {activeZone.slots.apresMidi.map((slot, idx) => (
                                <button
                                  key={`am-${idx}`}
                                  disabled={!slot.available}
                                  onClick={() => setSelectedSlot(slot)}
                                  className={`
                                    py-4 rounded-xl font-heading text-base font-bold tracking-widest transition-all duration-200 border
                                    ${!slot.available 
                                      ? 'border-transparent bg-anthracite-clair/10 text-texte-muted/30 cursor-not-allowed' 
                                      : selectedSlot === slot 
                                        ? 'border-cyan bg-cyan text-fond shadow-[0_0_15px_rgba(0,229,255,0.4)]' 
                                        : 'border-anthracite-clair bg-anthracite hover:border-cyan hover:text-cyan text-texte'}
                                  `}
                                >
                                  {slot.time}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Action Block */}
                          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-anthracite-clair/20 border border-cyan/20">
                             <div className="font-body text-base text-texte-muted flex-1 font-medium">
                               {selectedSlot ? (
                                 <span>Demande pour : <strong className="text-cyan">{selectedSubCategory.label}</strong> à <strong className="text-texte">{selectedSlot.time}</strong>.</span>
                               ) : (
                                 <span>Veuillez sélectionner un créneau disponible.</span>
                               )}
                             </div>
                             <Button 
                               onClick={handleBooking} 
                               primary={true} 
                               className={`w-full md:w-auto h-14 text-base transition-opacity duration-300 ${!selectedSlot ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
                             >
                               Confirmer 
                             </Button>
                          </div>

                       </motion.div>
                     )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
