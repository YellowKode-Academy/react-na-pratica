import { ThemeProvider } from './context/ThemeContext'
import { Board } from './components/Board/Board'

function App() {
  return (
    <ThemeProvider>
      <Board />
    </ThemeProvider>
  )
}

export default App
