'use strict';

angular.module('PractoApp')
.controller('HomeCtrl', ['$scope','contactService', function ($scope, contactService) {
	var fetchContacts = function(){
		contactService.list().success(function(data,status){
			console.log(status);
			$scope.contacts = data.contacts;
		});
	};
	fetchContacts();
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