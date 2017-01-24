var gulp = require("gulp");
var $ = require("gulp-load-plugins")();

gulp.task("default", ["clean", "js", "css"]);

gulp.task("js", function (done) {
    return gulp.src("./src/jquery.confirMe.js")
        .pipe($.uglifyjs({
            outSourceMap: true
        }))
        .pipe($.rename({suffix: ".min"}))
        .pipe(gulp.dest("dist"));
});

gulp.task("css", function (done) {
    return gulp.src("./src/jquery.confirMe.css")
        .pipe($.sourcemaps.init())
        .pipe($.cleanCss())
        .pipe($.sourcemaps.write())
        .pipe($.rename({suffix: ".min"}))
        .pipe(gulp.dest("dist"));
});

gulp.task("clean", function (done) {
    return gulp.src("dist", {read: false})
        .pipe($.clean());
});