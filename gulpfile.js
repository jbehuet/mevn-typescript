'use strict';
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const ts = require('gulp-typescript');
const del = require('del');

const path = {
    ts: [
        'src/**/*.ts'
    ],
    target: 'dist/'
};

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', () => {
    return del([path.target + '/**/*'], {
        force: true
    });
});

gulp.task('ts', () => {
    const tsResult = tsProject.src(path.ts)
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest(path.target));
});

gulp.task('watch', () => {
    gulp.watch(path.ts, ['ts']);
});

gulp.task('build', ['clean', 'ts'])

gulp.task('dev', ['build', 'watch'], () => {
    nodemon({
        script: path.target + '/index.js',
        ext: 'ts js json',
    }).on('restart', () => {
        console.log('restarted!');
    });
});

gulp.task('default', ['dev'])
