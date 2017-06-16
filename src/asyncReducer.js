import { Provider } from './providers'

/**
 * Async Reducer
 * Just dispatch if return new state values.
 * With this, the subscribe function will not be
 * called unnecessary, because the state don't be changed
 */
export default (action) => {
  return new Promise( (resolve, reject )=> {
    Object.keys(Provider._reducers)
      .forEach( reducer => {
        const asyncReducer = new Promise(resolve => Provider._reducers[reducer].call(null, resolve, Provider._updateState({}), action))
        asyncReducer.then( state => {
          if (JSON.stringify(state) !== JSON.stringify(Provider._updateState({}))) {
            resolve({type: action.type, state: Provider._updateState(state) })
          }
        })
      })
  })
}
