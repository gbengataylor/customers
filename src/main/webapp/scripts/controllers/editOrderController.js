

angular.module('customers').controller('EditOrderController', function($scope, $routeParams, $location, flash, OrderResource , CustomerResource, OrderLineResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.order = new OrderResource(self.original);
            CustomerResource.queryAll(function(items) {
                $scope.customerSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.order.customer && item.id == $scope.order.customer.id) {
                        $scope.customerSelection = labelObject;
                        $scope.order.customer = wrappedObject;
                        self.original.customer = $scope.order.customer;
                    }
                    return labelObject;
                });
            });
            OrderLineResource.queryAll(function(items) {
                $scope.orderlinesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.order.orderlines){
                        $.each($scope.order.orderlines, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.orderlinesSelection.push(labelObject);
                                $scope.order.orderlines.push(wrappedObject);
                            }
                        });
                        self.original.orderlines = $scope.order.orderlines;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The order could not be found.'});
            $location.path("/Orders");
        };
        OrderResource.get({OrderId:$routeParams.OrderId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.order);
    };

    $scope.save = function() {
        var successCallback = function(){
            flash.setMessage({'type':'success','text':'The order was updated successfully.'}, true);
            $scope.get();
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        $scope.order.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Orders");
    };

    $scope.remove = function() {
        var successCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The order was deleted.'});
            $location.path("/Orders");
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        }; 
        $scope.order.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("customerSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.order.customer = {};
            $scope.order.customer.id = selection.value;
        }
    });
    $scope.orderlinesSelection = $scope.orderlinesSelection || [];
    $scope.$watch("orderlinesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.order) {
            $scope.order.orderlines = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.order.orderlines.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});