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

	$scope.loadResults = function(match){
		var modalInstance = $modal.open ({

			templateUrl: 'loadResults.html',
			controller: LoadResultsCtrl,
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
		$scope.team1 = match.MatchTeamList[0].Team.Id;
		$scope.team2 = match.MatchTeamList[1].Team.Id;
		$scope.headquarter = match.Headquarter.Id;
		$scope.date = new Date(match.Date);
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
		if($scope.team1 == $scope.team2){
			$scope.errorMsg = 'El equipo local y el visitante no pueden ser el mismo equipo. Por favor, modifique uno de los equipos.';
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


		$scope.saving = true;
		DataService.manageMatch(method, url, data, function(response){
			$modalInstance.close();
		}, function(response, status){
			$scope.saving = false;
			$scope.errorMsg = response.Message;
		});
	}

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};


var LoadResultsCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate, match) {
	
	$scope.saving = false;
	$scope.errorMsg = null;
	$scope.match = match;
	$scope.team1 = match.MatchTeamList[0].Team;
	$scope.team2 = match.MatchTeamList[1].Team;
	$scope.playersList = $scope.team1.PlayersList.concat($scope.team2.PlayersList);
	$scope.playersDetailsTeam1 = [];
	$scope.playersDetailsTeam2 = [];

	$scope.loadResults = function(){

		var playersTeam1 = $scope.team1.PlayersList;
		var playersTeam2 = $scope.team2.PlayersList;

		for (var i = 0; i < playersTeam1.length; i++) {
			var card = playersTeam1[i].yellowCard ? 1 : playersTeam1[i].redCard ? 2 : 0;
			$scope.playersDetailsTeam1.push({
										'PlayerID' : playersTeam1[i].Id,
										'Goals' : playersTeam1[i].goals,
										'Played' : playersTeam1[i].hasPlayed,
										'Card' : card,
										'Observation' : '' 
										});
		}

		for (var j = 0; j < playersTeam2.length; j++) {
			var card = playersTeam2[j].yellowCard ? 1 : playersTeam2[j].redCard ? 2 : 0;
			$scope.playersDetailsTeam2.push({
										'PlayerID' : playersTeam2[j].Id,
										'Goals' : playersTeam2[j].goals,
										'Played' : playersTeam2[j].hasPlayed,
										'Card' : card,
										'Observation' : '' 
										});
		}


		var dataTeam1 = {
			'MatchTeamID' : $scope.match.MatchTeamList[0].Id,
			'Goals' : $scope.goalsTeam1,
			'HasBonusPoint' : $scope.hasBonusTeam1,
			'FigureID' : $scope.figure,
			'PlayersDetails' : $scope.playersDetailsTeam1
		}

		var dataTeam2 = {
			'MatchTeamID' : $scope.match.MatchTeamList[1].Id,
			'Goals' : $scope.goalsTeam2,
			'HasBonusPoint' : $scope.hasBonusTeam2,
			'FigureID' : $scope.figure,
			'PlayersDetails' : $scope.playersDetailsTeam2
		}

		DataService.loadResults($scope.match.Id, dataTeam1, function(response){
			
			DataService.loadResults($scope.match.Id, dataTeam2, function(response){
				$modalInstance.close();
			}, function(response, status){
				$scope.errorMsg = response.Message;
			});


		}, function(response, status){
			$scope.errorMsg = response.Message;
		});


	}

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};