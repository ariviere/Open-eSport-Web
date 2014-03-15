var gameController = angular.module('gameController', []);

gameController.controller('GameCtrl', ['$scope', '$rootScope', '$resource', '$routeParams', '$filter',
function($scope, $rootScope, $resource, $routeParams, $filter) {

    var gameId = $routeParams.game; 
    
    angular.forEach($rootScope.gamesInfo, function(game, i){
        if(game.id === gameId){
            $scope.game = game;
        }
    });

    getArticles();

    getStreams();

    $rootScope.filterArticles = function(){
        $scope.gameArticles = [];

        angular.forEach($rootScope.articles, function(article, i){
            if(article.category === gameId){
                angular.forEach($rootScope.websites, function(value, key){
                    if(article.website === key && $rootScope.websites[key].enabled === true){
                        $scope.gameArticles.push(article);
                    }
                });
            }
        })
    }

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

    $scope.orderArticles = '-pubDate';
    $scope.orderStreams = '-viewers';

    $scope.hideStreams = false;

    $scope.articles_page_size = 12;
    $scope.streams_page_size = 11;


    function getArticles(requestArticles){
        var requestArticles = $resource('http://openesport.nodejitsu.com/posts/web');
        var today = new Date();
        today = today.getDate() + "-" + (today.getMonth() + 1);
        requestArticles.query(function(articles){
            $rootScope.articles = articles;

            angular.forEach(articles, function(article, i){
                //date
                if(article.category === gameId){
                    var articleDayMonth = new Date(article.pubDate).getDate() + "-" + (new Date(article.pubDate).getMonth() +1);
                    if(today === articleDayMonth)
                        article.date = $filter('date')(article.pubDate, 'HH:mm');
                    else
                        article.date = $filter('date')(article.pubDate, 'dd/MM');

                    if(article.website === "Reddit")
                        article.link = article.link.substr(0, article.link.length-8);
                }
            });
            $rootScope.filterArticles();
        });
    }

    function getStreams(){
        $scope.gameStreams = [];
        $scope.streamPage = 0;
        
        var streamsUrl;

        if($scope.game.twitch_name === "autres")
            streamsUrl = "https://api.twitch.tv/kraken/streams?callback=?";
        else
            streamsUrl = "https://api.twitch.tv/kraken/streams?game=" + $scope.game.twitch_name + "&callback=?";

        
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
            }
        });
    }

}]);