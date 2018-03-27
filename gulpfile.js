var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');

gulp.task ('default', ['css'], function(){
    browserSync.init({
        server: "./dist"
    });

    gulp.watch('./dist/js/*.js', ['javascript']);
    gulp.watch('./src/scss/**/*.scss', ['css']);
    gulp.watch('./src/*.html', ['minify']);
    gulp.watch('./dist/*.html').on('change', browserSync.reload);
});

gulp.task('minify', function() {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('imagemin', () =>
    gulp.src('./src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);

gulp.task('javascript', function () {
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('css', function (){
    return gulp.src('src/scss/style.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});
