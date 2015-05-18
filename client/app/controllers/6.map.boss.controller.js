'use strict';





angular.module('makerPaPaApp')
    .controller('MapBossCtrl', function($scope, $modal, $timeout, $log, $filter, socket, $document, $window) {

        function loadData() {}

        loadData()

        // $scope.mapTypeChanged = function() {
        //     var showStreetViewControl = this.getMapTypeId() != 'coordinate';
        //     this.setOptions({
        //         'streetViewControl': showStreetViewControl
        //     });
        // };


        var map;
        $scope.$on('mapInitialized', function(evt, evtMap) {
            map = evtMap;
            $scope.xxxx();
        });

        $scope.xxxx = function(){

            var swBound = new google.maps.LatLng(281.70, -1217.50);
            var neBound = new google.maps.LatLng(418.85, -551.90);
            var allowedBounds = new google.maps.LatLngBounds(swBound, neBound);


            var boundLimits = {
                maxLat : allowedBounds.getNorthEast().lat(),
                maxLng : allowedBounds.getNorthEast().lng(),
                minLat : allowedBounds.getSouthWest().lat(),
                minLng : allowedBounds.getSouthWest().lng()
            };

            var lastValidCenter = map.getCenter();
            var newLat, newLng;
            google.maps.event.addListener(map, 'center_changed', function() {
                var center = map.getCenter();
                if (allowedBounds.contains(center)) {
                    // still within valid bounds, so save the last valid position
                    lastValidCenter = map.getCenter();
                    return;
                }
                newLat = lastValidCenter.lat();
                newLng = lastValidCenter.lng();
                if(center.lng() > boundLimits.minLng && center.lng() < boundLimits.maxLng){
                    newLng = center.lng();
                }
                if(center.lat() > boundLimits.minLat && center.lat() < boundLimits.maxLat){
                    newLat = center.lat();
                }
                map.panTo(new google.maps.LatLng(newLat, newLng));
            });



            // var allowedBounds = new google.maps.LatLngBounds(
            //      new google.maps.LatLng(-281.70, -1217.50), 
            //      new google.maps.LatLng(418.85, 551.90)
            // );


            // var swBound = new google.maps.LatLng(281.70, -1217.50);
            // var neBound = new google.maps.LatLng(418.85, -551.90);
            // var allowedBounds = new google.maps.LatLngBounds(swBound, neBound);
            
            // var lastValidCenter = map.getCenter();

            // google.maps.event.addListener(map, 'center_changed', function() {
            //     if (allowedBounds.contains(map.getCenter())) {
            //         // still within valid bounds, so save the last valid position
            //         lastValidCenter = map.getCenter();
            //         return; 
            //     }

            //     // not valid anymore => return to last valid position
            //     map.panTo(lastValidCenter);
            // });

        }

        $scope.mapClicked = function(event){
            // $scope.alertLocation(event);
            // $scope.placeMarker(event);
            // $scope.placeInfoWindow(event);
            $scope.placeMarkWithInfoWindow(event);

        };

        //点击地图，alert坐标
        $scope.alertLocation = function(event){
            $window.alert('Point.X.Y: ' + event.latLng + 'zoom:' + map.getZoom());
            //得到zoom级别和Tile的坐标
        // var numTiles = 1 << map.getZoom();
        // var projection = new MercatorProjection();
        // $scope.chicago = map.getCenter();
        // $scope.worldCoordinate = projection.fromLatLngToPoint($scope.chicago);
        // $scope.pixelCoordinate = new google.maps.Point(
        //     $scope.worldCoordinate.x * numTiles,
        //     $scope.worldCoordinate.y * numTiles);
        // $scope.tileCoordinate = new google.maps.Point(
        //     Math.floor($scope.pixelCoordinate.x / TILE_SIZE),
        //     Math.floor($scope.pixelCoordinate.y / TILE_SIZE));
            // LatLng: {{chicago.lat()}}, {{chicago.lng()}}, <br>
            // World Coordinate: {{worldCoordinate.x}}, {{worldCoordinate.y}}, <br>
            // Pixel Coordinate: {{pixelCoordinate.x}}, {{pixelCoordinate.y}}, <br>
            // Tile Coordinate: {{tileCoordinate.x}}, {{tileCoordinate.y}} at Zoom Level {{map.getZoom()}}

        };

        $scope.placeMarker = function(event) {
            var marker = new google.maps.Marker({position: event.latLng, map: map});

            // new google.maps.Marker({
            //     position: $scope.neighborhoods[iterator++],
            //     map: $scope.map,
            //     draggable: false,
            //     animation: google.maps.Animation.DROP
            // });

            //关于当前中心点。
            //设置当前center,有移动动画
            // map.panTo(event.latLng);
            //得到当前center
            // var center = map.getCenter();
            //设置当前center
            // map.setCenter(center);
        };

        $scope.placeInfoWindow = function(event) {
            // var infoWindow = map.infoWindows['1xx'];
            // var safasdf = map.infoWindows;
            // infoWindow.setContent('Zooxxxm: ' + map.getZoom());    
                // map.setCenter(infoWindow.getPosition());
            //显示infowindow.
            // $scope.showInfoWindow(event, '1xx')

            var marker = new google.maps.Marker({position: event.latLng, map: map});
            var infoWindow = new google.maps.InfoWindow();
            var contentString = '<b>Bermuda Triangle polygon</b><br>' +
            'Clicked location: <br>' + event.latLng.lat() + ' , ' + event.latLng.lng() +
            '<br>';
            infoWindow.setContent(contentString);
            infoWindow.setPosition(event.latLng);
            infoWindow.open(map);
        };

        $scope.placeMarkWithInfoWindow = function(event) {
            var marker = new google.maps.Marker({position: event.latLng, map: map});
            var infoWindow = new google.maps.InfoWindow();
            var contentString = '<b>Clicked Location: </b><br>' +
            'Lat : ' + event.latLng.lat() + ' <br> Lng : ' + event.latLng.lng() +
            '<br>';
            infoWindow.setContent(contentString);
            infoWindow.setPosition(event.latLng);
            infoWindow.open(map, marker);
        };

        $scope.btnClick = function(event) {
            $window.alert('btn clicked');
        };

    });







