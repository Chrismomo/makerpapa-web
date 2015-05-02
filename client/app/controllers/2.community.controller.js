'use strict';
var app = angular.module('makerPaPaApp')

    app.controller('CommunityCtrl', function($scope, CommunityService, $modal, $timeout, $log, $filter, socket) {

        function loadData() {
            CommunityService.getAll()
                .promise.then(
                    function(response) {
                        $scope.items = response;
                        $log.debug($scope.items);
                    },
                    function(response) {
                        alert("get portal app error");
                    }
            );
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






           window.setTimeout(function() {
        $scope.$apply(function() {
            $scope.testTiles = [];

            for (var i = 0; i < 10; i++) {
                $scope.testTiles.push(i);
            }            

            $scope.update(); //update masonry layout
        })
    }, 1000)


    });







app.directive('masonry', function ($parse) {
    return {
        restrict: 'AC',
        link: function (scope, elem, attrs) {
            scope.items = [];
            var container = elem[0];
            var options = angular.extend({
                itemSelector: '.item'
            }, JSON.parse(attrs.masonry));

            var masonry = scope.masonry = new Masonry(container, options);

            var debounceTimeout = 0;
            scope.update = function () {
                if (debounceTimeout) {
                    window.clearTimeout(debounceTimeout);
                }
                debounceTimeout = window.setTimeout(function () {
                    debounceTimeout = 0;

                    masonry.reloadItems();
                    masonry.layout();

                    elem.children(options.itemSelector).css('visibility', 'visible');
                }, 120);
            };
        }
    };
}).directive('masonryTile', function () {
    return {
        restrict: 'AC',
        link: function (scope, elem) {
            elem.css('visibility', 'hidden');
            var master = elem.parent('*[masonry]:first').scope(),
                update = master.update;

            imagesLoaded(elem.get(0), update);
            elem.ready(update);
        }
    };
});

app.directive('bindHeightToWidth', function(){
    var directive = {
        restrict: 'A',
        link: function (scope, instanceElement, instanceAttributes, controller, transclude) {
            var heightFactor = 1;

            if (instanceAttributes['bindHeightToWidth']) {
                heightFactor = instanceAttributes['bindHeightToWidth'];
            }

            var updateHeight = function () {
                instanceElement.outerHeight(instanceElement[0].getBoundingClientRect().width * heightFactor);
            };

            scope.$watch(instanceAttributes['bindHeightToWidth'], function (value) {
                heightFactor = value;
                updateHeight();
            });

            $(window).resize(updateHeight);
            updateHeight();

            scope.$on('$destroy', function () {
                $(window).unbind('resize', updateHeight);
            });
        }
    };

    return directive;
});