import { useReducer } from 'react'
import type { ColumnId, Priority } from '../types'

type CardFormState = {
  title: string
  description: string
  priority: Priority
  assignee: string
  tags: string[]
  columnId: ColumnId
}

type CardFormAction =
  | { type: 'SET_FIELD'; field: keyof Omit<CardFormState, 'tags'>; value: string }
  | { type: 'ADD_TAG'; tag: string }
  | { type: 'REMOVE_TAG'; tag: string }
  | { type: 'RESET' }

const initialState: CardFormState = {
  title: '',
  description: '',
  priority: 'medium',
  assignee: '',
  tags: [],
  columnId: 'backlog',
}

function cardFormReducer(state: CardFormState, action: CardFormAction): CardFormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'ADD_TAG':
      if (!action.tag.trim() || state.tags.includes(action.tag.trim())) return state
      return { ...state, tags: [...state.tags, action.tag.trim()] }
    case 'REMOVE_TAG':
      return { ...state, tags: state.tags.filter((t) => t !== action.tag) }
    case 'RESET':
      return { ...initialState }
    default:
      return state
  }
}

export function useCardForm() {
  const [state, dispatch] = useReducer(cardFormReducer, initialState)

  const addTag = (tag: string) => dispatch({ type: 'ADD_TAG', tag })
  const removeTag = (tag: string) => dispatch({ type: 'REMOVE_TAG', tag })
  const reset = () => dispatch({ type: 'RESET' })
  const setField = (
    field: keyof Omit<CardFormState, 'tags'>,
    value: string
  ) => dispatch({ type: 'SET_FIELD', field, value })

  return { state, dispatch, addTag, removeTag, reset, setField }
}
