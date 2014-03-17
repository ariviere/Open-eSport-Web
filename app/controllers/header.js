var headerControllers = angular.module('headerControllers', []);

headerControllers.controller('navCtrl', ['$scope', '$rootScope', 'Cookies', '$resource', '$http', '$translate', function($scope, $rootScope, $Cookies, $resource, $http, $translate) {
	var request = $resource('resources/websites.json', {});

	language = window.navigator.userLanguage || window.navigator.language;
	if(language === "fr")
		$translate.uses("fr");
	else{
		language = "en";
		$translate.uses("en");
	}

	$http.get('app/resources/websites.json').success(function(data) {
		$rootScope.websites = data;
		setDisabledWebsites(language);
	});

	$http.get('app/resources/games.json').success(function(data) {
		$rootScope.gamesInfo = data;
		initGameFilters()
	});

	$http.get('app/resources/languages.json').success(function(data) {
		$rootScope.languages = data;
		$rootScope.languages[language].enabled = true;
		initLanguageFilters();
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

	$scope.showGame = function(game_selected){
		angular.forEach($rootScope.gamesInfo, function(value, key){
			if(game_selected === key){
				$rootScope.gamesInfo[key].enabled = !$rootScope.gamesInfo[key].enabled;
				$Cookies.setItem(key, $rootScope.gamesInfo[key].enabled.toString(), Infinity);
			}
		});

		$rootScope.filterArticles();
	}

	$scope.showLanguage = function(language_selected){
		angular.forEach($rootScope.languages, function(value, key){
			if(language_selected === key){
				$rootScope.languages[key].enabled = !$rootScope.languages[key].enabled;
				$Cookies.setItem(key, $rootScope.languages[key].enabled.toString(), Infinity);
			}
		});

		$rootScope.filterArticles();
	}

	function setDisabledWebsites(language){
		angular.forEach($rootScope.websites, function(value, key){
			if($Cookies.getItem(key) === 'false' || value.enabled === false){
				$rootScope.websites[key].enabled = false;
			}else
				$rootScope.websites[key].enabled = true;
		});
	}

	function initGameFilters(){
		$scope.gameIcons = [];
		angular.forEach($rootScope.gamesInfo, function(value, key){
			$scope.gameIcons.push(value);
			if($Cookies.getItem(key) === 'false'){
				$rootScope.gamesInfo[key].enabled = false;
			}else
				$rootScope.gamesInfo[key].enabled = true;
		});
	}

	function initLanguageFilters(){
		angular.forEach($rootScope.languages, function(value, key){
			if($Cookies.getItem(key) === 'false'){
				$rootScope.languages[key].enabled = false;
			}else if($Cookies.getItem(key) === 'true'){
				$rootScope.languages[key].enabled = true;
			}
		});
	}

	$scope.showMore = function(){
		if($('#hidden-filter-container').css("display") === "none")
			$('#hidden-filter-container').css({"display":"block"});
		else{
			$('#hidden-filter-container').css({"display":"none"});
		}
	}

}]);
