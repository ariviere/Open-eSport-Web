var headerControllers = angular.module('headerControllers', ['headerServices', 'ngCookies']);

headerControllers.controller('navCtrl', ['$scope', '$rootScope', '$cookies', '$resource', 'HeaderWebsiteService', function($scope, $rootScope, $cookies, $resource, HeaderWebsiteService) {
	var request = $resource('resources/websites.json');
	$scope.websiteIds = { 'Team aAa': 'teamaaa', 'O Gaming': 'ogaming', 'Millenium': 'millenium', 'Thunderbot': 'thunderbot', 'IEWT': 'iewt'
                        , 'VaKarM': 'vakarm', 'Reddit': 'reddit', 'onGamers': 'ongamers', 'SK Gaming': 'skgaming', 'HLTV': 'hltv', 'TeamLiquid': 'teamliquid'};

	request.query(function(data){
		$rootScope.websites = data;

		angular.forEach($rootScope.websites, function(website, i){
            if($cookies[website.name] === 'false'){
				website.enabled = false;
			}
		});

		// angular.forEach(data, function(website, i){
		// 	$
		// })
	});

	$scope.showWebsite = function(website_selected){
		console.log("cookie " + website_selected + " :" + $cookies[website_selected]);

		angular.forEach($rootScope.websites, function(website, i){
			if(website_selected === website.name){
			// if($cookie[website.name] === 'undefined' || $cookie[website.name]){
				website.enabled = !website.enabled;
				$cookies[website.name] = website.enabled.toString();
				console.log("website IF: " + website_selected + ", enabled: " + website.enabled + ", cookie " + website.name + " :" + $cookies[website.name]);
			}
		});

		$rootScope.filterArticles();
	}
}]);