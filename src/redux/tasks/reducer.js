import { parseISO, getUnixTime, formatISO9075 } from 'date-fns/'

import {
  CREATE_TASK,
  EDIT_TASK,
  REMOVE_TASK,
  SAVE_TASK,
  SELECT_FILTER,
  SORT_BY_UPDATING,
  SORT_BY_CREATION,
} from './actions'

const initialState = {
  tasks: [],
  taskToEdit: null,
  filterByStatus: 'all',
  sortWayByUpdating: null,
  sortWayByCreation: null,
}

// eslint-disable-next-line default-param-last
export const taskReducer = (state = initialState, action) => {
  switch (action?.type) {
    case CREATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      }
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      }
    case EDIT_TASK:
      return {
        ...state,
        taskToEdit: action.taskToEdit,
      }
    case SAVE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === action.task.id ? { ...action.task, updatingDate: formatISO9075(new Date()) } : item,
        ),
        taskToEdit: null,
      }
    case SELECT_FILTER:
      return {
        ...state,
        filterByStatus: action.filter,
      }
    case SORT_BY_CREATION:
      return {
        ...state,
        sortWayByCreation: action.sortWay,
        tasks:
          action.sortWay === 'oldFirst'
            ? [...state.tasks].sort(
                (a, b) => getUnixTime(parseISO(a.creationDate)) - getUnixTime(parseISO(b.creationDate)),
              )
            : [...state.tasks].sort(
                (a, b) => getUnixTime(parseISO(b.creationDate)) - getUnixTime(parseISO(a.creationDate)),
              ),
      }

    case SORT_BY_UPDATING:
      return {
        ...state,
        sortWayByUpdating: action.sortWay,
        tasks:
          action.sortWay === 'oldFirst'
            ? [...action.taskWithUpdatingDate, ...action.taskWithoutUpdatingDate].sort(
                (a, b) => getUnixTime(parseISO(a.updatingDate)) - getUnixTime(parseISO(b.updatingDate)),
              )
            : [...action.taskWithUpdatingDate, ...action.taskWithoutUpdatingDate].sort(
                (a, b) => getUnixTime(parseISO(b.updatingDate)) - getUnixTime(parseISO(a.updatingDate)),
              ),
      }
    default:
      return state
  }
}
