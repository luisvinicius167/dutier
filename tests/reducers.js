function reducer( initialState, { type, value } ) {
  if (type === 'INCREMENT') return { count: initialState.count + value }
  return initialState
}

Dutier.combine(reducer)