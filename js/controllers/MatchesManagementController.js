torneoFutbol.controller('MatchesManagementCtrl', function ($scope, $rootScope, $modal, $location, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

	$scope.dtOptions = DTOptionsBuilder.newOptions()
                                            .withDOM('frltpi')
                                            .withOption('paging', false)
                                            .withOption('order', [])
                                            .withOption('info', false)
                                            .withOption('autoWidth', false)
                                            .withOption('scrollY', 300)
                                            .withLanguageSource("js/i18n/datatable/Spanish.json")
                                            .withBootstrap();

	$scope.getMatches = function(){
		DataService.getMatches(function(response){
			$scope.matches = response;
		}, function(response, status){

		});
	}

	$scope.getMatches();

	$scope.newMatch = function(){
    	$scope.editMatch();
    };

    $scope.editMatch = function(match){
		var modalInstance = $modal.open ({

			templateUrl: 'match.html',
			controller: MatchCtrl,
			size: 'lg',
			backdrop: 'static',
			resolve: {
				match : function(){
					return match;
				}
	        }
      	});

	    modalInstance.result.then(function () {
      		$scope.getMatches();
        },function(){

        });
	};

});

var MatchCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate, match) {
	
	$scope.saving = false;
	$scope.errorMsg = null;
	$scope.match = match;
	var method = 'POST';
	var url = 'v1/matches/'
	$scope.teamsSelected = [];

	$scope.getHeadquarters = function(){
		DataService.getHeadquarters(function(response){
			$scope.headquarters = response;
		}, function(response, status){

		});
	};

	$scope.getTeams = function(){
		DataService.getTeams(function(response){
			$scope.teams = response;
		}, function(response, status){

		});
	}

	$scope.getHeadquarters();
	$scope.getTeams();


	if(match){
		method = 'PUT';
		url += match.Id;
		// $scope.name = tournament.Name;
		// $scope.tournamentFormat = tournament.TournamentFormat;
		// $scope.clasificationFormat = tournament.ClasificationFormat;
		// $scope.rules = tournament.Rules;
		// $scope.prices = tournament.Prices;
		
		// if(tournament.HeadquartersList.length != 0){
			
		// 	//Recorro la lista de sedes para guardarlas en las seleccionadas
		// 	for (var i = 0; i < tournament.HeadquartersList.length; i++) {
		// 		$scope.selection.push(tournament.HeadquartersList[i].Id);
		// 	}
		// }

		// if(tournament.TeamPlayersList.length != 0){
		// 	var teams = tournament.TeamPlayersList;

		// 	//Recorro la lista de equipos y guardo los ID de los equipos
		// 	for (var i = 0; i < teams.length; i++) {
		// 		//Los guardo en el array que uso para
		// 		$scope.playerTeamsSelection.values[teams[i].Id] = []
		// 		for (var j = 0; j < teams[i].PlayersList.length; j++) {
		// 			var players = teams[i].PlayersList;
		// 			$scope.playerTeamsSelection.values[teams[i].Id].push(players[j].Id)
		// 		}
		// 	}
		// 	// $scope.playerTeamsSelection.values[teamId] = []
		// }

		// $scope.dates = tournament.Dates;
	}
	
	$scope.manageMatch = function(){

		if($scope.team1 == undefined){
			$scope.errorMsg = 'Por favor, seleccione el primer equipo.';
			return;
		}

		if($scope.team2 == undefined){
			$scope.errorMsg = 'Por favor, seleccione el segundo equipo.';
			return;
		}

		if($scope.headquarter == undefined){
			$scope.errorMsg = 'Por favor, seleccione la sede del partido.';
			return;
		}

		if($scope.date == undefined){
			$scope.errorMsg = 'Por favor, seleccione la fecha del partido.'
			return;
		}

		$scope.teamsSelected.push($scope.team1);
		$scope.teamsSelected.push($scope.team2);
		

		var data = {
			'Date' : new Date($scope.date),
			'Headquarter' : $scope.headquarter,
			'Teams' : $scope.teamsSelected
		}



		DataService.manageMatch(method, url, data, function(response){
			$modalInstance.close();
		}, function(response, status){
			$scope.errorMsg = response.Message;
		});
	}

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};