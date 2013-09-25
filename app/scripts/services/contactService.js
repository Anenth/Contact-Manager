'use strict';

angular.module('PractoApp')
.factory('contactService', function($http) {
  var authEmail = 'anenthvishnu@gmail.com';
  var url = 'http://ui-proj.practodev.in/contacts';
  return{
    list: function(){
      return $http({
        method:'GET',
        url:url,
        headers:{'X-USER':authEmail}
      });
    },
    newContact: function(data){
      return $http({
        method:'POST',
        url:url,
        data: data,
        headers:{'X-USER':authEmail, 'Content-Type': 'application/x-www-form-urlencoded'}
      });
    },
    get: function(params){
      return $http({
        method:'GET',
        url:url + '/' + params,
        headers:{'X-USER':authEmail}
      });
    },
    update: function(params, data){
      return $http({
        method:'PUT',
        url:url + '/' + params,
        data: data,
        headers:{'X-USER':authEmail, 'Content-Type': 'application/x-www-form-urlencoded'}
      });
    },
    delete: function(params){
      return $http({
        method:'DELETE',
        url:url + '/' + params,
        headers:{'X-USER':authEmail}
      });
    },
  };
  /*var resource = $resource('http://ui-proj.practodev.in/contacts', {},{
    list:{
      method:'GET',
      headers:{'X-USER':authEmail}
     
    },
    post:{
      method:'POST',
      headers:{'X-USER':authEmail, 'Content-Type': 'application/x-www-form-urlencoded'}
    }
  });
  return resource;*/
});