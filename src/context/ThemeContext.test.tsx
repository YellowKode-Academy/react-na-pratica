import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ThemeProvider, useTheme } from './ThemeContext'

// Componente auxiliar para testar o hook
function ThemeConsumer() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme} data-testid="toggle">Toggle</button>
    </div>
  )
}

describe('ThemeContext', () => {
  beforeEach(() => {
    vi.mocked(localStorage.getItem).mockReturnValue(null)
  })

  it('ThemeProvider renderiza os children', () => {
    render(
      <ThemeProvider>
        <span data-testid="child">filho</span>
      </ThemeProvider>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('useTheme retorna theme light por padrao', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(null)

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light')
  })

  it('useTheme retorna tema salvo no localStorage', () => {
    vi.mocked(localStorage.getItem).mockReturnValue('dark')

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark')
  })

  it('toggleTheme alterna entre light e dark', async () => {
    const user = userEvent.setup()
    vi.mocked(localStorage.getItem).mockReturnValue(null)

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light')

    await user.click(screen.getByTestId('toggle'))

    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark')
  })

  it('toggleTheme salva o novo tema no localStorage', async () => {
    const user = userEvent.setup()
    vi.mocked(localStorage.getItem).mockReturnValue(null)

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )

    await user.click(screen.getByTestId('toggle'))

    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('useTheme lanca erro se usado fora do ThemeProvider', () => {
    // Suprimir o erro do console durante este teste
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(() => {
      render(<ThemeConsumer />)
    }).toThrow('useTheme must be used within ThemeProvider')

    consoleSpy.mockRestore()
  })
})
