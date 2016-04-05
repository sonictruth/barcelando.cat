'use strict';

/**
 * @ngdoc overview
 * @name barcelandoApp
 * @description
 * # barcelandoApp
 *
 * Main module of the application.
 */
angular
  .module('barcelandoApp', [
    'infinite-scroll',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/mobile', {
        templateUrl: 'views/mobile.html',
        controller: 'MobileCtrl',
        controllerAs: 'mobile'
      })
      .when('/offers', {
        templateUrl: 'views/offers.html',
        controller: 'OffersCtrl',
        controllerAs: 'offers'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run( function($window) {
    $window.addToHomescreen({
        debug: false
    });
}).factory("facebookService",  function($q) {
    
    return {
        callApi: function(call, params) {
           // d = d || $q.defer();
            var d = $q.defer();
            window.deFB.then(function(fbapi) {
              var token = '?access_token=1612045092417575|6d0698addfd3d63060946506b5cbb461';

                fbapi.api(call + token , params, function(response) {
                    if(!response || response.error ){
                        d.reject("Error occured loading events: " );
                        console.log(response.error);
                    } else { 
                     d.resolve(response);
                   }
                });
            });
            return d.promise;
        }
    };
});
