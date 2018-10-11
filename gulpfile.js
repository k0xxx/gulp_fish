//gulp
var gulp = require("gulp");

// sass
var plumber = require("gulp-plumber"); // show errors
var sass = require("gulp-sass"); // comile sass
var autoprefixer = require("gulp-autoprefixer"); // add css prefixex
var rename = require("gulp-rename"); // rename target files

// image
var imagemin = require("gulp-imagemin"); // compress images

// html
var rigger = require("gulp-rigger"); // extend html files

// clean
var clean = require("del"); // clean build folder

// sync
var browserSync = require("browser-sync"); // hot reload sync

//Sass compile
gulp.task("sass", function() {
  gulp
    .src(["resource/sass/*.sass"])
    .pipe(plumber()) // plumber
    .pipe(sass()) //Comp Sass
    .pipe(autoprefixer(["last 20 versions", "ie 11"]))
    .pipe(rename("style.css"))
    .pipe(gulp.dest("build/css/"))
    .pipe(browserSync.reload({ stream: true }));
});

//Images
gulp.task("images", function() {
  return gulp
    .src("resource/images/**/*")
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }]
      })
    )
    .pipe(gulp.dest("build/images/"));
});

//Extend html
gulp.task("extend", function() {
  gulp
    .src("resource/*.html")
    .pipe(rigger())
    .pipe(gulp.dest("build/"));
});

//Clean build folder
gulp.task("clean", function() {
  clean.sync("build");
});

// Browser sync
gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "build"
    },
    // proxy: "build:81",
    notify: false
  });
});

//Watch task (default)
gulp.task("watch", ["clean", "sass", "images", "extend", "browser-sync"], function() {
  gulp.watch(`resource/sass/*.sass`, ["sass"]);
  gulp.watch("resource/**/*.html", ["extend"]);
  gulp.watch("resource/**/*.html", browserSync.reload);
});

gulp.task("default", ["watch"]);
