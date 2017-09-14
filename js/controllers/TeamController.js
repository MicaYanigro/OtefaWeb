torneoFutbol.controller('TeamCtrl', function ($scope, $rootScope, $routeParams, $modal, $location, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

	$scope.getCurrentPath();
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

    $scope.historical = [];



	$scope.getTeam = function(){
		
		DataService.getTeamByID($routeParams.teamID, function(response){
			$scope.team = response;
			$scope.path += $scope.team.Id
		}, function(response, status){
			$location.path('404');
		})
	};

	$scope.getTeamStadistics = function(){
		DataService.getStadisticsByTeamId($routeParams.teamID, function(response){
			$scope.stadistics = response;
		}, function(response, status){

		})
	}

	$scope.getHistoricalStadistics = function(){
		DataService.getHistoricalStadistics($routeParams.teamID, function(response){
			$scope.historical.push(response);
		}, function(response, status){

		});
	}

	$scope.getUpcomingMatches = function(){
		DataService.getUpcomingMatchesByTeam($routeParams.teamID, function(response){
			$scope.upcomingMathes = response;
		}, function(response, status){

		});
	}

	$scope.getTeam();
	$scope.getTeamStadistics();
	$scope.getHistoricalStadistics();
	$scope.getUpcomingMatches();


});