import { Provider } from './providers'
import unsubscribe from './unsubscribe'

/**
 * Subscribe to receive notifications when state is updated.
 * @name subscribe
 * @description Subscribe to call the handler function when the action will be triggered
 * @param {Function} handler The function that will be called
 **/
export default (handler) => {
  Provider._handlers.push(handler)
  return () => {
    unsubscribe(handler)
  }
}
