import React, { useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Terminal,
  Code2,
  Layers,
  Database,
  Cpu,
  GraduationCap,
  Download,
  Menu,
  X
} from 'lucide-react';
import resumeData from '../resume_data.json';

const Portfolio = ({ onViewTracker }) => {
  const { sections } = resumeData;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* Progress Bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: '#fafafa',
          transformOrigin: '0%',
          zIndex: 100
        }}
      />

      {/* Desktop Nav — hidden on mobile via CSS */}
      <nav className="main-nav desktop-nav" style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        gap: '32px',
        padding: '10px 24px',
        background: 'rgba(10, 10, 10, 0.8)',
        border: '1px solid #1a1a1a'
      }}>
        <a href="#projects" style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#525252', letterSpacing: '0.1em' }}>PROJECTS</a>
        <a href="#skills" style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#525252', letterSpacing: '0.1em' }}>STACKS</a>
        <a href="#experience" style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#525252', letterSpacing: '0.1em' }}>EXPERIENCE</a>
      </nav>

      {/* Mobile Hamburger — visible only on mobile via CSS */}
      <button
        className="mobile-hamburger"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 60,
          padding: '10px',
          background: 'rgba(10, 10, 10, 0.9)',
          border: '1px solid #262626',
          color: '#fafafa',
          display: 'none',
        }}
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 55,
              background: 'rgba(10, 10, 10, 0.95)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
            }}
          >
            {[['#projects', 'PROJECTS'], ['#skills', 'STACKS'], ['#experience', 'EXPERIENCE']].map(([href, label]) => (
              <motion.a
                key={label}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontSize: '14px',
                  fontFamily: 'var(--font-mono)',
                  color: '#fafafa',
                  letterSpacing: '0.2em',
                  textDecoration: 'none',
                }}
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '160px 40px 80px' }}>

        {/* Hero */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          style={{ marginBottom: '140px' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 16px',
            background: '#1a1a1a',
            border: '1px solid #262626',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            color: '#fafafa',
            marginBottom: '32px',
            letterSpacing: '0.1em'
          }}>
            <div style={{ width: '6px', height: '6px', background: '#fafafa' }} />
            AVAILABLE FOR WORK
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 8vw, 72px)',
            marginBottom: '20px',
            lineHeight: 1,
            color: '#fafafa',
            fontWeight: 600
          }}>
            {resumeData.metadata.name}
          </h1>

          <p style={{
            fontSize: '16px',
            color: '#525252',
            maxWidth: '540px',
            lineHeight: 1.6,
            marginBottom: '40px',
            fontFamily: 'var(--font-mono)'
          }}>
            {sections.Profile[0]}
          </p>

          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="https://github.com/atharvax28" target="_blank" style={{ padding: '12px', background: '#1a1a1a', border: '1px solid #262626', display: 'flex', color: '#fafafa', transition: 'all 0.15s' }}>
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/atharva-w-5565442a3" target="_blank" style={{ padding: '12px', background: '#1a1a1a', border: '1px solid #262626', display: 'flex', color: '#fafafa', transition: 'all 0.15s' }}>
              <Linkedin size={20} />
            </a>
          </div>
        </motion.header>

        {/* Projects */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          style={{ marginBottom: '140px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
            <div>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#525252', marginBottom: '8px', letterSpacing: '0.2em' }}>/// OUTPUT</div>
              <h2 style={{ fontSize: '28px', fontWeight: 600 }}>Selected Works</h2>
            </div>
          </div>

          <div className="selected-works" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1px', background: '#1a1a1a', padding: 1 }}>

            {/* Project 1: MSME Credit Intel */}
            <motion.a
              href="https://vricred1.netlify.app/"
              target="_blank"
              whileHover={{ y: -2 }}
              transition={{ type: "tween", duration: 0.2 }}
              className="project-card"
              style={{
                background: '#0a0a0a',
                padding: '48px',
                cursor: 'pointer',
                position: 'relative',
                border: '1px solid #1a1a1a',
                transition: 'all 0.2s',
                textDecoration: 'none',
                display: 'block'
              }}
            >


              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                <Terminal size={20} style={{ color: '#fafafa' }} />
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#fafafa', letterSpacing: '0.1em' }}>LIVE SITE</span>
              </div>

              <h3 style={{ fontSize: '24px', marginBottom: '12px', fontWeight: 600, color: '#fafafa' }}>MSME Credit Intel</h3>
              <p style={{ color: '#525252', fontSize: '14px', maxWidth: '720px', marginBottom: '28px', lineHeight: 1.6 }}>
                Async FastAPI engine delivering financial risk narrative reports via Claude API and XGBoost.
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['FASTAPI', 'PYTHON', 'CLAUDE API', 'XGBOOST'].map(tag => (
                  <span key={tag} style={{ fontSize: '10px', padding: '6px 12px', background: '#1a1a1a', border: '1px solid #262626', fontFamily: 'var(--font-mono)', color: '#525252', letterSpacing: '0.05em' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>

            {/* Project 2: Ath Framework */}
            <motion.a
              href="https://ath-framework.vercel.app/"
              target="_blank"
              whileHover={{ y: -2 }}
              transition={{ type: "tween", duration: 0.2 }}
              style={{
                background: '#0a0a0a',
                padding: '48px',
                cursor: 'pointer',
                position: 'relative',
                border: '1px solid #1a1a1a',
                transition: 'all 0.2s',
                textDecoration: 'none',
                display: 'block'
              }}
            >


              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                <Layers size={20} style={{ color: '#fafafa' }} />
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#fafafa', letterSpacing: '0.1em' }}>LIVE SITE</span>
              </div>

              <h3 style={{ fontSize: '24px', marginBottom: '12px', fontWeight: 600, color: '#fafafa' }}>Ath Framework</h3>
              <p style={{ color: '#525252', fontSize: '14px', maxWidth: '720px', marginBottom: '28px', lineHeight: 1.6 }}>
                Full-stack web application with modern architecture and responsive design.
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['REACT', 'NEXT.JS', 'VERCEL', 'NODE.JS'].map(tag => (
                  <span key={tag} style={{ fontSize: '10px', padding: '6px 12px', background: '#1a1a1a', border: '1px solid #262626', fontFamily: 'var(--font-mono)', color: '#525252', letterSpacing: '0.05em' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>

            {/* Project 3: AakankshaXTayade */}
            <motion.a
              href="https://aakankshaxtayade.vercel.app/login"
              target="_blank"
              whileHover={{ y: -2 }}
              transition={{ type: "tween", duration: 0.2 }}
              style={{
                background: '#0a0a0a',
                padding: '48px',
                cursor: 'pointer',
                position: 'relative',
                border: '1px solid #1a1a1a',
                transition: 'all 0.2s',
                textDecoration: 'none',
                display: 'block'
              }}
            >


              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                <Code2 size={20} style={{ color: '#fafafa' }} />
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#fafafa', letterSpacing: '0.1em' }}>LIVE SITE</span>
              </div>

              <h3 style={{ fontSize: '24px', marginBottom: '12px', fontWeight: 600, color: '#fafafa' }}>AakankshaXTayade</h3>
              <p style={{ color: '#525252', fontSize: '14px', maxWidth: '720px', marginBottom: '28px', lineHeight: 1.6 }}>
                Professional portfolio with authentication and interactive UI features.
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['REACT', 'VERCEL', 'AUTH', 'TAILWIND'].map(tag => (
                  <span key={tag} style={{ fontSize: '10px', padding: '6px 12px', background: '#1a1a1a', border: '1px solid #262626', fontFamily: 'var(--font-mono)', color: '#525252', letterSpacing: '0.05em' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>

            {/* Project 4: Strokes Designs */}
            <motion.a
              href="https://strokesdesigns.netlify.app/"
              target="_blank"
              whileHover={{ y: -2 }}
              transition={{ type: "tween", duration: 0.2 }}
              style={{
                background: '#0a0a0a',
                padding: '48px',
                cursor: 'pointer',
                position: 'relative',
                border: '1px solid #1a1a1a',
                transition: 'all 0.2s',
                textDecoration: 'none',
                display: 'block'
              }}
            >


              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                <Terminal size={20} style={{ color: '#fafafa' }} />
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#fafafa', letterSpacing: '0.1em' }}>LIVE SITE</span>
              </div>

              <h3 style={{ fontSize: '24px', marginBottom: '12px', fontWeight: 600, color: '#fafafa' }}>Strokes Designs</h3>
              <p style={{ color: '#525252', fontSize: '14px', maxWidth: '720px', marginBottom: '28px', lineHeight: 1.6 }}>
                Creative design agency website with modern aesthetics and responsive layout.
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['HTML', 'CSS', 'NETLIFY', 'DESIGN'].map(tag => (
                  <span key={tag} style={{ fontSize: '10px', padding: '6px 12px', background: '#1a1a1a', border: '1px solid #262626', fontFamily: 'var(--font-mono)', color: '#525252', letterSpacing: '0.05em' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>

            {/* Project 5: Site-Adaptive Scraping Framework */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "tween", duration: 0.2 }}
              style={{
                background: '#0a0a0a',
                padding: '48px',
                cursor: 'pointer',
                position: 'relative',
                border: '1px solid #1a1a1a',
                transition: 'all 0.2s'
              }}
            >


              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                <Layers size={20} style={{ color: '#fafafa' }} />
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#fafafa', letterSpacing: '0.1em' }}>BACKEND PROJECT</span>
              </div>

              <h3 style={{ fontSize: '24px', marginBottom: '12px', fontWeight: 600, color: '#fafafa' }}>Site-Adaptive Scraping Framework</h3>
              <p style={{ color: '#525252', fontSize: '14px', maxWidth: '720px', marginBottom: '28px', lineHeight: 1.6 }}>
                Engineered a site-adaptive scraping framework that automatically detects and routes to the appropriate extraction strategy: static HTML (Scrapy/BeautifulSoup), JavaScript-rendered SPAs (Playwright/Selenium with headless Chrome), paginated APIs (direct endpoint extraction), and hybrid multi-stage sites. Implemented content-fingerprinting heuristics to classify site type before dispatching the correct scraper; includes proxy rotation, rate limiting, retry logic with exponential backoff, and structured ETL output to PostgreSQL.
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['PYTHON', 'SCRAPY', 'BEAUTIFULSOUP', 'PLAYWRIGHT', 'SELENIUM', 'POSTGRESQL', 'DOCKER'].map(tag => (
                  <span key={tag} style={{ fontSize: '10px', padding: '6px 12px', background: '#1a1a1a', border: '1px solid #262626', fontFamily: 'var(--font-mono)', color: '#525252', letterSpacing: '0.05em' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Project 6: AI-Powered Job Lead Generation Automation */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "tween", duration: 0.2 }}
              style={{
                background: '#0a0a0a',
                padding: '48px',
                cursor: 'pointer',
                position: 'relative',
                border: '1px solid #1a1a1a',
                transition: 'all 0.2s'
              }}
            >


              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                <Cpu size={20} style={{ color: '#fafafa' }} />
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#fafafa', letterSpacing: '0.1em' }}>AUTOMATION PROJECT</span>
              </div>

              <h3 style={{ fontSize: '24px', marginBottom: '12px', fontWeight: 600, color: '#fafafa' }}>AI-Powered Job Lead Generation Automation</h3>
              <p style={{ color: '#525252', fontSize: '14px', maxWidth: '720px', marginBottom: '28px', lineHeight: 1.6 }}>
                Built an end-to-end automation workflow that scrapes job listings and company signals, passes them through Claude API for relevance scoring and personalised outreach generation, and routes qualified leads through Make (Integromat) and Zapier workflows to a structured CRM pipeline with follow-up scheduling. Automation triggers daily, deduplicates seen leads via Redis, and outputs scored prospect sheets with AI-drafted application content.
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['PYTHON', 'CLAUDE API', 'MAKE', 'ZAPIER', 'SCRAPY', 'REDIS', 'POSTGRESQL'].map(tag => (
                  <span key={tag} style={{ fontSize: '10px', padding: '6px 12px', background: '#1a1a1a', border: '1px solid #262626', fontFamily: 'var(--font-mono)', color: '#525252', letterSpacing: '0.05em' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Project 7: AI Workflow Automation Builder */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "tween", duration: 0.2 }}
              style={{
                background: '#0a0a0a',
                padding: '48px',
                cursor: 'pointer',
                position: 'relative',
                border: '1px solid #1a1a1a',
                transition: 'all 0.2s'
              }}
            >


              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                <Code2 size={20} style={{ color: '#fafafa' }} />
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#fafafa', letterSpacing: '0.1em' }}>FULLSTACK PROJECT</span>
              </div>

              <h3 style={{ fontSize: '24px', marginBottom: '12px', fontWeight: 600, color: '#fafafa' }}>AI Workflow Automation Builder</h3>
              <p style={{ color: '#525252', fontSize: '14px', maxWidth: '720px', marginBottom: '28px', lineHeight: 1.6 }}>
                Designed and implemented a drag-and-drop visual pipeline builder for composing multi-step AI workflows with real-time peer collaboration over WebRTC. Architected async node execution engine with live state synchronisation across connected clients using WebSocket broadcasting.
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['REACT.JS', 'NODE.JS', 'REACT FLOW', 'WEBRTC', 'MONGODB', 'DOCKER'].map(tag => (
                  <span key={tag} style={{ fontSize: '10px', padding: '6px 12px', background: '#1a1a1a', border: '1px solid #262626', fontFamily: 'var(--font-mono)', color: '#525252', letterSpacing: '0.05em' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Project 8: Network Threat Detection System */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "tween", duration: 0.2 }}
              style={{
                background: '#0a0a0a',
                padding: '48px',
                cursor: 'pointer',
                position: 'relative',
                border: '1px solid #1a1a1a',
                transition: 'all 0.2s'
              }}
            >


              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                <Database size={20} style={{ color: '#fafafa' }} />
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#fafafa', letterSpacing: '0.1em' }}>SECURITY PROJECT</span>
              </div>

              <h3 style={{ fontSize: '24px', marginBottom: '12px', fontWeight: 600, color: '#fafafa' }}>Network Threat Detection System</h3>
              <p style={{ color: '#525252', fontSize: '14px', maxWidth: '720px', marginBottom: '28px', lineHeight: 1.6 }}>
                Built a real-time packet analysis pipeline processing 10,000+ packets/sec with a PyTorch anomaly detection backend; engineered feature extraction from protocol, payload, and connection metadata; deployed Flask REST API and React dashboard for live threat visualisation and alert management.
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['PYTHON', 'SCAPY', 'PYTORCH', 'FLASK', 'REACT', 'POSTGRESQL', 'DOCKER'].map(tag => (
                  <span key={tag} style={{ fontSize: '10px', padding: '6px 12px', background: '#1a1a1a', border: '1px solid #262626', fontFamily: 'var(--font-mono)', color: '#525252', letterSpacing: '0.05em' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Project 9: Smart NAS with Content Management */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "tween", duration: 0.2 }}
              style={{
                background: '#0a0a0a',
                padding: '48px',
                cursor: 'pointer',
                position: 'relative',
                border: '1px solid #1a1a1a',
                transition: 'all 0.2s'
              }}
            >


              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                <Terminal size={20} style={{ color: '#fafafa' }} />
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#fafafa', letterSpacing: '0.1em' }}>INFRASTRUCTURE PROJECT</span>
              </div>

              <h3 style={{ fontSize: '24px', marginBottom: '12px', fontWeight: 600, color: '#fafafa' }}>Smart NAS with Content Management</h3>
              <p style={{ color: '#525252', fontSize: '14px', maxWidth: '720px', marginBottom: '28px', lineHeight: 1.6 }}>
                Engineered self-hosted NAS platform with ML-powered file categorisation, duplicate detection, AES-encrypted incremental backups, role-based access control, and responsive remote web admin interface.
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['PYTHON', 'PYTORCH', 'FLASK', 'LINUX', 'DOCKER', 'POSTGRESQL'].map(tag => (
                  <span key={tag} style={{ fontSize: '10px', padding: '6px 12px', background: '#1a1a1a', border: '1px solid #262626', fontFamily: 'var(--font-mono)', color: '#525252', letterSpacing: '0.05em' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Technical Stacks */}
        <motion.section
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          style={{ marginBottom: '140px' }}
        >
          <div style={{ marginBottom: '40px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#525252', marginBottom: '8px', letterSpacing: '0.2em' }}>/// CAPABILITIES</div>
            <h2 style={{ fontSize: '28px', fontWeight: 600 }}>The Stacks</h2>
          </div>

          <motion.div
            variants={staggerContainer}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1px', background: '#1a1a1a', padding: 1 }}
          >
            {sections["Technical Skills"].map((skillGroup, i) => {
              const [label, items] = skillGroup.split(': ');
              const icons = {
                Languages: <Terminal size={16} />,
                Frontend: <Code2 size={16} />,
                Backend: <Database size={16} />,
                'ML / AI': <Cpu size={16} />,
                default: <Layers size={16} />
              };
              return (
                <motion.div variants={itemVariants} key={i} style={{ background: '#0a0a0a', padding: '28px', border: '1px solid #1a1a1a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ color: '#fafafa' }}>{icons[label] || icons.default}</span>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.12em', color: '#fafafa' }}>{label.toUpperCase()}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#525252', lineHeight: 1.8 }}>{items}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* Experience & Academic */}
        <div id="experience" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1px', background: '#1a1a1a', padding: 1 }}>
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            style={{ background: '#0a0a0a', padding: '48px', border: '1px solid #1a1a1a' }}
          >
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#525252', marginBottom: '8px', letterSpacing: '0.2em' }}>/// CHRONOLOGY</div>
              <h2 style={{ fontSize: '24px' }}>Core Experience</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {sections["Professional Experience"].filter(l => l.includes('Software') || l.includes('Engineering')).map((exp, i) => (
                <div key={i} style={{ borderLeft: '2px solid #262626', paddingLeft: '24px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-7px', top: '0', width: '12px', height: '12px', background: '#0a0a0a', border: '2px solid #fafafa' }} />
                  <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>{exp.split(' — ')[0]}</div>
                  <div style={{ fontSize: '12px', color: '#fafafa', fontFamily: 'var(--font-mono)' }}>{exp.split(' — ')[1]}</div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            style={{ background: '#0a0a0a', padding: '48px', border: '1px solid #1a1a1a' }}
          >
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#525252', marginBottom: '8px', letterSpacing: '0.2em' }}>/// CREDENTIALS</div>
              <h2 style={{ fontSize: '24px' }}>Academic</h2>
            </div>

            <div style={{ background: '#1a1a1a', padding: '28px', border: '1px solid #262626' }}>
              <GraduationCap style={{ color: '#fafafa', marginBottom: '16px' }} size={24} />
              <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>{sections.Education[0]}</div>
              <p style={{ fontSize: '13px', color: '#525252' }}>{sections.Education[1]}</p>
            </div>
          </motion.section>
        </div>

        {/* Download CV Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          style={{ marginTop: '80px', textAlign: 'center' }}
        >
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 32px',
              background: '#fafafa',
              color: '#0a0a0a',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textDecoration: 'none',
              border: '1px solid #fafafa',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
          >
            <Download size={16} />
            DOWNLOAD CV
          </button>
        </motion.div>

        <footer style={{ marginTop: '120px', textAlign: 'center', paddingBottom: '40px' }}>
          <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#262626', letterSpacing: '0.2em', marginBottom: '12px' }}>
            © 2026 ATHARVA TAYADE
          </div>
          <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#525252', letterSpacing: '0.15em' }}>
            DESIGNED WITH PRECISION
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Portfolio;
