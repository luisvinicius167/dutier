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
  setReducer(reducers)
  if ( typeof Provider._updateState({}) === 'object' ) {
    throw new Error('You just can create one store inside your application.')
  }
  
  Provider._updateState = create({})
  return { dispatch, subscribe, getState }
}
