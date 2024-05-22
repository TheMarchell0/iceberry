import gulp from "gulp"

gulp.task('swiper-styles', () => {
    return gulp.src('node_modules/swiper/swiper-bundle.css')
        .pipe(gulp.dest('dist/styles'));
});