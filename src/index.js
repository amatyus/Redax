import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import configurStore from './store/store'
import {Provider, useSelector, useDispatch} from 'react-redux'
import {
  titleChange,
  taskDeleted,
  completeTask,
  getTasks,
  loadTasks,
  getTasksLoadingStatus,
  createTask
} from './store/task'
import {getErrors} from './store/errors'

const store = configurStore()

const App = () => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getErrors())
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTasks())
  }, [])

  const changeTitle = (taskId) => {
    dispatch(titleChange(taskId))
  }

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId))
  }

  const addNewTask = () => {
    dispatch(createTask({userId: 1, title: 'New Task', completed: false}))
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button
              onClick={() => {
                dispatch(completeTask(el.id))
              }}
            >
              Complited
            </button>
            <button
              onClick={() => {
                changeTitle(el.id)
              }}
            >
              ChangeTitle
            </button>
            <button
              onClick={() => {
                deleteTask(el.id)
              }}
            >
              Delete
            </button>
            <hr />
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          addNewTask()
        }}
      >
        Add task
      </button>
      <hr />
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
