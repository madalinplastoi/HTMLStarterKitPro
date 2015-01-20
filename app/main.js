var rAlias = requirejs;
rAlias.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-2.3.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
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

rAlias.onError = function ( err ) {
    console.log ( err ) ;
} ;

var start = new Date ( ) ;

rAlias.onResourceLoad = function ( context, map, depArray ) {
    var duration = new Date ( ) - start ;
    console.log ( "[Resources Loaded]:", map.name, "in " + duration + " ms" + " from " + map.url ) ;
} ;

define(['durandal/system', 'durandal/app', 'durandal/viewLocator'],  function (system, app, viewLocator) {

    debugger;

    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Durandal Starter Kit';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });

    app.start().then(function () {

        require(['bootstrap-select','custom-bindings'], function (a,b) {

            debugger;
            //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
            //Look for partial views in a 'views' folder in the root.
            viewLocator.useConvention();

            //Show the app by setting the root view model for our application with a transition.
            app.setRoot('viewmodels/shell', 'entrance');
        });
    });
});