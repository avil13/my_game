var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var paths = {
    appJs: 'app.js',
    ts: [
        'src/ts/*.ts'
    ],

    appCss: 'app.css',
    css: [
        'src/scss/*.scss'
    ],

    html: [
        'src/html/*.html'
    ],
    dist: 'dist',

    port: 8080
};

var tasks = {
    js: function (done) {
        gulp.src(paths.ts)
            .pipe($.plumber({errorHandler: $.notify.onError("Error:\n<%= error %>")}))
            .pipe($.sourcemaps.init())
            .pipe($.tsc())
            .pipe($.concat(paths.appJs))
            .pipe($.sourcemaps.write('./'))
            .pipe(gulp.dest(paths.dist));
    },

    css: function (done) {
        gulp.src(paths.css)
            .pipe($.plumber({errorHandler: $.notify.onError("Error:\n<%= error %>")}))
            .pipe($.sourcemaps.init())
            .pipe($.sass({errLogToConsole: true}))
            .pipe($.concat(paths.appCss))
            .pipe($.sourcemaps.write('./'))
            .pipe(gulp.dest(paths.dist));
    },

    html: function (done) {
        gulp.src(paths.html)
            .pipe($.plumber({errorHandler: $.notify.onError("Error:\n<%= error %>")}))
            .pipe(gulp.dest(paths.dist));
    },

    server: function (done) {
        $.connect.server({
            root: [paths.dist],
            port: paths.port,
            livereload: false
        });
    }
};

gulp.task('js', tasks.js);
gulp.task('css', tasks.css);
gulp.task('html', tasks.html);

gulp.task('server', ['js', 'css', 'html'],tasks.server);
gulp.task('watch', function () {
    gulp.watch(paths.ts, ['js']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['server', 'watch']);
