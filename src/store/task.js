import {createSlice} from '@reduxjs/toolkit'
import todosService from '../services/todos.srvice'
import {setError} from './errors'

const initialState = {entities: [], isLoading: true}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    resived(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    update(state, action) {
      const elemIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      )
      state.entities[elemIndex] = {
        ...state.entities[elemIndex],
        ...action.payload
      }
    },
    addTask(state, action) {
      state.entities.push(action.payload)
    },

    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      )
    },
    taskRequested(state) {
      state.isLoading = true
    },
    taskRequestFiled(state, action) {
      state.isLoading = false
    }
  }
})

const {actions, reducer: taskReducer} = taskSlice
const {update, remove, resived, taskRequested, taskRequestFiled, addTask} =
  actions

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.fetch()
    dispatch(resived(data))
  } catch (error) {
    dispatch(taskRequestFiled())
    dispatch(setError(error.message))
  }
}

export const completeTask = (id) => (dispatch) => {
  dispatch(update({id, completed: true}))
}

export function titleChange(id) {
  return update({id, title: `New title for ${id}`})
}

export function taskDeleted(id) {
  return remove({id})
}

export const taskCreate = () => async (dispatch) => {
  try {
    const data = await todosService.post({title: 'New task ', completed: false})
    dispatch(addTask(data))
    console.log(data)
  } catch (error) {}
}

export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

export default taskReducer
