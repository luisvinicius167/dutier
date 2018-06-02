/**
  * @name dutier
  * @description The immutable, async and universal state management solution for Javascript applications. 
  * @author Luis Vinícius
  * @email luisviniciusbarreto@gmail.com
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
  _reducers: [],
  // The subscribe handlers
  _handlers: [],
  // the middlewares
  _middlewares: [],
  // The state manager
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
    return function (current) {
      state = Object.assign({}, state, current);
      return JSON.parse(JSON.stringify(state));
    };
  }(state);
});

/**
 * @name setReducer
 * @description Set the reducer function, the
 * initial state of the reducer and store state
 */
var setReducer = (function (reducers) {
  // if createStore don't was called yet
  if (Provider._updateState({}) === undefined) {
    Provider._updateState = create({});
  }
  reducers.forEach(function (reducer) {
    var initial = reducer(undefined, { type: '@@DUTIER.INITIAL_STATE' });
    var index = Provider._reducers.length;
    Provider._reducers[index] = { reducer: reducer, initial: initial };
    Provider._updateState(initial);
  });
});

/**
 * Async Reducer
 * Just dispatch if return new state payloads.
 * With this, the subscribe function will not be
 * called unnecessary, because the state don't be changed
 */
var asyncReducer = (function (action) {
  return new Promise(function (resolve) {
    Provider._reducers.forEach(function (_ref) {
      var reducer = _ref.reducer,
          initial = _ref.initial;

      var stateReducer = reducer.current ? reducer.current : initial;
      var current = reducer.current = reducer(stateReducer, action, Provider._updateState({}));
      var reducerOldState = reducer(stateReducer, { type: '@@Dutier.OLD_STATE', payload: action.payload });
      var oldState = Object.assign({}, Provider._updateState({}), reducerOldState);
      if (JSON.stringify(current) !== JSON.stringify(stateReducer)) {
        return resolve({ action: action, oldState: oldState, state: Provider._updateState(current) });
      }
    });
  });
});

/**
 * Apply the subscribe handler functions
 */
var applyHandler = (function (_ref) {
  var type = _ref.type,
      state = _ref.state,
      payload = _ref.payload;

  Provider._handlers.forEach(function (handler) {
    if (handler !== undefined && typeof handler === 'function') {
      handler({ type: type, state: state, payload: payload });
    }
  });
  return { type: type, state: state, payload: payload };
});

var applyMiddleware = (function (data) {
  Provider._middlewares.forEach(function (middleware) {
    return middleware.call(null, data);
  });
  return Promise.resolve({ type: data.action.type, payload: data.action.payload, state: data.state });
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
  }).then(asyncReducer).then(applyMiddleware).then(applyHandler);
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

  if (Provider._updateState({}) === undefined) {
    Provider._updateState = create({});
  }
  setReducer(reducers);
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

var middleware = (function () {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  Provider._middlewares = Provider._middlewares.concat(middlewares);
});

exports.applyMiddleware = middleware;
exports.createStore = createStore;
exports.combine = combine;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=dutier.js.map
