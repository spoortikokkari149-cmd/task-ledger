import { useEffect, useState, useCallback } from 'react'
import './App.css'

const API_BASE = 'http://localhost:3000'

function pad(id) {
  return String(id).padStart(3, '0')
}

export default function App() {
  const [tasks, setTasks] = useState([])
  const [draft, setDraft] = useState('')
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const [loading, setLoading] = useState(true)

  const loadTasks = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/tasks`)
      if (!res.ok) throw new Error(`GET /tasks -> ${res.status}`)
      const data = await res.json()
      setTasks(data)
      setStatus({ state: 'idle', message: '' })
    } catch (err) {
      setStatus({
        state: 'error',
        message: 'cannot reach api — is `npm start` running on :3000?',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  async function handleSubmit(e) {
    e.preventDefault()
    const title = draft.trim()
    if (!title) return

    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })
      if (!res.ok) throw new Error()
      const newTask = await res.json()
      setTasks((prev) => [...prev, newTask])
      setDraft('')
    } catch {
      setStatus({ state: 'error', message: 'post /tasks failed' })
    }
  }

  async function toggleDone(task) {
    const next = { ...task, done: !task.done }
    setTasks((prev) => prev.map((t) => (t.id === task.id ? next : t)))
    try {
      const res = await fetch(`${API_BASE}/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: next.done }),
      })
      if (!res.ok) throw new Error()
    } catch {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)))
      setStatus({ state: 'error', message: `put /tasks/${task.id} failed` })
    }
  }

  async function removeTask(id) {
    const prevTasks = tasks
    setTasks((prev) => prev.filter((t) => t.id !== id))
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
    } catch {
      setTasks(prevTasks)
      setStatus({ state: 'error', message: `delete /tasks/${id} failed` })
    }
  }

  const openCount = tasks.filter((t) => !t.done).length
  const doneCount = tasks.length - openCount

  return (
    <div className="console">
      <div className="console__window">
        <div className="console__titlebar">
          <div className="console__dots">
            <span className="dot dot--red" />
            <span className="dot dot--amber" />
            <span className="dot dot--green" />
          </div>
          <span className="console__path">tasks-api — localhost:3000</span>
        </div>

        <div className="console__body">
          <h1 className="console__heading">TASK LEDGER</h1>

          <form className="console__prompt" onSubmit={handleSubmit}>
            <span className="console__chevron">&gt;</span>
            <input
              className="console__input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="type a task and press enter"
              aria-label="New task title"
            />
          </form>

          <div className="ledger">
            {loading && <p className="ledger__empty">reading /tasks ...</p>}

            {!loading && tasks.length === 0 && status.state !== 'error' && (
              <p className="ledger__empty">no entries — ledger is empty</p>
            )}

            {!loading &&
              tasks.map((task) => (
                <div
                  className={`ledger__row${task.done ? ' ledger__row--done' : ''}`}
                  key={task.id}
                >
                  <span className="ledger__id">{pad(task.id)}</span>
                  <button
                    type="button"
                    className="ledger__box"
                    onClick={() => toggleDone(task)}
                    aria-pressed={task.done}
                    aria-label={task.done ? 'Mark not done' : 'Mark done'}
                  >
                    [{task.done ? 'x' : ' '}]
                  </button>
                  <span className="ledger__title">{task.title}</span>
                  <button
                    type="button"
                    className="ledger__rm"
                    onClick={() => removeTask(task.id)}
                    aria-label={`Delete ${task.title}`}
                  >
                    rm
                  </button>
                </div>
              ))}
          </div>

          <div className="console__statusbar">
            {status.state === 'error' ? (
              <span className="console__status console__status--error">
                ! {status.message}
              </span>
            ) : (
              <span className="console__status">
                {openCount} open &middot; {doneCount} done
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}