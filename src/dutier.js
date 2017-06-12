;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof exports === 'object') {
    module.exports = {
      dispatch: factory.dispatch,
      getState: factory.getState,
      createStore: factory.createStore,
      subscribe: factory.subscribe,
      middleware: factory.middleware,
      unsubscribe: factory.unsubscribe
    }
  } else {
    root.Dutier = factory
  }
}(this, function (global) {
  /**
   * @name Dutier
   * @description The object that will manage all application state
   */
  let Dutier = {
    /**
     * @name _store
     * @description The private store
     */
    _store: {
      /**
       * @name state
       * @description The Store application state
       */
      state: {},
      /**
       * @name state
       * @description The Components that was subscribed
       */
      components: [],
      /**
       * @name reducer
       * @description The reducer function
       */ 
      reducer: {}
    }
  }
  
  // Apply the reducers function
  function applyReducer ( action ) {
    let ret=null
    const reducers = Dutier._store.reducer
    const state = Object.assign({}, Dutier._store.state)
    Object.keys(reducers)
      .forEach( reducer => {
        const value = reducers[reducer].call(null, state, action)
        if ( value !== state) { return ret = value }
        ret = value; 
      })
      
    return Object.assign({}, { type: action.type } , { state: Object.assign({}, state, ret) } )
  }
  
  // update the component
  function updateComponent (action) {
    Dutier._store.components.forEach(el => {
      if (el.component !== undefined && typeof el.handler === 'function') {
        el.handler(action)
      }
    })
    return action
  }
  return {
    /**
     * @name subscribe
     * @description Subscribe to call the handler function when the action will be triggered
     * @param {Component} component The Component
     * @param {Function} handler The function that will be called
     **/
    subscribe: (component, handler) => {
      Dutier
        ._store
        .components
        .push({component, handler})
    },
    /**
     * @name unsubscribe
     * @description Unsubscribes from listening to a component
     * @param {Component} component The Component
     **/
    unsubscribe: (component) => {
      let components = Dutier._store.components
      components.forEach((el, index) => {
        if (el === component) {
          components.splice(index, 1)
        }
      })
    },
    /**
     * @name middleware
     * @description The middleware function that will be triggered
     * every time when an action called.
     * @param {Function} callback A function that will be called
     **/
    middleware: callback => {
      Dutier._store.middleware = callback
    },
    /**
     * @name dispatch
     * @description Dispatch an action to change
     * the store state
     * @param { string } action The action name
     */
    dispatch: (action) => {
      return Promise
        .resolve(action)
        .then(applyReducer)
        .then(updateComponent)
    },
    /**
     * @name createStore
     * @description Sets the application data state
     * @param {object} data Simple Object that contain the State
     */
    createStore: ( state, ...reducers ) => {
      // register reducers
      reducers.forEach( (reducer, i ) => Dutier._store.reducer[ i ] = reducer);
      // setting the immutable initial state return Dutier.store
      Object.assign(Dutier._store.state, state)
    },
    /**
     * @name combine
     * @description Combine the reducers
     */
    combine: ( ...reducers ) => {
      const len =  Object.keys(Dutier._store.reducer).length
      reducers.forEach( reducer => Dutier._store.reducer[len + 1] = reducer)
    },
    /**
     * @name getState
     * @return {Object} a copy of the state
     */
    getState: () => {
      return Object.assign({}, Dutier._store.state)
    }
  }
}(this)))
