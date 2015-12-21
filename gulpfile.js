var gulp = require("gulp");
var gutil = require("gulp-util");
var git = require('gulp-git');
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");

// The development server (the recommended option for development)
gulp.task("default", ["webpack-dev-server"]);

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
gulp.task("deploy", ["build", "stage"]);

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
    new webpack.BannerPlugin("---\n---\n\n", { raw: true }),
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


gulp.task('stage', function(){
  return gulp.src('.')
    .pipe(git.add())
    .pipe(git.commit('Test'));
});
