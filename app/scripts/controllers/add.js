'use strict';

angular.module('PractoApp')
.controller('AddCtrl',['$scope', 'contactService', function ($scope, contactService) {
	$scope.addContact = function(id){
			if(id){
			}else{
				contactService.newContact($.param({
					contact_name : $scope.inputName,
					contact_phone : $scope.inputPhone,
					contact_email : $scope.inputEmail
				}));	
			}
			
		};
}]);
