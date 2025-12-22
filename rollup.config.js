import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';

const banner = `/**
 * Pointy - A lightweight tooltip library with animated pointer
 * @version ${process.env.npm_package_version || '1.0.0'}
 * @license MIT
 */`;

export default [
  // UMD build (for browsers)
  {
    input: 'src/pointy.js',
    output: {
      file: 'dist/pointy.js',
      format: 'umd',
      name: 'Pointy',
      banner,
      exports: 'default'
    },
    plugins: [
      resolve(),
      copy({
        targets: [
          { src: 'src/pointy.d.ts', dest: 'dist' },
          { src: 'dist/pointy.js', dest: 'docs' }
        ],
        hook: 'writeBundle'
      })
    ]
  },
  // UMD minified build
  {
    input: 'src/pointy.js',
    output: {
      file: 'dist/pointy.min.js',
      format: 'umd',
      name: 'Pointy',
      banner,
      exports: 'default',
      sourcemap: true
    },
    plugins: [
      resolve(),
      terser({
        format: {
          comments: /^!/
        }
      })
    ]
  },
  // ES Module build
  {
    input: 'src/pointy.js',
    output: {
      file: 'dist/pointy.esm.js',
      format: 'es',
      banner,
      exports: 'named'
    },
    plugins: [resolve()]
  }
];
