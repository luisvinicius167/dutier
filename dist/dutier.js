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

var Provider = {
  _reducers: {},
  _handlers: [],
  _updateState: function _updateState() {}
};

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
 * @name createStore
 * @description Sets the application data state
 * @param {Object} data Simple Object that contain the State
 */
var createStore = (function (state) {
  for (var _len = arguments.length, reducers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    reducers[_key - 1] = arguments[_key];
  }

  reducers.forEach(function (reducer, index) {
    return Provider._reducers[index] = reducer;
  });
  Provider._updateState = create(state);
});

var applyReducer = (function (action) {
  var currentState = Provider._updateState({});
  Object.keys(Provider._reducers).forEach(function (reducer) {
    var value = Provider._reducers[reducer].call(null, currentState, action);
    if (JSON.stringify(value) !== JSON.stringify(currentState)) {
      return Provider._updateState(value);
    }
  });
  return { type: action.type, state: Provider._updateState({}) };
});

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
   return Promise.resolve(payload).then(applyReducer).then(applyHandler);
});

/**
 * @name getState
 * @return {Object} a copy of the state
 */
var getState = (function () {
  return Provider._updateState({});
});

/**
 * @name combine
 * @description Combine the reducers
 */
var combine = (function () {
  for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
    reducers[_key] = arguments[_key];
  }

  var len = Object.keys(Provider._reducers).length;
  reducers.forEach(function (reducer) {
    Provider._reducers[len + 1] = reducer;len++;
  });
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

exports.createStore = createStore;
exports.dispatch = dispatch;
exports.getState = getState;
exports.combine = combine;
exports.subscribe = subscribe;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=dutier.js.map
