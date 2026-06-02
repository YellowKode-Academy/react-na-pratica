import type { FormEvent } from 'react'
import { useCardForm } from '../../hooks/useCardForm'
import type { Card, ColumnId, Priority } from '../../types'

interface CardFormProps {
  onSubmit: (card: Omit<Card, 'id' | 'createdAt'>) => void
  defaultColumnId?: ColumnId
}

const priorities: Priority[] = ['low', 'medium', 'high']
const priorityLabels: Record<Priority, string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
}

export function CardForm({ onSubmit, defaultColumnId = 'backlog' }: CardFormProps) {
  const { state, setField, addTag, removeTag, reset } = useCardForm()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!state.title.trim()) return

    onSubmit({
      title: state.title.trim(),
      description: state.description.trim(),
      priority: state.priority,
      assignee: state.assignee.trim(),
      columnId: state.columnId || defaultColumnId,
      tags: state.tags,
    })
    reset()
  }

  return (
    <form onSubmit={handleSubmit} data-testid="card-form">
      <div style={{ marginBottom: '8px' }}>
        <label htmlFor="card-title" style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
          Título *
        </label>
        <input
          id="card-title"
          type="text"
          value={state.title}
          onChange={(e) => setField('title', e.target.value)}
          placeholder="Título do card"
          style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '8px' }}>
        <label htmlFor="card-description" style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
          Descrição
        </label>
        <textarea
          id="card-description"
          value={state.description}
          onChange={(e) => setField('description', e.target.value)}
          placeholder="Descrição opcional"
          rows={3}
          style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box', resize: 'vertical' }}
        />
      </div>

      <div style={{ marginBottom: '8px' }}>
        <label htmlFor="card-priority" style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
          Prioridade
        </label>
        <select
          id="card-priority"
          value={state.priority}
          onChange={(e) => setField('priority', e.target.value)}
          style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              {priorityLabels[p]}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '8px' }}>
        <label htmlFor="card-assignee" style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
          Responsável
        </label>
        <input
          id="card-assignee"
          type="text"
          value={state.assignee}
          onChange={(e) => setField('assignee', e.target.value)}
          placeholder="Nome do responsável"
          style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '8px' }}>
        <label htmlFor="card-tag" style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
          Tags
        </label>
        <div style={{ display: 'flex', gap: '4px' }}>
          <input
            id="card-tag"
            type="text"
            placeholder="Adicionar tag e pressionar Enter"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTag(e.currentTarget.value)
                e.currentTarget.value = ''
              }
            }}
            style={{ flex: 1, padding: '6px 8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}>
          {state.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: '#e5e7eb',
                borderRadius: '4px',
                padding: '1px 6px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
              onClick={() => removeTag(tag)}
            >
              {tag} ×
            </span>
          ))}
        </div>
      </div>

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '8px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        Adicionar Card
      </button>
    </form>
  )
}
