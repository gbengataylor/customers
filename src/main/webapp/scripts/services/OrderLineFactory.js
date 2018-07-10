angular.module('customers').factory('OrderLineResource', function($resource){
    var resource = $resource('rest/orderlines/:OrderLineId',{OrderLineId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});