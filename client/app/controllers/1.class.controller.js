'use strict';

angular.module('makerPaPaApp')
    .controller('ClassCtrl', function($scope, ClassService, $modal, $timeout, $log, $filter, socket) {

        function loadData() {
            ClassService.getAll()
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
