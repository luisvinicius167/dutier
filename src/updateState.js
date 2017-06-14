/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 * @param { Object } state The initial application state
 * @return {Function} currentState Return a function that
 * update and return the current state
 */
export default ( state ) => {
  return ( function( state ) {
    var state = Object.assign({}, state)
    return current => {
      state = Object.assign({}, state, current)
      return state
    }
  }(state))
}