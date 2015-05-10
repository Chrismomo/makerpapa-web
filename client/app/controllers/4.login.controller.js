'use strict';

angular.module('makerPaPaApp')
    .controller('LoginCtrl', function($scope, $modal, $timeout, $log, $filter, socket, $document) {

        function loadData() {
        }

        loadData() 





        //Data
		var cities = [{
		    city: 'Toronto',
		    desc: 'This is the best city in the world!',
		    lat: 43.7000,
		    long: -79.4000
		}, {
		    city: 'New York',
		    desc: 'This city is aiiiiite!',
		    lat: 40.6700,
		    long: -73.9400
		}, {
		    city: 'Chicago',
		    desc: 'This is the second best city in the world!',
		    lat: 41.8819,
		    long: -87.6278
		}, {
		    city: 'Los Angeles',
		    desc: 'This city is live!',
		    lat: 34.0500,
		    long: -118.2500
		}, {
		    city: 'Las Vegas',
		    desc: 'Sin City...\'nuff said!',
		    lat: 36.0800,
		    long: -115.1522
		}];


		//addEventListener('onload', load, false);

        function load(){
            var el = document.getElementById("map");
            alert(el);
        }

        $timeout(function(){
	          // $scope.myMenuList.numerofli= $element.find('li').length  ;
	          // $scope.myMenuList.ulwidth= $element[0].clientWidth;
	          //load();
	    }, 1000);


		$timeout(function(){
	          // $scope.myMenuList.numerofli= $element.find('li').length  ;
	          // $scope.myMenuList.ulwidth= $element[0].clientWidth;

			var map;
			  var mapOptions = {
			    zoom: 8,
			    center: new google.maps.LatLng(-34.397, 150.644)
			  };
			  map = new google.maps.Map(document.getElementById('map'),mapOptions);
			
	    }, 5000);

		// addEventListener('load', loadIt, false);


		 // $scope.$watch('$viewContentLoaded', function(){
		 //    //Here your view content is fully loaded !!
		 //    console.log("---a-df-asdf-asd-fasdf-sf-");
		 //    loadIt();
		 //  });

		$timeout(function(){
	          // $scope.myMenuList.numerofli= $element.find('li').length  ;
	          // $scope.myMenuList.ulwidth= $element[0].clientWidth;
	          loadIt();
	    }, 2000);

	    function loadIt() {
		    var mapOptions = {
		        zoom: 4,
		        center: new google.maps.LatLng(40.0000, -98.0000),
		        mapTypeId: google.maps.MapTypeId.TERRAIN
		    }
		    var xx = document.getElementById('map');
		    var ss = angular.element( document.querySelector( '#map' ) );
		    var cc = angular.element( document.getElementById( 'map' ) );
		    var sx = $document.find('#map');

		    $scope.map = new google.maps.Map(xx, mapOptions);

		    $scope.markers = [];

		    var infoWindow = new google.maps.InfoWindow();

		    var createMarker = function (info) {

		        var marker = new google.maps.Marker({
		            map: $scope.map,
		            position: new google.maps.LatLng(info.lat, info.long),
		            title: info.city
		        });
		        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

		        google.maps.event.addListener(marker, 'click', function () {
		            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
		            infoWindow.open($scope.map, marker);
		        });

		        $scope.markers.push(marker);

		    }

		    for (var i = 0; i < cities.length; i++) {
		        createMarker(cities[i]);
		    }

		    $scope.openInfoWindow = function (e, selectedMarker) {
		        e.preventDefault();
		        google.maps.event.trigger(selectedMarker, 'click');
		    }
	    }




    });
