import { Provider } from './providers'

/**
 * Async Reducer
 * Just dispatch if return new state values.
 * With this, the subscribe function will not be
 * called unnecessary, because the state don't be changed
 */
export default action => {
  return new Promise( resolve  => {
    Provider._reducers.forEach(({ reducer, initial }) => {
      const stateReducer = reducer.current ? reducer.current : initial
      const current = reducer.current = reducer(stateReducer, action, Provider._updateState({}))
      const reducerOldState = reducer(stateReducer, { type: '@@Dutier.OLD_STATE', value: action.value })
      const oldState = Object.assign({}, Provider._updateState({}), reducerOldState)
      if (JSON.stringify( current ) !== JSON.stringify(stateReducer)) {
        return resolve({ action, oldState, state: Provider._updateState(current) })
      }
    })
  })
}
