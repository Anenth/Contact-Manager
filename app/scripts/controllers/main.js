'use strict';

angular.module('PractoApp')
.controller('HomeCtrl', ['$scope','contactService', function ($scope, contactService) {
	contactService.list().success(function(data,status){
		console.log(status);
		$scope.contacts = data.contacts;
	});
	
}]);

/*$scope.contacts = contactService.list();
	console.log($scope.contacts.contacts);*/