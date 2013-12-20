'use strict'

var articleApp = angular.module('articleApp', [
	'ngRoute',
	'ngCookies',
	'ngResource',
	'articleControllers',
	'headerControllers',
	'articleServices'
]);

articleApp.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider){
		$routeProvider.
			when('/', {
				templateUrl: 'partials/articles-list.html',
				controller: 'ArticleListCtrl'
			}).
			when('/about', {
				templateUrl: 'partials/about.html'
			}).
			when('/game/:game', {
				templateUrl: 'partials/articles-game.html',
				controller: 'ArticleGameCtrl'
			}).
			when('/stream/:game', {
				templateUrl: 'partials/streams-game.html',
				controller: 'StreamGameCtrl'
			}).
			otherwise({
				templateUrl: 'partials/404.html',
			});

		// $locationProvider.html5Mode(true);
	}]);