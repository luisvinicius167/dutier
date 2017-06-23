import { Provider } from './providers'
/**
 * @name setReducer
 * @description Set the reducer function, the
 * initial state of the reducer and store state
 */  
export default reducers => {
    reducers.forEach( reducer => {
        const initial = reducer(undefined, { type: '@@DUTIER.INITIAL_STATE' })
        Provider._reducers.set(reducer, { initial } )
        Provider._updateState(initial)
  })
}