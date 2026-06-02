import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Column } from './Column'
import type { Card as CardType } from '../../types'

const mockCards: CardType[] = [
  {
    id: 'card-1',
    title: 'Tarefa 1',
    description: 'Descrição 1',
    priority: 'high',
    assignee: 'Ana',
    columnId: 'backlog',
    createdAt: '2026-01-01T00:00:00.000Z',
    tags: [],
  },
  {
    id: 'card-2',
    title: 'Tarefa 2',
    description: 'Descrição 2',
    priority: 'low',
    assignee: 'Bob',
    columnId: 'backlog',
    createdAt: '2026-01-02T00:00:00.000Z',
    tags: [],
  },
]

describe('Column', () => {
  it('renderiza o titulo da coluna', () => {
    render(
      <Column
        id="backlog"
        title="Backlog"
        cards={mockCards}
        onDeleteCard={vi.fn()}
        onMoveCard={vi.fn()}
      />
    )

    expect(screen.getByText('Backlog')).toBeInTheDocument()
  })

  it('renderiza o contador com o numero correto de cards', () => {
    render(
      <Column
        id="backlog"
        title="Backlog"
        cards={mockCards}
        onDeleteCard={vi.fn()}
        onMoveCard={vi.fn()}
      />
    )

    expect(screen.getByTestId('column-count-backlog')).toHaveTextContent('2')
  })

  it('renderiza mensagem quando a coluna esta vazia', () => {
    render(
      <Column
        id="backlog"
        title="Backlog"
        cards={[]}
        onDeleteCard={vi.fn()}
        onMoveCard={vi.fn()}
      />
    )

    expect(screen.getByText('Nenhum card')).toBeInTheDocument()
  })

  it('renderiza todos os cards recebidos', () => {
    render(
      <Column
        id="backlog"
        title="Backlog"
        cards={mockCards}
        onDeleteCard={vi.fn()}
        onMoveCard={vi.fn()}
      />
    )

    expect(screen.getByText('Tarefa 1')).toBeInTheDocument()
    expect(screen.getByText('Tarefa 2')).toBeInTheDocument()
  })
})
