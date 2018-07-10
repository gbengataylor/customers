angular.module('customers').factory('ArticleResource', function($resource){
    var resource = $resource('rest/articles/:ArticleId',{ArticleId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});