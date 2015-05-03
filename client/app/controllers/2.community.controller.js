'use strict';
var app = angular.module('makerPaPaApp')

    app.controller('CommunityCtrl', function($scope, CommunityService, $modal, $timeout, $log, $filter, socket) {

        function loadData() {
            CommunityService.getAll()
                .promise.then(
                    function(response) {
                        $scope.items = response;
                        $log.debug($scope.items);

                        angular.forEach($scope.items, function(value, key) {
                            value.style = getBoxStyle();
                        });
                    },
                    function(response) {
                        alert("get portal app error");
                    }
            );
        }

        function getBoxStyle(){
            return getRandomBoxStyle();
        }

        function getRandomBoxStyle(){
            return "big-ban-4";
        }

        loadData()

        $scope.myInterval = 5000;
        var slides = $scope.slides = [];
        $scope.addSlide = function() {
            var newWidth = 1200 + slides.length + 1;
            slides.push({
                image: 'http://placekitten.com/' + newWidth + '/300',
                text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' +
                    ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
            });
        };
        for (var i = 0; i < 4; i++) {
            $scope.addSlide();
        }





    });
