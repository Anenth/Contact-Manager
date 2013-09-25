'use strict';

angular.module('PractoApp', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'HomeCtrl'
      }).when('/add', {
        templateUrl: 'views/add.html',
        controller: 'AddCtrl'
      }).when('/edit/:id', {
        templateUrl: 'views/add.html',
        controller: 'EditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
