const unsubscribe = store.subscribe( ( { type, state } ) => {
  console.log(type, state)
})
