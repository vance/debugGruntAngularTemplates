(function() {
    'use strict';

    app.directive('navigation', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../../main/app/components/nav/navigation.html'
        };
    });

}());