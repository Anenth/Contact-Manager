'use strict';

angular.module('PractoApp')
.factory('contactService', function($http) {
  var authEmail = 'anenthvishnu@gmail.com';
  var url = 'http://ui-proj.practodev.in/contacts';
  return{
    /**
     * [list fetchs all the contacts from the server]
     * @return {[http object]} [http object for furture processing from the calling function]
     */
    list: function(){
      return $http({
        method:'GET',
        url:url,
        headers:{'X-USER':authEmail}
      }).success(function(data, status){
        localStorage.setItem('contacts', JSON.stringify(data.contacts));
      });
    },
    /**
     * [newContact Creates new contact object in the server]
     * @param  {[js param object]} data [the object which contains all the details]
     * @return {[http object]} [http object for furture processing from the calling function]    
     */
    newContact: function(data){
      return $http({
        method:'POST',
        url:url,
        data: data,
        headers:{'X-USER':authEmail, 'Content-Type': 'application/x-www-form-urlencoded'}
      });
    },
    /**
     * [get fetch individual contact]
     * @param  {[number]} params [unique contact id]
     * @return {[http object]} [http object for furture processing from the calling function]
     */
    get: function(params){
      return $http({
        method:'GET',
        url:url + '/' + params,
        headers:{'X-USER':authEmail}
      });
    },
    /**
     * [update updates the individual contact]
     * @param  {[number]} params [unique contact id]
     * @param  {[js param object]} data   [object with changed values]
     * @return {[http object]} [http object for furture processing from the calling function]
     */
    update: function(params, data){
      return $http({
        method:'PUT',
        url:url + '/' + params,
        data: data,
        headers:{'X-USER':authEmail, 'Content-Type': 'application/x-www-form-urlencoded'}
      });
    },
    /**
     * [delete deletes the contact object]
     * @param  {[number]} params [unique contact id]
     * @return {[http object]} [http object for furture processing from the calling function]
     */
    delete: function(params){
      return $http({
        method:'DELETE',
        url:url + '/' + params,
        headers:{'X-USER':authEmail}
      });
    },
  };
});