const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

const concat = require('gulp-concat'); // Подключаем gulp-concat (для конкатенации файлов)
const uglify = require('gulp-uglify'); // Подключаем gulp-uglify (для сжатия JS) 
const cssnano = require('gulp-cssnano'); // Подключаем пакет для минификации CSS            
const babel = require("gulp-babel");
 
const img = () => (
    gulp.src('src/images/*') // 
        // .pipe(imagemin())
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('dist/images'))
);
exports.img = img;

/* перевод js в es5 */
const es5 = () => {
    return gulp.src("src/assets/js/common.js")
    .pipe(babel({
        presets: ['@babel/preset-env']// ['2015'] // env
    }))
    .pipe(gulp.dest("src/assets/js/common_def.js"));
}
exports.es5 = es5

/* сборка и сжатие библиотек и js */
const allScripts = () => {
    const strUrl = 'src/js/*';
    const arrayurl = ['src/js/1.js', 'src/js/1.js']; // example
    const name = 'all-scripts.min.js';
    return gulp.src(strUrl)
        .pipe(concat(name)) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('dist/js')); // Выгружаем в папку src/js
}
exports.allScripts = allScripts;

/* минификации CSS библиотек */
const cssLibs = () => {
    const strUrl = 'src/css/*';
    const arrayurl = ['src/css/1.js', 'src/css/1.js']; // example
    const name = 'all-styles.js';
    return gulp.src(strUrl) 
        .pipe(concat(name))
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('dist/css')); // Выгружаем в папку src/css
}
exports.cssLibs = cssLibs;