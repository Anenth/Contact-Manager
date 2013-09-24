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
    }
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