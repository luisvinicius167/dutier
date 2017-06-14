const {subscribe} = Dutier

const unsubscribe = subscribe( ( { type, state } ) => {
  console.log('SUBSCRIBE',  type, state)
})
