import gulp from "gulp";
import replace from "gulp-replace";

// Задача для замены путей в CSS файлах
gulp.task('replace-paths', function() {
    return gulp.src('dist/styles/*.css') // Укажите путь к вашим CSS файлам после сборки
        .pipe(replace('/img/', '/dist/img/')) // Замените путь к изображениям
        .pipe(gulp.dest('dist/styles/')); // Сохраните изменения в той же директории
});