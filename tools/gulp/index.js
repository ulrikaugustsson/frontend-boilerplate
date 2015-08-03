import gulp from 'gulp';
import browserSync from 'browser-sync';
import url from 'url';
import fs from 'fs';
import path from 'path';

import styles from './styles.js';
import scripts from './scripts.js';

browserSync.create();

gulp.task('default', ['js', 'css', 'html'], function () {});

gulp.task('watch', ['css', 'html', 'watch-js'], function () {
	gulp.watch(['src/**/*.css'], ['css']);
	gulp.watch(['src/**/*.html'], ['html']).on('change', browserSync.reload);

	const folder = path.resolve(__dirname, '../../dist/');
	const defaultFile = 'index.html';

	browserSync.init({
		server: {
				baseDir: "./",
				middleware: function(req, res, next) {
						var fileName = url.parse(req.url);
						fileName = fileName.href.split(fileName.search).join("");
						var fileExists = fs.existsSync(folder + fileName);

						console.log(url.parse(req.url).href, url.parse(req.url).href === '/');

						if ((!fileExists && fileName.indexOf("browser-sync-client") < 0) || url.parse(req.url).href === '/') {
								req.url = '/dist/' + defaultFile;
						}
						return next();
					}
		}
	});
});

gulp.task('html', () => {
	gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist'));
});
