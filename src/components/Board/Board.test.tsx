import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { Board } from './Board'
import { ThemeProvider } from '../../context/ThemeContext'
import { useBoardStore } from '../../store/boardStore'

function renderBoard() {
  return render(
    <ThemeProvider>
      <Board />
    </ThemeProvider>
  )
}

describe('Board', () => {
  beforeEach(() => {
    useBoardStore.setState({ cards: [], filter: { assignee: '', priority: '' } })
  })

  it('renderiza o titulo TaskBoard', () => {
    renderBoard()
    expect(screen.getByText('TaskBoard')).toBeInTheDocument()
  })

  it('renderiza as tres colunas', () => {
    renderBoard()
    expect(screen.getByText('Backlog')).toBeInTheDocument()
    expect(screen.getByText('Em Progresso')).toBeInTheDocument()
    expect(screen.getByText('Concluído')).toBeInTheDocument()
  })

  it('mostra o formulario ao clicar em Novo Card', async () => {
    const user = userEvent.setup()
    renderBoard()

    await user.click(screen.getByTestId('add-card-button'))

    expect(screen.getByTestId('card-form')).toBeInTheDocument()
  })

  it('adiciona um card ao submeter o formulario', async () => {
    const user = userEvent.setup()
    renderBoard()

    await user.click(screen.getByTestId('add-card-button'))

    await user.type(screen.getByLabelText(/título/i), 'Teste Board')
    await user.click(screen.getByRole('button', { name: /adicionar card/i }))

    expect(screen.getByText('Teste Board')).toBeInTheDocument()
  })

  it('renderiza os filtros de responsavel e prioridade', () => {
    renderBoard()

    expect(screen.getByLabelText(/filtrar por responsável/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/filtrar por prioridade/i)).toBeInTheDocument()
  })
})
