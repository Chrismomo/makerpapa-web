'use strict';

angular.module('makerPaPaApp')
    .controller('ActivityCtrl', function($scope, ActivityService, $modal, $timeout, $log, $filter, socket) {

        function loadData() {
            ActivityService.getAll()
                .promise.then(
                    function(response) {
                        $scope.data = response;
                        $log.debug($scope.data);

                    },
                    function(response) {
                        alert("get portal app error");
                    }
            );
        }

        loadData() 
    });
