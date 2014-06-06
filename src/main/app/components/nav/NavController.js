(function() {
    'use strict';

    app.controller('NavController', ['$scope','$location','$controller',
        function($scope, $location, $controller) {
            var controller = {

                hide: false, // change this to true, the entire header will not show up
                location: null,
                instanceNumber: 0,

                init: function($location) {
                    this.location = $location;
                    this.instanceNumber = Math.round( Math.random() * 10000 ) + 1;
                    console.log( "NavController:init");
                },

                navClass: function(linkName) {
                    var linkRegex = new RegExp('\\b' + linkName + '\\b');
                    if (linkRegex.test(this.location.path().substring(1))) {
                        return ' header-active';
                    } else {
                        return '';
                    }
                },

                hideNav: function() {
                    this.hide = true;

                    // just testing out underscore and the settings file stuff
                    _(3).times(function(num) {
                        console.log('baseURL: ' + app.settings.baseURL() + ' ... ' + app.settings.isLocalDev() + ' ... ' + num);
                        console.log('enums test: ' + app.enums.GENDER);
                    }, this);
                },

                goToSearch: function() {
                    return this.location.path('/product-search');
                },

                goToError: function() {
                    return this.location.path('/error');
                }
            };

            controller.prototype = $controller('BaseController', {
                $scope: $scope
            });
            controller.init($location);
            return controller;
        }
    ]);

}());