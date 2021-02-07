const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const rename = require("gulp-rename");
// const image = require('gulp-image');
const image = require('gulp-imagemin');
const browser = require('browser-sync').create();
const uglify = require('gulp-uglify').default;

function browserSync(done){
    browser.init({
        server:{
            baseDir: "./build"
        },
        port: 4000
    })
    done();
}

function browserSyncReload(done){
    browser.reload();
    done();
}

const paths = {
    style: {
        src: 'app/style/**/*.scss',
        dest: 'build/css'
    },
    js: {
        src: 'app/js/**/*.js',
        dest: 'build/js'
    },
    images: {
        src: 'app/images/*.*',
        dest: 'build/images'
    },
    html: {
        src: 'app/**/*.html',
        dest: 'build/'
    }
}

function styles (){
    return gulp.src(paths.style.src)
                .pipe(sass())
                .pipe(autoprefixer())
                .pipe(cssnano())
                .pipe(rename({
                    suffix: '.min'
                }))
                .pipe(gulp.dest(paths.style.dest))
                .pipe(browser.stream())
}

function images() {
    return gulp.src(paths.images.src)
        .pipe(image())
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browser.stream())
}

function html (){
    return gulp.src(paths.html.src)
                .pipe(gulp.dest(paths.html.dest))
                .pipe(browser.stream())
}

function watch(){
    gulp.watch(paths.style.src, styles)
    gulp.watch(paths.html.src, html)
    gulp.watch('app/index.html', gulp.series(browserSyncReload))
}

const build = gulp.parallel(styles, html, images)

gulp.task('build',  build)

gulp.task('default', gulp.parallel(watch, build, browserSync))