
angular.module('customers').controller('NewOrderController', function ($scope, $location, locationParser, flash, OrderResource , CustomerResource, OrderLineResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.order = $scope.order || {};
    
    $scope.customerList = CustomerResource.queryAll(function(items){
        $scope.customerSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("customerSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.order.customer = {};
            $scope.order.customer.id = selection.value;
        }
    });
    
    $scope.orderlinesList = OrderLineResource.queryAll(function(items){
        $scope.orderlinesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("orderlinesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.order.orderlines = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.order.orderlines.push(collectionItem);
            });
        }
    });


    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The order was created successfully.'});
            $location.path('/Orders');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        OrderResource.save($scope.order, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Orders");
    };
});