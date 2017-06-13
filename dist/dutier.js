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
      combine: factory.combine
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
       * @description The initial store application state
       */
      state: {},
      /**
       * @name handlers
       * @description The subscribe handlers function
       */
      handlers: [],
      /**
       * @name reducer
       * @description The reducer function
       */
      reducer: {}
    }
    /**
     * @name unsubscribe
     * @description Unsubscribes from listening to a component
     * @param {Component} component The Component
     **/
  };function unsubscribe(handler) {
    var components = Dutier._store.handlers;
    components.forEach(function (fn, index) {
      if (fn === handler) {
        components.splice(index, 1);
      }
    });
  }
  // Apply the reducers function
  function applyReducer(action) {
    var ret = null;
    var reducers = Dutier._store.reducer;
    var state = Object.assign({}, Dutier._store.state);
    Object.keys(reducers).forEach(function (reducer) {
      var value = reducers[reducer].call(null, state, action);
      if (value !== state) {
        return ret = value;
      }
      ret = value;
    });

    return Object.assign({}, { type: action.type }, { state: Object.assign({}, state, ret) });
  }

  // update the component
  function updateComponent(action) {
    Dutier._store.handlers.forEach(function (handler) {
      if (handler !== undefined && typeof handler === 'function') {
        handler(action);
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
    subscribe: function subscribe(handler) {
      Dutier._store.handlers.push(handler);
      return function () {
        unsubscribe(handler);
      };
    },
    /**
     * @name dispatch
     * @description Dispatch an action to change
     * the store state
     * @param { string } action The action name
     */
    dispatch: function dispatch(action) {
      return Promise.resolve(action).then(applyReducer).then(updateComponent);
    },
    /**
     * @name createStore
     * @description Sets the application data state
     * @param {object} data Simple Object that contain the State
     */
    createStore: function createStore(state) {
      for (var _len = arguments.length, reducers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        reducers[_key - 1] = arguments[_key];
      }

      // register reducers
      reducers.forEach(function (reducer, i) {
        return Dutier._store.reducer[i] = reducer;
      });
      // setting the immutable initial state return Dutier.store
      Object.assign(Dutier._store.state, state);
    },
    /**
     * @name combine
     * @description Combine the reducers
     */
    combine: function combine() {
      for (var _len2 = arguments.length, reducers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        reducers[_key2] = arguments[_key2];
      }

      var len = Object.keys(Dutier._store.reducer).length;
      reducers.forEach(function (reducer) {
        return Dutier._store.reducer[len + 1] = reducer;
      });
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
