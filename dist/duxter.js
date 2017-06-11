var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = {
      dispatch: factory.dispatch,
      getState: factory.getState,
      setState: factory.setState,
      subscribe: factory.subscribe,
      middleware: factory.middleware,
      unsubscribe: factory.unsubscribe
    };
  } else {
    root.Duxter = factory;
  }
})(this, function (global) {
  /**
   * @name Duxter
   * @description The object that will manage all application state
   */
  var Duxter = {
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
      var middleware = Duxter._store.middleware;
      /**
         * has middleware?
         **/
      if (typeof middleware === 'function') {
        middleware.call(null, action, Object.assign({}, Duxter.mockStoreState));
      }

      return action;
    };
  }

  function updateComponent(action) {
    Duxter._store.components.forEach(function (el) {
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
      Duxter._store.components.push({ component: component, handler: handler });
    },
    unsubscribe: function unsubscribe(component) {
      var components = Duxter._store.components;
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
      Duxter._store.middleware = callback;
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
    setState: function setState(data) {
      // setting the immutable initial stat return Duxter.storee
      Object.assign(Duxter._store.state, data);
    },
    /**
     * @name getState
     * @return {Object} a copy of the state
     */
    getState: function getState() {
      return Object.assign({}, Duxter._store.state);
    }
  };
}(this));
//# sourceMappingURL=duxter.js.map
