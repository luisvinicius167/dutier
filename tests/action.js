const add = text => dispatch => dispatch({ text, type: 'ADD_TEXT' })
const increment = value => dispatch => dispatch({value, type: 'INCREMENT'})
const asyncIncrement = value => dispatch => setTimeout( () => dispatch({type: 'ASYNC_INCREMENT', value}), 2000)