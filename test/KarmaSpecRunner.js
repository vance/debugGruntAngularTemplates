var dependencies = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        //
        if (/Spec\.js$/.test(file)) {
            //traces my test files fine!
            console.log("{{{testing file}}} --> "+ file );

            if( document.toString().indexOf( file ) < 0 ) {
                dependencies.push(file);
            }

        }
    }
}

requirejs.config({

    baseUrl: '/base/src/main/',
    paths: {
        // External libraries
        'angular': '/base/main/resources/lib/angular-1.2.16/angular',

        //'angular-ui.utils': '/base/app/external/angular-ui-utils/0.0.4/angular-ui-utils',
        'angularMocks': '/base/main/resources/lib/angular-1.2.16/angular-mocks',
    },
    shim: {
        'angular': {'exports': 'angular'},
        // ...
        'angular-ui.utils': {deps: ['angular']},
        'angularMocks': {deps: ['angular'], 'exports': 'angular.mock'},

        // unfortunately we need to explicitly include the templates
        'app/components/nav/navigation.html': {deps: ['angular']}
    },

    // Ask Require.js to load these files (all our tests).
    deps: dependencies,
    // Set test to start run once Require.js is done.
    callback: window.__karma__.start
});