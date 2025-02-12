import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default [
  // browser-friendly UMD build
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: './src/ngraminator.js',
    output: [
      { name: 'ngrm', file: './dist/ngraminator.umd.js', format: 'umd', exports: 'named' },
      { file: './dist/ngraminator.cjs.js', format: 'cjs' },
      { file: './dist/ngraminator.esm.mjs', format: 'es' }
    ],
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs() // so Rollup can convert `ms` to an ES module
    ]
  },
  // Minified versions
  {
    input: './src/ngraminator.js',
    output: [
      { name: 'ngrm', file: './dist/ngraminator.umd.min.js', format: 'umd', exports: 'named' },
      { file: './dist/ngraminator.cjs.min.js', format: 'cjs' },
      { file: './dist/ngraminator.esm.min.mjs', format: 'es' }
    ],
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      terser() // Minify
    ]
  }
]
