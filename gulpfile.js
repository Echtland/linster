var gulp = require("gulp"),
    gutil = require("gulp-util"),
    clean = require("gulp-clean"),
    shell = require("gulp-shell"),
    watch = require("gulp-watch"),
    livereload = require("gulp-livereload"),
    webpack = require("webpack"),
    webpackConfig = require("./webpack.config.js");


paths = {
  clean: [
    "./tmp",
    "./_site"
  ]
};

gulp.task('krass', function() {
  gulp.src([
    'node_modules/font-awesome/scss/*'
  ]).pipe(gulp.dest('./_sass/vendor/font-awesome/'));
  gulp.src([
    'node_modules/font-awesome/fonts/*'
  ]).pipe(gulp.dest('./fonts/'));
});

// The development server (the recommended option for development)
gulp.task("default", ["build-dev", "serve", "watch"]);

gulp.task("clean", function() {
  return gulp.src(paths.clean, {read: false})
    .pipe(clean());
});

gulp.task("serve", shell.task([
  "jekyll server --baseurl ''"
]));

gulp.task('watch', function(){
  livereload.listen();

  watch(['./_site/**/*'], function(files) {
    livereload.reload();
  });
});

gulp.task("build-dev", ["webpack:build-dev"], function() {
  gulp.watch(["_js/**/*"], ["webpack:build-dev"]);
});

gulp.task("webpack:build-dev", function(callback) {
  var myConfig = Object.create(webpackConfig);
  // myConfig.devtool = "sourcemap";
  myConfig.debug = true;

  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("development")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.BannerPlugin("---\n---\n\n", { raw: true })
  );

  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});

// Production build
gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", function(callback) {
  var myConfig = Object.create(webpackConfig);
  // myConfig.devtool = "sourcemap";
  // myConfig.debug = true;

  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        preamble: "---\n---\n\n"
      }
    })
  );

  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});
