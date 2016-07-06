/*
//no need as long as you use require...
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var print = require('gulp-print');
var args = require('yargs');
var gulpif = require('gulp-if');*/


var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require( 'del' );

var $ = require( 'gulp-load-plugins')({lazy:true});

var log = function( msg ){

    if( typeof(msg) === 'object'){

        for( var item in msg){

            if( msg.hasOwnProperty(item)){
                $.util.log( $.util.colors.blue(msg[item]));
            }
        }
    }else{
        $.util.log( $.util.colors.blue(msg) );
    }

}

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
         /**we give preference to plumber**/
        // .on('error', errorLogger )
         .pipe( $.autoprefixer({browsers:['last 2 versions', '> 5%']}))
         .pipe( gulp.dest(config.css));

     return pipes;
 });

gulp.task( 'clean-styles', function(done){
    var files = config.css + "**/*.css";
    clean( files, done  );
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

function clean( path, done ){
    log( "cleaning " + $.util.colors.blue(path));
    del( path, done );
}

function errorLogger( error ){

    log( "** start error ** ");
    log( error );
    log( "** end error" );

    this.emit( 'end');
}