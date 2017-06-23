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
  // The reducers
  _reducers: new Map(),
  // The subscribe handlers
  _handlers: [],
  // The state manager
  _updateState: function _updateState() {}
};

/**
 * @name setReducer
 * @description Set the reducer function, the
 * initial state of the reducer and store state
 */
var setReducer = (function (reducers) {
  reducers.forEach(function (reducer) {
    var initial = reducer(undefined, { type: '@@DUTIER.INITIAL_STATE' });
    Provider._reducers.set(reducer, { initial: initial });
    Provider._updateState(initial);
  });
});

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
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Provider._reducers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var reducer = _step.value;

        var reducerFunction = reducer[0];
        var reducerProps = reducer[1];
        var stateReducer = reducerProps.current ? reducerProps.current : reducerProps.initial;
        var current = reducerProps.current = reducerFunction(stateReducer, action);
        if (JSON.stringify(current) !== JSON.stringify(stateReducer)) {
          return resolve({ type: action.type, state: Provider._updateState(current) });
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
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
  return new Promise(function (resolve) {
    return payload.call(null, resolve);
  }).then(asyncReducer).then(applyHandler);
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
var createStore = (function () {
  for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
    reducers[_key] = arguments[_key];
  }

  setReducer(reducers);
  if (_typeof(Provider._updateState({})) === 'object') {
    throw new Error('You just can create one store inside your application.');
  }

  Provider._updateState = create({});
  return { dispatch: dispatch, subscribe: subscribe, getState: getState };
});

/**
 * @name combine
 * @description Combine the reducers
 */
var combine = (function () {
  for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
    reducers[_key] = arguments[_key];
  }

  setReducer(reducers);
});

exports.createStore = createStore;
exports.combine = combine;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=dutier.js.map
