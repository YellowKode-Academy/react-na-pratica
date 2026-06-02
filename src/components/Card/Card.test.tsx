import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Card } from './Card'
import type { Card as CardType } from '../../types'

const mockCard: CardType = {
  id: 'card-1',
  title: 'Implementar login',
  description: 'Tela de autenticação com JWT',
  priority: 'high',
  assignee: 'Ana',
  columnId: 'backlog',
  createdAt: '2026-01-01T00:00:00.000Z',
  tags: ['auth', 'backend'],
}

describe('Card', () => {
  it('renderiza titulo e prioridade corretamente', () => {
    const onDelete = vi.fn()
    const onMove = vi.fn()

    render(<Card card={mockCard} onDelete={onDelete} onMove={onMove} />)

    expect(screen.getByText('Implementar login')).toBeInTheDocument()
    expect(screen.getByTestId('priority-badge')).toBeInTheDocument()
  })

  it('badge de prioridade tem o texto correto para high', () => {
    const onDelete = vi.fn()
    const onMove = vi.fn()

    render(<Card card={mockCard} onDelete={onDelete} onMove={onMove} />)

    const badge = screen.getByTestId('priority-badge')
    expect(badge).toHaveTextContent('Alta')
  })

  it('badge de prioridade tem o texto correto para medium', () => {
    const onDelete = vi.fn()
    const onMove = vi.fn()
    const mediumCard = { ...mockCard, priority: 'medium' as const }

    render(<Card card={mediumCard} onDelete={onDelete} onMove={onMove} />)

    expect(screen.getByTestId('priority-badge')).toHaveTextContent('Média')
  })

  it('badge de prioridade tem o texto correto para low', () => {
    const onDelete = vi.fn()
    const onMove = vi.fn()
    const lowCard = { ...mockCard, priority: 'low' as const }

    render(<Card card={lowCard} onDelete={onDelete} onMove={onMove} />)

    expect(screen.getByTestId('priority-badge')).toHaveTextContent('Baixa')
  })

  it('botao deletar chama onDelete com o id correto', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    const onMove = vi.fn()

    render(<Card card={mockCard} onDelete={onDelete} onMove={onMove} />)

    await user.click(screen.getByTestId('delete-button'))

    expect(onDelete).toHaveBeenCalledWith('card-1')
    expect(onDelete).toHaveBeenCalledTimes(1)
  })

  it('renderiza a descricao do card', () => {
    const onDelete = vi.fn()
    const onMove = vi.fn()

    render(<Card card={mockCard} onDelete={onDelete} onMove={onMove} />)

    expect(screen.getByText('Tela de autenticação com JWT')).toBeInTheDocument()
  })

  it('nao mostra botao mover quando o card esta em done', () => {
    const onDelete = vi.fn()
    const onMove = vi.fn()
    const doneCard = { ...mockCard, columnId: 'done' as const }

    render(<Card card={doneCard} onDelete={onDelete} onMove={onMove} />)

    expect(screen.queryByRole('button', { name: /mover/i })).not.toBeInTheDocument()
  })
})
