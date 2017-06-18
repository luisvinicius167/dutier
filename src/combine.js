import {Provider} from './providers'

/**
 * @name combine
 * @description Combine the reducers
 */  
export default ( ...reducers ) => {
  let len =  Provider._reducers.length
  reducers.forEach( reducer => { Provider._reducers[len + 1] = reducer; len++ })
}