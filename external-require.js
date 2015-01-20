/**
 * Created by madalin on 1/20/2015.
 */
requirejs.config ({
    paths: {
        'jquery': '../lib/jquery/jquery-1.9.1',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'bootstrap-select': '../lib/bootstrap/js/select2.min'
    },

    shim: {
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
} ;

require(['jquery', ''], function() {
    require(['bootstrap', 'bootstrap-select'], function () {
        require(['./main']);
    });
});