export default function dutierDevTools (store) {
  var extension = window.__REDUX_DEVTOOLS_EXTENSION__ || window.top.__REDUX_DEVTOOLS_EXTENSION__
  var ignoreState = false

  if (!extension) {
    console.warn('Please install/enable Redux devtools extension')
    store.devtools = null
    return store
  }

  if (!store.devtools) {
    store.devtools = extension.connect()
    store.devtools.subscribe(function (message) {
      if (message.type === 'DISPATCH' && message.state) {
        ignoreState = (message.payload.type === 'JUMP_TO_ACTION' || message.payload.type === 'JUMP_TO_STATE')
        store.setState(JSON.parse(message.state), true)
      }
    })
    store.devtools.init(store.getState())
    store.subscribe(function (data) {
      var actionName = data.type
      if (!ignoreState) {
        store.devtools.send(actionName, data.state)
      } else {
        ignoreState = false
      }
      
    })
  }

  return store
}
