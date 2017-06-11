;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof exports === 'object') {
    module.exports = {
      dispatch: factory.dispatch,
      getState: factory.getState,
      setState: factory.setState,
      subscribe: factory.subscribe,
      middleware: factory.middleware,
      unsubscribe: factory.unsubscribe
    }
  } else {
    root.Dux = factory
  }
}(this, function (global) {
  /**
   * @name Dux
   * @description The object that will manage all application state
   */
  let Dux = {
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
      let middleware = Dux._store.middleware
      /**
         * has middleware?
         **/
      if (typeof middleware === 'function') {
        middleware.call(null, action, Object.assign({}, Dux.mockStoreState))
      }

      return action
    }
  }

  function updateComponent (action) {
    Dux._store.components.forEach(el => {
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
      Dux
        ._store
        .components
        .push({component, handler})
    },
    unsubscribe: (component) => {
      let components = Dux._store.components
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
      Dux._store.middleware = callback
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
    setState: (data) => {
      // setting the immutable initial stat return Dux.storee
      Object.assign(Dux._store.state, data)
    },
    /**
     * @name getState
     * @return {Object} a copy of the state
     */
    getState: () => {
      return Object.assign({}, Dux._store.state)
    }
  }
}(this)))