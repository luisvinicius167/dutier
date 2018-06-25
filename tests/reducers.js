const initialState = { count: 1 }
function reducer( state=initialState, { type, payload } ) {
  console.log('inside reducer', state)
  switch (type) {
    case 'INCREMENT':
      return { count: state.count + payload }
    default:
      return state
  }
}

function reducer2( state = { counter: 1 }, { type, payload } ) {
    switch (type) {
    case 'ASYNC_INCREMENT':
      return { counter: state.counter + payload }
    default:
      return state
  }
}

Dutier.combine(reducer, reducer2)
