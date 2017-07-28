import { Provider } from './providers'

/**
 * Async Reducer
 * Just dispatch if return new state values.
 * With this, the subscribe function will not be
 * called unnecessary, because the state don't be changed
 */
export default action => {
  return new Promise( resolve  => {
    for ( let reducer of Provider._reducers ) {
      const [ reducerFunction, reducerProps ] = reducer
      const stateReducer = reducerProps.current ? reducerProps.current : reducerProps.initial
      const current = reducerProps.current = reducerFunction(stateReducer, action)
      const reducerOldState = reducerFunction(stateReducer, { type: '@@Dutier.OLD_STATE', value: action.value })
      // pass old state just to middleware
      const oldState = Object.assign({}, Provider._updateState({}), reducerOldState)
      if (JSON.stringify( current ) !== JSON.stringify(stateReducer)) {
        return resolve({ action, oldState, state: Provider._updateState(current) })
      }
    }
  })
}
