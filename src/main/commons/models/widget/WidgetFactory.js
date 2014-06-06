(function() {
    'use strict';

    app.factory('WidgetFactory', ['$resource',
        function($resource) {

            //TODO: change this to the real endpoint

            var Widget = $resource('http://localhost:8282/widget/:widgetId', {
                widgetId: '@widgetId'
            }, {

                // making an example for us that would post a rating
                // TODO: add write capability to backend simulator
                rate: {
                    method: 'POST',
                    params: {
                        applyRating: true
                    }
                }
            });

            Widget.prototype.getCost = function() {

                var multiplier = 1;

                switch (this.currency) {
                    case 'USD':
                        multiplier = 2;
                        break;
                    case 'HK':
                        multiplier = 4;
                        break;
                    case 'YEN':
                        multiplier = 6;
                        break;
                }


                return this.price * multiplier;
            }


            return Widget;

        }
    ]);
}());