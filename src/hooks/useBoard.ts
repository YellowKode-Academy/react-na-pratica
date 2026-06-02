import { useBoardStore } from '../store/boardStore'
import type { Card, ColumnId, Priority } from '../types'

export function useBoard() {
  const {
    cards,
    filter,
    addCard,
    moveCard,
    deleteCard,
    updateCard,
    setFilter,
    getCardsForColumn,
  } = useBoardStore()

  const columns: ColumnId[] = ['backlog', 'in-progress', 'done']

  const allAssignees = Array.from(new Set(cards.map((c) => c.assignee).filter(Boolean)))

  const handleMoveCard = (cardId: string, currentColumnId: ColumnId) => {
    const order: ColumnId[] = ['backlog', 'in-progress', 'done']
    const currentIndex = order.indexOf(currentColumnId)
    const nextColumnId = order[currentIndex + 1]
    if (nextColumnId) {
      moveCard(cardId, nextColumnId)
    }
  }

  const handleFilterAssignee = (assignee: string) => setFilter({ assignee })
  const handleFilterPriority = (priority: Priority | '') => setFilter({ priority })

  return {
    cards,
    filter,
    columns,
    allAssignees,
    addCard,
    moveCard,
    deleteCard,
    updateCard,
    getCardsForColumn,
    handleMoveCard,
    handleFilterAssignee,
    handleFilterPriority,
  }
}
