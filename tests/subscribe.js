// const unsubscribe = store.subscribe( ( { type, state } ) => {
//   console.log(type, state)
// })

const logger = ({ action, oldState, state }) => {
  console.log('Action.Type: ', action.type)
  console.log('OldState: ', oldState)
  console.log('State: ', state)
}

Dutier.applyMiddleware(logger)
