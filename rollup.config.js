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
  * @description A small (2kb) and simple state management solution for Javascript applications.
  * @author Luis Vinícius
  * @email luis@uilabs.me
  */`,
  plugins: [
    babel()
  ]
    .concat(production ? [
      uglify()
    ] : [])
}