var articleServices = angular.module('articleServices', ['ngResource']);

articleServices.factory('Article', ['$resource',
	function($resource){
		return $resource('http://openesport.herokuapp.com/posts/all/ ');
	}]);

articleServices.factory('GameArticle', ['$resource',
	function($resource){
		return $resource('http://openesport.herokuapp.com/posts/all/ ');
	}]);

articleServices.factory('Game', ['$resource',
	function($resource){
		return $resource('resources/games.json');
	}]);

var headerServices = angular.module('headerServices', ['ngResource']);

headerServices.factory('HeaderWebsiteService', ['$resource',
	function($resource){
		return $resource('resources/websites.json');
	}]);