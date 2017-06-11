<img width="200" src="https://raw.githubusercontent.com/luisvinicius167/duxter/master/img/duxter-logo.png"/> 

duxter is a small 1kb and simple centralized state management for Javascript applications. <br/>

[![npm package](https://img.shields.io/badge/npm-0.0.1-blue.svg)](https://www.npmjs.com/package/duxter)
[![CDN](https://img.shields.io/badge/cdn-0.0.1-ff69b4.svg)](https://unpkg.com/duxter@0.0.1)


### Influences
Dux provides more control of your application state. It's envolve ideas of ReDuxter and Flux, but explores all power of Promises, doing the work with async action easy.

## Getting Started

### Install
* Npm: ``` npm install duxter ```
* Bower: ``` bower install duxter ```
* CDN: ```https://unpkg.com/duxter@0.0.1```

### Features
 * small 1kb minified & gzipped
 * simple, small learning curve
 * immutable
 * promise based
 * inspired on ReDuxter
 * tiny API.

### The Gist
The application state is stored in an object tree inside a single store.
You can receive the result of your action using ``.then`` after your ``dispatch`` call.

That's it!

```javascript
import { setState, subscribe, dispatch, getState } from 'duxter';

/**
 * Set your store state in a single object.
 */
setState({
 count: 1
})

/**
 * Set your store state in a single object,
 * that always receive the store state as first argument.
 */
function increment(value) {
  const { count } = getState()
  return { type: 'INCREMENT', value: count + value }
}

/**
 * You can use subscribe() to update your UI in response to state changes.
 * `${this}` can be your UI component, where the subscribe handler will be applied.
 */
subscribe( this, ( {type, value } ) => {
  console.log(`Some action was called, the action type: ${type} and the action value: ${value}.`);
})

/**
 * The only way to mutate the internal state is to dispatch an action.
 * You can receive the response of your action and do something, or not.
 */
dispatch(increment(1)).then( {type, value} => {
    console.log(`The value is: ${value}`);
})// 2
dispatch(increment(2)); // 3
dispatch(increment(3));// 4

console.log(getState().count) // 1
```

### Simple and efficiently API.

Dispatch
 * Trigger some action for do something. A Promise will be returned, that contain an Object with the <br>
  keys ``action`` and ``value`` of your correspondent action response.
```javascript
/**
 * @name dispatch
 * @description Trigger some action.
 * @param {string} actionName Action name
 * @param { arguments } Arguments You can pass the arguments after the actionName
 * @return {Promise} Return a Promise with an Object that contain the value 
 * of the action and the action name. 
 * {value, action} = data;
 */

// On your component
import {dispatch} from 'duxter';

// You can receive the response of your action and do something, or not.
// If you whant, you can chaining the dispatch Promises.
dispatch(increment(1))
  .then( data => {
  console.log(`Some action was called, the action type: ${type} and the action value: ${value}.`);
  });
```

Actions
 * Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using store.dispatch().



Store State
 * Set the application Store state
```javascript
/**
 * @name setState
 * @description Set you application store state
 * @param {object} state Your application state data
 */
 
import {setState} from 'duxter';

setState({
  count: 1
});
```

Getting the Store State
 * Get a state value of your store
```javascript
/**
 * @name getState
 * @description Get the state value
 */
 
import {getState} from 'duxter';

getState(); // returns a copy of your store state
```

Middleware
 * Set a middleware function, that will be triggered after the action calls.
```javascript
/**
 * @name middleware
 * @description Get the state value
 * @param {Function} callback The function that will be triggered when
 * you use the dispatch method. Receives your payload
 */
 
import { middleware } from 'duxter';

middleware( action  => {
    console.log(action);
})

```


Subscribe/Unsubscribe
 * Subscribe some UI Component for trigger the handler function when some action are trigger. 
 * Unsubscribe when you don't wnat to trigger the handler function.
```javascript
/**
 * @name subscribe
 * @description Subscribe some UI Component for trigger the handler function when some action calls.
 * @param { object } BindComponent The UI element that the handler function will be applied.
 * @param { handler } handler Your function that will be triggered when some state change.
 */
 
import {subscribe, unsubscribe, getState} from 'duxter';
  
  componentWillMount(){
     // when some state change, do something.
     subscribe(this, ({value}) => {
       this.setState({count: value})
     });
  }
  
    componentWillUnmount(){
      // remove this component for observe the changes on the state
      unsubscribe(this)
    }
```

#### License
MIT License.
