function reducer( dispatch, state, { type, value } ) {
  switch (type) {
    case 'INCREMENT':
      dispatch({ count: state.count + value })
    default:
      dispatch(state) 
  }
}

function reducer2( dispatch, state, { type, value } ) {
  if (type === 'ASYNC_INCREMENT') {
    setTimeout(_ => dispatch({ count: state.count + value }), 3000)
  }
}

Dutier.combine(reducer, reducer2)
