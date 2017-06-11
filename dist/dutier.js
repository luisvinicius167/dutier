var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = {
      dispatch: factory.dispatch,
      getState: factory.getState,
      createStore: factory.createStore,
      subscribe: factory.subscribe,
      middleware: factory.middleware,
      unsubscribe: factory.unsubscribe
    };
  } else {
    root.Dutier = factory;
  }
})(this, function (global) {
  /**
   * @name Dutier
   * @description The object that will manage all application state
   */
  var Dutier = {
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
  };

  function applyMiddleware(action) {
    return function (value) {
      var middleware = Dutier._store.middleware;
      /**
         * has middleware?
         **/
      if (typeof middleware === 'function') {
        middleware.call(null, action, Object.assign({}, Dutier.mockStoreState));
      }

      return action;
    };
  }

  function updateComponent(action) {
    Dutier._store.components.forEach(function (el) {
      if (el.component !== undefined && typeof el.handler === 'function') {
        el.handler(action);
      }
    });
    return action;
  }
  return {
    /**
     * @name subscribe
     * @description Subscribe to call the handler function when the action will be triggered
     * @param {Component} component The Component
     * @param {Function} handler The function that will be called
     **/
    subscribe: function subscribe(component, handler) {
      Dutier._store.components.push({ component: component, handler: handler });
    },
    unsubscribe: function unsubscribe(component) {
      var components = Dutier._store.components;
      components.forEach(function (el, index) {
        if (el === component) {
          components.splice(index, 1);
        }
      });
    },
    /**
     * @name middleware
     * @description The middleware function that will be triggered
     * every time when an action called.
     * @param {Function} callback A function that will be called
     **/
    middleware: function middleware(callback) {
      Dutier._store.middleware = callback;
    },
    /**
     * @name dispatch
     * @description Dispatch an action to change
     * the store state
     * @param { string } action The action name
     * @param { any } args Arguments sended to the action
     */
    dispatch: function dispatch(action) {
      return Promise.resolve(action).then(applyMiddleware(action)).then(updateComponent);
    },
    /**
     * @name setState
     * @description Sets the application data state
     * @param {object} data Simple Object that contain the State
     */
    createStore: function createStore(state) {
      // setting the immutable initial state return Dutier.store
      Object.assign(Dutier._store.state, state);
    },
    /**
     * @name getState
     * @return {Object} a copy of the state
     */
    getState: function getState() {
      return Object.assign({}, Dutier._store.state);
    }
  };
}(this));
//# sourceMappingURL=dutier.js.map
