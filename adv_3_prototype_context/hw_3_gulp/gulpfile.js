const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const image = require('gulp-image');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es');
const paths = {
    styles: {
        src: 'app/styles/**/*.scss',
        dest: 'build/styles'
    },
    html: {
        src: 'app/**/*.html',
        dest: 'build/'
    },
    images: {
        src: 'app/images/**/*.*',
        dest: 'build/images'
    },
    fonts: {
        src: 'app/fonts/**/*.*',
        dest: 'build/fonts'
    }
};
function browser(done) {
    browserSync.init({
        server: {
            baseDir: './build'
        },
        port: 4000
    });
    done();
};
function browserReload(done) {
    browserSync.reload();
    done();
};
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(cssnano())
        .pipe(autoprefixer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream())
};
function html() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream())
};
function images() {
    return gulp.src(paths.images.src)
        .pipe(image())
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.stream())
};
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
        .pipe(browserSync.stream())
};
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.fonts.src, fonts);
    gulp.watch('./app/*.html', gulp.series(browserReload));
};
const build = gulp.parallel(html, images, fonts, styles);
gulp.task('build', build);
gulp.task('default', gulp.parallel(watch, browser, build));