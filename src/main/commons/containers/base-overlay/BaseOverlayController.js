(function() {
    'use strict';

    app.controller('BaseOverlayController', ['$scope', '$element', '$controller',
        function($scope, $element, $controller) {
            var controller = {
                $scope: null,
                $overlay: null,
                showHelpIcon: false,
                showCloseIcon: false,
                showOverlay: false,
                showDebuggerEvent: null,
                deactivateOnShadowClick: true,

                init: function($scope, $element) {
                    this.$scope = $scope;
                    $('body').addClass('noscroll');
                    if ($element.context.attributes) {
                        var opts = $element.context.attributes;
                        this.deactivateOnShadowClick = (opts.deactivateOnShadowClick) ? opts.deactivateOnShadowClick : true;
                        this.showOverlay = (opts.showOverlay) ? opts.showOverlay : false;
                        this.showCloseIcon = (opts.showCloseIcon) ? opts.showCloseIcon : false;
                        this.showHelpIcon = (opts.showHelpIcon) ? opts.showHelpIcon : false;
                    }
                    this.$overlay = $element;
                    this.$overlayContentWrapper = this.$overlay.find('.overlay-content-wrapper');
                    this.defineListeners();
                },

                defineListeners: function() {
                    this.showDebuggerEvent = this.$scope.$on('showDebugger', this.showDebugger.bind(this));
                },

                undefineListeners: function() {
                    //this will deregister that listener
                    this.showDebuggerEvent();
                },

                close: function() {
                    $('body').removeClass('noscroll');
                    this.undefineListeners();
                    this.showOverlay = false;
                },

                onShadowClick: function(e) {
                    if (this.deactivateOnShadowClick && this.$overlay && e.target === this.$overlay[0]) {
                        this.close();
                    }
                },

                // this method is only related to the debugger
                showDebugger: function() {
                    Debug.time('modals.render.showDebugger');
                    if (this.$overlay.find('.debugger').length) {
                        this.show();
                    }
                    Debug.timeEnd('modals.render.showDebugger');
                },

                show: function() {
                    this.showOverlay = true;
                    this.defineListeners();
                    this.$scope.$digest();
                }
            };
            controller.prototype = $controller('BaseController', { $scope: $scope });
            controller.init($scope, $element);
            return controller;
        }
    ]);

}());