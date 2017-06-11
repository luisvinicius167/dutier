expect = chai.expect

function increment (value) {
  return {
    type: 'increment',
    value: Dux.getState().count + value
  }
}

describe('StoreState', function () {
  describe('#getState(count)', function () {
    it.only('should be 1', function () {
      expect(Dux.getState().count).to.equal(1)
    })
  })

  describe('#IncrementCount', function () {
    it.only('The state count should be 2', function () {
      Dux.dispatch(increment(1)).then(function ({value}) {
        expect(value).to.equal(2)
      })
    })
  })

  describe('#IncrementCountInParalel', function () {
    it.only('Verify the result of the action', function () {
      Dux.dispatch(increment(2))
        .then(function ({type, value}) {
          expect(value).to.equal(3)
        })
      Dux.dispatch(increment(3))
        .then(function ({type, value}) {
          expect(value).to.equal(4)
        })
    })

    it.only('Verify the value of count', function () {
      expect(Dux.getState().count).to.equal(1)
    })
  })
})
