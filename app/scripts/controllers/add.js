'use strict';

angular.module('PractoApp')
.controller('AddCtrl',['$scope', 'contactService', '$location', function ($scope, contactService, $location) {
	contactService.list().then(function(){
				$scope.contacts = JSON.parse(localStorage.getItem('contacts'));	
			});
	$scope.addContact = function(){
		contactService.newContact($.param({
			contact_name : $scope.inputName,
			contact_phone : $scope.inputPhone,
			contact_email : $scope.inputEmail
		})).success(function(data, status){
			if(status === 201){
				alert('Contact added');
				$location.path('/');
			}else if(status === 409){
				alert('Phone number in use');
			}
		});
		
	};
}]);
