torneoFutbol.controller('TeamCtrl', function ($scope, $rootScope, $routeParams, $modal, $location, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

	$scope.dtOptions = DTOptionsBuilder.newOptions()
                                            .withDOM('rltpi')
                                            .withOption('paging', false)
                                            .withOption('order', [])
                                            .withOption('info', false)
                                            .withOption('autoWidth', false)
                                            .withLanguageSource("js/i18n/datatable/Spanish.json")
                                            .withBootstrap();

	//Ruta base donde se suben los documentos para los tickets como las imagenes para las jurisdicciones
    $scope.folderUploads = $rootScope.urlApi + "/Files/Uploads/";

    //Ruta donde se almacenan los adjuntos para los tickets
    $scope.folderPathTeams = "Teams/";
    $scope.path = $scope.folderUploads + $scope.folderPathTeams;

    $scope.historial = [{
    	'PJ' : 25,
		'PG' : 45,
		'PE' : 21,
		'GF' : 55,
		'GC' : 40,
		'GD' : 15
    }]



	$scope.getTeam = function(){
		
		DataService.getTeamByID($routeParams.teamID, function(response){
			$scope.team = response;
			$scope.path += $scope.team.Id
		}, function(response, status){
			$location.path('404');
		})
	};

	$scope.getTeam();


});