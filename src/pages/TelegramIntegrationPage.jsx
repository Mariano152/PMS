import { useMemo, useState } from 'react'
import { Bot, Send, Wifi } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import SectionCard from '../components/common/SectionCard'
import StatusBadge from '../components/common/StatusBadge'
import { mockTelegram } from '../data/mockTelegram'

export default function TelegramIntegrationPage() {
  const [draft, setDraft] = useState('')
  const [history, setHistory] = useState(mockTelegram.commandHistory)

  const statusTone = useMemo(() => {
    if (mockTelegram.connection.status === 'Connected') return 'Completed'
    if (mockTelegram.connection.status === 'Connecting') return 'In Progress'
    return 'To Do'
  }, [])

  const addCommand = (commandText) => {
    const text = commandText.trim()
    if (!text) return

    const now = new Date()
    const hour = String(now.getHours()).padStart(2, '0')
    const min = String(now.getMinutes()).padStart(2, '0')

    const nextItem = {
      id: `tg-${Date.now()}`,
      command: text,
      time: `${hour}:${min}`,
      status: 'Queued',
    }

    setHistory((prev) => [nextItem, ...prev])
    setDraft('')
  }

  const onSubmit = (event) => {
    event.preventDefault()
    addCommand(draft)
  }

  return (
    <>
      <PageHeader
        title="Telegram Integration"
        subtitle="Panel mock del flujo de comandos del bot y su sincronizacion con la plataforma."
      />

      <div className="telegram-grid">
        <SectionCard title="Bot status" subtitle={`Bot: ${mockTelegram.connection.botName}`}>
          <div className="telegram-status-row">
            <div className="telegram-connection">
              <Wifi size={16} />
              <span>Connection state:</span>
              <StatusBadge status={statusTone} />
            </div>
            <p className="panel-muted">Last sync: {mockTelegram.connection.lastSync}</p>
          </div>

          <div className="telegram-quick-actions">
            {mockTelegram.quickActions.map((action) => (
              <button
                key={action.id}
                type="button"
                className="btn btn-secondary"
                onClick={() => addCommand(action.command)}
              >
                <Bot size={15} />
                {action.label}
              </button>
            ))}
          </div>

          <form className="telegram-compose" onSubmit={onSubmit}>
            <input
              type="text"
              className="form-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Escribe un comando, por ejemplo: /newtask Mejorar reporte semanal"
            />
            <button type="submit" className="btn btn-primary">
              <Send size={15} />
              Enviar
            </button>
          </form>
        </SectionCard>

        <SectionCard title="Command history" subtitle="Eventos recientes entre Telegram y la plataforma.">
          <div className="list-placeholder">
            {history.map((item) => (
              <div key={item.id} className="list-item">
                <div className="telegram-history-command">
                  <span>{item.command}</span>
                  <small>{item.time}</small>
                </div>
                <span className="telegram-history-status">{item.status}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Operation flow" subtitle="Como viaja el comando hasta reflejarse en el sistema.">
          <div className="telegram-timeline">
            {mockTelegram.flowTimeline.map((step, index) => (
              <div key={step.id} className="telegram-step">
                <span className="telegram-step-index">{index + 1}</span>
                <div>
                  <p className="telegram-step-title">{step.step}</p>
                  <p className="telegram-step-detail">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  )
}
