const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const terser = require('gulp-terser');
const size = require('gulp-size');
const envify = require('envify/custom');
const sourcemaps = require('gulp-sourcemaps');

// Production flag
const isProduction = process.env.NODE_ENV === 'production';

// External dependencies that will be loaded via CDN
const externals = [
  'react',
  'react-dom',
  'react-router-dom',
  '@mui/material',
  '@mui/icons-material',
  '@emotion/react',
  '@emotion/styled'
];

function scripts() {
  return browserify({
    entries: './src/jsx/main.js',
    debug: !isProduction,
    extensions: ['.js', '.jsx'],
    // Mark external dependencies
    external: externals
  })
  .transform(babelify.configure({
    presets: [
      ['@babel/preset-env', {
        targets: '> 0.25%, not dead',
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false
      }],
      '@babel/preset-react'
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', {
        corejs: 3,
        helpers: true,
        regenerator: true
      }]
    ],
    compact: true,
    comments: false
  }))
  .transform(envify({
    NODE_ENV: isProduction ? 'production' : 'development'
  }))
  .bundle()
  .on('error', function(err) {
    console.error('Error:', err.message);
    this.emit('end');
  })
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(terser({
    mangle: isProduction,
    compress: {
      drop_console: isProduction,
      drop_debugger: isProduction
    }
  }))
  .pipe(size({
    showFiles: true,
    gzip: true
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./src/js/'));
}

function watch() {
  gulp.watch(['./src/jsx/**/*.js', './src/jsx/**/*.jsx'], scripts);
}

// Development task with watch
exports.dev = gulp.series(scripts, watch);

// Production build task
exports.build = gulp.series(scripts);

// Default task
exports.default = exports.dev;
