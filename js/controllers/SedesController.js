torneoFutbol.controller('SedesCtrl', function ($scope, $rootScope, $modal, $location, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {
	
	$scope.dtOptions = DTOptionsBuilder.newOptions()
                                            .withDOM('frltpi')
                                            .withOption('paging', false)
                                            .withOption('order', [])
                                            .withOption('info', false)
                                            .withOption('autoWidth', false)
                                            .withOption('scrollY', 300)
                                            .withLanguageSource("js/i18n/datatable/Spanish.json")
                                            .withBootstrap();

	$scope.sedes = [
						{
							"Nombre" : "Avellaneda FC",
							"Direccion" : "Salta 2243",
							"Localidad" : "Avellaneda"
						},
						{
							"Nombre" : "Caballito FC",
							"Direccion" : "Yerbal 1252",
							"Localidad" : "CABA"
						},
						{
							"Nombre" : "La Plata FC",
							"Direccion" : "Calle 12 521",
							"Localidad" : "La Plata"
						}
	];

	$scope.verMapa = function(sede){

		var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: -34.397, lng: 150.644}
        });
        
        

		var modalInstance = $modal.open ({

			templateUrl: 'ubicacion.html',
			controller: UbicacionCtrl,
			size: 'lg',
			backdrop: 'static',
			resolve: {
				sede : function(){
					return sede;
				}
	        }
      	});

	    modalInstance.result.then(function () {
      		
        },function(){

        });

	}
	
});


var UbicacionCtrl = function ($scope, $filter, DataService, $modalInstance, $translate, sede) {
	$scope.saving = false;
	$scope.errorMsg = null;
	$scope.sede = sede;


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};