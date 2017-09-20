const initialState = { count: 1 }
function reducer( state=initialState, { type, value } ) {
  switch (type) {
    case 'INCREMENT':
      return { count: state.count + value }
    default:
      return state
  }
}

function reducer2( state = { counter: 1 }, { type, value } ) {
    switch (type) {
    case 'ASYNC_INCREMENT':
      return { counter: state.counter + value }
    default:
      return state
  }
}

Dutier.combine(reducer, reducer2)
