'use strict';

angular.module('customers',['ngRoute','ngResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',{templateUrl:'views/landing.html',controller:'LandingPageController'})
      .when('/Articles',{templateUrl:'views/Article/search.html',controller:'SearchArticleController'})
      .when('/Articles/new',{templateUrl:'views/Article/detail.html',controller:'NewArticleController'})
      .when('/Articles/edit/:ArticleId',{templateUrl:'views/Article/detail.html',controller:'EditArticleController'})
      .when('/Customers',{templateUrl:'views/Customer/search.html',controller:'SearchCustomerController'})
      .when('/Customers/new',{templateUrl:'views/Customer/detail.html',controller:'NewCustomerController'})
      .when('/Customers/edit/:CustomerId',{templateUrl:'views/Customer/detail.html',controller:'EditCustomerController'})
      .when('/Orders',{templateUrl:'views/Order/search.html',controller:'SearchOrderController'})
      .when('/Orders/new',{templateUrl:'views/Order/detail.html',controller:'NewOrderController'})
      .when('/Orders/edit/:OrderId',{templateUrl:'views/Order/detail.html',controller:'EditOrderController'})
      .when('/OrderLines',{templateUrl:'views/OrderLine/search.html',controller:'SearchOrderLineController'})
      .when('/OrderLines/new',{templateUrl:'views/OrderLine/detail.html',controller:'NewOrderLineController'})
      .when('/OrderLines/edit/:OrderLineId',{templateUrl:'views/OrderLine/detail.html',controller:'EditOrderLineController'})
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('LandingPageController', function LandingPageController() {
  })
  .controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function(route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
    };
  });
