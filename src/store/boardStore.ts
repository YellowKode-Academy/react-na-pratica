import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Card, ColumnId, Priority } from '../types'

interface BoardState {
  cards: Card[]
  filter: { assignee: string; priority: Priority | '' }

  addCard: (card: Omit<Card, 'id' | 'createdAt'>) => void
  moveCard: (cardId: string, newColumnId: ColumnId) => void
  deleteCard: (cardId: string) => void
  updateCard: (cardId: string, updates: Partial<Card>) => void
  setFilter: (filter: Partial<BoardState['filter']>) => void
  getCardsForColumn: (columnId: ColumnId) => Card[]
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      cards: [],
      filter: { assignee: '', priority: '' },

      addCard: (card) =>
        set((state) => ({
          cards: [
            ...state.cards,
            {
              ...card,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      moveCard: (cardId, newColumnId) =>
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === cardId ? { ...c, columnId: newColumnId } : c
          ),
        })),

      deleteCard: (cardId) =>
        set((state) => ({
          cards: state.cards.filter((c) => c.id !== cardId),
        })),

      updateCard: (cardId, updates) =>
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === cardId ? { ...c, ...updates } : c
          ),
        })),

      setFilter: (filter) =>
        set((state) => ({
          filter: { ...state.filter, ...filter },
        })),

      getCardsForColumn: (columnId) => {
        const { cards, filter } = get()
        return cards.filter((c) => {
          if (c.columnId !== columnId) return false
          if (filter.assignee && c.assignee !== filter.assignee) return false
          if (filter.priority && c.priority !== filter.priority) return false
          return true
        })
      },
    }),
    { name: 'taskboard-storage' }
  )
)
