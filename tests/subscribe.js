const {subscribe} = Dutier

const unsubscribe = subscribe( ( { type, state }) => {
  console.log('UNSUBSCRIBE', this, state, Dutier.getState())
})
