var headerControllers = angular.module('headerControllers', ['ngCookies']);

headerControllers.controller('navCtrl', ['$scope', '$rootScope', '$cookies', '$resource', '$http', function($scope, $rootScope, $cookies, $resource, $http) {
	var request = $resource('resources/websites.json', {});
	
	$http.get('resources/websites.json').success(function(data) {
		$rootScope.websites = data;
		$scope.websitesArray = [];
		angular.forEach($rootScope.websites, function(value, key){
			$scope.websitesArray.push(key);

            if($cookies[key] === 'false'){
				$rootScope.websites[key].enabled = false;
			}
		});
	});

	$http.get('resources/games.json').success(function(data) {
		$rootScope.gamesInfo = data;
	});

	$scope.showWebsite = function(website_selected){
		angular.forEach($rootScope.websites, function(value, key){
			if(website_selected === key){
				$rootScope.websites[key].enabled = !$rootScope.websites[key].enabled;
				console.log(key);
				$cookies[key] = $rootScope.websites[key].enabled.toString();
			}
		});

		$rootScope.filterArticles();
	}
}]);