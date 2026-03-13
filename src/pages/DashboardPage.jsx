import { Link } from 'react-router-dom'
import { BarChart3, Bot, CheckCircle, ClipboardList, Gauge, Users } from 'lucide-react'
import KpiCard from '../components/common/KpiCard'
import PageHeader from '../components/common/PageHeader'
import SectionCard from '../components/common/SectionCard'
import { useAuth } from '../hooks/useAuth'

const QUICK_MODULES_DEV = [
  { to: '/developer/tasks', label: 'My Tasks', icon: ClipboardList, description: 'Create, editar y completar tus tareas asignadas.' },
  { to: '/analytics', label: 'Analytics', icon: BarChart3, description: 'KPIs, graficas y metricas del equipo.' },
  { to: '/telegram', label: 'Telegram Bot', icon: Bot, description: 'Historial de comandos e integracion con el bot.' },
  { to: '/ai-prioritization', label: 'AI Prioritization', icon: Gauge, description: 'Lista priorizada con reasoning del motor LLM.' },
]

const QUICK_MODULES_MGR = [
  { to: '/manager/overview', label: 'Team Overview', icon: Users, description: 'Vista de tareas por developer y estado del equipo.' },
  { to: '/analytics', label: 'Analytics', icon: BarChart3, description: 'KPIs, graficas y metricas del equipo.' },
  { to: '/telegram', label: 'Telegram Bot', icon: Bot, description: 'Historial de comandos e integracion con el bot.' },
  { to: '/ai-prioritization', label: 'AI Prioritization', icon: Gauge, description: 'Lista priorizada con reasoning del motor LLM.' },
]

export default function DashboardPage() {
  const { role } = useAuth()
  const modules = role === 'Manager' ? QUICK_MODULES_MGR : QUICK_MODULES_DEV

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Resumen ejecutivo del estado del equipo y acceso rapido a los modulos del sistema."
      />

      <div className="kpi-grid">
        <KpiCard
          label="Total Registered Tasks"
          value="132"
          icon={ClipboardList}
          trend={{ value: '+12 this sprint', direction: 'up' }}
        />
        <KpiCard
          label="Total Completed Tasks"
          value="89"
          icon={CheckCircle}
          accent="success"
          trend={{ value: '+8 this sprint', direction: 'up' }}
        />
        <KpiCard
          label="Completion Rate"
          value="67.4%"
          icon={Gauge}
          accent="warning"
          trend={{ value: 'vs 71.2% last sprint', direction: 'down' }}
        />
      </div>

      <SectionCard title="Quick access" subtitle="Navega a cualquier modulo del sistema.">
        <div className="module-grid">
          {modules.map(({ to, label, icon: Icon, description }) => (
            <Link key={to} to={to} className="module-card">
              <span className="module-card__icon"><Icon size={22} /></span>
              <div>
                <p className="module-card__label">{label}</p>
                <p className="module-card__desc">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </SectionCard>
    </>
  )
}
