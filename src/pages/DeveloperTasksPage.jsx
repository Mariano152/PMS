import { useState } from 'react'
import { Plus, ListChecks } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import SectionCard from '../components/common/SectionCard'
import FilterBar from '../components/common/FilterBar'
import Modal from '../components/common/Modal'
import EmptyState from '../components/common/EmptyState'
import TaskTable from '../components/tasks/TaskTable'
import TaskForm from '../components/tasks/TaskForm'
import SkeletonCard from '../components/common/SkeletonCard'

// Datos placeholder para que la tabla tenga algo visible antes de la Parte 3 (mock data real)
const SAMPLE_TASKS = [
  { id: 'TASK-1001', title: 'Refactor authentication middleware', description: 'Revisit JWT validation logic and add refresh token support.', status: 'In Progress', estimatedDuration: '6h', createdAt: '2026-03-01' },
  { id: 'TASK-1002', title: 'Implement webhooks for Telegram events', description: 'Listen to /newtask, /complete and sync with task-service.', status: 'To Do', estimatedDuration: '4h 30m', createdAt: '2026-03-04' },
  { id: 'TASK-1003', title: 'Update API observability dashboard', description: 'Add Prometheus metrics for p95 latency.', status: 'Completed', estimatedDuration: '3h', createdAt: '2026-02-28' },
]

const STATUS_OPTIONS = [
  { value: 'All', label: 'All statuses' },
  { value: 'To Do', label: 'To Do' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Completed', label: 'Completed' },
]

export default function DeveloperTasksPage() {
  const [tasks, setTasks] = useState(SAMPLE_TASKS)
  const [statusFilter, setStatusFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [loading] = useState(false)

  const filtered = statusFilter === 'All' ? tasks : tasks.filter((t) => t.status === statusFilter)

  const handleCreate = (formData) => {
    const newTask = {
      ...formData,
      id: `TASK-${Date.now()}`,
      status: 'To Do',
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setTasks((prev) => [newTask, ...prev])
    setModalOpen(false)
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const handleSaveEdit = (formData) => {
    setTasks((prev) => prev.map((t) => t.id === editingTask.id ? { ...t, ...formData } : t))
    setModalOpen(false)
    setEditingTask(null)
  }

  const handleDelete = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
  }

  const handleComplete = (taskId) => {
    setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, status: 'Completed' } : t))
  }

  const openCreate = () => {
    setEditingTask(null)
    setModalOpen(true)
  }

  return (
    <>
      <PageHeader
        title="My Tasks"
        subtitle="Gestiona tus tareas: crea, edita, completa o elimina. Conectado en Parte 3 con task-service mock."
        actions={
          <button className="btn btn-primary" type="button" onClick={openCreate}>
            <Plus size={16} /> New task
          </button>
        }
      />

      <SectionCard
        title="Task list"
        actions={
          <FilterBar
            filters={[{ id: 'status', label: 'Status', options: STATUS_OPTIONS, value: statusFilter, onChange: setStatusFilter }]}
          />
        }
        noPad
      >
        {loading ? (
          <div style={{ padding: '1rem' }}><SkeletonCard rows={4} /></div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={ListChecks}
            title="No tasks found"
            message="Crea tu primera tarea o cambia el filtro de estado."
            action={<button className="btn btn-primary" type="button" onClick={openCreate}><Plus size={15} /> New task</button>}
          />
        ) : (
          <TaskTable
            tasks={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onComplete={handleComplete}
          />
        )}
      </SectionCard>

      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditingTask(null) }}
        title={editingTask ? 'Edit task' : 'New task'}
        size="md"
      >
        <TaskForm
          initial={editingTask ? { title: editingTask.title, description: editingTask.description, estimatedDuration: editingTask.estimatedDuration } : undefined}
          onSubmit={editingTask ? handleSaveEdit : handleCreate}
          onCancel={() => { setModalOpen(false); setEditingTask(null) }}
        />
      </Modal>
    </>
  )
}
