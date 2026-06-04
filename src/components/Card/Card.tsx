import { useTheme } from '../../context/ThemeContext'
import type { Card as CardType, ColumnId } from '../../types'

interface CardProps {
  card: CardType
  onDelete: (id: string) => void
  onMove: (id: string, currentColumnId: ColumnId) => void
}

const priorityColors: Record<CardType['priority'], string> = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
}

const priorityLabels: Record<CardType['priority'], string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
}

export function Card({ card, onDelete, onMove }: CardProps) {
  const { theme } = useTheme()
  const canMove = card.columnId !== 'done'
  const bg = theme === 'dark' ? '#374151' : 'white'
  const border = theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb'
  const textMuted = theme === 'dark' ? '#9ca3af' : '#6b7280'

  return (
    <div
      data-testid="card"
      style={{
        border,
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '8px',
        background: bg,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{card.title}</h4>
        <span
          data-testid="priority-badge"
          style={{
            background: priorityColors[card.priority],
            color: 'white',
            borderRadius: '4px',
            padding: '2px 6px',
            fontSize: '11px',
            fontWeight: 600,
          }}
        >
          {priorityLabels[card.priority]}
        </span>
      </div>

      {card.description && (
        <p style={{ margin: '6px 0', fontSize: '13px', color: textMuted }}>
          {card.description}
        </p>
      )}

      {card.assignee && (
        <div style={{ fontSize: '12px', color: textMuted, marginTop: '4px' }}>
          Responsável: <strong>{card.assignee}</strong>
        </div>
      )}

      {card.tags.length > 0 && (
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
          {card.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: theme === 'dark' ? '#4b5563' : '#e5e7eb',
                borderRadius: '4px',
                padding: '1px 6px',
                fontSize: '11px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
        {canMove && (
          <button
            onClick={() => onMove(card.id, card.columnId)}
            aria-label="Mover card"
            style={{
              fontSize: '12px',
              padding: '4px 8px',
              cursor: 'pointer',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            Mover
          </button>
        )}
        <button
          onClick={() => onDelete(card.id)}
          aria-label="Deletar card"
          data-testid="delete-button"
          style={{
            fontSize: '12px',
            padding: '4px 8px',
            cursor: 'pointer',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Deletar
        </button>
      </div>
    </div>
  )
}
