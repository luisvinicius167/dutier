<img width="200" src="https://raw.githubusercontent.com/luisvinicius167/dutier/master/img/logo.png"/> 

Dutier is a small (1kb) and simple centralized state management solution for Javascript applications. <br/>

[![npm package](https://img.shields.io/badge/npm-0.0.1-blue.svg)](https://www.npmjs.com/package/dutier)
[![CDN](https://img.shields.io/badge/cdn-0.0.1-ff69b4.svg)](https://unpkg.com/dutier@0.0.1)


### Influences
It evolves on the ideas of [Redux](https://github.com/reactjs/redux).

## Getting Started

### Install
* Yarn: ``` yarn install dutier ```
* CDN: ```https://unpkg.com/dutier@0.0.1```

### Features
 * small 1kb minified
 * simple, small learning curve
 * immutable
 * promise based
 * inspired by Redux
 * tiny API.

### The Gist
The application state is stored in an object tree inside a single store.

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
function increment( { count }, value ) {
  return { type: 'INCREMENT', value }
}

/**
 * Simple Reducer
 * As Redux, your reducer return new state values
 * based on your initial state, but each Dutier reducer receives
 * the initial store state as first argument
 */
function reducer( initialState, { type, value } ) {
  if (type === 'INCREMENT') return { count: initialState.count + value }
  return initialState
}
    
/**
 * You can use subscribe() to update your UI in response to actions.
 * `${this}` can be your UI component, where the handler will be applied
 * when an action is called.
 */
 componentWillMount() {
  subscribe( this, ( { type, state } ) => {
    this.setState({count: state.count})
  })
 }

/**
 * Use dispatch to return new values based on the state
 * tree. dispatch returns a Promise with your action payload. 
 * Your Application state is Immutable.
 */
dispatch(increment( 1 ))
 .then( {type, state} => {
   console.log(`The value is: ${state.count}`) // 2
 })
 
dispatch(increment( 2 )) // 3
dispatch(increment( 3 )) // 4

getState().count // 1
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
dispatch( increment(getState(), 1) )
  .then( { type, value } => {
    console.log(`An action was called, the action type: ${type} and the action value: ${value}.`);
  })
```

Actions
 * Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using dispatch().



Store State
 * Set the initial Application store state
```javascript
/**
 * @name createStore
 * @description Set your initial Application store state
 * @param { Object } state Your application state data
 * @param { Function } Your store reducers
 */
 
import { createStore } from 'dutier'

createStore( { count: 1 }, ...reducers )
```

Getting the initial store state
 * Get a state value from your store
```javascript
/**
 * @name getState
 * @description Get the state value
 */
 
import {getState} from 'dutier'

getState() // returns a copy of your initial store state { count: 1 }
```

Combine
 * Combine your store reducers
```javascript
/**
 * @name combine
 * @param {Function} Your reducers functions
 * Each reducer function receives your initial store state
 * as first argument
 */
 
import { combine } from 'dutier'

function reducer( initialState, { type, value } ) {
  if (type === 'INCREMENT') return { count: initialState.count + value }
  return initialState
}

combine( reducer, [ ...reducers ])
```


Subscribe/Unsubscribe
 * Subscribe to your store to update your UI in response to actions.
 * Unsubscribe when unmounted.
```javascript
/**
 * @name subscribe
 * @description Bind your UI to changes in your store state.
 * @param { Component } BindComponent The UI element that the handler function will be bound to.
 * @param { handler } handler A callback function that will be triggered in response to actions.
 */
 
import {subscribe, unsubscribe, getState} from 'dutier'
  
  componentWillMount(){
     // Subscribe to changes on your store, do something with the value.
     subscribe(this, ( { type, state } ) => {
       this.setState( { count: state.count } )
     })
  }
  
  componentWillUnmount(){
    unsubscribe(this)
  }
```

That's all folks!


#### License
MIT License.
