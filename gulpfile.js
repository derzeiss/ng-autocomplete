const gulp = require('gulp');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

path = {
    src: 'src/',
    dist: 'dist/'
};

gulp.task('css', () => {
    return gulp.src(path.src + 'ng-autocomplete.css')
        .pipe(gulp.dest(path.dist))
        .pipe(rename('ng-autocomplete.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest(path.dist))
});

gulp.task('js', () => {
    return gulp.src([
        path.src + 'ng-autocomplete.component.js',
        path.src + 'highlight.filter.js',
        path.src + 'searchFilter.filter.js'
    ])
        .pipe(concat('ng-autocomplete.js'))
        .pipe(babel({presets: ['env']}))
        .pipe(gulp.dest(path.dist))
        .pipe(rename('ng-autocomplete.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist));
});

gulp.task('build', ['css', 'js']);