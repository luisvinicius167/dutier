import { Provider } from './providers'

/**
 * Async Reducer
 * Just dispatch if return new state values.
 * With this, the subscribe function will not be
 * called unnecessary, because the state don't be changed
 */
export default (action) => {
  return new Promise( resolve  => {
    for ( let reducer of Provider._reducers ) {
      const [ reducerFunction, reducerProps ]  = reducer
      const stateReducer = reducerProps.current ? reducerProps.current : reducerProps.initial
      const current = reducerProps.current = reducerFunction(stateReducer, action)
      if (JSON.stringify( current ) !== JSON.stringify(stateReducer)) {
        return resolve({ type: action.type, state: Provider._updateState(current) })
      }
    }
  })
}
