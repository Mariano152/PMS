import { useParams } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'

export default function TaskDetailPage() {
  const { taskId } = useParams()

  return (
    <>
      <PageHeader
        title={`Task Detail: ${taskId}`}
        subtitle="Vista de detalle con historial, estado, duracion estimada y fechas clave."
      />

      <section className="panel-card">
        <dl className="detail-grid">
          <div>
            <dt>Status</dt>
            <dd><span className="status-badge in-progress">In Progress</span></dd>
          </div>
          <div>
            <dt>Estimated duration</dt>
            <dd>6h 30m</dd>
          </div>
          <div>
            <dt>Created at</dt>
            <dd>2026-03-03 09:30</dd>
          </div>
          <div>
            <dt>Finished at</dt>
            <dd>Not finished</dd>
          </div>
        </dl>
      </section>
    </>
  )
}
