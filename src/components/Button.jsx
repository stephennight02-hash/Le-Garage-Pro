import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionLink = motion(Link)

export default function Button({ children, href, primary = true, className = '', onClick }) {
  const Component = href ? MotionLink : motion.button
  
  const baseClasses = 'metallic-btn relative flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-heading text-base font-bold uppercase tracking-widest overflow-hidden'
  const variantClasses = primary ? 'primary shadow-[0_0_15px_rgba(0,229,255,0.3)]' : 'bg-anthracite border border-anthracite-clair text-texte'

  return (
    <Component
      {...(href ? { to: href } : { onClick })}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      <span className="relative z-10 font-bold">{children}</span>
    </Component>
  )
}
