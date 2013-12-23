angular.module('oeFilters', []).filter('startFrom', function(){
	return function(input, start) {
        if(typeof input === 'undefined')
            return input;

        start = +start; //parse to int
        return input.slice(start);
    }
})