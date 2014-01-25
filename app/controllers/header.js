var headerControllers = angular.module('headerControllers', []);

headerControllers.controller('navCtrl', ['$scope', '$rootScope', 'Cookies', '$resource', '$http', '$translate', function($scope, $rootScope, $Cookies, $resource, $http, $translate) {
	var request = $resource('resources/websites.json', {});
	
	$scope.changeLanguage = function (langKey) {
	    $translate.uses(langKey);
	    $Cookies.setItem('language', langKey, Infinity) ;
	    setDisabledWebsites(langKey);
	    $rootScope.filterArticles();
	};

	var language = "en";
	if($Cookies.hasItem('language')){
		language = $Cookies.getItem('language');
		$translate.uses(language);
	}
	else{
		language = window.navigator.userLanguage || window.navigator.language;
		if(language === "fr")
			$translate.uses("fr");
	}

	$rootScope.moveBlocs = false;

	$http.get('app/resources/websites.json').success(function(data) {
		$rootScope.websites = data;
		$scope.websitesArrayFR = [];
		$scope.websitesArrayEN = [];
		angular.forEach($rootScope.websites, function(value, key){
			if($rootScope.websites[key].lang === "fr")
				$scope.websitesArrayFR.push(key);
			else if($rootScope.websites[key].lang === "en")
				$scope.websitesArrayEN.push(key);
		});
		setDisabledWebsites(language);
	});

	$http.get('app/resources/games.json').success(function(data) {
		$rootScope.gamesInfo = data;
	});

	$scope.showWebsite = function(website_selected){
		angular.forEach($rootScope.websites, function(value, key){
			if(website_selected === key){
				$rootScope.websites[key].enabled = !$rootScope.websites[key].enabled;
				$Cookies.setItem(key, $rootScope.websites[key].enabled.toString(), Infinity);
			}
		});

		$rootScope.filterArticles();
	}

	$scope.canMoveBlocs = function(){
		$rootScope.moveBlocs = !$rootScope.moveBlocs;
	}

	function setDisabledWebsites(language){
		angular.forEach($rootScope.websites, function(value, key){
			if($Cookies.getItem(key) === 'false' || ($rootScope.websites[key].lang !== language && !$Cookies.hasItem(key))){
				$rootScope.websites[key].enabled = false;
			}else
				$rootScope.websites[key].enabled = true;
		});
	}

}]);
