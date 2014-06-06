(function() {

    'use strict';
    app.controller('GlobalController', ['$scope', 'enums', 'settings', '$controller',
        function($scope, enums, settings, $controller) {
            var controller = {
                init: function($scope, enums, settings) {
                    this.prototype.init($scope);
                    this.$scope = $scope;
                    app.$globalScope = this.$scope;
                    app.enums = enums;
                    app.settings = settings;
                }
            };
            controller.prototype = $controller('BaseController', {
                $scope: $scope
            });
            controller.init($scope, enums, settings);
            return controller;
        }
    ]);

}());