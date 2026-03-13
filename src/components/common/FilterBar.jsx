/**
 * FilterBar
 * Barra de filtros enterprise con selects y slots de búsqueda.
 * Props:
 *   filters  – array de { id, label, options: [{value, label}], value, onChange }
 *   actions  – ReactNode opcional (botón derecho de la barra)
 */
export default function FilterBar({ filters = [], actions }) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__controls">
        {filters.map(({ id, label, options, value, onChange }) => (
          <label key={id} className="filter-bar__item">
            <span className="filter-bar__label">{label}</span>
            <select
              className="filter-bar__select"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      {actions && <div className="filter-bar__actions">{actions}</div>}
    </div>
  )
}
