# React na Prática — TaskBoard

Repositório oficial do livro **React na Prática**.

Aplicação TaskBoard (Kanban) construída com React 18, TypeScript 5, Vite 5, Zustand e React Query. Demonstra os conceitos centrais do livro: hooks customizados, gerenciamento de estado, Context API, testes com Vitest e @testing-library/react.

## Funcionalidades

- Quadro Kanban com 3 colunas: Backlog, Em Progresso e Concluído
- Cards com título, descrição, prioridade, responsável e tags
- Mover cards entre colunas
- Filtro por responsável e prioridade
- Tema claro/escuro com persistência em localStorage
- Persistência de dados via localStorage (Zustand `persist`)

## Stack

| Tecnologia | Versão |
|---|---|
| React | 18.x |
| TypeScript | 5.x |
| Vite | 5.x |
| Zustand | 4.x |
| @tanstack/react-query | 5.x |
| Vitest | 1.x |
| @testing-library/react | 16.x |

## Instalação

```bash
npm install
```

## Comandos

```bash
# Iniciar em modo de desenvolvimento
npm run dev

# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch

# Build de produção
npm run build
```

## Estrutura

```
src/
├── types/          # Tipos TypeScript (Card, Column, Priority, Theme)
├── store/          # Zustand store (boardStore)
├── hooks/          # Hooks customizados (useCardForm, useBoard, useTheme)
├── context/        # ThemeContext (Context API)
└── components/
    ├── Board/       # Componente principal com filtros
    ├── Column/      # Coluna do Kanban
    ├── Card/        # Card individual
    ├── CardForm/    # Formulário de criação (useReducer)
    └── ThemeToggle/ # Botão de alternância de tema
```

## Testes

41 testes cobrindo todos os componentes, hooks, store e context.

```bash
npm test
# 7 arquivos de teste, 41 testes, 100% passando
```
