const add = text => dispatch => dispatch({ text, type: 'ADD_TEXT' })
const increment = payload => dispatch => dispatch({payload, type: 'INCREMENT'})
const asyncIncrement = payload => dispatch => setTimeout( () => dispatch({type: 'ASYNC_INCREMENT', payload}), 2000)