'use strict';

/* Controllers */

var articleControllers = angular.module('articleControllers', []);

articleControllers.controller('ArticleListCtrl', ['$scope', '$rootScope', '$resource', '$cookies', '$filter', 
function($scope, $rootScope, $resource, $cookies, $filter) {
  
    
    // angular.forEach($rootScope.gamesInfo, function(game, i){
    //     var cookieName = game.id + '_position';
    //     $cookies[cookieName] = i;
    // });

    angular.forEach($rootScope.gamesInfo, function(game, i){
        var cookieName = game.id + '_position';
        if(typeof $cookies[cookieName] != 'undefined')
            game.position = parseInt($cookies[cookieName]);
    });

    var requestArticles = $resource('http://openesport.jit.su/posts/web');

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
    
    $rootScope.filterArticles = function(){
        $scope.posts = {};

        angular.forEach($rootScope.gamesInfo, function(game, i){
            $scope.posts[game.id] = [];
        });

        angular.forEach($rootScope.articles, function(article, i){
            angular.forEach($rootScope.websites, function(value, key){
                if(article.website === key && (typeof $cookies[key] === 'undefined' || $cookies[key] == "true")){
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

        $scope.page_size = 12;

    }

    $scope.move_bloc = function(left, right){
        console.log(left + " " + right);

        var leftGameIndice = gameIndice(left)
        var rightGameIndice = gameIndice(right);

        angular.forEach($rootScope.gamesInfo, function(game, i){
            if(game.position == left)
                leftGameIndice = i;
            else if(game.position == right)
                rightGameIndice = i;
        });

        console.log(leftGameIndice + " " + rightGameIndice);
        var temp = $rootScope.gamesInfo[leftGameIndice].position;
        $rootScope.gamesInfo[leftGameIndice].position = $rootScope.gamesInfo[rightGameIndice].position;
        $rootScope.gamesInfo[rightGameIndice].position = temp;

        var indiceLeft = $rootScope.gamesInfo[leftGameIndice].id + '_position';
        var indiceRight = $rootScope.gamesInfo[rightGameIndice].id + '_position';
        console.log(indiceLeft + ":" + right + " " + indiceRight + ":" + left);
        $cookies[indiceLeft] = right.toString();
        $cookies[indiceRight] = left.toString();
    }

    $scope.previousPage = function(indice){
        $rootScope.gamesInfo[gameIndice(indice)].page--;
    }

    $scope.nextPage = function(indice){
        $rootScope.gamesInfo[gameIndice(indice)].page++;
    }

    $scope.orderArticles = '-pubDate';
    $scope.orderGames = 'position';

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

    var gameId = $routeParams.game; 

    angular.forEach($rootScope.gamesInfo, function(game, i){
        if(game.id === gameId){
            console.log("game:" + game.id);
            $scope.game = game;
        }
    });

    var request = $resource('http://http://openesport.jit.su/game/' + $scope.game.id);
    
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

            if(article.website === "Reddit")
                article.link = article.link.substr(0, article.link.length-8);

        })
        $rootScope.filterArticles();

    });

    $rootScope.filterArticles = function(){
        $scope.gameArticles = [];

        angular.forEach($rootScope.articles, function(article, i){
            angular.forEach($rootScope.websites, function(value, key){
                if(article.website === key && (typeof $cookies[key] === 'undefined' || $cookies[key] == "true")){
                    $scope.gameArticles.push(article);
                }
            });
        })
    }

    $scope.orderProp = '-pubDate';

}]);
