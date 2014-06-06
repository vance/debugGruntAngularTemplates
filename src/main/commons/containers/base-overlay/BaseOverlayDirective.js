(function() {
    'use strict';

    app.directive('baseOverlay', function() {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			templateUrl: '../../main/commons/containers/base-overlay/overlay.html'
		};
	});

}());