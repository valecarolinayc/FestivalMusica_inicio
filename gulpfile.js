const {src, dest, watch, parallel} = require("gulp"); //src busca archivo y dest lo identifica
//css
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');

//imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp'); //instale npm i -D gulp-cache
const avif = require('gulp-avif');


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

function imagenes(done){
    const opciones ={
        optimizationLevel:3 
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
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

function versionAvif(done){ //version mas ligera para imagenes
    const opciones = {
        quality:50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done();
}

function dev(done){
    watch("src/scss/**/*.scss", css)
    done();
}

exports.css =css;  //npx gulp dev
exports.imagenes = imagenes;
exports.versionWebp=versionWebp;
exports.versionAvif=versionAvif; 
exports.dev =parallel(imagenes, versionWebp, versionAvif, dev);