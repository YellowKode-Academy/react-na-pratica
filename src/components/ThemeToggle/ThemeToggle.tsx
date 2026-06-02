import { useTheme } from '../../context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
      data-testid="theme-toggle"
      style={{
        padding: '6px 12px',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        background: theme === 'light' ? '#1f2937' : '#f9fafb',
        color: theme === 'light' ? 'white' : '#1f2937',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: '13px',
      }}
    >
      {theme === 'light' ? '🌙 Escuro' : '☀️ Claro'}
    </button>
  )
}
