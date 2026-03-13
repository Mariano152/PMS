import { useMemo, useState } from 'react'
import { Bot, Send, Wifi } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import SectionCard from '../components/common/SectionCard'
import StatusBadge from '../components/common/StatusBadge'
import { mockTelegram } from '../data/mockTelegram'

export default function TelegramIntegrationPage() {
  const [draft, setDraft] = useState('')
  const [lastCommand, setLastCommand] = useState('')

  const statusTone = useMemo(() => {
    if (mockTelegram.connection.status === 'Connected') return 'Completed'
    if (mockTelegram.connection.status === 'Connecting') return 'In Progress'
    return 'To Do'
  }, [])

  const addCommand = (commandText) => {
    const text = commandText.trim()
    if (!text) return

    setLastCommand(text)
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

          {lastCommand ? (
            <p className="panel-muted" style={{ marginTop: '0.55rem' }}>
              Ultimo comando enviado: <strong>{lastCommand}</strong>
            </p>
          ) : null}
        </SectionCard>
      </div>
    </>
  )
}
