expect = chai.expect

describe('Initial store state', function () {
  describe('#getState() ', function () {
     it.only('should be 1', function () {
       expect(store.getState().count).to.equal(1)
       expect(store.getState().counter).to.equal(1)
     })
  })

  describe('#Sync Action', function () {
     it.only('The state count should be 2', function () {
       store.dispatch( increment(1) ).then(function ({ type, state }) {
         expect(state.count).to.equal(2)
         expect(store.getState().count).to.equal(2)
       })
     })
  })

  describe('#Async action', function () {
     it.only('The counter state should be 2', function () {
       store.dispatch( asyncIncrement(1) )
         .then(function ({type, state}) {
           expect(store.getState().counter).to.equal(2)
           expect(state.counter).to.equal(2)
         })
     })
  })
})