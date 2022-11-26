import { v4 as uuidv4 } from 'uuid'
import { formatISO9075 } from 'date-fns/'

export const CREATE_TASK = 'tasks/CREATE_TASK'
export const REMOVE_TASK = 'tasks/REMOVE_TASK'
export const EDIT_TASK = 'tasks/EDIT_TASK'
export const SAVE_TASK = 'tasks/SAVE_TASK'
export const SELECT_FILTER = 'tasks/SELECT_FILTER'
export const SORT_BY_CREATION = 'tasks/SORT_BY_CREATION'
export const SORT_BY_UPDATING = 'tasks/SORT_BY_UPDATING'

export function createTask(task) {
  return {
    type: CREATE_TASK,
    payload: { id: uuidv4(), ...task, status: 'Open', creationDate: formatISO9075(new Date()) },
  }
}

export function removeTask(task) {
  return {
    type: REMOVE_TASK,
    payload: { ...task },
  }
}

export function editTask(taskToEdit) {
  return {
    type: EDIT_TASK,
    taskToEdit,
  }
}

export function saveTask(task) {
  return {
    type: SAVE_TASK,
    task,
  }
}

export function changeFilterByStatus(filter) {
  return {
    type: SELECT_FILTER,
    filter,
  }
}

export function sortByCreation(sortWay) {
  return {
    type: SORT_BY_CREATION,
    sortWay,
  }
}

export function sortByUpdating(sortWay, tasks) {
  return {
    type: SORT_BY_UPDATING,
    sortWay,
    taskWithUpdatingDate: tasks.filter((item) => item.updatingDate),
    taskWithoutUpdatingDate: tasks.filter((item) => !item.updatingDate),
  }
}
