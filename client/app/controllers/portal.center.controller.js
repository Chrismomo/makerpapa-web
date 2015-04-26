'use strict';

angular.module('makerPaPaApp')
    .controller('PortalCenterCtrl', function($scope, $modal, $timeout, $log, $filter, socket) {
        // var cssBgs = ["well texturebg1", "well texturebg2", "well texturebg3", "well texturebg44",
        // "well texturebg4","well texturebg5","well texturebg6","well texturebg7","well texturebg8",
        // "well texturebg9","well texturebg10","well texturebg11","well texturebg12","well texturebg13",
        // "well texturebg14","well texturebg15","well texturebg16","well texturebg17","well texturebg18",
        // "well texturebg19", "well texturebg20", "well texturebg21", "well texturebg22", "well texturebg23", 
        // "well texturebg24","well texturebg25","well texturebg26","well texturebg27","well texturebg28",
        // "well texturebg29","well texturebg30","well texturebg31","well texturebg32","well texturebg33",
        // "well texturebg34","well texturebg35","well texturebg36","well texturebg37","well texturebg38",
        // "well texturebg39", "well texturebg40", "well texturebg41", "well texturebg42", "well texturebg43"];
        // function loadData() {
        //     PortalAppService.getAll()
        //         .promise.then(
        //             function(response) {
        //                 $scope.data = response;
        //                 angular.forEach($scope.data, function(value, key) {
        //                     value.cssClass = cssBgs[key%cssBgs.length];
        //                 });

        //                 $log.debug($scope.data);
        //             },
        //             function(response) {
        //                 alert("get portal app error");
        //             }
        //     );
        // }
        // loadData();

        // $scope.sendMessage = function(app, ch){
        //     var bundleIndetifier = app.bundleIndetifier;
        //     var channelCode = ch.channelCode;
        //     var alert = ch.alert;
        //     var message = ch.message;
        //     PortalMessageService.sendMessage(bundleIndetifier, channelCode, alert, message);
        // }
    });
