function increment (value) {
  return ( dispatch ) => {
    dispatch({
      type: 'INCREMENT',
      value
    })
  }
}

function asyncIncrement (value) {
  return dispatch => {
    setTimeout( () => {
      dispatch({
        type: 'ASYNC_INCREMENT',
        value
      })
    }, 2000)
  }
}