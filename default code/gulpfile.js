const { src, dest, parallel, watch, series } = require('gulp'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify-es').default,
  browsersync = require('browser-sync').create(),
  distDel = require('del'),
  imagemin = require('gulp-imagemin'),
  webp = require('gulp-webp')

function delDist() {
  return distDel('dist')
}

function webP() {
  return src('app/img/**.png')
    .pipe(webp())
    .pipe(dest('app/img'))
}

function libsCss() {
  return src('node_modules/animate.css/animate.css')
    .pipe(concat('animate.css'))
    .pipe(dest('app/css'))
}


function browserSync() {
  browsersync.init({
    server: {
      baseDir: 'app/'
    },
    notify: false
  })
}

function minCss() {
  return src('app/scss/*.scss', '!app/scss/null_style.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version']
    }))
    .pipe(concat('style.min.css'))
    .pipe(dest('app/css'))
    .pipe(browsersync.stream())
}

function minImages() {
  return src('app/img/*')
    .pipe(imagemin(
      [
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupIds: false }
          ]
        })
      ]
    ))
    .pipe(dest('dist/img'))
}

function script() {
  return src('app/js/main.js', '!app/js/slick.min.js')
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(dest('app/js'))
    .pipe(browsersync.stream())
}

function wowjs() {
  return src('node_modules/wow.js/dist/wow.js')
    .pipe(uglify())
    .pipe(concat('wow.min.js'))
    .pipe(dest('app/js'))
}

function watching() {
  watch(['app/scss/*.scss'], minCss)
  watch(['app/js/main.js'], script)
  watch(['app/*.html']).on('change', browsersync.reload)
}

function build() {
  return src([
    'app/css/*.css',
    'app/fonts/**',
    'app/js/**.js', '!app/js/main.js',
    'app/*.html'
  ], { base: 'app' })
    .pipe(dest('dist'))
}

exports.webP = webP
exports.wowjs = wowjs
exports.delDist = delDist
exports.browserSync = browserSync
exports.minCss = minCss
exports.minImages = minImages
exports.script = script
exports.watching = watching
exports.build = series(delDist, minImages, build)
exports.default = parallel(browserSync, minCss, webP, /*libsCss, wowjs,*/ script, watching)