'use strict';

angular.module('PractoApp')
.controller('HomeCtrl', ['$scope','contactService', function ($scope, contactService) {
	/**
	 * [fetchContacts Fetches all the contacts from the sever/localStorage]
	 * 
	 */
	var fetchContacts = function(){
		contactService.list().then(function(){
			$scope.contacts = JSON.parse(localStorage.getItem('contacts'));	
		});
	};
	fetchContacts();
	/**
	 * [delete Sends delete request to the server]
	 * @param  {[string]} name [contact name, used for displaying in the confirmBox]
	 * @param  {[number]} id   [used to send the delete request to server]
	 * @return {[type]}      [description]
	 */
	$scope.delete = function(name, id){
		var confirmValue=confirm('You are about to delete contact for"' + name + '". Proceed ?');
		if(confirmValue){
			contactService.delete(id).success(function(data, status){
				alert('deleted');
				fetchContacts();
			});
		}

	}

}]);

/*$scope.contacts = contactService.list();
	console.log($scope.contacts.contacts);*/