import { Provider } from './providers'
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
export default (state, ...reducers) => {
  Provider._reducers = [ ...reducers ];
  if ( typeof Provider._updateState({}) === 'object' ) {
    throw new Error('You just can create one store inside your application.')
  } 
  Provider._updateState = create(state)
  return { dispatch, subscribe, getState }
}
