function reducer( state, { type, value } ) {
  if (type === 'INCREMENT') { 
    return { count: state.count + value }
  }
  return state
}

function reducer2( state, { type, value } ) {
  if (type === 'INCREMEN') {
    return { count: state.count - value }
  }
  return state
}

Dutier.combine(reducer, reducer2)
