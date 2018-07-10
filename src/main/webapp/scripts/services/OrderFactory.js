angular.module('customers').factory('OrderResource', function($resource){
    var resource = $resource('rest/orders/:OrderId',{OrderId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});