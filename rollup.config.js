import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import html from '@web/rollup-plugin-html';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import { terser } from 'rollup-plugin-terser';
import { generateSW } from 'rollup-plugin-workbox';
import path from 'path';

export default {
  input: 'index.html',
  output: {
    entryFileNames: '[hash].js',
    chunkFileNames: '[hash].js',
    assetFileNames: '[hash][extname]',
    format: 'es',
    dir: 'dist',
  },
  preserveEntrySignatures: false,

  plugins: [
    /** Enable using HTML as rollup entrypoint */
    html({
      minify: true,
      injectServiceWorker: true,
      serviceWorkerPath: 'dist/sw.js',
    }),
    /** Resolve bare module imports */
    nodeResolve(),
    /** Minify JS */
    terser(),
    /** Bundle assets references via import.meta.url */
    importMetaAssets(),
    /** Compile JS to a lower language target */
    babel({
      babelHelpers: 'bundled',
      presets: [
        [
          require.resolve('@babel/preset-env'),
          {
            targets: [
              'last 3 Chrome major versions',
              'last 3 Firefox major versions',
              'last 3 Edge major versions',
              'last 3 Safari major versions',
            ],
            modules: false,
            bugfixes: true,
          },
        ],
      ],
      plugins: [
        [
          require.resolve('babel-plugin-template-html-minifier'),
          {
            modules: { lit: ['html', { name: 'css', encapsulation: 'style' }] },
            failOnError: false,
            strictCSS: true,
            htmlMinifier: {
              collapseWhitespace: true,
              conservativeCollapse: true,
              removeComments: true,
              caseSensitive: true,
              minifyCSS: true,
            },
          },
        ],
      ],
    }),
    /** Create and inject a service worker */
    generateSW({
      navigateFallback: '/index.html',
      // where to output the generated sw
      swDest: path.join('dist', 'sw.js'),
      // directory to match patterns against to be precached
      globDirectory: path.join('dist'),
      // cache any html js and css by default
      globPatterns: ['**/*.{html,js,css,webmanifest}'],
      skipWaiting: true,
      clientsClaim: true,
    }),
  ],
};

// import merge from 'deepmerge';
// // use createSpaConfig for bundling a Single Page App
// import { createSpaConfig } from '@open-wc/building-rollup';
// // use createBasicConfig to do regular JS to JS bundling
// // import { createBasicConfig } from '@open-wc/building-rollup';
// import copy from 'rollup-plugin-copy';

// const { injectManifest } = require('rollup-plugin-workbox');
// const workboxConfig = require('./workbox-config.js');

// const baseConfig = createSpaConfig({
//   outputDir: 'dist',
//   developmentMode: process.env.ROLLUP_WATCH === 'true',
// });

// export default merge(baseConfig, {
//   input: './index.html',
//   output: {
//     sourcemap: false,
//     entryFileNames: '[name].js',
//     chunkFileNames: '[name].js'
//   },
//   plugins: [
//     injectManifest(workboxConfig),
//     copy({
//       targets: [
//         { src: 'src/assets/**/*/*', dest: './dist' },
//         { src: 'src/manifest.json', dest: './dist' },
//         { src: 'src/plugins/**/*', dest: './dist' },
//       ],
//       flatten: false,
//     })
//   ]
// });
