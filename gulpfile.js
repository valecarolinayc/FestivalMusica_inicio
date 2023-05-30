const {src, dest, watch, parallel} = require("gulp"); //src busca archivo y dest lo identifica
//css
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');

//imagenes
const webp = require('gulp-webp');

function css(done){
    // identificar el archivo sass
    //compilarlo
    //guardarla en el disco duro
    src("src/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(dest("build/css"));

    done(); //callback que avisa a gulp cuando llegamos al final
}

function versionWebp(done){
    const opciones = {
        quality:50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    done();
}

function dev(done){
    watch("src/scss/**/*.scss", css)
    done();
}

exports.css =css;  //npx gulp dev
exports.versionWebp=versionWebp;
exports.dev =parallel(versionWebp, dev);