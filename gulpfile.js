const { watch, src, dest, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const replace = require("gulp-replace");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");

function compileSass() {
  return src("./src/styles/base.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .pipe(replace("../images", "../../src/images"))
    .pipe(dest("./dist/styles"))
}

function compileIndex() {
  return src("./src/index.html")
    .pipe(replace("CSS__PATH", "./styles/base.css"))
    .pipe(replace("SCRIPT__PATH", "./scripts/main.js"))
    .pipe(dest("./dist"))
}

function compileScripts() {
  return src("./src/scripts/**/*.js")
    .pipe(uglify())
    .pipe(dest("./dist/scripts"))
}

function compileImages() {
  return src("./src/images/**/*")
    .pipe(imagemin())
    .pipe(dest("dist/images"))
}

exports.sass = compileSass;
exports.index = compileIndex;
exports.script = compileScripts;
exports.image = compileImages;

exports.build = parallel(compileSass, compileIndex, compileScripts, compileImages);
exports.watch = () => {
  watch("./src/*", { ignoreInitial: false }, parallel(compileSass, compileIndex, compileScripts, compileImages));
}
