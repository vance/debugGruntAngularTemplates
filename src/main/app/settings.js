var settingsModule = angular.module('appSettings', []);

settingsModule.factory('settings', function() {
    'use strict';

    return {
        baseURL: function() {
            var pathArray = window.location.href.split('/');
            var protocol = pathArray[0];
            var host = pathArray[2];
            var url = protocol + '//' + host;
            return url;
        },
        isLocalDev: function() {
            var regexTestIfDev = new RegExp('at-once-local|at-once-dev');
            return regexTestIfDev.test(this.baseURL());
        }
    };
});