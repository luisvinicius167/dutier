import asyncReducer from './asyncReducer'
import applyHandler from './applyHandler'

/**
   * @name dispatch
   * @description Dispatch an action to change
   * the store state
   * @param { Object } payload The action payload
   */  
  export default  ( payload ) => {
    return new Promise( resolve => 
      payload.call(null, resolve )
    ).then(asyncReducer)
    .then(applyHandler)
  }