import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom/client'
import * as actions from './store/actions'
import {initialStore} from './store/store'

const store = initialStore()

const completeTask = (taskId) => {
  store.dispatch(actions.taskCompleted(taskId))
}

const changeTitle = (taskId) => {
  store.dispatch(actions.titleChange(taskId))
}

const deleteTask = (taskId) => {
  store.dispatch(actions.taskDelete(taskId))
}

const App = () => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    store.subscribe(() => setState(store.getState()))
  }, [])
  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Complited: ${el.complited}`}</p>
            <button
              onClick={() => {
                completeTask(el.id)
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
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
