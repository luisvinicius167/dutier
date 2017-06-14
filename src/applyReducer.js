import { Provider } from './providers'

/**
 * Apply the reducer functions
 */ 
export default (action) => {
  const currentState = Provider._updateState({})
  Object.keys(Provider._reducers)
    .forEach(reducer => {
      const value = Provider._reducers[reducer].call(null, currentState, action)
      if (JSON.stringify(value) !== JSON.stringify(currentState)) {
        return Provider._updateState(value)
      }
    })
  return { type: action.type,  state: Provider._updateState({}) }
}
