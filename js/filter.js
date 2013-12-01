angular.module('articleFilters', []).filter('paginate', function() {
	return function(articles){

		var startArticle = $rootScope.pagination['lol'].current_page*$rootScope.articles_per_page;
		var finishArticle = $rootScope.pagination['lol'].current_page*$rootScope.articles_per_page + 12;
		if(finishArticle > articles.length)
			finishArticle = articles.length

		return articles.slice(startArticle, finishArticle);
	}
});

angular.module('articleFilters', []).filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});