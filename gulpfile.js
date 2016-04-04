var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var paths = {
    appJs: 'app.js',
    ts: [
        'src/ts/**/*.ts'
    ],

    appLibs: 'libs.js',
    libs: [
        'src/libs/phaser.js'
    ],

    appCss: 'app.css',
    css: [
        'src/scss/*.scss'
    ],

    html: [
        'src/contents/**/*',
        'src/html/*.html'
    ],
    dist: 'dist',

    port: 8080
};

var tasks = {
    js: function(done) {
        return gulp.src(paths.ts)
            .pipe($.plumber({ errorHandler: $.notify.onError("Error:\n<%= error %>") }))
            .pipe($.using())
            .pipe($.sourcemaps.init())
            .pipe($.tsc())
            .pipe($.concat(paths.appJs))
            .pipe($.sourcemaps.write('./'))
            .pipe(gulp.dest(paths.dist));
    },

    libs: function(done) {
        return gulp.src(paths.libs)
            .pipe($.plumber({ errorHandler: $.notify.onError("Error:\n<%= error %>") }))
            .pipe($.using())
            .pipe($.sourcemaps.init())
            .pipe($.concat(paths.appLibs))
            .pipe($.sourcemaps.write('./'))
            .pipe(gulp.dest(paths.dist));
    },

    css: function(done) {
        return gulp.src(paths.css)
            .pipe($.plumber({ errorHandler: $.notify.onError("Error:\n<%= error %>") }))
            .pipe($.sourcemaps.init())
            .pipe($.sass({ errLogToConsole: true }))
            .pipe($.concat(paths.appCss))
            .pipe($.sourcemaps.write('./'))
            .pipe(gulp.dest(paths.dist));
    },

    html: function(done) {
        return gulp.src(paths.html)
            .pipe($.plumber({ errorHandler: $.notify.onError("Error:\n<%= error %>") }))
            .pipe(gulp.dest(paths.dist));
    },

    server: function(done) {
        $.connect.server({
            root: [paths.dist],
            port: paths.port,
            livereload: false
        });
    }
};

gulp.task('js', tasks.js);
gulp.task('libs', tasks.libs);
gulp.task('css', tasks.css);
gulp.task('html', tasks.html);

gulp.task('server', ['js', 'libs', 'css', 'html'], tasks.server);

gulp.task('default', ['server', 'watch']);

gulp.task('watch', ['js', 'libs', 'css', 'html'], function() {
    gulp.watch(paths.ts, ['js']);
    gulp.watch(paths.libs, ['libs']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.html, ['html']);
});