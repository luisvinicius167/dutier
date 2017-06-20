import { Provider } from './providers'
import create from './updateState'
 
/**
 * @name createStore
 * @description Sets the store state
 * @param {Object} data Simple Object that contain the State
 * @param {Function} reducers The action reducers
 */
export default (state, ...reducers) => {
  Provider._reducers = [ ...reducers ];
  Provider._updateState = create(state)
}
