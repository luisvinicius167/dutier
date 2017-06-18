import {Provider} from './providers'

/**
 * @name combine
 * @description Combine the reducers
 */  
export default (...reducers) => {
  Provider._reducers.push(...reducers);
}
