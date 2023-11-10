"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
var concat = require("gulp-concat");
var browserSync = require("browser-sync").create();

sass.compiler = require("node-sass");

gulp.task("sass", function () {
  return gulp
    .src("./sass/**/*.scss")
    .pipe(concat("custom.scss"))
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch("sass/**/*.scss", gulp.series("sass"));
  gulp.watch("./*.html").on("change", browserSync.reload);
});

function defaultTask(cb) {
  console.log("default task running");
  cb();
}

exports.default = defaultTask;
