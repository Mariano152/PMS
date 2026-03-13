import { useState } from 'react'
import { Users } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import SectionCard from '../components/common/SectionCard'
import FilterBar from '../components/common/FilterBar'
import EmptyState from '../components/common/EmptyState'
import TaskTable from '../components/tasks/TaskTable'

const TEAM_TASKS = [
  { id: 'TASK-1001', title: 'Refactor authentication middleware', status: 'In Progress', estimatedDuration: '6h', createdAt: '2026-03-01', assignee: 'Daniel Torres' },
  { id: 'TASK-1002', title: 'Implement webhooks for Telegram events', status: 'To Do', estimatedDuration: '4h 30m', createdAt: '2026-03-04', assignee: 'Daniel Torres' },
  { id: 'TASK-1004', title: 'Design database schema for notifications', status: 'Completed', estimatedDuration: '5h', createdAt: '2026-03-02', assignee: 'Camila Ruiz' },
  { id: 'TASK-1005', title: 'Write unit tests for prioritization engine', status: 'To Do', estimatedDuration: '3h', createdAt: '2026-03-05', assignee: 'Camila Ruiz' },
  { id: 'TASK-1006', title: 'Setup CI/CD pipeline for analytics-service', status: 'In Progress', estimatedDuration: '8h', createdAt: '2026-03-03', assignee: 'Andres Mora' },
]

const DEVELOPER_OPTIONS = [
  { value: 'All', label: 'All developers' },
  { value: 'Daniel Torres', label: 'Daniel Torres' },
  { value: 'Camila Ruiz', label: 'Camila Ruiz' },
  { value: 'Andres Mora', label: 'Andres Mora' },
]

const STATUS_OPTIONS = [
  { value: 'All', label: 'All statuses' },
  { value: 'To Do', label: 'To Do' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Completed', label: 'Completed' },
]

export default function ManagerOverviewPage() {
  const [developerFilter, setDeveloperFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = TEAM_TASKS.filter((t) => {
    const matchDev = developerFilter === 'All' || t.assignee === developerFilter
    const matchStatus = statusFilter === 'All' || t.status === statusFilter
    return matchDev && matchStatus
  })

  return (
    <>
      <PageHeader
        title="Team Overview"
        subtitle="Vista de tareas del equipo. Solo lectura: no expone acciones de edicion ni creacion."
      />

      <SectionCard
        title="Team tasks"
        actions={
          <FilterBar
            filters={[
              { id: 'dev', label: 'Developer', options: DEVELOPER_OPTIONS, value: developerFilter, onChange: setDeveloperFilter },
              { id: 'status', label: 'Status', options: STATUS_OPTIONS, value: statusFilter, onChange: setStatusFilter },
            ]}
          />
        }
        noPad
      >
        {filtered.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No tasks match your filters"
            message="Ajusta los filtros de developer o estado para ver resultados."
          />
        ) : (
          <TaskTable tasks={filtered} readOnly showAssignee />
        )}
      </SectionCard>
    </>
  )
}
