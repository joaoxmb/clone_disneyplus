const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const replace = require("gulp-replace");
const uglify = require("gulp-uglify");

function compileSass() {
  return gulp.src("./src/styles/base.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .pipe(replace("../images", "../../src/images"))
    .pipe(gulp.dest("./dist/styles"))
}

function compileIndex() {
  return gulp.src("./src/index.html")
    .pipe(replace("./images", "../src/images"))
    .pipe(replace("CSS__PATH", "./styles/base.css"))
    .pipe(replace("SCRIPT__PATH", "./scripts/main.js"))
    .pipe(gulp.dest("./dist"))
}

function compileScript() {
  return gulp.src("./src/scripts/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist/scripts"))
}

exports.sass = compileSass;
exports.index = compileIndex;
exports.script = compileScript;

exports.build = gulp.parallel(compileSass, compileIndex, compileScript);
exports.watch = () => {
  gulp.watch("./src/scripts/**/*.js", { ignoreInitial: false }, gulp.parallel(compileScript));
  gulp.watch("./src/index.html", { ignoreInitial: false }, gulp.parallel(compileIndex));
  gulp.watch("./src/styles/**/*.scss", { ignoreInitial: false }, gulp.parallel(compileSass));
}
