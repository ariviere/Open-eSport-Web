var headerControllers = angular.module('headerControllers', ['ngCookies']);

headerControllers.controller('navCtrl', ['$scope', '$rootScope', '$cookies', '$resource', function($scope, $rootScope, $cookies, $resource) {
	var request = $resource('resources/websites.json');
	
	$scope.websiteIds = { 'Team aAa': 'teamaaa', 'O Gaming': 'ogaming', 'Millenium': 'millenium', 'Thunderbot': 'thunderbot', 'IEWT': 'iewt'
                        , 'VaKarM': 'vakarm', 'Reddit': 'reddit', 'onGamers': 'ongamers', 'SK Gaming': 'skgaming', 'HLTV': 'hltv', 'TeamLiquid': 'teamliquid'
                        , 'joinDOTA': 'joindota'};

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
			}
		});

		$rootScope.filterArticles();
	}
}]);