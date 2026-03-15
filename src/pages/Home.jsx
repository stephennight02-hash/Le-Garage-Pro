import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Button from '../components/Button'
import BentoCard from '../components/BentoCard'

export default function Home() {
  const containerRef = useRef(null)
  
  // Neon effect synced with scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const neonOpacity = useTransform(scrollYProgress, [0, 0.4], [0.1, 1])
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* 🏎️ SECTION HERO (IMMERSIVE HD) */}
      <section className="relative h-[100svh] min-h-[600px] flex flex-col justify-end px-6 md:px-20 pb-32 overflow-hidden">
        {/* High-Def Exotic Car Image */}
        <motion.div style={{ y: yTranslate }} className="absolute inset-0 z-0">
          <img 
            src="/img/porscheaccueil.avif" 
            alt="Porsche 911" 
            className="w-full h-full object-cover object-[center_30%]"
          />
          {/* Deep Black gradient integration */}
          <div className="absolute inset-0 bg-gradient-to-b from-fond/20 via-fond/60 to-fond" />
          <div className="absolute inset-0 bg-gradient-to-r from-fond/90 via-transparent to-fond/90" />
          
          {/* Dynamic glowing neon floor effect */}
          <motion.div 
            style={{ opacity: neonOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[120%] h-1/2 bg-cyan/20 blur-[120px]"
          />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <span className="font-heading text-sm font-bold tracking-[0.4em] text-cyan uppercase mb-6 block drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]">
              HAUTE PERFORMANCE
            </span>
            <h1 className="font-heading text-6xl md:text-8xl font-black text-texte leading-[0.9] tracking-wider uppercase drop-shadow-2xl">
              L'Atelier <br />
              <span className="text-cyan glow-text">Mécanique</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-texte-muted mt-8 max-w-xl font-medium leading-relaxed">
              Un sanctuaire pour automobiles d'exception. De la maintenance millimétrée à la préparation moteur sur-mesure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <Button href="/atelier" className="h-14">Diagnostic Interactif</Button>
              <Button primary={false} href="/services" className="h-14">Nos Prestations</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 📸 AMBIENT IMAGERY SECTION */}
      <section className="px-6 md:px-12 py-10 bg-fond relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
           {/* Detailed Rims/Brakes */}
           <motion.div 
             initial={{ opacity:0, y: 20 }} whileInView={{ opacity:1, y: 0 }} viewport={{ once:true }}
             className="md:col-span-2 rounded-2xl overflow-hidden aspect-[16/9] md:aspect-auto h-48 md:h-64 relative group border border-anthracite-clair"
            >
              <img src="/img/jantesfreins.png" alt="Premium Carbon Ceramic Brakes" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-fond/30 transition-colors group-hover:bg-transparent" />
           </motion.div>
           {/* Clean Workshop */}
           <motion.div 
             initial={{ opacity:0, y: 20 }} whileInView={{ opacity:1, y: 0 }} viewport={{ once:true }} transition={{ delay: 0.1 }}
             className="rounded-2xl overflow-hidden aspect-square md:h-64 relative group border border-anthracite-clair"
            >
              <img src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=800&auto=format&fit=crop" alt="Clean Workshop Detail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-fond/30 transition-colors group-hover:bg-transparent" />
           </motion.div>
           {/* Engine Detail */}
           <motion.div 
             initial={{ opacity:0, y: 20 }} whileInView={{ opacity:1, y: 0 }} viewport={{ once:true }} transition={{ delay: 0.2 }}
             className="rounded-2xl overflow-hidden aspect-square md:h-64 relative group border border-anthracite-clair"
            >
              <img src="/img/detailmoteur.png" alt="V8 Engine Detail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-fond/30 transition-colors group-hover:bg-transparent" />
           </motion.div>
        </div>
      </section>

      {/* 🛠️ BENTO GRID (Pillars / Strengths) */}
      <section className="px-6 md:px-12 py-20 bg-fond relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest flex items-center gap-3">
              <span className="w-8 h-[2px] bg-cyan cyan-neon-shadow"></span>
              Notre ADN
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px]">
             {/* Big Feature */}
            <BentoCard 
              className="md:col-span-2 md:row-span-2"
              highlight={true}
              title="Expertise d'Orfèvre"
              description="Nos techniciens sont formés sur les dernières architectures mécaniques et hybrides des constructeurs les plus prestigieux. Chaque intervention bénéficie d'une traçabilité absolue et de pièces strictement d'origine (OEM)."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
              }
            />

            <BentoCard 
              title="Rapidité & Discrétion"
              description="Un service de conciergerie VIP pour récupérer et livrer votre véhicule. Les interventions sont programmées pour immobiliser le véhicule au minimum."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              }
            />

            <BentoCard 
              title="Passion & Partage"
              description="L'Atelier est ouvert sur notre salle d'attente vitrée. Observez la magie opérer en dégustant un café de spécialité."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>
    </div>
  )
}
