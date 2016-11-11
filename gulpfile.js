'use strict';
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const ts = require('gulp-typescript');
const del = require('del');

const path = {
    ts: [
        'src/**/*.ts'
    ],
    client: ['src/**/*'],
    target: 'dist/'
};

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', (cb) => {
    del([path.target + '/**/*'], {
        force: true
    });
    cb();
});

gulp.task('ts', (cb) => {
    const tsResult = tsProject.src(path.ts)
        .pipe(tsProject());
    tsResult.js.pipe(gulp.dest(path.target));
    cb();
});

gulp.task('copy:config', (cb) => {
    gulp.src('./config.js')
        .pipe(gulp.dest(path.target));
    cb();
});

gulp.task('copy:assets', ['copy:config'], (cb) => {
    gulp.src('src/client/static/**/*')
        .pipe(gulp.dest(path.target + 'public/'));
    cb();
});


gulp.task('watch', () => {
    gulp.watch(path.client, ['copy:assets']);
    gulp.watch(path.ts, ['ts']);
});

gulp.task('build', ['clean', 'ts', 'copy:assets'])

gulp.task('dev', ['ts', 'copy:assets', 'watch'], () => {
    nodemon({
        script: path.target + 'index.js',
        ext: 'ts js json',
    }).on('restart', () => {
        console.log('restarted!');
    });
});

gulp.task('default', ['dev'])
