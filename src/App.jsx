import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Services from './pages/Services'
import Atelier from './pages/Atelier'
import Contact from './pages/Contact'

// Native-app like lateral slide transition
const slideTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3, ease: 'easeInOut' },
}

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={slideTransition.initial}
      animate={slideTransition.animate}
      exit={slideTransition.exit}
      transition={slideTransition.transition}
      className="page-transition min-h-screen"
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-fond text-texte font-body selection:bg-cyan selection:text-fond">
      <ScrollToTop />
      <Header />

      {/* Main Content — padded for fixed navbars */}
      <main className="md:pt-[76px] pb-[80px] md:pb-0 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <AnimatedPage>
                  <Home />
                </AnimatedPage>
              }
            />
            <Route
              path="/services"
              element={
                <AnimatedPage>
                  <Services />
                </AnimatedPage>
              }
            />
            <Route
              path="/atelier"
              element={
                <AnimatedPage>
                  <Atelier />
                </AnimatedPage>
              }
            />
            <Route
              path="/contact"
              element={
                <AnimatedPage>
                  <Contact />
                </AnimatedPage>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}
