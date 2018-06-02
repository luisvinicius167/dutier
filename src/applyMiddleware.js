import { Provider } from './providers'

export default data => {
  Provider._middlewares.forEach( middleware => middleware.call(null, data) )
  return Promise.resolve({ ...data.action, state: data.state });
}