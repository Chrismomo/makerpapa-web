'use strict';

angular.module('makerPaPaApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': '课堂',
      'link': '/class'
    },{
      'title': '社区',
      'link': '/community'
    },{
      'title': '活动',
      'link': '/activity'
    },{
      'title': '登陆',
      'link': '/login'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });