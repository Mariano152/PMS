import { useMemo, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line } from 'recharts'
import { BarChart3, CheckCircle2, ClipboardList, RotateCcw, Timer } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import KpiCard from '../components/common/KpiCard'
import SectionCard from '../components/common/SectionCard'
import FilterBar from '../components/common/FilterBar'
import { mockAnalytics } from '../data/mockAnalytics'

const PIE_COLORS = ['#c74634', '#d7dee8']

export default function AnalyticsPage() {
  const [developerFilter, setDeveloperFilter] = useState('all')

  const filteredByDeveloper = useMemo(() => {
    if (developerFilter === 'all') {
      return mockAnalytics.tasksByDeveloper
    }
    return mockAnalytics.tasksByDeveloper.filter((item) => item.developerId === developerFilter)
  }, [developerFilter])

  const totals = useMemo(() => {
    return filteredByDeveloper.reduce(
      (acc, item) => {
        acc.registered += item.registered
        acc.completed += item.completed
        acc.reopened += item.reopened
        acc.estimatedHours += item.estimatedHours
        acc.realHours += item.realHours
        return acc
      },
      { registered: 0, completed: 0, reopened: 0, estimatedHours: 0, realHours: 0 },
    )
  }, [filteredByDeveloper])

  const completionRate = totals.registered > 0
    ? `${((totals.completed / totals.registered) * 100).toFixed(1)}%`
    : '0%'

  const pieData = [
    { name: 'Completed', value: totals.completed },
    { name: 'Pending', value: Math.max(totals.registered - totals.completed, 0) },
  ]

  const completionVsRegistered = `${totals.completed}/${totals.registered}`
  const timeDeltaPct = totals.estimatedHours > 0
    ? (((totals.realHours - totals.estimatedHours) / totals.estimatedHours) * 100)
    : 0
  const timeDeltaDirection = timeDeltaPct > 0 ? 'down' : 'up'
  const timeDeltaText = `${totals.estimatedHours}h vs ${totals.realHours}h`

  const developerOptions = [
    { value: 'all', label: 'Team view' },
    ...mockAnalytics.developers.map((dev) => ({ value: dev.id, label: dev.name })),
  ]

  return (
    <>
      <PageHeader
        title="Analytics"
        subtitle="KPIs y visualizaciones del equipo con datos mock listos para conectar a analytics-service."
      />

      <SectionCard
        title="Filters"
        actions={
          <FilterBar
            filters={[
              {
                id: 'developer',
                label: 'Developer',
                options: developerOptions,
                value: developerFilter,
                onChange: setDeveloperFilter,
              },
            ]}
          />
        }
      />

      <div className="kpi-grid kpi-grid--4">
        <KpiCard label="Total Registered Tasks" value={totals.registered} icon={ClipboardList} trend={{ value: '+9 vs last week', direction: 'up' }} />
        <KpiCard label="Completed vs Registered" value={completionVsRegistered} icon={CheckCircle2} accent="success" trend={{ value: `${completionRate} completion`, direction: 'up' }} />
        <KpiCard label="Reopened Completed Tasks" value={totals.reopened} icon={RotateCcw} accent="danger" trend={{ value: 'tasks marked done then reopened', direction: 'down' }} />
        <KpiCard label="Estimated vs Real Time" value={timeDeltaText} icon={Timer} accent="warning" trend={{ value: `${timeDeltaPct.toFixed(1)}% delta`, direction: timeDeltaDirection }} />
      </div>

      <div className="analytics-grid">
        <SectionCard title="Registered vs Finished by Developer" subtitle="Stacked bar chart (mock)">
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={290}>
              <BarChart data={filteredByDeveloper}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="developer" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="registered" stackId="a" fill="#2f4158" name="Registered" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" stackId="a" fill="#c74634" name="Finished" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Team Completion Ratio" subtitle="Donut chart (mock)">
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={290}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={105}
                  dataKey="value"
                  nameKey="name"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Tasks Registered by Date" subtitle="Line chart (mock)">
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={290}>
              <LineChart data={mockAnalytics.tasksByDate}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="registered" name="Registered" stroke="#2f4158" strokeWidth={2.5} />
                <Line type="monotone" dataKey="completed" name="Finished" stroke="#c74634" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Estimated vs Real Time by Developer" subtitle="Comparativa de horas estimadas vs horas reales (mock)">
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={290}>
              <BarChart data={filteredByDeveloper}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="developer" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="estimatedHours" fill="#2f4158" name="Estimated (h)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="realHours" fill="#c74634" name="Real (h)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
    </>
  )
}
