
angular.module('customers').controller('NewArticleController', function ($scope, $location, locationParser, flash, ArticleResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.article = $scope.article || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The article was created successfully.'});
            $location.path('/Articles');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        ArticleResource.save($scope.article, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Articles");
    };
});