import { useState } from 'react'
import { Column } from '../Column/Column'
import { CardForm } from '../CardForm/CardForm'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import { useBoard } from '../../hooks/useBoard'
import type { ColumnId, Priority } from '../../types'

const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'in-progress', title: 'Em Progresso' },
  { id: 'done', title: 'Concluído' },
]

export function Board() {
  const {
    filter,
    allAssignees,
    addCard,
    deleteCard,
    getCardsForColumn,
    handleMoveCard,
    handleFilterAssignee,
    handleFilterPriority,
  } = useBoard()

  const [showForm, setShowForm] = useState(false)

  return (
    <div
      data-testid="board"
      style={{
        minHeight: '100vh',
        padding: '24px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800 }}>TaskBoard</h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <ThemeToggle />
          <button
            onClick={() => setShowForm((v) => !v)}
            data-testid="add-card-button"
            style={{
              padding: '8px 16px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {showForm ? 'Cancelar' : '+ Novo Card'}
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div
        data-testid="filters"
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Filtros:</span>

        <select
          value={filter.assignee}
          onChange={(e) => handleFilterAssignee(e.target.value)}
          aria-label="Filtrar por responsável"
          style={{
            padding: '6px 10px',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
            fontSize: '13px',
          }}
        >
          <option value="">Todos os responsáveis</option>
          {allAssignees.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        <select
          value={filter.priority}
          onChange={(e) => handleFilterPriority(e.target.value as Priority | '')}
          aria-label="Filtrar por prioridade"
          style={{
            padding: '6px 10px',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
            fontSize: '13px',
          }}
        >
          <option value="">Todas as prioridades</option>
          <option value="high">Alta</option>
          <option value="medium">Média</option>
          <option value="low">Baixa</option>
        </select>
      </div>

      {/* Formulário de adição */}
      {showForm && (
        <div
          style={{
            background: '#f9fafb',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            maxWidth: '400px',
          }}
        >
          <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Novo Card</h3>
          <CardForm
            onSubmit={(card) => {
              addCard(card)
              setShowForm(false)
            }}
          />
        </div>
      )}

      {/* Colunas */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
          overflowX: 'auto',
        }}
      >
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            id={col.id}
            title={col.title}
            cards={getCardsForColumn(col.id)}
            onDeleteCard={deleteCard}
            onMoveCard={handleMoveCard}
          />
        ))}
      </div>
    </div>
  )
}
