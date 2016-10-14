var gulp = require("gulp");
var uglify = require("gulp-uglifyjs");


gulp.task("minify", function (done) {
    return gulp.src('./jquery.confirMe.js')
        .pipe(uglify('jquery.confirMe.min.js', {
            outSourceMap: true
        }))
        .pipe(gulp.dest('./'));
});