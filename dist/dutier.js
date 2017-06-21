/**
  * @name dutier
  * @description A small (1kb) and simple state management solution for Javascript applications.
  * @author Luis Vinícius
  * @email luis@uilabs.me
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Dutier = global.Dutier || {})));
}(this, (function (exports) { 'use strict';

/**
 * The Providers
 */
var Provider = {
  _reducers: [],
  _handlers: [],
  _updateState: function _updateState() {}
};

/**
 * Creates a Dutier store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 * @param { Object } state The initial application state
 * @return {Function} currentState Return a function that
 * updates and returns the current state
 */
var create = (function (state) {
  return function (state) {
    var state = Object.assign({}, state);
    return function (current) {
      state = Object.assign({}, state, current);
      return state;
    };
  }(state);
});

/**
 * Async Reducer
 * Just dispatch if return new state values.
 * With this, the subscribe function will not be
 * called unnecessary, because the state don't be changed
 */
var asyncReducer = (function (action) {
  return new Promise(function (resolve, reject) {
    Provider._reducers.forEach(function (reducer) {
      var asyncReducer = new Promise(function (resolve) {
        return reducer.call(null, resolve, Provider._updateState({}), action);
      });
      asyncReducer.then(function (state) {
        if (JSON.stringify(state) !== JSON.stringify(Provider._updateState({}))) {
          resolve({ type: action.type, state: Provider._updateState(state) });
        }
      });
    });
  });
});

/**
 * Apply the subscribe handler functions
 */
var applyHandler = (function (_ref) {
  var type = _ref.type,
      state = _ref.state;

  Provider._handlers.forEach(function (handler) {
    if (handler !== undefined && typeof handler === 'function') {
      handler({ type: type, state: state });
    }
  });
  return { type: type, state: state };
});

/**
   * @name dispatch
   * @description Dispatch an action to change
   * the store state
   * @param { Object } payload The action payload
   */
var dispatch = (function (payload) {
   return Promise.resolve(payload).then(asyncReducer).then(applyHandler);
});

/**
 * @name getState
 * @return {Object} a copy of the state
 */
var getState = (function () {
  return Provider._updateState({});
});

/**
 * @name unsubscribe
 * @description Unsubscribes from listening to a component
 * @param {Function} handler The handler function
 **/
var unsubscribe = (function (handler) {
  Provider._handlers.forEach(function (fn, index) {
    if (fn === handler) {
      Provider._handlers.splice(index, 1);
    }
  });
});

/**
 * Subscribe to receive notifications when state is updated.
 * @name subscribe
 * @description Subscribe to call the handler function when the action will be triggered
 * @param {Function} handler The function that will be called
 **/
var subscribe = (function (handler) {
  Provider._handlers.push(handler);
  return function () {
    unsubscribe(handler);
  };
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @name createStore
 * @description Sets the store state
 * @param {Object} data Simple Object that contain the State
 * @param {Function} reducers The action reducers
 */
var createStore = (function (state) {
  for (var _len = arguments.length, reducers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    reducers[_key - 1] = arguments[_key];
  }

  Provider._reducers = [].concat(reducers);
  if (_typeof(Provider._updateState({})) === 'object') {
    throw new Error('You just can create one store inside your application.');
  }
  Provider._updateState = create(state);
  return { dispatch: dispatch, subscribe: subscribe, getState: getState };
});

/**
 * @name combine
 * @description Combine the reducers
 */
var combine = (function () {
  var _Provider$_reducers;

  (_Provider$_reducers = Provider._reducers).push.apply(_Provider$_reducers, arguments);
});

exports.createStore = createStore;
exports.combine = combine;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=dutier.js.map
