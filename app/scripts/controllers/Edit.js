'use strict';

angular.module('PractoApp')
.controller('EditCtrl',['$scope', 'contactService', '$routeParams', '$location', function ($scope, contactService, $routeParams, $location) {
	contactService.get($routeParams.id).success(function(data,status){
		if(status === 201){
			data = data.contacts;
			$scope.inputName = data.contact_name;
			$scope.inputPhone = data.contact_phone;
			$scope.inputEmail = data.contact_email;
			$scope.editPage = true;
		}else{
			alert(status + 'error' );
		}
	});

	$scope.addContact = function(){
		contactService.update($routeParams.id, $.param({
			contact_name : $scope.inputName,
			contact_phone : $scope.inputPhone,
			contact_email : $scope.inputEmail
		})).success(function(data, status){
			if(status === 201){
				alert('Contact updated');
				$location.path('/');
			}
		});
	};
}]);
