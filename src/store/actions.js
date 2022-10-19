import * as actionTypes from './actoinTypes'

export function taskCompleted(id) {
  return {
    type: actionTypes.taskUpdated,
    payload: {id, complited: true}
  }
}

export function titleChange(id) {
  return {
    type: actionTypes.taskUpdated,
    payload: {id, title: `New title for ${id}`}
  }
}

export function taskDelete(id) {
  return {
    type: actionTypes.taskDeleted,
    payload: {id}
  }
}
