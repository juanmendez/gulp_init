/**
 * Created by juan on 7/6/2016.
 */
module.exports = function(){
    var del = require( 'del' );
    var $ = require( 'gulp-load-plugins')({lazy:true});
    var utils = {};

    utils.clean = function( path, done ){
        log( "cleaning " + $.util.colors.blue(path));
        del( path, done );
    }

    utils.errorLogger = function( error ){

        log( "** start error ** ");
        log( error );
        log( "** end error" );

        this.emit( 'end');
    }

    utils.log = function( msg ){

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

    return utils;
}
