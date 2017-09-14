torneoFutbol.controller('TeamsCtrl', function ($scope, $rootScope, $location, $cookieStore, $filter, $translate, DataService) {
	
	$scope.getCurrentPath();
	//Ruta base donde se suben los documentos para los tickets como las imagenes para las jurisdicciones
    $scope.folderUploads = $rootScope.urlApi + "/Files/Uploads/";

    //Ruta donde se almacenan los adjuntos para los tickets
    $scope.folderPathTeams = "Teams/";

    //Ruta donde se almacenan las imagenes adjuntas para las jurisdicciones
    $scope.folderPathJurisdictions = "logos/jurisdictions/";

	$scope.getTeams = function(){
		DataService.getTeams(function(response){
			$scope.teams = response;
			for (var i = 0; i < $scope.teams.length; i++) {
				if($scope.teams[i].TeamImage)
					$scope.teams[i].TeamImage = $scope.folderUploads + $scope.folderPathTeams + $scope.teams[i].Id + '/' + $scope.teams[i].TeamImage;
			}
		}, function(response, status){

		});
	}

	$scope.getTeams();
	
});
