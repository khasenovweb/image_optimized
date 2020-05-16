const path = require("path");
var gulp = require("gulp");
const flatMap = require("flat-map").default;
const scaleImages = require("gulp-scale-images");
const imagemin = require("gulp-imagemin");

const twoVariantsPerFile = (file, cb) => {
    const pngFile = file.clone();
    pngFile.scale = {
        maxWidth: 800,
        rotate: false,
    };
    cb(null, [pngFile]);
};

const computeFileName = (output, scale, cb) => {
    const fileName =
        path.basename(output.path, output.extname) + output.extname;
    cb(null, fileName);
};

function resize() {
    return gulp
        .src("original-2/*.*")
        .pipe(flatMap(twoVariantsPerFile))
        .pipe(scaleImages(computeFileName))
        .pipe(gulp.dest("optimized-2"));
}

function compress() {
    return gulp
        .src("optimized/*.*")
        .pipe(imagemin())
        .pipe(gulp.dest("compress"));
}

gulp.task("resize", resize);
gulp.task("compress", compress);
