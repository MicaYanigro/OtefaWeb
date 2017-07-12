torneoFutbol.controller('HeadquarterManagementCtrl', function ($scope, $rootScope, $location, $modal, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

	$scope.dtOptions = DTOptionsBuilder.newOptions()
                                            .withDOM('frltpi')
                                            .withOption('paging', false)
                                            .withOption('order', [])
                                            .withOption('info', false)
                                            .withOption('autoWidth', false)
                                            .withOption('scrollY', 300)
                                            .withLanguageSource("js/i18n/datatable/Spanish.json")
                                            .withBootstrap();

	// $scope.sedes = [
	// 					{
	// 						"Nombre" : "Avellaneda FC",
	// 						"Direccion" : "Salta 2243",
	// 						"Localidad" : "Avellaneda",
	// 						"Torneo" : "Torneo 1"
	// 					},
	// 					{
	// 						"Nombre" : "Caballito FC",
	// 						"Direccion" : "Yerbal 1252",
	// 						"Localidad" : "CABA",
	// 						"Torneo" : ""
	// 					},
	// 					{
	// 						"Nombre" : "La Plata FC",
	// 						"Direccion" : "Calle 12 521",
	// 						"Localidad" : "La Plata",
	// 						"Torneo" : "Torneo 3"
	// 					}
	// ];

	$scope.getHeadquarters = function(){
		DataService.getHeadquarters(function(response){
			$scope.headquarters = response;
		}, function(response, status){

		});
	}

	$scope.getHeadquarters();

	$scope.newHeadquarter = function(){
		$scope.editHearquearter();
	}

	$scope.editHearquearter = function(headquarter){
		var modalInstance = $modal.open ({

			templateUrl: 'Hearquearter.html',
			controller: HeadquarterCtrl,
			size: 'lg',
			backdrop: 'static',
			resolve: {
				headquarter : function(){
					return headquarter;
				}
	        }
      	});

	    modalInstance.result.then(function () {
      		
        },function(){

        });
	}

});


var HeadquarterCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate, headquarter) {
	$scope.saving = false;
	$scope.errorMsg = null;
	$scope.headquarter = headquarter
	var method = 'POST';
	var url = 'v1/headquarter/';

	if(headquarter){
		$scope.name = headquarter.Name;
		$scope.address = headquarter.Address;
		$scope.city = headquarter.City;
		method = 'PUT';
		url += headquarter.ID;
	}


	$scope.accept = function(){

		if($scope.name == '' || $scope.name == undefined){
			$scope.errorMsg = 'Por favor, ingrese el nombre de la sede.';
			return;
		}

		if($scope.address == '' || $scope.address == undefined){
			$scope.errorMsg = 'Por favor, ingrese la dirección de la sede.';
			return;
		}

		if($scope.city == '' || $scope.city == undefined){
			$scope.errorMsg = 'Por favor, ingrese la localidad de la sede.';
			return;
		}

		var data = {
			'Name' : $scope.name,
			'Address' : $scope.address,
			'City' : $scope.city
		};

		DataService.manageHeadquarter(method, url, data, function(response){
			$modalInstance.close();
		}, function(response, status){
			$scope.errorMsg = response;
		});
	}


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};