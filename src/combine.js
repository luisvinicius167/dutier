import setReducer from './setReducer'

/**
 * @name combine
 * @description Combine the reducers
 */  
export default (...reducers) => { 
  setReducer(reducers)
}
