const { series, parallel, src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
const cleanCSS = require("gulp-clean-css");
const sass = require('gulp-sass')(require('sass'));

function clean(cb) {
  // body omitted
  cb();
}

function css(cb) {
    return src('css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(dest('output/css'));
}

function javascript(cb) {
    return src('js/**/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest('output/js'));
}

function devcss(cb) {
    return src('css/**/*.css')
    .pipe(sass().on('error', sass.logError))
    .pipe(babel())
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('output/css'));
}

function devjavascript(cb) {
    return src('js/**/*.js')
    .pipe(babel())
    .pipe(dest('output/js'));
}

exports.dev =  series(clean, parallel(devcss, devjavascript));
exports.build = series(clean, parallel(css, javascript));