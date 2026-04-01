import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Save, 
  History, 
  LayoutDashboard, 
  Calendar, 
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  XCircle,
  TrendingDown,
  TrendingUp,
  RotateCcw,
  Layers,
  ChevronLeft,
  ChevronRight,
  Target,
  Clock
} from 'lucide-react'
import {
  loadAttendance, saveAttendance, saveSnapshot,
  loadLogs, loadMeta, restoreSnapshot, deleteSnapshot, exportJSON,
} from './db.js'

const LECTURE_COUNT = { Monday: 4, Tuesday: 5, Wednesday: 7, Thursday: 4, Friday: 4, Saturday: 4 }

const DATES = [
  { date: '2026-03-23', day: 'Monday' },
  { date: '2026-03-24', day: 'Tuesday' },
  { date: '2026-03-25', day: 'Wednesday' },
  { date: '2026-03-26', day: 'Thursday' },
  { date: '2026-03-27', day: 'Friday' },
  { date: '2026-03-28', day: 'Saturday' },
  { date: '2026-03-30', day: 'Monday' },
  { date: '2026-03-31', day: 'Tuesday' },
  { date: '2026-04-01', day: 'Wednesday' },
  { date: '2026-04-02', day: 'Thursday' },
  { date: '2026-04-03', day: 'Friday' },
  { date: '2026-04-04', day: 'Saturday' },
  { date: '2026-04-06', day: 'Monday' },
  { date: '2026-04-07', day: 'Tuesday' },
  { date: '2026-04-08', day: 'Wednesday' },
  { date: '2026-04-09', day: 'Thursday' },
  { date: '2026-04-10', day: 'Friday' },
  { date: '2026-04-11', day: 'Saturday' },
  { date: '2026-04-13', day: 'Monday' },
  { date: '2026-04-14', day: 'Tuesday' },
  { date: '2026-04-15', day: 'Wednesday' },
  { date: '2026-04-16', day: 'Thursday' },
  { date: '2026-04-17', day: 'Friday' },
  { date: '2026-04-18', day: 'Saturday' },
  { date: '2026-04-20', day: 'Monday' },
  { date: '2026-04-21', day: 'Tuesday' },
  { date: '2026-04-22', day: 'Wednesday' },
  { date: '2026-04-23', day: 'Thursday' },
  { date: '2026-04-24', day: 'Friday' },
  { date: '2026-04-25', day: 'Saturday' },
  { date: '2026-04-27', day: 'Monday' },
  { date: '2026-04-28', day: 'Tuesday' },
  { date: '2026-04-29', day: 'Wednesday' },
  { date: '2026-04-30', day: 'Thursday' },
]

const BASE_HELD = 208
const BASE_ATT = 125
const TARGET = 70
const today = new Date().toISOString().split('T')[0]

function fmt(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
}
function fmtFull(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}
function getStatus(pct) {
  if (pct >= 80) return { label: 'SAFE', color: '#22c55e', bg: '#22c55e15' }
  if (pct >= 70) return { label: 'ON TARGET', color: '#f59e0b', bg: '#f59e0b15' }
  if (pct >= 65) return { label: 'AT RISK', color: '#f97316', bg: '#f9731615' }
  return { label: 'CRITICAL', color: '#ef4444', bg: '#ef444415' }
}
function timeAgo(isoStr) {
  const diff = Date.now() - new Date(isoStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function Toast({ msg, type, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2400); return () => clearTimeout(t) }, [onDone])
  const col = type === 'success' ? '#22c55e' : type === 'warn' ? '#f59e0b' : '#ef4444'
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, x: '-50%', scale: 0.95 }}
      animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{
        position: 'fixed', bottom: 32, left: '50%',
        background: '#0a0a0a', border: `1px solid ${col}`, 
        padding: '14px 20px', fontSize: 13, fontFamily: 'var(--font-mono)',
        zIndex: 999, display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: `0 0 40px ${col}30`
      }}
    >
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: col }} />
      {msg}
    </motion.div>
  )
}

function SaveModal({ onSave, onClose }) {
  const [note, setNote] = useState('')
  const inputRef = useRef()
  useEffect(() => inputRef.current?.focus(), [])
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
      }} onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        style={{
          background: '#0a0a0a', border: '1px solid #262626',
          padding: '32px', width: 420, maxWidth: '90vw',
        }} onClick={e => e.stopPropagation()}
      >
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#525252', marginBottom: 8, letterSpacing: '0.15em' }}>/// NEW SNAPSHOT</div>
        <h3 style={{ fontSize: 20, marginBottom: 8 }}>Archive Current State</h3>
        <p style={{ fontSize: 13, color: '#525252', marginBottom: 24, fontFamily: 'var(--font-mono)' }}>
          Attach a reference note for recovery
        </p>
        <input
          ref={inputRef}
          value={note}
          onChange={e => setNote(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSave(note)}
          placeholder="e.g. Cleared backlog, Month 1 complete..."
          style={{
            width: '100%', background: '#0a0a0a', border: '1px solid #262626',
            borderRadius: 4, padding: '14px 16px', color: '#fafafa', fontSize: 14,
            fontFamily: 'var(--font-mono)', outline: 'none', marginBottom: 24,
          }}
        />
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '10px 20px', color: '#525252', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
            [ESC] CANCEL
          </button>
          <button 
            onClick={() => onSave(note)} 
            style={{ 
              padding: '10px 24px', fontSize: 13, background: '#fafafa', 
              color: '#0a0a0a', border: 'none', borderRadius: 4, fontFamily: 'var(--font-mono)', fontWeight: 600 
            }}
          >
            SAVE ARCHIVE
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function AttendanceTracker({ onBack }) {
  const [att, setAtt] = useState(() => loadAttendance())
  const [sel, setSel] = useState(DATES.find(d => d.date === today)?.date || DATES[0].date)
  const [view, setView] = useState('day')
  const [logs, setLogs] = useState(() => loadLogs())
  const [toast, setToast] = useState(null)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [unsaved, setUnsaved] = useState(false)

  useEffect(() => {
    saveAttendance(att)
    setUnsaved(true)
  }, [att])

  const showToast = (msg, type = 'success') => setToast({ msg, type })

  const toggle = useCallback((date, i) => {
    setAtt(p => {
      const k = `${date}_${i}`
      const v = p[k]
      const n = v === 'P' ? 'A' : v === 'A' ? null : 'P'
      const u = { ...p }
      if (n === null) delete u[k]; else u[k] = n
      return u
    })
  }, [])

  const markDay = useCallback((date, val) => {
    const cnt = LECTURE_COUNT[DATES.find(d => d.date === date)?.day] || 4
    setAtt(p => {
      const u = { ...p }
      for (let i = 0; i < cnt; i++) {
        const k = `${date}_${i}`
        if (val === null) delete u[k]; else u[k] = val
      }
      return u
    })
  }, [])

  const stats = useMemo(() => {
    let cH = BASE_HELD, cA = BASE_ATT
    return DATES.map(({ date, day }) => {
      const mx = LECTURE_COUNT[day] || 4
      const lecs = Array.from({ length: mx }, (_, i) => att[`${date}_${i}`])
      const held = lecs.filter(Boolean).length
      const attended = lecs.filter(v => v === 'P').length
      cH += held; cA += attended
      const pct = (cA / cH) * 100
      const buf = Math.floor(cA - TARGET / 100 * cH)
      return { date, day, mx, held, attended, cH, cA, pct, buf }
    })
  }, [att])

  const last = stats[stats.length - 1]
  const selSt = stats.find(s => s.date === sel)
  const selDayObj = DATES.find(d => d.date === sel)
  const mx = LECTURE_COUNT[selDayObj?.day] || 4
  const st = getStatus(last.pct)

  const todayIdx = DATES.findIndex(d => d.date === today)
  const remLecs = DATES.slice(Math.max(0, todayIdx + 1)).reduce((s, d) => s + (LECTURE_COUNT[d.day] || 4), 0)
  const needed = Math.max(0, Math.ceil(TARGET / 100 * (last.cH + remLecs) - last.cA))
  const neededPct = remLecs > 0 ? Math.min(100, Math.round(needed / remLecs * 100)) : 0

  const handleSave = (note) => {
    const snap = saveSnapshot(att, last, note)
    if (snap) {
      setLogs(loadLogs())
      setUnsaved(false)
      setShowSaveModal(false)
      showToast('Snapshot archived')
    } else {
      showToast('Action failed', 'error')
    }
  }

  const handleRestore = (snapId) => {
    const data = restoreSnapshot(snapId)
    if (data) {
      setAtt(data)
      showToast('State restored')
    }
  }

  const handleDeleteLog = (snapId) => {
    deleteSnapshot(snapId)
    setLogs(loadLogs())
    showToast('Snapshot removed', 'warn')
  }

  const navItem = (v, label) => (
    <button 
      onClick={() => setView(v)}
      style={{
        padding: '8px 16px', fontSize: 12, fontFamily: 'var(--font-mono)',
        background: view === v ? '#fafafa' : 'transparent',
        color: view === v ? '#0a0a0a' : '#525252',
        borderRadius: 4, fontWeight: 500, transition: 'all 0.15s',
      }}
    >
      {label}
    </button>
  )

  const scrollRef = useRef(null)
  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' })
    }
  }

  const selectedIdx = DATES.findIndex(d => d.date === sel)

  return (
    <div style={{ minHeight: '100vh', padding: '48px 24px 120px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <header style={{ marginBottom: 48 }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#525252', fontSize: 12, fontFamily: 'var(--font-mono)', marginBottom: 24 }}>
          <ArrowLeft size={14} /> EXIT TO PORTFOLIO
        </button>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#525252', letterSpacing: '0.15em', marginBottom: 8 }}>/// ATTENDANCE MODULE</div>
            <h1 style={{ fontSize: 28, fontWeight: 600 }}>FCRIT Vashi <span style={{ color: '#525252' }}>//</span> Semester VIII</h1>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 48, fontWeight: 700, fontFamily: 'var(--font-mono)', color: st.color, lineHeight: 1 }}>{last.pct.toFixed(1)}%</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'flex-end', marginTop: 12 }}>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 600, color: st.color, background: st.bg, padding: '4px 10px', borderRadius: 4, letterSpacing: '0.1em' }}>
                {st.label}
              </span>
              <span style={{ fontSize: 11, color: '#525252', fontFamily: 'var(--font-mono)' }}>TARGET {TARGET}%</span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, marginBottom: 32, background: '#1a1a1a', padding: 1 }}>
        {[
          { label: 'LECTURES HELD', value: last.cH, icon: <Layers size={14} />, color: '#fafafa' },
          { label: 'ATTENDED', value: last.cA, icon: <CheckCircle2 size={14} />, color: '#22c55e' },
          { label: 'BUFFER', value: Math.max(0, last.buf), icon: <TrendingDown size={14} />, color: last.buf > 0 ? '#f59e0b' : '#ef4444' },
          { label: 'NEEDED', value: needed, icon: <Target size={14} />, color: '#fafafa' }
        ].map((card, i) => (
          <div key={card.label} style={{ background: '#0a0a0a', padding: '24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#525252' }}>
              {card.icon}
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}>{card.label}</span>
            </div>
            <div style={{ fontSize: 28, fontFamily: 'var(--font-mono)', fontWeight: 600, color: card.color }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: 1, marginBottom: 32, background: '#1a1a1a', padding: 1, width: 'fit-content' }}>
        {navItem('day', 'DAILY LOG')}
        {navItem('overview', 'OVERVIEW')}
        {navItem('logs', 'ARCHIVES')}
      </div>

      <AnimatePresence mode="wait">
        {/* DAY VIEW */}
        {view === 'day' && (
          <motion.div key="day" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {/* Date Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <button onClick={() => scroll(-1)} style={{ padding: 8, color: '#525252' }}><ChevronLeft size={20} /></button>
              <div ref={scrollRef} style={{ display: 'flex', gap: 8, overflowX: 'auto', flex: 1, scrollbarWidth: 'none' }}>
                {DATES.map(({ date, day }, idx) => {
                  const isSel = date === sel, isT = date === today
                  return (
                    <button 
                      key={date} 
                      onClick={() => setSel(date)}
                      style={{
                        flex: 'none', padding: '16px 20px', borderRadius: 0,
                        background: isSel ? '#fafafa' : '#1a1a1a',
                        color: isSel ? '#0a0a0a' : '#525252',
                        minWidth: 100, border: '1px solid', borderColor: isSel ? '#fafafa' : '#262626',
                        textAlign: 'center', transition: 'all 0.15s'
                      }}
                    >
                      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: 4 }}>{fmt(date)}</div>
                      <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: isSel ? '#525252' : '#525252' }}>{day.slice(0, 3)}</div>
                      {isT && <div style={{ width: 6, height: 6, background: '#22c55e', margin: '8px auto 0' }} />}
                    </button>
                  )
                })}
              </div>
              <button onClick={() => scroll(1)} style={{ padding: 8, color: '#525252' }}><ChevronRight size={20} /></button>
            </div>

            {/* Day Panel */}
            <div style={{ background: '#1a1a1a', border: '1px solid #262626' }}>
              <div style={{ padding: '24px 32px', borderBottom: '1px solid #262626', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: 18, marginBottom: 4 }}>{fmt(sel)} — {selDayObj?.day}</h3>
                  <p style={{ fontSize: 12, color: '#525252', fontFamily: 'var(--font-mono)' }}>{mx} SCHEDULED LECTURES</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => markDay(sel, 'P')} style={{ padding: '8px 16px', borderRadius: 0, fontSize: 11, border: '1px solid #262626', color: '#22c55e', fontFamily: 'var(--font-mono)' }}>ALL PRESENT</button>
                  <button onClick={() => markDay(sel, 'A')} style={{ padding: '8px 16px', borderRadius: 0, fontSize: 11, border: '1px solid #262626', color: '#ef4444', fontFamily: 'var(--font-mono)' }}>ALL ABSENT</button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${mx}, 1fr)`, gap: 1, background: '#262626' }}>
                {Array.from({ length: mx }, (_, i) => {
                  const v = att[`${sel}_${i}`]
                  return (
                    <button key={i} onClick={() => toggle(sel, i)} style={{ 
                      padding: '48px 10px', textAlign: 'center',
                      background: v === 'P' ? '#22c55e15' : v === 'A' ? '#ef444415' : '#0a0a0a',
                      border: 'none', transition: 'all 0.15s'
                    }}>
                      <div style={{ fontSize: 10, color: '#525252', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>L{i + 1}</div>
                      <div style={{
                        width: 56, height: 56, margin: '0 auto', borderRadius: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-mono)',
                        background: v === 'P' ? '#22c55e' : v === 'A' ? '#ef4444' : '#1a1a1a',
                        color: v === 'P' ? '#0a0a0a' : v === 'A' ? '#fafafa' : '#262626',
                        border: `2px solid ${v === 'P' ? '#22c55e' : v === 'A' ? '#ef4444' : '#262626'}`
                      }}>
                        {v || '—'}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* OVERVIEW VIEW */}
        {view === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div style={{ background: '#1a1a1a', border: '1px solid #262626', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#141414' }}>
                    {['DATE', 'DAY', 'LOG', 'HELD', 'ATT', 'RATE'].map(h => (
                      <th key={h} style={{ padding: '16px 20px', textAlign: 'left', color: '#525252', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', borderBottom: '1px solid #262626' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DATES.map((d, i) => {
                    const s = stats[i]
                    const curSt = getStatus(s.pct)
                    return (
                      <tr key={d.date} onClick={() => { setSel(d.date); setView('day') }} style={{ borderBottom: '1px solid #1f1f1f', cursor: 'pointer' }}>
                        <td style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{fmt(d.date)}</td>
                        <td style={{ padding: '14px 20px', color: '#525252', fontSize: 12 }}>{d.day}</td>
                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ display: 'flex', gap: 2 }}>
                            {Array.from({ length: s.mx }, (_, li) => {
                              const v = att[`${d.date}_${li}`]
                              return (
                                <div key={li} style={{ 
                                  width: 12, height: 12, 
                                  background: v === 'P' ? '#22c55e' : v === 'A' ? '#ef4444' : '#262626'
                                }} />
                              )
                            })}
                          </div>
                        </td>
                        <td style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{s.held}</td>
                        <td style={{ padding: '14px 20px', color: '#22c55e', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{s.attended}</td>
                        <td style={{ padding: '14px 20px' }}>
                          <span style={{ color: curSt.color, fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{s.pct.toFixed(1)}%</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* ARCHIVES VIEW */}
        {view === 'logs' && (
          <motion.div key="logs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#525252', letterSpacing: '0.15em', marginBottom: 4 }}>/// HISTORY</div>
                <h3 style={{ fontSize: 18 }}>Archived Snapshots</h3>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => exportJSON(att)} style={{ padding: '10px 20px', borderRadius: 0, fontSize: 12, border: '1px solid #262626', color: '#fafafa', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Download size={14} /> EXPORT
                </button>
                <button onClick={() => setShowSaveModal(true)} style={{ padding: '10px 20px', borderRadius: 0, fontSize: 12, background: '#fafafa', border: 'none', color: '#0a0a0a', fontFamily: 'var(--font-mono)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Save size={14} /> NEW SNAPSHOT
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {logs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 0', border: '1px dashed #262626' }}>
                  <RotateCcw size={32} style={{ marginBottom: 16, color: '#262626' }} />
                  <p style={{ color: '#525252', fontFamily: 'var(--font-mono)', fontSize: 12 }}>NO ARCHIVES FOUND</p>
                </div>
              ) : (
                logs.map(log => {
                  const lSt = getStatus(log.stats.pct)
                  return (
                    <div key={log.id} style={{ background: '#1a1a1a', padding: '24px', display: 'flex', alignItems: 'center', gap: 24, border: '1px solid #262626' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, fontFamily: 'var(--font-mono)' }}>{fmtFull(log.timestamp.split('T')[0])}</div>
                        <div style={{ fontSize: 12, color: '#525252' }}>{log.note || '— no note —'}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-mono)', color: lSt.color }}>{log.stats.pct.toFixed(1)}%</div>
                        <div style={{ fontSize: 11, color: '#525252', fontFamily: 'var(--font-mono)' }}>{log.stats.cumAtt} / {log.stats.cumHeld}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => handleRestore(log.id)} style={{ padding: '8px 16px', borderRadius: 0, fontSize: 11, color: '#fafafa', border: '1px solid #262626', fontFamily: 'var(--font-mono)' }}>RESTORE</button>
                        <button onClick={() => handleDeleteLog(log.id)} style={{ padding: '8px', color: '#ef4444' }}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 100 }}>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowSaveModal(true)}
          style={{
            padding: '16px 28px', borderRadius: 0, background: '#fafafa',
            color: '#0a0a0a', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-mono)',
            border: 'none', display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: '0 0 60px rgba(250,250,250,0.15)'
          }}
        >
          <Save size={16} />
          {unsaved ? 'SAVE PROGRESS' : 'SNAPSHOT'}
        </motion.button>
      </div>

      <AnimatePresence>
        {showSaveModal && <SaveModal onSave={handleSave} onClose={() => setShowSaveModal(false)} />}
        {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  )
}
