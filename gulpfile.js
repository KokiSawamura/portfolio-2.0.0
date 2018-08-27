var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var fs = require('fs');
var del = require('del');
var runSequence = require('run-sequence');
var minimist = require('minimist');

var imageKey = '@image',
  staticKey = '@static';

gulp.task('serve', ['sass'], function () {
  var defaultOptions = {
    default: {
      o: false,
      port: 2000
    }
  };

  var argv = minimist(process.argv.slice(2), defaultOptions);

  browserSync.init({
    server: 'app',
    directory: true,
    port: argv.port,
    open: argv.o,
    rewriteRules: [
      {
        match: '//static.card.jp.rakuten-static.com/card_corp/smart/css/common/header-2.0.0.min.css',
        replace: './css/_header.css'
        }
]
  });

  gulp.watch('app/**/*.ejs', ['ejs']);
  gulp.watch('app/**/*.scss', ['sass']);
  gulp.watch(['app/**/*.html', 'app/**/*.js', 'app/**/*.css', 'app/**/*.png', 'app/**/*.svg', 'app/**/*.jpg', 'app/**/*.gif']).on('change', browserSync.reload);
});

gulp.task('ejs', function () {
  return gulp.src('app/**/[^_]*.ejs')
    .pipe($.plumber())
    .pipe($.ejs({}, {
      root: __dirname + '/app'
    }, {
      ext: '.html'
    }))
    .pipe(gulp.dest('app'))
    .pipe(browserSync.stream());
});

gulp.task('sass', function () {
  return gulp.src('app/**/*.scss')
    .pipe($.plumber())
    .pipe($.sass({
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest('app'))
    .pipe(browserSync.stream());
});

gulp.task('minify-css', function () {
  return gulp.src(['dist/**/*.css', '!dist/**/*.min.css'])
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-js', function () {
  return gulp.src(['dist/**/*.js', '!dist/**/*.min.js'])
    .pipe($.uglify())
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('optimize', function () {
  return gulp.src(['app/**/*.png', 'app/**/*.jpg', 'app/**/*.gif'])
    .pipe($.imagemin([
    $.imagemin.gifsicle({
        interlaced: true
      }),
    $.imagemin.jpegtran({
        progressive: true
      }),
    $.imagemin.optipng({
        optimizationLevel: 7
      })
  ], {
      verbose: true
    }))
    .pipe(gulp.dest('app'))
});

gulp.task('autoprefixer', function () {
  var AUTOPREFIXER_BROWSERS = [
    'ie >= 11',
    'ios >= 10',
    'android >= 5',
  ];

  return gulp.src('app/**/*.css')
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('app'))
});

gulp.task('iconfont', function () {
  gulp.src('icon/*.svg')
    .pipe($.iconfontCss({
      fontName: 'myfont',
      targetPath: 'icon.scss',
      fontPath: '../icon/'
    }))
    .pipe($.iconfont({
      fontName: 'myfont',
      formats: ['ttf', 'eot', 'woff'],
    }))
    .pipe(gulp.dest('icon'));
});

gulp.task('replace:release', function () {
  return gulp.src(['dist/**/*.html', 'dist/**/*.css', 'dist/**/*.js'])
    .pipe($.replace(imageKey, '//image.card.jp.rakuten-static.com/corp'))
    .pipe($.replace(staticKey, '//static.card.jp.rakuten-static.com/corp'))
    .pipe(gulp.dest('dist'));
});

gulp.task('replace:kakunin', function () {
  var defaultOptions = {
      default: {
        kakunin: kakunin
      }
    },
    argv;

  if (process.argv.slice(2)[2]) {
    argv = minimist(process.argv.slice(2), defaultOptions);
  } else {
    argv = defaultOptions.default;
  }

  return gulp.src(['dist/**/*.html', 'dist/**/*.css', 'dist/**/*.js'])
    .pipe($.replace(imageKey, argv.kakunin))
    .pipe($.replace(staticKey, argv.kakunin))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, 'dist'));

gulp.task('copy', function () {
  return gulp.src(['app/**/[^_]*', '!app/**/*.ejs', '!app/**/*.scss'])
    .pipe(gulp.dest('dist'));
});

gulp.task('remove', function () {
  del(['dist/**/*.css', '!dist/**/*.min.css']);
});

gulp.task('build', function (callback) {
  var buildEnv;

  /*  if(process.argv.slice(2)[1] == '--kakunin') {
      buildEnv = 'replace:kakunin';
    } else {
      buildEnv = 'replace:release';
    }*/

  return runSequence('clean', 'sass', 'autoprefixer', 'copy', ['minify-css', 'minify-js'], callback);
});

gulp.task('default', function (callback) {
  return runSequence('serve', 'ejs', callback);
});