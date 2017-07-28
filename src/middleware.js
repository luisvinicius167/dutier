import { Provider } from './providers'

export default (...middlewares) => {
  Provider._middlewares = Provider._middlewares.concat(middlewares)
} 