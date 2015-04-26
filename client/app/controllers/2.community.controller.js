'use strict';

angular.module('makerPaPaApp')
    .controller('CommunityCtrl', function($scope, CommunityService, $modal, $timeout, $log, $filter, socket) {

        function loadData() {
            CommunityService.getAll()
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
