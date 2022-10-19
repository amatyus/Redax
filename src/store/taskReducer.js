import {taskUpdated, taskDeleted} from './actoinTypes'

export function taskReducer(state = [], action) {
  switch (action.type) {
    case taskUpdated: {
      const newArr = [...state]
      const elemIndex = newArr.findIndex((el) => el.id === action.payload.id)
      newArr[elemIndex] = {...newArr[elemIndex], ...action.payload}
      return newArr
    }
    case taskDeleted: {
      const newArr = [...state]
      const filerArr = newArr.filter((el) => el.id !== action.payload.id)
      return filerArr
    }

    default:
      return state
  }
}
