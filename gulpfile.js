var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var utils = require('./gulp.utils')();
var $ = require( 'gulp-load-plugins')({lazy:true});

 gulp.task('vet', function(){
     var pipes = gulp.src( config.alljs )
         .pipe( $.if(args.verbose, $.print()) )
         .pipe( $.jscs())
         .pipe( $.jshint())
         .pipe( $.jshint.reporter('jshint-stylish', {verbose:true}))
         .pipe( $.jshint.reporter('fail'));

     return pipes;
 });

/**
 * if you want to delete files, then lets add clean-styles
 */
 gulp.task( 'styles', function(){

     var pipes = gulp.src( config.sass )
         /** plumber can be a lot easier to show bugs than errorLog**/
         .pipe( $.plumber() )
         .pipe($.sass() )
         .pipe( $.autoprefixer({browsers:['last 2 versions', '> 5%']}))
         .pipe( gulp.dest(config.css));

     return pipes;
 });

gulp.task( 'clean-styles', function(done){
    var files = config.css + "**/*.css";
    utils.clean( files, done  );
});


gulp.task( "sass-watcher", function(){
        gulp.watch( [config.sass], ['styles'] );
});


gulp.task( 'wiredep', function(){

    var options  = config.getWiredepDefaultOptions();
    var wiredep = require( 'wiredep' ).stream;

    return gulp
        .src( config.index )
        .pipe( wiredep( options ) )
        .pipe( $.inject( gulp.src( config.js)))
        .pipe( gulp.dest(config.client ) );

});

gulp.task( 'inject', ['wiredep', 'styles'], function(){
   utils.log( "wire up the app css into the html, and call wiredep");


    return gulp.src( config.index)
        .pipe( $.inject( gulp.src( config.css )))
        .pipe(  gulp.dest( config.client ) );
});


var port = process.env.PORT || config.defaultPort;

gulp.task( 'servedev', ['inject'], function(){

    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env:{
            'PORT': port,
            'NODE_ENV': isDev ? 'dev':'build'
        },
        watch: [config.server]
    };

    return $.nodemon( nodeOptions );
});