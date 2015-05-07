'use strict';
var app = angular.module('makerPaPaApp')

    app.controller('CommunityCtrl', function($scope, CommunityService, $modal, $timeout, $log, $filter, socket) {

        $scope.xxx = function(item){
            if(item.inlineStyle == "width:100%;z-index: 111;"){
                item.inlineStyle = "width:23%;z-index: 1;"
            }else{
                item.inlineStyle = "width:100%;z-index: 111;";
            }
            var temp = $scope.items;
            $scope.items = [];
            angular.copy(temp, $scope.items);

        }

        function loadData() {
            CommunityService.getAll()
                .promise.then(
                    function(response) {
                        $scope.items = response;
                        $log.debug($scope.items);

                        angular.forEach($scope.items, function(value, key) {
                            value.style = getBoxStyle();
                            if(value.image == undefined || value.image == ""){
                                value.image = "assets/images/default-community.png";
                            }
                            // value.inlineStyle = "z-index: 1;";
                        });

                        // $scope.items[1].inlineStyle = "100%";
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
            var randomNum = Math.random();
            randomNum = randomNum * 10;
            randomNum = Math.floor(randomNum);
            randomNum = randomNum % 6;
            console.log(randomNum);
            return ["big-ban-1", "big-ban-2", "big-ban-3", "big-ban-4", "big-ban-5", "big-ban-6"][randomNum];
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
