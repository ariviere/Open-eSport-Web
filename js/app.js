'use strict'

var articleApp = angular.module('articleApp', [
	'ngRoute',
	'ngCookies',
	'ngResource',
	'articleFilters',
	'articleControllers',
	'headerControllers',
	'articleServices'
]);

articleApp.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
			when('/', {
				templateUrl: 'partials/articles-list.html',
				controller: 'ArticleListCtrl'
			}).
			when('/:game', {
				templateUrl: 'partials/articles-game.html',
				controller: 'ArticleGameCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});
	}]);