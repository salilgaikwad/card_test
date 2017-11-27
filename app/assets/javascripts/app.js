'use strict';



var loadash = angular.module('loadash', []);
loadash.factory('_', ['$window', function() {
  return $window._;
}]);


// Main module of the application.

angular.module( 'myApp',
  [
    'ng-rails-csrf',
    'templates',
    'ui.bootstrap',
    'ngResource',
    'ngRoute',
    'ngDragDrop',
    'loadash',
  ]
).config( ['$routeProvider', function( $routeProvider ) {
  // Specifying the route provider as a string above ensures that the correct angular provider
  // is passed to the function. Rails will shorten variable names as a part of minification
  // in the production build, but not strings

  $routeProvider.when( '/',      { templateUrl: 'main.html',  controller: 'MainCtrl' } );
  $routeProvider.when( '/about', { templateUrl: 'about.html', controller: 'AboutCtrl' } );

  $routeProvider.when('/cards', { templateUrl: 'cards/index.html', controller: 'CardListCtr' });
  $routeProvider.when('/cards/new', { templateUrl: 'cards/new.html', controller: 'CardAddCtr' });
  $routeProvider.when('/cards/:id/edit', { templateUrl: 'cards/edit.html', controller: "CardUpdateCtr" });  
  $routeProvider.when('/dashboard', { templateUrl: 'cards/dashboard.html', controller: 'CardDashboardCtr' });

  $routeProvider.otherwise( { redirectTo: '/' } );
} ] );