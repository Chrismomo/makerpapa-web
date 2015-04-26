'use strict';

/**
 * @ngdoc service
 * @name websiteNgoApiApp.APIHostService
 * @description
 * # APIHostService
 * Service in the websiteNgoApiApp.
 */
angular.module('makerPaPaApp')
    .service('Apihostservice', function APIHostService($http) {
        var host = null;
        this.getHost = function(callback) {
            if (host == null) {
                $http.get('/api/apihost').
                success(function(data, status, headers, config) {
                    host = data;
                    callback();
                }).
                error(function(data, status, headers, config) {
                    // host = "http://websitengo.duapp.com";
                    host = ".";
                    callback();
                });
                return host;
            } else {
                if(callback != null){
                    callback(); 
                }
                return host;
            }
        }
    });
