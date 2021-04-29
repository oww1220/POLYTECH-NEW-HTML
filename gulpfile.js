const URL = process.env.APP_ENV_URL || 'pc';

const gulp = require('gulp');
const del = require('del');

/*유틸*/
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

/*view server*/
const browserSync = require('browser-sync').create();

/*scss, css*/
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const modifyCssUrls = require('gulp-modify-css-urls');
const pxtorem = require('gulp-pxtorem');
const cssnano = require('gulp-cssnano');

/*타입스크립트*/
const ts = require('gulp-typescript');

/*오류 처리*/
const plumber = require('gulp-plumber');

/*babel*/
const babel = require('gulp-babel');

/*webpack*/
const webpack = require('webpack-stream');


const errorHandler = (error)=>{
    console.error(error.message);
    this.emit('end');
};
const plumberOption = {
    errorHandler: errorHandler,
};


const autoprefixBrowsers = ['> 0%', 'last 4 versions'];
const polyfill = './node_modules/@babel/polyfill/browser.js';
const BASE_URL = `./wwwroot/${URL}`;
const TASK_BASE_URL = `${BASE_URL}/assets`;

// typescript: typescript 컴파일러
gulp.task('ts', ()=> {
    //createProject 인스턴스 하나만 요구해서 함수내부 scope로 옮겨서 task callback 함수내부에서 인스턴스 생성(함수호출시마다 매번 다른 인스턴스 생성)..
    const tsProjectP = ts.createProject('tsconfig.pc.json');
    //const tsProjectM = ts.createProject('tsconfig.mo.json');
    //const tsProject = (URL === 'mo') ? tsProjectM : tsProjectP;
    const tsProject = tsProjectP;
return tsProject.src()
    .pipe(plumber(plumberOption))
    .pipe(tsProject())
    .pipe(gulp.dest(`${TASK_BASE_URL}/scripts/build/js`))
});

// babel: 구형 브라우저에서도 동작하는 ES5 이하의 코드로 변환(트랜스파일링)
gulp.task('babel', ()=>
    gulp
    .src([polyfill, `${TASK_BASE_URL}/scripts/build/js/**/*.js`], {allowEmpty: true})
    .pipe(babel({
        presets: [
            [ '@babel/preset-env', {
                targets: {
                    browsers: [ 'last 1 version', 'ie >= 11' ]
                }
            }]
        ],
    }))
    .pipe(gulp.dest(`${TASK_BASE_URL}/scripts/build/dist`))
);

// webpack: 모듈 번들
gulp.task('webpack', ()=>
    gulp
    .src(`${TASK_BASE_URL}/scripts/build/dist/**/*.js`
        , {allowEmpty: true}
    )
    .pipe(plumber(plumberOption))
    .pipe(webpack({
        mode: 'production',
        // 파일 다중으로 내보내기 가능
        /*
        entry: {
            //CommonUI: [`${TASK_BASE_URL}/scripts/build/dist/CommonUI.js`, `${TASK_BASE_URL}/scripts/build/dist/browser.js`],
            //UI: `${TASK_BASE_URL}/scripts/build/dist/UI/Datepicker.js`,
        },
        output: {filename: '[name].bundle.js'},
        */
        output: {filename: 'UI.bundle.js'},
        devtool: 'source-map'
    }))
    .pipe(gulp.dest(`${TASK_BASE_URL}/scripts/bundle`))
    .pipe(browserSync.reload({ stream: true }))
);

// concat: 제이쿼리 코어및 사용 플러그인들 머지 -- 선택
gulp.task('jquery:concat', ()=>
    gulp
    .src(`${TASK_BASE_URL}/scripts/jquery/**/*.js`)
    .pipe(plumber(plumberOption))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('jquery.bundle.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${TASK_BASE_URL}/scripts/bundle`))
);

// sass: sass컴파일러, px-->rem, autoprefixer 
gulp.task('sass', ()=>
    gulp
    .src(`${TASK_BASE_URL}/scss/**/*.scss`)
    .pipe(plumber(plumberOption))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(
        sass({
            outputStyle: 'compressed', //[nested, compact, expanded, compressed]
            //indentType: 'tab',
            //indentWidth: 1,
        }).on('error', sass.logError)
    )
    .pipe(cssnano())
    .pipe(pxtorem({
            propList: ['*', '!'], // (Array) Use wildcard * to enable all properties. Use ! to not match a property. 
            rootValue: 16, // (Number | Function) Represents the root element font size
            replace: false, //  (Boolean) Replaces rules containing rems instead of adding fallbacks.
            minPixelValue: 2, // (Number) Set the minimum pixel value to replace.
            mediaQuery: false // (Boolean) Allow px to be converted in media queries.
        }
    ))
    .pipe(
        autoprefixer({
            browsers: autoprefixBrowsers,
            cascade: true,
        })
	)
    .pipe(concat('UI.bundle.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(`${TASK_BASE_URL}/styles`))
    .pipe(browserSync.reload({ stream: true }))
);

// clean: 파일정리(delete)
gulp.task('clean', ()=>
    del([`${TASK_BASE_URL}/scripts/build`], {force:true})
);

// watch: 소스 옵져빙(소스변경 감지해서 task실행및 서버 재시작)
gulp.task('watch', ()=> {

    //서버실행
    browserSync.init({
        //logLevel: 'debug',
        port: 3333,
        open: false,
        directory: true,
        server: './wwwroot/',
        browser: 'google chrome',
    });

    // watch sass
    gulp.watch(
        `${TASK_BASE_URL}/scss/**/*.scss`,
        gulp.series('sass')
    );

    // watch ts
    gulp.watch(
        `${BASE_URL}/**/*.ts`,
        gulp.series('ts', 'babel', 'webpack', 'clean')
    );

    // watch html
    gulp.watch(`${BASE_URL}/**/*.html`).on('change', browserSync.reload);
});

// task 묶어서 실행
gulp.task(
    'default',
    gulp.series('sass', 'ts', 'babel', 'webpack', 'clean', 'watch')
);
