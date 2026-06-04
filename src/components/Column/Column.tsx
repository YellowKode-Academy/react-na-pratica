import { useTheme } from '../../context/ThemeContext'
import { Card } from '../Card/Card'
import type { Card as CardType, ColumnId } from '../../types'

interface ColumnProps {
  id: ColumnId
  title: string
  cards: CardType[]
  onDeleteCard: (id: string) => void
  onMoveCard: (id: string, currentColumnId: ColumnId) => void
}

const columnColors: Record<ColumnId, string> = {
  backlog: '#6b7280',
  'in-progress': '#3b82f6',
  done: '#22c55e',
}

export function Column({ id, title, cards, onDeleteCard, onMoveCard }: ColumnProps) {
  const { theme } = useTheme()
  const bg = theme === 'dark' ? '#1f2937' : '#f9fafb'

  return (
    <div
      data-testid={`column-${id}`}
      style={{
        flex: '1',
        minWidth: '280px',
        maxWidth: '360px',
        background: bg,
        borderRadius: '12px',
        padding: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '15px',
            fontWeight: 700,
            color: columnColors[id],
          }}
        >
          {title}
        </h3>
        <span
          data-testid={`column-count-${id}`}
          style={{
            background: columnColors[id],
            color: 'white',
            borderRadius: '12px',
            padding: '2px 8px',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          {cards.length}
        </span>
      </div>

      <div>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onDelete={onDeleteCard}
            onMove={onMoveCard}
          />
        ))}
        {cards.length === 0 && (
          <p
            style={{
              textAlign: 'center',
              color: '#d1d5db',
              fontSize: '13px',
              marginTop: '24px',
            }}
          >
            Nenhum card
          </p>
        )}
      </div>
    </div>
  )
}
