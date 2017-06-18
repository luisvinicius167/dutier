import { Provider } from './providers'

/**
 * Apply the subscribe handler functions
 */ 
export default ({ type, state }) => {
  Provider._handlers.forEach(handler => {
    if (handler !== undefined && typeof handler === 'function') {
      handler({ type, state })
    }
  })
  return { type, state }
}
