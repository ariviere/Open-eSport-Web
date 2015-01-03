'use strict';

/* Controllers */

var homeController = angular.module('homeController', []);

homeController.controller('HomeCtrl', ['$scope', '$rootScope', '$resource', 'Cookies', '$filter', 
function($scope, $rootScope, $resource, $Cookies, $filter) {
    var address = "http://openesport.herokuapp.com/askmongo/all/games/%1$s/websites/%2$s/page/%3$s";

    $scope.articlesLoaded = false;

    $rootScope.refreshArticles = function(addPage){
        getArticles(addPage);
    }

    $scope.posts = [];
    $scope.page = 0;
    $scope.orderArticles = '-pubDate';

    if($rootScope.gamesInfo !== undefined && $rootScope.websites !== undefined){
        console.log($rootScope.gamesInfo);
        console.log($rootScope.websites);
        $rootScope.refreshArticles(false);
    }

    function getArticles(addPage){
        var games = "";
        var websites = "";

        $scope.articlesLoaded = false;

        if(addPage){
            $scope.page += 1;
        }else{
            $scope.posts = [];
            $scope.page = 0;
        }

        angular.forEach($rootScope.gamesInfo, function(value, key){
            if(value.enabled === true){
                games += value.id + ",";
            }
        });

        angular.forEach($rootScope.websites, function(value, key){
            if(value.enabled === true){
                websites += value.name + ",";
            }
        });

        var requestAddress = address;
        requestAddress = requestAddress.replace("%1$s", games);
        requestAddress = requestAddress.replace("%2$s", websites);
        requestAddress = requestAddress.replace("%3$s", $scope.page);

        var requestArticles = $resource(requestAddress);
        var today = new Date();
        today = today.getDate() + "-" + (today.getMonth() + 1);
        requestArticles.query(function(articles){
            angular.forEach(articles, function(article, i){
                //date
                var articleDayMonth = new Date(article.pubDate).getDate() + "-" + (new Date(article.pubDate).getMonth() +1);
                if(today === articleDayMonth)
                    article.date = $filter('date')(article.pubDate, 'HH:mm');
                else
                    article.date = $filter('date')(article.pubDate, 'dd/MM');

                if(article.author === null || article.author === article.website){
                    article.author = article.website;
                }else{
                    article.author += " - " + article.website;
                }

                if(article.website === "Reddit")
                    article.link = article.link.substr(0, article.link.length-8);

                $scope.posts.push(article);
            });
            // $rootScope.filterArticles();
            $scope.articlesLoaded = true;
        });
    }

}]);