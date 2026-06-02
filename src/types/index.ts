export type Priority = 'low' | 'medium' | 'high'
export type ColumnId = 'backlog' | 'in-progress' | 'done'

export interface Card {
  id: string
  title: string
  description: string
  priority: Priority
  assignee: string
  columnId: ColumnId
  createdAt: string
  tags: string[]
}

export interface Column {
  id: ColumnId
  title: string
  cards: Card[]
}

export interface User {
  id: string
  name: string
  avatar?: string
}

export type Theme = 'light' | 'dark'
