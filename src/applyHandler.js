import { Provider } from './providers'

/**
 * Apply the subscribe handler functions
 */ 
export default ({ type, state, payload }) => {
  Provider._handlers.forEach(handler => {
    if (handler !== undefined && typeof handler === 'function') {
      handler({ type, state, payload })
    }
  })
  return { type, state, payload }
}
