import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const production = process.env.NODE_ENV === 'production';

export default {
  entry: 'src/index.js',
  dest: `dist/dutier${production ? '.min' : ''}.js`,
  format: 'umd',
  moduleName: 'Dutier',
  sourceMap: true,
  banner: `/**
  * @name dutier
  * @description The immutable, async and universal state management solution for Javascript applications. 
  * @author Luis Vinícius
  * @email luisviniciusbarreto@gmail.com
  */`,
  plugins: [
    babel()
  ]
    .concat(production ? [
      uglify()
    ] : [])
}