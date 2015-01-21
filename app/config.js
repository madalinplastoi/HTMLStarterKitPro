/**
 * Created by madalin on 1/21/2015.
 */
requirejs.config({
    baseUrl: 'app/',
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-2.3.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap.min',
        'bootstrap-select': '../lib/bootstrap/js/select2.min',
        'jquery': '../lib/jquery/jquery-1.9.1'
    },
    shim: {
        'jquery':{
            exports: '$'
        },
        'knockout':{
            exports: 'ko'
        },

        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    }
});

requirejs.onError = function ( err ) {
    console.log ( err ) ;
} ;

var start = new Date ( ) ;

requirejs.onResourceLoad = function ( context, map, depArray ) {
    var duration = new Date ( ) - start ;
    console.log ( "[Resources Loaded]:", map.name, "in " + duration + " ms" + " from " + map.url ) ;
};

require(['main']);