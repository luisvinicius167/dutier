/**
 * Creates a Dutier store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 * @param { Object } state The initial application state
 * @return {Function} currentState Return a function that
 * updates and returns the current state
 */
export default (state) => {
  return (
    function(state) {
      return current => {
        state = Object.assign({}, state, current)
        return Object.assign({}, state)
      }
    }(state)
  )
}
