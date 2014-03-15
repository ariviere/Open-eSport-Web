'use strict';

/* Controllers */

var homeController = angular.module('homeController', []);

homeController.controller('HomeCtrl', ['$scope', '$rootScope', '$resource', 'Cookies', '$filter', 
function($scope, $rootScope, $resource, $Cookies, $filter) {
    getGamesPosition();

    getArticles();

    $rootScope.filterArticles = function(){
        $scope.posts = {};

        angular.forEach($rootScope.gamesInfo, function(game, i){
            $scope.posts[game.id] = [];
        });

        angular.forEach($rootScope.articles, function(article, i){
            angular.forEach($rootScope.websites, function(value, key){
                if(article.website === key && $rootScope.websites[key].enabled === true){
                    var found = false;
                    angular.forEach($rootScope.gamesInfo, function(game, j){
                        if(article.category === game.id){
                            found = true;
                            $scope.posts[game.id].push(article);
                        }
                    });

                    if(!found)
                        $scope.posts.others.push(article)
                }
            });
        });
    }

    $scope.move_bloc = function(left, direction){
        var right;

        if(direction === "left"){
            right = (parseInt(left)-1).toString();
        }else if(direction === "right"){
            right = (parseInt(left)+1).toString();
        }

        var leftGameIndice = gameIndice(left)
        var rightGameIndice = gameIndice(right);

        var temp = $rootScope.gamesInfo[leftGameIndice].position;
        $rootScope.gamesInfo[leftGameIndice].position = $rootScope.gamesInfo[rightGameIndice].position;
        $rootScope.gamesInfo[rightGameIndice].position = temp;

        var indiceLeft = $rootScope.gamesInfo[leftGameIndice].id + '_position';
        var indiceRight = $rootScope.gamesInfo[rightGameIndice].id + '_position';

        $Cookies.setItem(indiceLeft, right.toString(), Infinity);
        $Cookies.setItem(indiceRight, left.toString(), Infinity);
    }

    $scope.previousPage = function(indice){
        $rootScope.gamesInfo[gameIndice(indice)].page--;
    }

    $scope.nextPage = function(indice){
        $rootScope.gamesInfo[gameIndice(indice.toString())].page++;
    }

    $scope.orderArticles = '-pubDate';
    $scope.orderGames = 'position';
    $scope.page_size = 12;

    function getArticles(requestArticles){
        var requestArticles = $resource('http://localhost:5000/posts/web');
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

    function getGamesPosition(){
        angular.forEach($rootScope.gamesInfo, function(game, i){
            var cookieName = game.id + '_position';
            if($Cookies.hasItem(cookieName)){
                game.position = $Cookies.getItem(cookieName);
            }
        });
    }

    function gameIndice(indice){
        var result;
        angular.forEach($rootScope.gamesInfo, function(game, i){
            if(game.position === indice){
                result = i;
            }
        });
        return result;
    }
}]);