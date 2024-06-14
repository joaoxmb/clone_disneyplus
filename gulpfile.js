const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const replace = require("gulp-replace");

function compileSass() {
  return gulp.src("./src/styles/base.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .pipe(replace("../", "../../src/"))
    .pipe(gulp.dest("./dist/styles"))
}

function compileIndex() {
  return gulp.src("./src/index.html")
    .pipe(replace("./images", "../src/images"))
    .pipe(gulp.dest("./dist"))
}

exports.sass = compileSass;
exports.index = compileIndex;

exports.build = gulp.parallel(compileSass, compileIndex);
exports.watch = () => {
  compileIndex();
  gulp.watch("./src/index.html", { ignoreInitial: false }, gulp.parallel(compileIndex));
  gulp.watch("./src/styles/*.scss", { ignoreInitial: false }, gulp.parallel(compileSass))
}
