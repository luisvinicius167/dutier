var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function () {
  /**
   * @name _state
   * @description The actual store application state
   */
  var _state = {};
  /**
  * @name _initialState
  * @description The initial store application state
  */
  var _initialState = {};
  /**
  * @name _handlers
  * @description The subscribe handlers function
  */
  var _handlers = [];
  /**
  * @name _reducers
  * @description The action reducers
  */
  var _reducers = {};

  // apply the correspondent action reducer
  function applyReducer(action) {
    var initialState = Object.assign({}, _initialState);
    var actualState = Object.assign(initialState, _state);
    Object.keys(_reducers).forEach(function (reducer) {
      var value = _reducers[reducer].call(null, actualState, action);
      if (JSON.stringify(value) !== JSON.stringify(actualState)) {
        return Object.assign(_state, initialState, value);
      }
    });
    return Object.assign({}, { type: action.type }, { state: Object.assign({}, _state) });
  }
  // apply all subscribe handlers
  function applyHandler(_ref) {
    var type = _ref.type;

    var state = Object.assign({}, _state);
    _handlers.forEach(function (handler) {
      if (handler !== undefined && typeof handler === 'function') {
        handler({ type: type, state: state });
      }
    });
    return { type: type, state: state };
  }
  /**
   * @name subscribe
   * @description Subscribe to call the handler function when the action will be triggered
   * @param {Function} handler The function that will be called
   **/
  function subscribe(handler) {
    _handlers.push(handler);
    return function () {
      unsubscribe(handler);
    };
  }
  /**
   * @name unsubscribe
   * @description Unsubscribes from listening to a component
   * @param {Function} handler The handler function
   **/
  function unsubscribe(handler) {
    _handlers.forEach(function (fn, index) {
      if (fn === handler) {
        _handlers.splice(index, 1);
      }
    });
  }
  /**
   * @name dispatch
   * @description Dispatch an action to change
   * the store state
   * @param { Object } payload The action payload
   */
  function dispatch(payload) {
    return Promise.resolve(payload).then(applyReducer).then(applyHandler);
  }
  /**
   * @name combine
   * @description Combine the reducers
   */
  function combine() {
    var len = Object.keys(_reducers).length;

    for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
      reducers[_key] = arguments[_key];
    }

    reducers.forEach(function (reducer) {
      return _reducers[len + 1] = reducer;
    });
  }
  /**
  * @name createStore
  * @description Sets the application data state
  * @param {Object} data Simple Object that contain the State
  */
  function createStore(initialState) {
    for (var _len2 = arguments.length, reducers = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      reducers[_key2 - 1] = arguments[_key2];
    }

    reducers.forEach(function (reducer, index) {
      return _reducers[index] = reducer;
    });
    Object.assign(_initialState, initialState);
  }
  /**
   * @name getState
   * @return {Object} a copy of the state
   */
  function getState() {
    return Object.assign({}, _initialState, _state);
  }

  var dutier = {
    createStore: createStore,
    combine: combine,
    subscribe: subscribe,
    getState: getState,
    dispatch: dispatch
  };
  if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = dutier;
  } else if (typeof define === 'function' && define.amd) {
    define([], dutier);
  } else {
    window.Dutier = dutier;
  }
})();
//# sourceMappingURL=dutier.js.map
