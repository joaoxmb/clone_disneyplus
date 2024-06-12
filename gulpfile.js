const gulp = require("gulp")
const sass = require("gulp-sass")(require("sass"))

function compileSass() {
  return gulp.src("./src/styles/*.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .pipe(gulp.dest("./dist/styles"))
}


exports.sass = () => {
  gulp.watch("./src/styles/*.scss", { ignoreInitial: false }, gulp.parallel(compileSass))
}
