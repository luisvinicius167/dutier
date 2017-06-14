;(function() {
 /**
  * @name _state
  * @description The actual store application state
  */
  const _state = {}
  /**
  * @name _initialState
  * @description The initial store application state
  */
  const _initialState = {}
  /**
  * @name _handlers
  * @description The subscribe handlers function
  */
  const _handlers = []
  /**
  * @name _reducers
  * @description The action reducers
  */
  const _reducers = {}
  
  // apply the correspondent action reducer
  function applyReducer( action ) {
    const initialState = Object.assign({}, _initialState)
    const actualState = Object.assign(initialState, _state)
    Object.keys(_reducers)
      .forEach( reducer => {
        const value = _reducers[reducer].call(null, actualState, action)
        if ( JSON.stringify(value) !== JSON.stringify(actualState) ) {
          return Object.assign(_state, initialState, value)
        }
      })
    return Object.assign({}, { type: action.type } , { state: Object.assign({}, _state) })
  }
  // apply all subscribe handlers
  function applyHandler( { type } ) {
    const state = Object.assign({}, _state)
    _handlers.forEach( handler => {
      if (handler !== undefined && typeof handler === 'function') {
        handler({ type, state })
      }
    })
    return { type, state }
  }
  /**
   * @name subscribe
   * @description Subscribe to call the handler function when the action will be triggered
   * @param {Function} handler The function that will be called
   **/
  function subscribe( handler ){
    _handlers.push(handler)
    return () => {
      unsubscribe(handler)
    }
  }
  /**
   * @name unsubscribe
   * @description Unsubscribes from listening to a component
   * @param {Function} handler The handler function
   **/
  function unsubscribe( handler ) {
    _handlers.forEach( ( fn, index ) => {
      if ( fn === handler) {
        _handlers.splice(index, 1)
      }
    })
  }
  /**
   * @name dispatch
   * @description Dispatch an action to change
   * the store state
   * @param { Object } payload The action payload
   */  
  function dispatch ( payload ) {
    return Promise.resolve(payload)
        .then(applyReducer)
        .then(applyHandler)
  }
  /**
   * @name combine
   * @description Combine the reducers
   */  
  function combine( ...reducers ) {
    const len =  Object.keys(_reducers).length
    reducers.forEach( reducer => _reducers[len + 1] = reducer)
  }
  /**
  * @name createStore
  * @description Sets the application data state
  * @param {Object} data Simple Object that contain the State
  */
  function createStore ( initialState, ...reducers ) {
    reducers.forEach( ( reducer, index ) => _reducers[index] = reducer )
    Object.assign(_initialState, initialState)
  }
  /**
   * @name getState
   * @return {Object} a copy of the state
   */  
  function getState() {
    return Object.assign({}, _initialState, _state)
  }
  
  const dutier = {
    createStore,
    combine,
    subscribe,
    getState,
    dispatch
  }
  if (typeof exports === 'object') {
    module.exports = dutier;
  }
  else if (typeof define === 'function' && define.amd) {
    define([], dutier)
  }
  else {
    window.Dutier = dutier;
  }
}())