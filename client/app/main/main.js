'use strict';

angular.module('makerPaPaApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/class', {
                templateUrl: 'app/views/1.class.html',
                controller: 'ClassCtrl'
            })
            .when('/community', {
                templateUrl: 'app/views/2.community.html',
                controller: 'CommunityCtrl'
            })
            .when('/activity', {
                templateUrl: 'app/views/3.activity.html',
                controller: 'ActivityCtrl'
            })
            .when('/login', {
                templateUrl: 'app/views/4.login.html',
                controller: 'LoginCtrl'
            })
            .otherwise({
                redirectTo: '/class'
            });
    });
