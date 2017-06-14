<img width="200" src="https://raw.githubusercontent.com/luisvinicius167/dutier/master/img/logo.png"/> 

Dutier is a small (1kb) and simple state management solution for Javascript applications. <br/>

[![npm package](https://img.shields.io/badge/npm-0.2.0-blue.svg)](https://www.npmjs.com/package/dutier)
[![CDN](https://img.shields.io/badge/cdn-0.2.0-ff69b4.svg)](https://unpkg.com/dutier@0.2.0)


### Influences
It evolves on the ideas of [Redux](https://github.com/reactjs/redux).

## Getting Started

### Install
* Yarn: ``` yarn install dutier ```
* CDN: ```https://unpkg.com/dutier@0.2.0```

### Features
 * small 1kb minified
 * simple, small learning curve
 * no dependencies
 * promise based
 * inspired by Redux
 * tiny API.
 
 ### React Example:
[![React with Dutier](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/1AyKXMpG)

With `dutier` your `Actions` are pure functions that just returns a payload information about how to work with the state, and the `dispatch` method always return new values based on your initial state without change them.

```javascript
import { createStore, getState, dispatch } from 'dutier'

// sets your initial application state
createStore({ count: 1 }, reducer)

// your action
function increment( value ) {
  return { type: 'INCREMENT', value }
}

// your reducer function
function reducer( state, { type, value } ) {
  switch (type) {
    case 'INCREMENT':
      return Object.assign({}, state, { count: initialState.count + value })
    default:
      return initialState  
  }
}
 
 // dispatch actions to change the state
dispatch( increment(1) )
  .then( ({ type, state }) => console.log( state, getState() )) // { count: 2 },{ count: 2 }
 
```


### The Gist
The application state is stored in an object tree inside a single store. Your actions will only dispatch information about how work with the state and then return new state values based on your state.

That's it!

```javascript
import { createStore, subscribe, dispatch, getState } from 'dutier'

/**
 * Set the initial store state in a single object.
 */
createStore( { count: 1 } )

/**
 * Actions are pure functions that return a payload
 */
function increment( value ) {
  return { type: 'INCREMENT', value }
}

/**
 * Simple Reducer
 * As Redux, the only way to change the state tree is to emit an action, an 
 * object describing what happened.
 */
function reducer( state, { type, value } ) {
  switch (type) {
    case 'INCREMENT':
      return { count: value }
    default:
      return state  
  }
}
    
/**
 * You can use subscribe() to update your UI in response to actions
 */
 componentWillMount() {
  this.unsubscribe = subscribe( { type, state } ) => {
    console.log('Reducer new state value ', state, 'Store state: ', getState())
  })
 }


/**
 * Use dispatch to return new values based on the state
 * tree. dispatch returns a Promise with your action type and
 * the actual state
 */
dispatch(increment( 1 ))
 .then( ({ type, state }) => {
   console.log(`The value is: ${getState().count}`) // 2
 })
 
dispatch(increment( 1 )) // 3
dispatch(increment( 1 )) // 4

getState().count // 4
```

### Simple and efficient API.

Dispatch
 * Trigger an action to do something with the state. A Promise will be returned, <br> that contains your action payload

```javascript
/**
 * @name dispatch
 * @description Trigger some action.
 * @param { Function } The function that return your action payload
 * @return {Promise} Return a Promise with the action payload
 */

// On your component
import {dispatch} from 'dutier'

// You can receive the response of your action and do something, or not.
// If you want, you can chain the dispatch Promises.
dispatch( increment(1) )
  .then( ({ type, state }) => {
    console.log(type, state)
  })
```

Actions
 * Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using dispatch().
 
```javascript
function increment( value ) {
  return { type: 'INCREMENT', value }
}
```


Store State
 * Set the initial Application store state. 
```javascript
/**
 * @name createStore
 * @description Set your initial Application store state
 * @param { Object } state Your application state data
 * @param { Function } reducers Your store reducers
 */
 
import { createStore } from 'dutier'

createStore( { count: 1 [, ...reducers] )
```

Getting the store state
 * Get a state value from your store
```javascript
/**
 * @name getState
 * @description Get the state value
 */
 
import {getState} from 'dutier'

getState() // returns a copy of your store state { count: 1 }
```

Combine
 * Combine your store reducers
```javascript
/**
 * @name combine
 * @param {Function} Your reducers functions
 * Each reducer function receives your actual store state
 * as first argument
 */
 
import { combine } from 'dutier'

function reducer( state, { type, value } ) {
  switch (type) {
    case 'INCREMENT':
      return Object.assign( {}, state, { count: state.count + value })
    default:
      return state  
  }
}

combine( reducer [, ...reducers ])
```


Subscribe
 * Subscribe to your store to update your UI in response to actions.
 * Unsubscribe when unmounted.
```javascript
/**
 * @name subscribe
 * @description Bind your UI to changes in your store state.
 * @param { Component } BindComponent The UI element that the handler function will be bound to.
 * @param { handler } handler A callback function that will be triggered in response to actions.
 */
 
import {subscribe, getState} from 'dutier'
  
  componentWillMount(){
     // Subscribe to changes on your store, do something with the value.
     this.unsubscribe = subscribe(( { type, state } ) => {
       this.setState( { count: getState().count } )
     })
  }
  
  componentWillUnmount() {
    this.unsubscribe()
  }
```

That's all folks!


#### License
MIT License.
