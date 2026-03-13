import PageHeader from '../components/common/PageHeader'

export default function AiPrioritizationPage() {
  return (
    <>
      <PageHeader
        title="AI Prioritization"
        subtitle="Respuesta simulada de priorizacion desde un microservicio LLM con score y reasoning."
      />

      <section className="panel-card">
        <h2>Prioritized task list (mock)</h2>
        <div className="list-placeholder">
          <div className="list-item"><span>Fix production authentication timeout</span><span className="status-badge in-progress">Score 96</span></div>
          <div className="list-item"><span>Ship Telegram command parser v2</span><span className="status-badge todo">Score 87</span></div>
          <div className="list-item"><span>Document rollout plan for sprint 18</span><span className="status-badge completed">Score 64</span></div>
        </div>
      </section>
    </>
  )
}
