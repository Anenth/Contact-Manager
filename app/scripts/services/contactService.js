'use strict';
angular.module('ContactManager')
.factory('contactService', function($http, $q, FlashService, $location) {
  var authEmail = 'anenthvishnu@gmail.com';
  var url = 'http://ui-proj.practodev.in/contacts';
  /**
   * [sendRequestToServer Function used for sending request to the server]
   * @param  {[String]} type [ the type of request]
   * @param  {[String]} data [ the payload ]
   * @param  {[boolean]} alert [ disable/enable alerts ]
   */
   var sendRequestToServer = function(type, data, alert){
    $http({
      method: type,
      url:url,
      data: data,
      headers:{'X-USER':authEmail, 'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status){
      if(status === 201 && alert){
        FlashService.show('Contact added', 'success');
        $location.path('../');
      }
    }).error(function(data){
      if(alert){
        for(var i in data){
          FlashService.show(data[i], 'danger');
        }
      }
    });
  }

  return{
    /**
     * [list fetchs all the contacts from the server and save it to localStorage and if there is internet access , it checks if there is any data to be synced and send the request to the server]
     * @return {[object]} [contact objects from localStorage]
     */
     list: function(){
      if(navigator.onLine){
        if(localStorage.getItem('contactsAdded')){
          var data = JSON.parse(localStorage.getItem('contactsAdded'))
          for(var i in data){
            sendRequestToServer('POST', $.param(data[i]));
          }
          localStorage.removeItem('contactsAdded');
        }
        return $http({
          method:'GET',
          url:url,
          headers:{'X-USER':authEmail}
        }).success(function(data, status){
          if( status === 200){
            localStorage.setItem('contacts', JSON.stringify(data.contacts));
          }
        });
      }else{
        return $q.when(JSON.parse(localStorage.getItem('contacts')));
      }
    },
    /**
     * [newContact Creates new contact object in the server]
     * @param  {[js param object]} data [the object which contains all the details]
     * @return {[http object]} [http object for furture processing from the calling function]    
     */
     newContact: function(data){

      if(navigator.onLine){
        sendRequestToServer('POST', data, true);
      }else{
        /**
        * Covertion from param to JSON and pushing to the localStorage
        * Master data is the actual data to be on the server
        * Slave data is to be saved to the Server 
        * Slave data is been saved to the localStorage for future sync 
        **/
        var dataJson = JSON.parse('{"' + decodeURI(data).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
        var dataSetMaster = JSON.parse(localStorage.getItem('contacts'));
        var dataSetSlave = JSON.parse(localStorage.getItem('contactsAdded'));
        dataSetMaster.push(dataJson);
        //check if the localStorage exsists
        if(dataSetSlave){
          dataSetSlave.push(dataJson);
          localStorage.setItem('contactsAdded', JSON.stringify(dataSetSlave));
        }
        else{
          localStorage.setItem('contactsAdded', JSON.stringify(Array(dataJson)));
        }

        localStorage.setItem('contacts', JSON.stringify(dataSetMaster));
        FlashService.show('Contact added', 'success');
        $location.path('../');
      }
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