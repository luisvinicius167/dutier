import { Provider } from './providers'
import create from './updateState'

/**
 * @name setReducer
 * @description Set the reducer function, the
 * initial state of the reducer and store state
 */
export default reducers => {
  // if createStore don't was called yet
  if (Provider._updateState({}) === undefined) {
    Provider._updateState = create({})
  }
  reducers.forEach(reducer => {
    const initial = reducer(undefined, { type: '@@DUTIER.INITIAL_STATE' })
    Provider._reducers.set(reducer, { initial })
    Provider._updateState(initial)
  })
}
