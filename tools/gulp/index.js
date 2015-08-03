import gulp from 'gulp';
import browserSync from 'browser-sync';

import styles from './styles.js';
import scripts from './scripts.js';

browserSync.create();

gulp.task('default', ['js', 'css', 'html'], function () {});

gulp.task('watch', ['css', 'html', 'watch-js'], function () {
	gulp.watch(['src/**/*.css'], ['css']);
	gulp.watch(['src/**/*.html'], ['html']);
});

gulp.task('html', () => {
	gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist'));
});