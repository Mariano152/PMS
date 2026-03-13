import { NavLink } from 'react-router-dom'
import { BarChart3, Bot, Gauge, LayoutDashboard, ListChecks, Users } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Developer', 'Manager'] },
  { to: '/developer/tasks', label: 'My Tasks', icon: ListChecks, roles: ['Developer'] },
  { to: '/manager/overview', label: 'Team Overview', icon: Users, roles: ['Manager'] },
  { to: '/analytics', label: 'Analytics', icon: BarChart3, roles: ['Developer', 'Manager'] },
  { to: '/telegram', label: 'Telegram', icon: Bot, roles: ['Developer', 'Manager'] },
  { to: '/ai-prioritization', label: 'AI Prioritization', icon: Gauge, roles: ['Developer', 'Manager'] },
]

export default function Sidebar() {
  const { role } = useAuth()

  const visibleItems = NAV_ITEMS.filter((item) => role && item.roles.includes(role))

  return (
    <aside className="app-sidebar">
      <div className="brand-block">
        <span className="brand-mark" aria-hidden="true">PM</span>
        <div>
          <p className="brand-title">Project Management</p>
          <p className="brand-subtitle">Enterprise Platform</p>
        </div>
      </div>

      <nav className="nav-menu" aria-label="Main navigation">
        {visibleItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => (isActive ? 'nav-item is-active' : 'nav-item')}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
