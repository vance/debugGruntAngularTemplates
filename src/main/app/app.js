var app = angular.module('SomePublicApp', ['ngRoute', 'ngResource', 'appSettings', 'konst']);

app.config(['$routeProvider',
    function($routeProvider) {
        'use strict';

        $routeProvider
            .when('/product-search', {
                templateUrl: '../../main/app/pages/product-search/product-search-page.html',
                controller: 'ProductSearchController'
            })
            .when('/error', {
                templateUrl: '../../main/app/pages/error.html'
            })
            .when('/', {
                redirectTo: '/product-search'
            })
            .otherwise({
                redirectTo: '/error'
            });

        // $locationProvider.html5Mode(true); <-- this will remove the (#)hash from the url, but causes some issues
    }
]);

app.run(['$rootScope', '$route', '$location', '$templateCache',
    function($rootScope, $route, $location, $templateCache) {
        'use strict';

        // bind the '$locationChangeSuccess' event on the rootScope
        $rootScope.$on('$routeChangeStart', function() {
            Debug.time('pages.load.' + $location.path().substring(1));
        });

        // bind the '$locationChangeSuccess' event on the rootScope
        $rootScope.$on('$locationChangeSuccess', function() {
            Debug.timeEnd('pages.load.' + $location.path().substring(1));
        });

]);

