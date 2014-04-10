'use strict';

/* Controllers */

var homeController = angular.module('homeController', []);

homeController.controller('HomeCtrl', ['$scope', '$rootScope', '$resource', 'Cookies', '$filter', 
function($scope, $rootScope, $resource, $Cookies, $filter) {
    var allStreams = [];
    $scope.articlesLoaded = false;
    $scope.streamsLoaded = false;

    getArticles();
    getStreams();

    $rootScope.filterArticles = function(){
        $scope.posts = [];

        angular.forEach($rootScope.articles, function(article, i){

            var found = false;
            angular.forEach($rootScope.gamesInfo, function(game, i){
                if(article.category === game.id)
                    found = true;
            });
            
            if(!found){
              article.category = "others";
            }

            if($rootScope.websites[article.website].enabled === true && $rootScope.gamesInfo[article.category].enabled === true && $rootScope.languages[article.language].enabled === true)
                $scope.posts.push(article);
        });
        $scope.articlesLoaded = true;
        filterStreams();
    }


    $scope.nextPage = function(type){
        if(type === "news"){
            $scope.news_page_size += 30;
            console.log("news");
        }
        else if(type === "streams"){
            $scope.streams_page_size += 30;
            console.log("news");
        }
    }


    $scope.orderArticles = '-pubDate';
    $scope.news_page_size = 15;
    $scope.page_number = 0;
    
    $scope.orderStreams = '-viewers';
    $scope.articles_page_size = 12;
    $scope.streams_page_size = 11;
    $scope.streamPage = 0;

    function getArticles(requestArticles){
        var requestArticles = $resource('http://openesport.herokuapp.com/posts/web');
        var today = new Date();
        today = today.getDate() + "-" + (today.getMonth() + 1);
        requestArticles.query(function(articles){
            $rootScope.articles = articles;

            angular.forEach(articles, function(article, i){
                //date
                var articleDayMonth = new Date(article.pubDate).getDate() + "-" + (new Date(article.pubDate).getMonth() +1);
                if(today === articleDayMonth)
                    article.date = $filter('date')(article.pubDate, 'HH:mm');
                else
                    article.date = $filter('date')(article.pubDate, 'dd/MM');

                if(article.website === "Reddit")
                    article.link = article.link.substr(0, article.link.length-8);
            });
            $rootScope.filterArticles();
        });
    }

    function getStreams(){
        angular.forEach($rootScope.gamesInfo, function(value, key){
            var streamsUrl = "https://api.twitch.tv/kraken/streams?game=" + value.twitch_name + "&callback=?";
            $.getJSON(streamsUrl, function (data) {
                angular.forEach(data.streams, function(item, index){
                    var stream = {};
                    stream.name = item.channel.display_name;
                    stream.game = key;
                    stream.img = item.channel.logo;
                    stream.status = item.channel.status;
                    stream.link = item.channel.url;
                    stream.viewers = item.viewers;
                    allStreams.push(stream);
                });
                filterStreams();
                $scope.streamsLoaded = true;
           });
        });
        
    }

    function filterStreams(){
        $scope.gameStreams = [];

        allStreams.forEach(function(stream){
            if($rootScope.gamesInfo[stream.game].enabled === true){
                if(!$scope.$$phase){
                    $scope.$apply(
                        $scope.gameStreams.push(stream)
                    );
                }
                else{
                    $scope.gameStreams.push(stream);
                }
                
            }
        });

    }

}]);