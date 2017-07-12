torneoFutbol.controller('TournamentsCtrl', function ($scope, $rootScope, $location, $modal, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

	$scope.dtOptions = DTOptionsBuilder.newOptions()
                                            .withDOM('frltpi')
                                            .withOption('paging', false)
                                            .withOption('order', [])
                                            .withOption('info', false)
                                            .withOption('autoWidth', false)
                                            .withLanguageSource("js/i18n/datatable/Spanish.json")
                                            .withBootstrap();

	$scope.tournaments = [
						{
							"ID" : 1,
							"Name": "Torneo 1",
							"Dias" : "Lunes y Miércoles",
							"Sedes" : "",
							"Formato" : "futbol 5",
							"FormatoClasificacion" : "Liga",
							"Reglamento" : "ASDASDSADASDADASDA",
							"Premios": [
											{
												"Puesto" : 1,
												"Premio" : "$1000"
											},
											{
												"Puesto" : 2,
												"Premio" : "$600"
											},
											{
												"Puesto" : 3,
												"Premio" : "Foto de Recuerdo"
											}
										]
						},
						{
							"ID" : 2,
							"Name": "Torneo 2",
							"Dias" : "Jueves y Sábado",
							"Sedes" : "",
							"Formato" : "futbol 11",
							"FormatoClasificacion" : "Liga",
							"Reglamento" : "ASDASDSADASDADASDA",
							"Premios": [
											{
												"Puesto" : 1,
												"Premio" : "$2450"
											},
											{
												"Puesto" : 2,
												"Premio" : "$200"
											},
											{
												"Puesto" : 3,
												"Premio" : "Llaveros"
											}
										]
						},
						{
							"ID" : 3,
							"Name": "Torneo 3",
							"Dias" : "",
							"Sedes" : "",
							"Formato" : "futbol 7",
							"FormatoClasificacion" : "Liga",
							"Reglamento" : "ASDASDSADASDADASDA",
							"Premios": [
											{
												"Puesto" : 1,
												"Premio" : "$1000"
											},
											{
												"Puesto" : 2,
												"Premio" : "$600"
											},
											{
												"Puesto" : 3,
												"Premio" : "Foto de Recuerdo"
											}
										]
						},
						{
							"ID" : 4,
							"Name": "Torneo 4",
							"Dias" : "",
							"Sedes" : "",
							"Formato" : "futbol 5",
							"FormatoClasificacion" : "Liga",
							"Reglamento" : "ASDASDSADASDADASDA",
							"Premios": [
											{
												"Puesto" : 1,
												"Premio" : "$1000"
											},
											{
												"Puesto" : 2,
												"Premio" : "$600"
											},
											{
												"Puesto" : 3,
												"Premio" : "Foto de Recuerdo"
											}
										]
						},
						{
							"ID" : 5,
							"Name": "Torneo 5",
							"Dias" : "",
							"Sedes" : "",
							"Formato" : "futbol 11",
							"FormatoClasificacion" : "Liga",
							"Reglamento" : "ASDASDSADASDADASDA",
							"Premios": [
											{
												"Puesto" : 1,
												"Premio" : "$1000"
											},
											{
												"Puesto" : 2,
												"Premio" : "$600"
											},
											{
												"Puesto" : 3,
												"Premio" : "Foto de Recuerdo"
											}
										]
						}
					];
	////////////////////////////////////////////////////////////////

	$scope.verReglamento = function(torneo){
		var modalInstance = $modal.open ({

			templateUrl: 'reglamento.html',
			controller: ReglamentoCtrl,
			size: 'lg',
			backdrop: 'static',
			resolve: {
				torneo: function(){
					return torneo;
				}
			}
      	});

	    modalInstance.result.then(function () {
      		
        },function(){

        });
	}

});


var ReglamentoCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate) {

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};