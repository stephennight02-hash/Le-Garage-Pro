import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const navItems = [
  { to: '/', label: 'Accueil', icon: HomeIcon },
  { to: '/services', label: 'Services', icon: ServicesIcon },
  { to: '/atelier', label: 'Atelier', icon: WorkshopIcon },
  { to: '/contact', label: 'Contact', icon: ContactIcon },
]

// Custom minimal line icons fit for a premium garage
function HomeIcon({ active }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
    </svg>
  )
}

function ServicesIcon({ active }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  )
}

function WorkshopIcon({ active }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  )
}

function ContactIcon({ active }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Header() {
  const location = useLocation()

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="hidden md:flex fixed top-0 left-0 right-0 z-50 items-center justify-between px-12 py-5 bg-fond/90 backdrop-blur-xl border-b border-anthracite-clair"
      >
        <NavLink to="/" className="font-heading text-3xl font-black tracking-widest text-texte flex items-center gap-2">
          <span>G</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan cyan-neon-shadow mt-1"></span>
          <span>PREMIUM</span>
        </NavLink>
        <nav className="flex items-center gap-10">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative font-heading text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-300 py-2 ${
                  isActive ? 'text-cyan glow-text' : 'text-texte-muted hover:text-texte'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="desktop-glow"
                      className="absolute -bottom-px left-0 right-0 h-0.5 bg-cyan cyan-neon-shadow"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </motion.header>

      {/* ── Mobile Bottom Tab Bar ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-anthracite/95 backdrop-blur-xl border-t border-anthracite-clair safe-bottom">
        <div className="flex items-center justify-around py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to || (location.pathname === '/' && to === '/')
            return (
              <NavLink
                key={to}
                to={to}
                className="relative flex flex-col items-center gap-1 min-w-[64px]"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10">
                   {isActive && (
                    <motion.div
                      layoutId="mobile-glow"
                      className="h-[2px] bg-cyan cyan-neon-shadow rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </div>
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  className={`transition-colors duration-300 ${
                    isActive ? 'text-cyan drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]' : 'text-texte-muted'
                  }`}
                >
                  <Icon active={isActive} />
                </motion.div>
                <span className={`font-heading text-[11px] font-bold tracking-widest uppercase transition-colors ${
                  isActive ? 'text-cyan glow-text' : 'text-texte-muted'
                }`}>
                  {label}
                </span>
              </NavLink>
            )
          })}
        </div>
      </nav>
    </>
  )
}
