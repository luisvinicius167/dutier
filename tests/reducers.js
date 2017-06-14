function reducer( state, { type, value } ) {
  if (type === 'INCREMENT') { 
    return { count: state.count + value }
  }
  return state
}

Dutier.combine(reducer)
