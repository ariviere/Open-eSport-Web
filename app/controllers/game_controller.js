var gameController = angular.module('gameController', []);

gameController.controller('GameCtrl', ['$scope', '$rootScope', '$resource', '$routeParams', '$filter',
function($scope, $rootScope, $resource, $routeParams, $filter) {

    var gameId = $routeParams.game; 
    $scope.hideStreams = false;

    $scope.articles_page_size = 12;
    $scope.streams_page_size = 11;

    angular.forEach($rootScope.gamesInfo, function(game, i){
        if(game.id === gameId){
            $scope.game = game;
        }
    });

    var request = $resource('http://openesport.nodejitsu.com/game/' + $scope.game.id);
    
    var today = new Date();
    today = today.getDate() + "-" + (today.getMonth() + 1);

    request.query(function(articles){
        $rootScope.articles = articles;
        $scope.gameArticles = [];

        angular.forEach(articles, function(article, i){
            //date
            var articleDayMonth = new Date(article.pubDate).getDate() + "-" + (new Date(article.pubDate).getMonth() +1);
            if(today === articleDayMonth)
                article.date = $filter('date')(article.pubDate, 'HH:mm');
            else
                article.date = $filter('date')(article.pubDate, 'dd/MM');

            if(article.author === null || article.author === article.website)
                article.author = article.website;
            else
                article.author = article.author + " - " + article.website;

            if(article.website === "Reddit")
                article.link = article.link.substr(0, article.link.length-8);

        })
        $rootScope.filterArticles();

    });

    $scope.gameStreams = [];
    $scope.streamPage = 0;
    
    var streamsUrl;

    if($scope.game.twitch_name === "autres")
        streamsUrl = "https://api.twitch.tv/kraken/streams?callback=?";
    else
        streamsUrl = "https://api.twitch.tv/kraken/streams?game=" + $scope.game.twitch_name + "&callback=?";

    console.log(streamsUrl);
    
    $.getJSON(streamsUrl, function (data) {
        angular.forEach(data.streams, function(item, index){
            var stream = {};
            stream.name = item.channel.display_name;
            stream.img = item.channel.logo;
            stream.status = item.channel.status;
            stream.link = item.channel.url;
            stream.viewers = item.viewers;
            $scope.$apply(
                $scope.gameStreams.push(stream)
            );
        });

        if($scope.gameStreams.length === 0 || $scope.gameStreams == []){
            $scope.hideStreams = true;
            console.log($scope.gameStreams.length);
        }
    });

    $rootScope.filterArticles = function(){
        $scope.gameArticles = [];

        angular.forEach($rootScope.articles, function(article, i){
            angular.forEach($rootScope.websites, function(value, key){
                if(article.website === key && $rootScope.websites[key].enabled === true){
                    $scope.gameArticles.push(article);
                }
            });
        })
    }

    $scope.orderArticles = '-pubDate';
    $scope.orderStreams = '-viewers';

    $scope.previousPage = function(type){
        if(type === "articles")
            $scope.game.page--;
        else if(type === "streams")
            $scope.streamPage--;
    }

    $scope.nextPage = function(type){
        if(type === "articles")
            $scope.game.page++;
        else if(type === "streams")
            $scope.streamPage++;
    }
}]);