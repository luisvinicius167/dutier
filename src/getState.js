import {Provider} from './providers'

/**
 * @name getState
 * @return {Object} a copy of the state
 */
export default () => {
  return Provider._updateState({})
}
