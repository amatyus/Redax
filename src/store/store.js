import {createStore} from 'redux'
import {taskReducer} from './taskReducer'

const initialState = [
  {id: 1, title: 'Task 1', complited: false},
  {id: 2, title: 'Task 2', complited: false}
]

// const store =createStore(taskReducer, initialState)
export function initialStore() {
  return createStore(taskReducer, initialState)
}
