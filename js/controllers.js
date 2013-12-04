'use strict';

/* Controllers */

var articleControllers = angular.module('articleControllers', []);

articleControllers.controller('ArticleListCtrl', ['$scope', '$rootScope', '$resource', '$cookies', '$filter', 
function($scope, $rootScope, $resource, $cookies, $filter) {
  
    
    $scope.games = [];

    if(typeof $cookies['lolnumber'] != 'undefined')
        $scope.games[$cookies['lolnumber']] = {'short': 'lol', 'long': 'LEAGUE OF LEGENDS'};
    else
        $scope.games[0] = {'short': 'lol', 'long': 'LEAGUE OF LEGENDS'};

    if(typeof $cookies['sc2number'] != 'undefined')
        $scope.games[$cookies['sc2number']] = {'short': 'sc2', 'long': 'STARCRAFT II'};
    else
        $scope.games[1] = {'short': 'sc2', 'long': 'STARCRAFT II'};
    
    if(typeof $cookies['dota2number'] != 'undefined')
        $scope.games[$cookies['dota2number']] = {'short': 'dota2', 'long': 'DOTA 2'};
    else
        $scope.games[2] = {'short': 'dota2', 'long': 'DOTA 2'};
    
    if(typeof $cookies['csgonumber'] != 'undefined')
        $scope.games[$cookies['csgonumber']] = {'short': 'csgo', 'long': 'COUNTER STRIKE : GO'};
    else
        $scope.games[3] = {'short': 'csgo', 'long': 'COUNTER STRIKE : GO'};
    
    if(typeof $cookies['othersnumber'] != 'undefined')
        $scope.games[$cookies['othersnumber']] = {'short': 'others', 'long': 'AUTRES'};
    else
        $scope.games[4] = {'short': 'others', 'long': 'AUTRES'};
    
    $scope.websiteIds = { 'Team aAa': 'teamaaa', 'O Gaming': 'ogaming', 'Millenium': 'millenium', 'Thunderbot': 'thunderbot', 'IEWT': 'iewt'
                        , 'VaKarM': 'vakarm', 'Reddit': 'reddit', 'onGamers': 'ongamers', 'SK Gaming': 'skgaming', 'HLTV': 'hltv', 'TeamLiquid': 'teamliquid'
                        , 'joinDOTA': 'joindota'};

    var request = $resource('http://openesport.herokuapp.com/posts/all');

    request.query(function(articles){
        $rootScope.articles = articles;

        angular.forEach(articles, function(article, i){
            //title
            if(article.title.length > 62)
                article.title = article.title.substr(0, 62) + " [...]";

            //date
            article.date = $filter('date')(article.pubDate, 'dd/MM');

            if(article.website === "Reddit")
                article.link = article.link.substr(0, article.link.length-8);
        });
        $rootScope.filterArticles();

    });
    
    $rootScope.filterArticles = function(){
        $scope.posts = {};

        $scope.posts.lol = [];
        $scope.posts.sc2 = [];
        $scope.posts.dota2 = [];
        $scope.posts.csgo = [];
        $scope.posts.others = [];

        angular.forEach($rootScope.articles, function(article, i){
            angular.forEach($rootScope.websites, function(website, j){
                if(article.website === website.name && (typeof $cookies[website.name] === 'undefined' || $cookies[website.name] == "true")){
                    if(article.category === "lol"){
                        $scope.posts.lol.push(article);
                    }
                    else if(article.category === "sc2"){
                        $scope.posts.sc2.push(article);
                    }
                    else if(article.category === "dota2"){
                        $scope.posts.dota2.push(article);
                    }
                    else if(article.category === "csgo"){
                        $scope.posts.csgo.push(article);
                    }
                    else{
                        $scope.posts.others.push(article)
                    }
                }
            });
        });

        $scope.current_page = { 
            'lol': 0,
            'sc2': 0,
            'dota2': 0,
            'csgo': 0,
            'others': 0
        };

        console.log($scope.current_page[$scope.games[0]['short']]);
        $scope.page_size = 12;

    }

    $scope.move_bloc = function(left, right){
        var temp = $scope.games[left];
        $scope.games[left] = $scope.games[right];
        $scope.games[right] = temp;

        var indiceLeft = $scope.games[left].short + 'number';
        var indiceRight = $scope.games[right].short + 'number';
        $cookies[indiceLeft] = left.toString();
        $cookies[indiceRight] = right.toString();
    }

    $scope.previousPage = function(indice){
        console.log("previousPage " + $scope.games[indice]['short']);
        $scope.current_page[$scope.games[indice]['short']]=$scope.current_page[$scope.games[indice]['short']]-1;
    }

    $scope.nextPage = function(indice){
        console.log("nextPage " + $scope.games[indice]['short']);
        $scope.current_page[$scope.games[indice]['short']]=$scope.current_page[$scope.games[indice]['short']]+1;
    }
    
    $scope.orderProp = '-pubDate';

}]);

articleControllers.filter('startFrom', function() {
    return function(input, start) {
        if(typeof input === 'undefined')
            return input;

        start = +start; //parse to int
        return input.slice(start);
    }
});

articleControllers.controller('ArticleGameCtrl', ['$scope', '$rootScope', '$resource', '$cookies', '$routeParams', '$filter',
function($scope, $rootScope, $resource, $cookies, $routeParams, $filter) {

    $scope.game = $routeParams.game; 

    var gameTitles = { 'lol': 'LEAGUE OF LEGENDS', 'sc2': 'STARCRAFT II', 'dota2': 'DOTA 2', 'csgo': 'COUNTER STRIKE : GO', 'others': 'AUTRES'};
    $scope.websiteIds = { 'Team aAa': 'teamaaa', 'O Gaming': 'ogaming', 'Millenium': 'millenium', 'Thunderbot': 'thunderbot', 'IEWT': 'iewt'
                        , 'VaKarM': 'vakarm', 'Reddit': 'reddit', 'onGamers': 'ongamers', 'SK Gaming': 'skgaming', 'HLTV': 'hltv', 'TeamLiquid': 'teamliquid'
                        , 'joinDOTA': 'joindota'};

    $scope.game_title = gameTitles[$scope.game];

    var request = $resource('http://openesport.herokuapp.com/game/' + $scope.game);
    
    request.query(function(articles){
        $rootScope.articles = articles;
        $scope.gameArticles = [];

        angular.forEach(articles, function(article, i){
            //date
            article.date = $filter('date')(article.pubDate, 'dd/MM HH:mm');

            if(article.author === null || article.author === article.website)
                article.author = article.website;
            else
                article.author = article.author + " - " + article.website;

            $rootScope.filterArticles();
        })

    });

    $rootScope.filterArticles = function(){
        $scope.gameArticles = [];

        angular.forEach($rootScope.articles, function(article, i){
            angular.forEach($rootScope.websites, function(website, j){
                if(article.website === website.name && (typeof $cookies[website.name] === 'undefined' || $cookies[website.name] == "true")){
                    $scope.gameArticles.push(article);
                }
            });
        })
    }

    $scope.orderProp = '-pubDate';

}]);
