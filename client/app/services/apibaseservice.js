'use strict';

/**
 * @ngdoc service
 * @name websiteNgoApiApp.ApiBaseService
 * @description
 * # ApiBaseService
 * Service in the websiteNgoApiApp.
 */
angular.module('makerPaPaApp')
    .service('ApiBaseService', function ApiBaseService(Apihostservice, $q, $http) {
        var currentInstance = this;
        function getSuccessHandler(data, deferred) {
            deferred.resolve(data);
        }
        function getErrorHandler(errorData, deferred) {
            deferred.reject(errorData);
        }
        this.httpGet = function(endpoint) {//'/api/Designs'
            var deferred = $q.defer();
        	Apihostservice.getHost(function(){
	            $http({
	                method: 'GET',
	                url: Apihostservice.getHost() + endpoint
	            }).
	            success(function(data, status, headers, config) {
	                getSuccessHandler(data, deferred);
	            }).
	            error(function(data, status, headers, config) {
	                getErrorHandler(data, deferred);
	            });
        	});
            return deferred;
        };
    });
