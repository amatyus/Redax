export function thunk({dispatch, getState}) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      if (typeof action === 'function') {
        return action(dispatch, getState)
      } else {
        return next(action)
      }
    }
  }
}
