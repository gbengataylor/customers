

angular.module('customers').controller('EditOrderLineController', function($scope, $routeParams, $location, flash, OrderLineResource , ArticleResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.orderLine = new OrderLineResource(self.original);
            ArticleResource.queryAll(function(items) {
                $scope.articleSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.orderLine.article && item.id == $scope.orderLine.article.id) {
                        $scope.articleSelection = labelObject;
                        $scope.orderLine.article = wrappedObject;
                        self.original.article = $scope.orderLine.article;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The orderLine could not be found.'});
            $location.path("/OrderLines");
        };
        OrderLineResource.get({OrderLineId:$routeParams.OrderLineId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.orderLine);
    };

    $scope.save = function() {
        var successCallback = function(){
            flash.setMessage({'type':'success','text':'The orderLine was updated successfully.'}, true);
            $scope.get();
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        $scope.orderLine.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/OrderLines");
    };

    $scope.remove = function() {
        var successCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The orderLine was deleted.'});
            $location.path("/OrderLines");
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        }; 
        $scope.orderLine.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("articleSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.orderLine.article = {};
            $scope.orderLine.article.id = selection.value;
        }
    });
    
    $scope.get();
});