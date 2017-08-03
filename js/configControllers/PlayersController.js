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


	$scope.getPlayers = function(){
		DataService.getPlayers(function(response){
			$scope.players = response;
		}, function(response, status){

		})
	}

	$scope.getPlayers();
	
	$scope.newPlayer = function(){
		$scope.editPlayer();
	}

	$scope.editPlayer = function(player){
		var modalInstance = $modal.open ({

			templateUrl: 'newPlayer.html',
			controller: NewPlayerCtrl,
			size: 'lg',
			backdrop: 'static',
			resolve: {
				player: function(){
					return player;
				}
			}
      	});

	    modalInstance.result.then(function () {
      		$scope.getPlayers();
        },function(){

        });
	}

});

var NewPlayerCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate, player) {
	
	$scope.errorMsg = null;
	$scope.saving = false;
	$scope.player = player;
	var method = 'POST';
	var url = 'v1/players/'

	if(player){
		$scope.name = player.Name;
		$scope.lastName = player.LastName;
		$scope.dni = player.Dni;
		$scope.birthDate = new Date(player.BirthDate);
		
		if(player.Email){
			$scope.email = player.Email;
		}
		
		if(player.CelNumber){
			$scope.celNumber = player.CelNumber;
		}
		
		if(player.MedicalInsurance){
			$scope.medicalInsurance = player.MedicalInsurance;
		}

		url += player.Id;
		method = 'PUT';

	}
	
	$scope.managePlayer = function(){
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

		$scope.saving = true;
		DataService.managePlayer(method, url, data, function(response){
			$scope.saving = false;
			$modalInstance.close();
		}, function(response, status){
			$scope.saving = false;
			$scope.errorMsg = "Invalid-Player-Dni";
		})
	}

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};