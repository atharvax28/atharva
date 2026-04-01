/**
 * db.js — localStorage-backed attendance database
 *
 * Keys used:
 *   att_data      → { [date_lecIdx]: "P"|"A" }   (live attendance)
 *   att_logs      → [ ...SaveSnapshot[] ]          (history of saves)
 *   att_meta      → { lastSaved, version }
 */

const KEYS = {
  DATA: 'att_data',
  LOGS: 'att_logs',
  META: 'att_meta',
}

// ── Read ─────────────────────────────────────────────────────────

export function loadAttendance() {
  try {
    const raw = localStorage.getItem(KEYS.DATA)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function loadLogs() {
  try {
    const raw = localStorage.getItem(KEYS.LOGS)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function loadMeta() {
  try {
    const raw = localStorage.getItem(KEYS.META)
    return raw ? JSON.parse(raw) : { lastSaved: null, version: 1 }
  } catch {
    return { lastSaved: null, version: 1 }
  }
}

// ── Write ────────────────────────────────────────────────────────

export function saveAttendance(data) {
  try {
    localStorage.setItem(KEYS.DATA, JSON.stringify(data))
    return true
  } catch {
    return false
  }
}

/**
 * saveSnapshot — called when user clicks "Save"
 * Creates a timestamped log entry with a note and current stats.
 */
export function saveSnapshot(data, stats, note = '') {
  try {
    const logs = loadLogs()
    const now = new Date()
    const snapshot = {
      id: now.getTime(),
      timestamp: now.toISOString(),
      label: formatSnapLabel(now),
      note: note.trim(),
      data: { ...data },           // full attendance copy
      stats: {
        cumHeld: stats.cumHeld,
        cumAtt: stats.cumAtt,
        pct: parseFloat(stats.pct.toFixed(2)),
        buf: stats.buf,
      },
    }
    // Keep max 50 snapshots
    const updated = [snapshot, ...logs].slice(0, 50)
    localStorage.setItem(KEYS.LOGS, JSON.stringify(updated))
    localStorage.setItem(KEYS.META, JSON.stringify({
      lastSaved: now.toISOString(),
      version: 1,
    }))
    return snapshot
  } catch {
    return null
  }
}

/**
 * restoreSnapshot — load a past snapshot as current data
 */
export function restoreSnapshot(snapshotId) {
  const logs = loadLogs()
  const snap = logs.find(l => l.id === snapshotId)
  if (!snap) return null
  saveAttendance(snap.data)
  return snap.data
}

export function deleteSnapshot(snapshotId) {
  const logs = loadLogs()
  const updated = logs.filter(l => l.id !== snapshotId)
  localStorage.setItem(KEYS.LOGS, JSON.stringify(updated))
}

// ── Helpers ──────────────────────────────────────────────────────

function formatSnapLabel(date) {
  return date.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export function exportJSON(data) {
  const blob = new Blob([JSON.stringify({ attendance: data, exportedAt: new Date().toISOString() }, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `attendance_${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}
