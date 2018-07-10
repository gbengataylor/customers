
angular.module('customers').controller('NewOrderLineController', function ($scope, $location, locationParser, flash, OrderLineResource , ArticleResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.orderLine = $scope.orderLine || {};
    
    $scope.articleList = ArticleResource.queryAll(function(items){
        $scope.articleSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("articleSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.orderLine.article = {};
            $scope.orderLine.article.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The orderLine was created successfully.'});
            $location.path('/OrderLines');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        OrderLineResource.save($scope.orderLine, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/OrderLines");
    };
});