import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ThemeToggle } from './ThemeToggle'
import { ThemeContext } from '../../context/ThemeContext'

// Helper para renderizar com contexto customizado
function renderWithTheme(theme: 'light' | 'dark', toggleTheme = vi.fn()) {
  return render(
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeToggle />
    </ThemeContext.Provider>
  )
}

describe('ThemeToggle', () => {
  it('renderiza o botao de alternancia de tema', () => {
    renderWithTheme('light')

    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  it('mostra texto de escuro quando tema e light', () => {
    renderWithTheme('light')

    expect(screen.getByTestId('theme-toggle')).toHaveTextContent('Escuro')
  })

  it('mostra texto de claro quando tema e dark', () => {
    renderWithTheme('dark')

    expect(screen.getByTestId('theme-toggle')).toHaveTextContent('Claro')
  })

  it('chama toggleTheme ao clicar no botao', async () => {
    const user = userEvent.setup()
    const toggleTheme = vi.fn()
    renderWithTheme('light', toggleTheme)

    await user.click(screen.getByTestId('theme-toggle'))

    expect(toggleTheme).toHaveBeenCalledOnce()
  })
})
