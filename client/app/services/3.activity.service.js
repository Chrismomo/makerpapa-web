'use strict';

angular.module('makerPaPaApp')
  .service('ActivityService', function (ApiBaseService, $q, $http, Apihostservice) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var currentInstance = this;
        var endpoint = '/api/activitys';

        var nonCache_service = ApiBaseService;

        function getAllSuccessHandler(data, deferred) {
            // console.log(data);
            deferred.resolve(data);
        }

        function getAllErrorHandler(errorData, deferred) {
            deferred.reject(errorData);
        }

        this.getAll = function() {
            var deferred = $q.defer();
            this.get_X_Simple_No_Cache(endpoint)
                .promise.then(
                    function(response) {
                        getAllSuccessHandler(response, deferred);
                    },
                    function(response) {
                        getAllErrorHandler(response, deferred);
                    });
            return deferred;
        }
    
        this.get_X_Simple_No_Cache = function(endpoint_url) {
            var deferred = nonCache_service.httpGet(endpoint_url);
            return deferred;
        }
});
