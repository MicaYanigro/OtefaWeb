torneoFutbol.controller('ContactCtrl', function ($scope, $rootScope, $location, $cookieStore, $filter, $translate, DataService) {

	$scope.getCurrentPath();
	$scope.sendMessage = function(){
		
		if($scope.name == '' || $scope.name == undefined){
			$scope.openTempMessage("Contacto - OTEFA", "Ingrese el nombre para ponerse en contacto con nosotros", true, null, null, null);
			return;
		}

		if($scope.lastName == '' || $scope.lastName == undefined){
			$scope.openTempMessage("Contacto - OTEFA", "Ingrese el apellido para ponerse en contacto con nosotros", true, null, null, null);
			return;
		}

		if($scope.phoneNumber == '' || $scope.phoneNumber == undefined){
			$scope.openTempMessage("Contacto - OTEFA", "Ingrese el teléfono para ponerse en contacto con nosotros", true, null, null, null);
			return;
		}

		if($scope.email == '' || $scope.email == undefined){
			$scope.openTempMessage("Contacto - OTEFA", "Ingrese el email para ponerse en contacto con nosotros", true, null, null, null);
			return;
		}

		if($scope.message == '' || $scope.message == undefined){
			$scope.openTempMessage("Contacto - OTEFA", "Ingrese el mensaje para ponerse en contacto con nosotros", true, null, null, null);
			return;
		}

		var data = {
			"Name" : $scope.name,
			"LastName" : $scope.lastName,
			"PhoneNumber" : $scope.phoneNumber,
			"Email" : $scope.email,
			"Message" : $scope.message
		}

		DataService.sendMessage(data, function(response){
			$scope.openTempMessage("Contacto - OTEFA", "Mensaje enviado correctamente. En breve nos pondremos en contacto con usted. Muchas gracias!")
		}, function(response, status){

		})
	}

});