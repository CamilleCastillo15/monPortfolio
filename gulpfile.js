/*
 Gulp file config avec LibSass
 Nécessite d'avoir node-sass installé
 Les ressources sont stockées dans un dossier "assets" à la racine
 Ce dossier contient :
	## un dossier "scss" avec les sources sass
	## un dossier "js" avec :
		# un dossier "lib" qui contient les libs copié/collé sans aucune intervention
			-> output : /include/js/lib/
		# un dossier "plugins" dans lequels tous les fichiers seront concaténés
			-> output : /include/scripts/scripts.min.js
		# un dossier "script" dont le contenu sera linté puis concaténé à la suite des plugins
			-> output : /include/scripts/scripts.min.js
	## un dossier "images" dont le contenu sera optimisé
		 -> output : /images
 */

// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss    = require('gulp-minify-css');
var jshint       = require('gulp-jshint');
var uglify       = require('gulp-uglify');
var imagemin     = require('gulp-imagemin');
var concat       = require('gulp-concat');
var rename       = require('gulp-rename');
var notify       = require('gulp-notify');
var cache        = require('gulp-cache');
var gutil        = require('gulp-util');
var filter       = require('gulp-filter');
var sourcemaps   = require('gulp-sourcemaps');
var browserSync  = require('browser-sync');
var reload       = browserSync.reload;
var del          = require('del');
// var merge		 = require('merge-stream');
// var es 			 = require('event-stream');

gulp.task('browser-sync', function() {
	browserSync({

		/* ========================
		 * RENSEIGNER LE VHOST ICI 
		 * ======================== */

		proxy: "monsite.dev",
		open: true
		
	});
});

// Reload all Browsers
gulp.task('bs-reload', function () {
	browserSync.reload();
});

gulp.task('styles', function() {
	gulp.src('assets/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('assets/temp'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss({errLogToConsole: true}))
		.pipe(gulp.dest('css'))
		.pipe(filter('**/*.css'))
		.pipe(reload({stream:true}));
});

gulp.task('lib', function() {

	return TweenMax = gulp.src(['bower_components/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('vendor.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('include/js/lib'))
		.pipe(reload({stream:true}));

});

gulp.task('lint', function() {
	return gulp.src(['assets/js/scripts/zz-mcube.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
	return gulp.src(['assets/js/scripts/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('assets/temp'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('include/js/scripts'))
		.pipe(reload({stream:true}));
});

gulp.task('images', function() {
	return gulp.src('assets/images/**/*')
		.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest('images'));
});

gulp.task('clearcache', function (done) {
		return cache.clearAll(done);
});

gulp.task('clean', ['clearcache'], function(cb) {
	del(['css', 'include/js', 'images'], cb)
});

gulp.task('build', ['clean'], function() {
	gulp.start('styles', 'lint', 'lib', 'scripts', 'images');
});

gulp.task('default', ['browser-sync'], function() {
	
	// Watch .scss files
	gulp.watch('assets/scss/**/*.scss', ['styles']);

	// Watch our own JS files and lint
	// gulp.watch('assets/js/scripts/**/*.js', ['lint']);
	
	// Watch .js files
	gulp.watch(['assets/js/scripts/**/*.js'], ['scripts', 'bs-reload']);

	// Watch .js files
	gulp.watch(['assets/js/lib/**/*.js'], ['lib', 'bs-reload']);
	
	// Watch image files
	gulp.watch('assets/images/**/*', ['images']);

	gulp.watch(['templates/**/*.tpl', '**/*.php', '**/*.html'], ['bs-reload']);
});