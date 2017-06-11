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
      middleware: {}
    }
  }

  function applyMiddleware (action) {
    return value => {
      let middleware = Dutier._store.middleware
      /**
         * has middleware?
         **/
      if (typeof middleware === 'function') {
        middleware.call(null, action, Object.assign({}, Dutier.mockStoreState))
      }

      return action
    }
  }

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
     * @param { any } args Arguments sended to the action
     */
    dispatch: (action) => {
      return Promise
        .resolve(action)
        .then(applyMiddleware(action))
        .then(updateComponent)
    },
    /**
     * @name setState
     * @description Sets the application data state
     * @param {object} data Simple Object that contain the State
     */
    createStore: (state) => {
      // setting the immutable initial state return Dutier.store
      Object.assign(Dutier._store.state, state)
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