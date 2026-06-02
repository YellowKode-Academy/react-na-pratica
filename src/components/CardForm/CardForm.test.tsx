import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { CardForm } from './CardForm'

describe('CardForm', () => {
  it('renderiza o formulario com campos title, description e priority', () => {
    render(<CardForm onSubmit={vi.fn()} />)

    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/prioridade/i)).toBeInTheDocument()
  })

  it('atualiza o campo title ao digitar', async () => {
    const user = userEvent.setup()
    render(<CardForm onSubmit={vi.fn()} />)

    const titleInput = screen.getByLabelText(/título/i)
    await user.type(titleInput, 'Nova tarefa')

    expect(titleInput).toHaveValue('Nova tarefa')
  })

  it('atualiza o campo description ao digitar', async () => {
    const user = userEvent.setup()
    render(<CardForm onSubmit={vi.fn()} />)

    const descInput = screen.getByLabelText(/descrição/i)
    await user.type(descInput, 'Detalhe da tarefa')

    expect(descInput).toHaveValue('Detalhe da tarefa')
  })

  it('priority select inicia com valor medium', () => {
    render(<CardForm onSubmit={vi.fn()} />)

    const select = screen.getByLabelText(/prioridade/i)
    expect(select).toHaveValue('medium')
  })

  it('submit com titulo vazio nao deve chamar onSubmit', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<CardForm onSubmit={onSubmit} />)

    await user.click(screen.getByRole('button', { name: /adicionar card/i }))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submit com titulo preenchido chama onSubmit com os dados corretos', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<CardForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/título/i), 'Minha tarefa')
    await user.click(screen.getByRole('button', { name: /adicionar card/i }))

    expect(onSubmit).toHaveBeenCalledOnce()
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Minha tarefa',
        priority: 'medium',
        columnId: 'backlog',
      })
    )
  })

  it('reseta o formulario apos submit bem-sucedido', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<CardForm onSubmit={onSubmit} />)

    const titleInput = screen.getByLabelText(/título/i)
    await user.type(titleInput, 'Tarefa temporária')
    await user.click(screen.getByRole('button', { name: /adicionar card/i }))

    expect(titleInput).toHaveValue('')
  })
})
