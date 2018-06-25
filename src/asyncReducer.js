import { Provider } from './providers'

/**
 * Async Reducer
 * Just dispatch if return new state payloads.
 * With this, the subscribe function will not be
 * called unnecessary, because the state don't be changed
 */
export default action => {
  return new Promise( resolve  => {
    Provider._reducers.forEach(({ reducer, initial }) => {
      const oldState = reducer.current ? Provider._updateState({}) : initial
      reducer.current = oldState
      const state = reducer(oldState, action)
      const reducerState = reducer(oldState, { action: '@@DUTIER.ACTION', payload: action.payload })
      if (JSON.stringify( reducerState ) !== JSON.stringify(state)) {
        return resolve({ action, oldState, state: Provider._updateState(state) })
      }
    })
  })
}
