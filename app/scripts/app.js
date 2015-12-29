'use strict';

/**
 * @ngdoc overview
 * @name Places
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('Places', ['ionic', 'ngCordova', 'ngResource', 'ngStorage'])

  .run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {
      // save to use plugins here
    });

    // add possible global event handlers here

  })

  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');

    // Application routing
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/main.html',
        controller: 'MainController'
      })
      .state('app.places', {
        url: '/places',
        views: {
          'viewContent': {
            templateUrl: 'templates/views/places.html',
            controller: 'PlacesController'
          }
        }
      });


    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/app/places');
  });


