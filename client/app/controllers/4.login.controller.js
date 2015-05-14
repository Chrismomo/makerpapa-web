'use strict';



    var centreLat=0.0;
    var centreLon=0.0;
    var initialZoom=1;
    var imageWraps=false; //SET THIS TO false TO PREVENT THE IMAGE WRAPPING AROUND

var gmicMapType;

    function GMICMapType() {
        this.Cache = Array();
        this.opacity = 1.0;
    }
    GMICMapType.prototype.tileSize = new google.maps.Size(256, 256);
    GMICMapType.prototype.maxZoom = 19;
    GMICMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
        var c = Math.pow(2, zoom);
        var c = Math.pow(2, zoom);
        var tilex=coord.x,tiley=coord.y;
        if (imageWraps) {
        if (tilex<0) tilex=c+tilex%c;
            if (tilex>=c) tilex=tilex%c;
            if (tiley<0) tiley=c+tiley%c;
            if (tiley>=c) tiley=tiley%c;
    }
    else {
        if ((tilex<0)||(tilex>=c)||(tiley<0)||(tiley>=c))
        {
            var blank = ownerDocument.createElement('DIV');
            blank.style.width = this.tileSize.width + 'px';
            blank.style.height = this.tileSize.height + 'px';
            return blank;
        }
    }
    var img = ownerDocument.createElement('IMG');
        var d = tilex;
        var e = tiley;
        var f = "t";
        for (var g = 0; g < zoom; g++) {
            c /= 2;
            if (e < c) {
                if (d < c) { f += "q" }
                else { f += "r"; d -= c }
            }
            else {
                if (d < c) { f += "t"; e -= c }
                else { f += "s"; d -= c; e -= c }
            }
        }
        img.id = "t_" + f;
        img.style.width = this.tileSize.width + 'px';
        img.style.height = this.tileSize.height + 'px';
        img.src = "assets/map/"+f+".jpg";
        this.Cache.push(img);
        return img;
    }
    GMICMapType.prototype.realeaseTile = function(tile) {
        var idx = this.Cache.indexOf(tile);
        if(idx!=-1) this.Cache.splice(idx, 1);
        tile=null;
    }
    GMICMapType.prototype.name = "Image Cutter";
    GMICMapType.prototype.alt = "Image Cutter Tiles";
    GMICMapType.prototype.setOpacity = function(newOpacity) {
        this.opacity = newOpacity;
        for (var i = 0; i < this.Cache.length; i++) {
            this.Cache[i].style.opacity = newOpacity; //mozilla
            this.Cache[i].style.filter = "alpha(opacity=" + newOpacity * 100 + ")"; //ie
        }
    }

var moonMapType = new GMICMapType();
// var moonMapType = new google.maps.ImageMapType(moonTypeOptions);



/**
 * @constructor
 * @implements {google.maps.MapType}
 */
function CoordMapType() {}

CoordMapType.prototype.tileSize = new google.maps.Size(256, 256);
CoordMapType.prototype.maxZoom = 19;

CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
    var div = ownerDocument.createElement('div');
    div.innerHTML = coord;
    div.style.width = this.tileSize.width + 'px';
    div.style.height = this.tileSize.height + 'px';
    div.style.fontSize = '10';
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '1px';
    div.style.borderColor = '#AAAAAA';
    div.style.backgroundColor = '#E5E3DF';
    return div;
};

CoordMapType.prototype.name = 'Tile #s';
CoordMapType.prototype.alt = 'Tile Coordinate Map Type';




angular.module('makerPaPaApp')
    .controller('LoginCtrl', function($scope, $modal, $timeout, $log, $filter, socket, $document, $window) {

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







