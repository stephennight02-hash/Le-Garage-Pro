import { motion } from 'framer-motion'

export default function BentoCard({ title, description, icon, className = '', highlight }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative overflow-hidden bg-anthracite rounded-2xl border ${highlight ? 'border-cyan/30' : 'border-anthracite-clair'} p-6 md:p-8 flex flex-col transition-colors hover:border-cyan/50 cursor-pointer ${className}`}
    >
      {/* Inner Glow Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/0 to-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Optional Highlight Gradient */}
      {highlight && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/20 blur-[50px] rounded-full pointer-events-none" />
      )}

      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 
          ${highlight ? 'bg-cyan text-fond shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-anthracite-clair text-texte'}`}
        >
          {icon}
        </div>
        
        <h3 className={`font-heading text-2xl font-bold mb-3 tracking-wide ${highlight ? 'text-cyan glow-text' : 'text-texte'}`}>
          {title}
        </h3>
        
        <p className="font-body text-base font-medium text-texte-muted leading-relaxed">
          {description}
        </p>
      </div>

      {/* Decorative arrow */}
      <div className="absolute bottom-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </motion.div>
  )
}
