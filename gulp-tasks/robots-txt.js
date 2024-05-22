import gulp from "gulp"

gulp.task('robots-txt', () => {
    return gulp.src('src/robots.txt')
        .pipe(gulp.dest('dist'));
});