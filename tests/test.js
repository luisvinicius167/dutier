expect = chai.expect
const { combine, getState, dispatch } = Dutier

describe('Initial store state', function () {
  describe('#getState().count ', function () {
    it.only('should be 1', function () {
      expect(getState().count).to.equal(1)
    })
  })

  describe('#IncrementCount', function () {
    it.only('The state count should be 2', function () {
      dispatch(increment(1)).then(function ({ type, state }) {
        expect(state.count).to.equal(2)
      })
    })
  })

  describe('#INCREMENT and check the state', function () {
    it.only('The state should be 2 and the initial state should be 1', function () {
      dispatch(increment(1))
        .then(function ({type, state}) {
          expect(state.count).to.equal(2)
          expect(getState().count).to.equal(1)
        })
    })
  })
})
