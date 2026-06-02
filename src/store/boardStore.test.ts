import { describe, it, expect, beforeEach } from 'vitest'
import { useBoardStore } from './boardStore'

describe('boardStore', () => {
  beforeEach(() => {
    useBoardStore.setState({ cards: [], filter: { assignee: '', priority: '' } })
  })

  it('addCard adiciona um card com id e createdAt gerados', () => {
    const { addCard, cards } = useBoardStore.getState()

    expect(cards).toHaveLength(0)

    addCard({
      title: 'Novo card',
      description: 'Descrição',
      priority: 'medium',
      assignee: 'Ana',
      columnId: 'backlog',
      tags: [],
    })

    const updatedCards = useBoardStore.getState().cards
    expect(updatedCards).toHaveLength(1)
    expect(updatedCards[0].id).toBeTruthy()
    expect(updatedCards[0].createdAt).toBeTruthy()
    expect(updatedCards[0].title).toBe('Novo card')
  })

  it('moveCard atualiza o columnId do card', () => {
    useBoardStore.getState().addCard({
      title: 'Card para mover',
      description: '',
      priority: 'low',
      assignee: '',
      columnId: 'backlog',
      tags: [],
    })

    const cardId = useBoardStore.getState().cards[0].id
    useBoardStore.getState().moveCard(cardId, 'in-progress')

    const updatedCard = useBoardStore.getState().cards[0]
    expect(updatedCard.columnId).toBe('in-progress')
  })

  it('deleteCard remove o card pelo id', () => {
    useBoardStore.getState().addCard({
      title: 'Card para deletar',
      description: '',
      priority: 'high',
      assignee: '',
      columnId: 'backlog',
      tags: [],
    })

    expect(useBoardStore.getState().cards).toHaveLength(1)

    const cardId = useBoardStore.getState().cards[0].id
    useBoardStore.getState().deleteCard(cardId)

    expect(useBoardStore.getState().cards).toHaveLength(0)
  })

  it('updateCard atualiza os campos do card', () => {
    useBoardStore.getState().addCard({
      title: 'Card original',
      description: 'Desc original',
      priority: 'low',
      assignee: '',
      columnId: 'backlog',
      tags: [],
    })

    const cardId = useBoardStore.getState().cards[0].id
    useBoardStore.getState().updateCard(cardId, { title: 'Card atualizado', priority: 'high' })

    const updated = useBoardStore.getState().cards[0]
    expect(updated.title).toBe('Card atualizado')
    expect(updated.priority).toBe('high')
    expect(updated.description).toBe('Desc original')
  })

  it('getCardsForColumn filtra por coluna', () => {
    useBoardStore.getState().addCard({
      title: 'Card Backlog',
      description: '',
      priority: 'medium',
      assignee: '',
      columnId: 'backlog',
      tags: [],
    })
    useBoardStore.getState().addCard({
      title: 'Card Progress',
      description: '',
      priority: 'medium',
      assignee: '',
      columnId: 'in-progress',
      tags: [],
    })

    const backlogCards = useBoardStore.getState().getCardsForColumn('backlog')
    expect(backlogCards).toHaveLength(1)
    expect(backlogCards[0].title).toBe('Card Backlog')
  })

  it('getCardsForColumn filtra por coluna e por filtros ativos de assignee', () => {
    useBoardStore.getState().addCard({
      title: 'Card Ana',
      description: '',
      priority: 'medium',
      assignee: 'Ana',
      columnId: 'backlog',
      tags: [],
    })
    useBoardStore.getState().addCard({
      title: 'Card Bob',
      description: '',
      priority: 'medium',
      assignee: 'Bob',
      columnId: 'backlog',
      tags: [],
    })

    useBoardStore.getState().setFilter({ assignee: 'Ana' })

    const filtered = useBoardStore.getState().getCardsForColumn('backlog')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].title).toBe('Card Ana')
  })

  it('getCardsForColumn filtra por filtro de prioridade', () => {
    useBoardStore.getState().addCard({
      title: 'Card High',
      description: '',
      priority: 'high',
      assignee: '',
      columnId: 'backlog',
      tags: [],
    })
    useBoardStore.getState().addCard({
      title: 'Card Low',
      description: '',
      priority: 'low',
      assignee: '',
      columnId: 'backlog',
      tags: [],
    })

    useBoardStore.getState().setFilter({ priority: 'high' })

    const filtered = useBoardStore.getState().getCardsForColumn('backlog')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].title).toBe('Card High')
  })

  it('setFilter atualiza o filtro parcialmente', () => {
    useBoardStore.getState().setFilter({ assignee: 'Ana' })
    useBoardStore.getState().setFilter({ priority: 'high' })

    const { filter } = useBoardStore.getState()
    expect(filter.assignee).toBe('Ana')
    expect(filter.priority).toBe('high')
  })
})
