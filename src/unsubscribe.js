import { Provider } from './providers'

/**
   * @name unsubscribe
   * @description Unsubscribes from listening to a component
   * @param {Function} handler The handler function
   **/
  export default ( handler ) => {
    Provider._handlers.forEach( ( fn, index ) => {
      if ( fn === handler) {
        Provider._handlers.splice(index, 1)
      }
    })
  }