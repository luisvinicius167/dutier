import { Provider } from './providers'
import setReducer from './setReducer'
import create from './updateState'
import dispatch from './dispatch'
import getState from './getState'
import subscribe from './subscribe'

/**
 * @name createStore
 * @description Sets the store state
 * @param {Object} data Simple Object that contain the State
 * @param {Function} reducers The action reducers
 */
export default ( ...reducers ) => {
  if (Provider._updateState({}) === undefined) {
    Provider._updateState = create({})
  }
  setReducer(reducers)
  return { dispatch, subscribe, getState }
}
