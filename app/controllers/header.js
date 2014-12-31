var headerControllers = angular.module('headerControllers', []);

headerControllers.controller('navCtrl', ['$scope', '$rootScope', 'Cookies', '$resource', '$http', '$translate', function($scope, $rootScope, $Cookies, $resource, $http, $translate) {
	var request = $resource('resources/websites.json', {});

	$rootScope.language = window.navigator.userLanguage || window.navigator.language;
	if($rootScope.language === "fr")
		$translate.uses("fr");
	else{
		$rootScope.language = "en";
		$translate.uses("en");
	}

	$http.get('app/resources/websites.json').success(function(data) {
		$rootScope.websites = data;
		initFirstLaunch();
		setDisabledWebsites($rootScope.language);

		$http.get('app/resources/games.json').success(function(data) {
			$rootScope.gamesInfo = data;
			initGameFilters();
			$rootScope.refreshArticles(false);
		});
	});

	$scope.showWebsite = function(website_selected){
		angular.forEach($rootScope.websites, function(value, key){
			if(website_selected === key){
				$rootScope.websites[key].enabled = !$rootScope.websites[key].enabled;
				$Cookies.setItem(key, $rootScope.websites[key].enabled.toString(), Infinity);
			}
		});

		$rootScope.refreshArticles(false);
	}

	$scope.showGame = function(game_selected){
		angular.forEach($rootScope.gamesInfo, function(value, key){
			if(game_selected === key){
				$rootScope.gamesInfo[key].enabled = !$rootScope.gamesInfo[key].enabled;
				$Cookies.setItem(key, $rootScope.gamesInfo[key].enabled.toString(), Infinity);
			}
		});

		$rootScope.refreshArticles(false);
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

	function initFirstLaunch(){
		if($Cookies.getItem("firstLaunch") !== "false"){
			angular.forEach($rootScope.websites, function(value, key){
				if(($rootScope.language === "en" && value.lang !== "en") || ($rootScope.language === "fr" && value.lang !== "fr")){
					$Cookies.setItem(key, "false", Infinity);
				}
			});	

			$Cookies.setItem("firstLaunch", "false", Infinity);
		}
	}

	$scope.showMore = function(){
		if($('#hidden-filter-container').css("display") === "none")
			$('#hidden-filter-container').css({"display":"block"});
		else{
			$('#hidden-filter-container').css({"display":"none"});
		}
	}

}]);
