import { Provider } from './providers'

export default data => {
  Provider._middlewares.forEach( middleware => middleware.call(null, data) )
  return Promise.resolve({ type: data.action.type, payload: data.action.payload, state: data.state });
}