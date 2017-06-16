function increment (value) {
  return {
    type: 'INCREMENT',
    value
  }
}

function asyncIncrement (value) {
  return {
    type: 'ASYNC_INCREMENT',
    value
  }
}