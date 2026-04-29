import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Portfolio from './Portfolio';
import AttendanceTracker from './AttendanceTracker';

const App = () => {
  const [view, setView] = useState('portfolio');
  console.log('App view:', view);

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        {view === 'portfolio' ? (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Portfolio onViewTracker={() => setView('tracker')} />
          </motion.div>
        ) : (
          <motion.div
            key="tracker"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, type: 'spring', damping: 25 }}
          >
            <AttendanceTracker onBack={() => setView('portfolio')} />
          </motion.div>
        )}
      </AnimatePresence>
      <Analytics />
    </div>
  );
};

export default App;
