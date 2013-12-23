oeApp.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider){
		$routeProvider.
			when('/', {
				templateUrl: 'app/views/home.html',
				controller: 'HomeCtrl'
			}).
			when('/about', {
				templateUrl: 'app/views/about.html'
			}).
			when('/game/:game', {
				templateUrl: 'app/views/game.html',
				controller: 'GameCtrl'
			}).
			otherwise({
				templateUrl: 'app/views/404.html',
			});

		// $locationProvider.html5Mode(true);
	}]);