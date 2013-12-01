'use strict';

/* Controllers */

var articleControllers = angular.module('articleControllers', []);

articleControllers.controller('ArticleListCtrl', ['$scope', '$rootScope', '$resource', '$cookies', '$filter', 'Article', 'Game', 
function($scope, $rootScope, $resource, $cookies, $filter, Article, Game) {
  
    console.log($rootScope.websites[0]);
    
    $scope.gameTitles = { 'lol': 'LEAGUE OF LEGENDS', 'sc2': 'STARCRAFT II', 'dota2': 'DOTA 2', 'csgo': 'COUNTER STRIKE : GO', 'others': 'AUTRES'};

    $scope.websiteIds = { 'Team aAa': 'teamaaa', 'O Gaming': 'ogaming', 'Millenium': 'millenium', 'Thunderbot': 'thunderbot', 'IEWT': 'iewt'
                        , 'VaKarM': 'vakarm', 'Reddit': 'reddit', 'onGamers': 'ongamers', 'SK Gaming': 'skgaming', 'HLTV': 'hltv', 'TeamLiquid': 'teamliquid'};

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

      // });
    });
    
    $rootScope.filterArticles = function(){
        $scope.lol = [];
        $scope.sc2 = [];
        $scope.dota2 = [];
        $scope.csgo = [];
        $scope.others = [];

        angular.forEach($rootScope.articles, function(article, i){
            angular.forEach($rootScope.websites, function(website, j){
                if(article.website === website.name && (typeof $cookies[website.name] === 'undefined' || $cookies[website.name] == "true")){
                    if(article.category === "lol"){
                        $scope.lol.push(article);
                    }
                    else if(article.category === "sc2"){
                        $scope.sc2.push(article);
                    }
                    else if(article.category === "dota2"){
                        $scope.dota2.push(article);
                    }
                    else if(article.category === "csgo"){
                        $scope.csgo.push(article);
                    }
                    else{
                        $scope.others.push(article)
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

        $scope.page_size = 12;

        // $scope.setArticlesPage('lol');
        // console.log("current_page: " + $scope.pagination['lol'].current_page);

        //, 'sc2': 'STARCRAFT II', 'dota2': 'DOTA 2', 'csgo': 'COUNTER STRIKE : GO', 'others': 'AUTRES'};


    }
    
    $scope.orderProp = '-pubDate';

}]);

articleControllers.filter('startFrom', function() {
    return function(input, start) {
        if(typeof input === 'undefined')
            return input;

        console.log("FILTERING input: " + input + ", start: " + start);
        start = +start; //parse to int
        return input.slice(start);
    }
});

articleControllers.controller('ArticleGameCtrl', ['$scope', '$rootScope', '$resource', '$cookies', '$routeParams', '$filter', 'Article', 
function($scope, $rootScope, $resource, $cookies, $routeParams, $filter, Article) {

    $scope.game = $routeParams.game; 

    var gameTitles = { 'lol': 'LEAGUE OF LEGENDS', 'sc2': 'STARCRAFT II', 'dota2': 'DOTA 2', 'csgo': 'COUNTER STRIKE : GO', 'others': 'AUTRES'};
    $scope.websiteIds = { 'Team aAa': 'teamaaa', 'O Gaming': 'ogaming', 'Millenium': 'millenium', 'Thunderbot': 'thunderbot', 'IEWT': 'iewt'
                        , 'VaKarM': 'vakarm', 'Reddit': 'reddit', 'onGamers': 'ongamers', 'SK Gaming': 'skgaming', 'HLTV': 'hltv', 'TeamLiquid': 'teamliquid'};

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
