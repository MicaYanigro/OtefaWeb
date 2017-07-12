torneoFutbol.controller('PlayersCtrl', function ($scope, $rootScope, $modal, $location, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

	$scope.dtOptions = DTOptionsBuilder.newOptions()
                                            .withDOM('frltpi')
                                            .withOption('paging', false)
                                            .withOption('order', [])
                                            .withOption('info', false)
                                            .withOption('autoWidth', false)
                                            .withOption('scrollY', 300)
                                            /*.withOption('fnDrawCallback', function (oSettings) {
													            var api = this.api();
													            var rows = api.rows( {page:'current'} ).nodes();
													            var last=null;
													            api.column(0, {page:'current'} ).data().each( function ( group, i ) {
													                if ( last !== group ) {
													                    $(rows).eq( i ).before(
													                        '<tr class="group text-center headerEquipo"><td colspan="5">'+group+'</td></tr>'
													                    ); 
													                    last = group;
													                }
													            } );
													})*/
                                            .withLanguageSource("js/i18n/datatable/Spanish.json")
                                            .withBootstrap();

	/*$scope.jugadores = [
							{
								"Nombre" : "Javier",
								"Apellido" : "Gonzales",
								"Equipo": "Equipo 1",
								"DNI" : "34901875",
								"FechaNacimiento" : new Date(1987, 4, 25),
								"Email" : "jgonzales@hotmail.com",
								"Celular" : "1198251092",
								"ObraSocial" : "OSDE"
							},

							{
								"Nombre" : "Lucas",
								"Apellido" : "Loria",
								"Equipo": "Equipo 1",
								"DNI" : "39152918",
								"FechaNacimiento" : new Date(2000, 2, 11),
								"Email" : "",
								"Celular" : "",
								"ObraSocial" : "OSECAC" 
							},

							{
								"Nombre" : "Mariano",
								"Apellido" : "Farias",
								"Equipo": "Equipo 1",
								"DNI" : "33109252",
								"FechaNacimiento" : new Date(1997, 7, 20),
								"Email" : "",
								"Celular" : "2964872398",
								"ObraSocial" : "Swiss Medical"
							},

							{
								"Nombre" : "Lautaro",
								"Apellido" : "Riva",
								"Equipo": "Equipo 2",
								"DNI" : "30120952",
								"FechaNacimiento" : new Date(1988, 9, 12),
								"Email" : "lriva@hotmail.com",
								"Celular" : "35193862983",
								"ObraSocial" : "GALENO" 
							},

							{
								"Nombre" : "Marcos",
								"Apellido" : "Sara",
								"Equipo": "Equipo 3",
								"DNI" : "32358630",
								"FechaNacimiento" : new Date(1983, 8, 4),
								"Email" : "msara@hotmail.com",
								"Celular" : "2251908254",
								"ObraSocial" : "MEDIFE" 
							}
	];
*/

	$scope.getPlayers = function(){
		DataService.getPlayers(function(response){
			$scope.players = response;
		}, function(response, status){

		})
	}

	$scope.getPlayers();
	
	$scope.newPlayer = function(){
		var modalInstance = $modal.open ({

			templateUrl: 'newPlayer.html',
			controller: NewPlayerCtrl,
			size: 'lg',
			backdrop: 'static',
			resolve: {
			
			}
      	});

	    modalInstance.result.then(function () {
      		$scope.getPlayers();
        },function(){

        });
	}

});

var NewPlayerCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate) {
	
	$scope.errorMsg = null;
	
	$scope.newPlayer = function(){
		$scope.errorMsg = null;

		if($scope.name == '' || $scope.name == undefined){
			$scope.errorMsg = 'Ingrese el nombre del jugador';
			return;
		}

		if($scope.lastName == '' || $scope.lastName == undefined){
			$scope.errorMsg = 'Ingrese el apellido del jugador';
			return;
		}

		if($scope.dni == '' || $scope.dni == undefined){
			$scope.errorMsg = 'Ingrese el dni del jugador';
			return;
		}

		if($scope.birthDate == '' || $scope.birthDate == undefined){
			$scope.errorMsg = 'Ingrese la fecha de nacimiento del jugador';
			return;
		}

		data = {
			"Name" : $scope.name,
			"LastName": $scope.lastName,
			"Dni" : $scope.dni,
			"BirthDate" : $scope.birthDate,
			"Email" : $scope.email,
			"CelNumber" : $scope.celNumber,
			"MedicalInsurance" : $scope.medicalInsurance
		}

		DataService.postPlayer(data, function(response){
			$modalInstance.close();
		}, function(response, status){
			$scope.errorMsg = "Invalid-Player-Dni";
		})
	}

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};