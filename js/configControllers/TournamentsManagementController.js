torneoFutbol.controller('TournamentsManagementCtrl', function ($scope, $rootScope, $location, $modal, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

	$scope.dtOptions = DTOptionsBuilder.newOptions()
                                            .withDOM('frltpi')
                                            .withOption('paging', false)
                                            .withOption('order', [])
                                            .withOption('info', false)
                                            .withOption('autoWidth', false)
                                            .withOption('scrollY', 300)
                                            .withLanguageSource("js/i18n/datatable/Spanish.json")
                                            .withBootstrap();

	$scope.getTournaments = function(){
		DataService.getTournaments(function(response){
			$scope.tournaments = response;
		}, function(response, status){

		});
	}

	$scope.getTournaments();

	$scope.tabSelect = function(type){
        
        $scope.errorMsg = '';
        $scope.info = '';
        
        switch (type) {
            case "vigentes":
                $scope.vigentes = true;
                $scope.noVigentes = false;
                break;
            
            case "noVigentes":
                $scope.vigentes = false;
                $scope.noVigentes = true;
                break;
        }
    };

    $scope.showFormatName = function(tournamentFormat){
    	if(tournamentFormat){
    		switch(tournamentFormat){
    			case 1:
    				return 'Fútbol 5';

    			case 2:
    				return 'Fútbol 6';

    			case 3:
    				return 'Fútbol 7';

    			case 4:
    				return 'Fútbol 8';

    			case 5:
    				return 'Fútbol 9';

    			case 6:
    				return 'Fútbol 11';
    		}
    	}
    };

    $scope.showClasificationFormatName = function(clasificationFormat){
    	if(clasificationFormat){
    		switch(clasificationFormat){
    			case 1:
    				return 'Liga (Zona Clasificacion + Zona Definicion)';

    			case 2:
    				return 'Liga (Zona Clasificacion + PlayOff)';

    			case 3:
    				return 'Liga';

    			case 4:
    				return 'Play Off';
    		}
    	}
    }

    $scope.newTournament = function(){
    	$scope.editTournament();
    }

    $scope.openRules = function(tournament){
		var modalInstance = $modal.open ({

			templateUrl: 'rules.html',
			controller: RulesCtrl,
			size: 'lg',
			backdrop: 'static',
			resolve: {
				tournament : function(){
					return tournament;
				}
	        }
      	});

	    modalInstance.result.then(function () {
      		
        },function(){

        });
	}

    $scope.editTournament = function(tournament){
		var modalInstance = $modal.open ({

			templateUrl: 'manageTournament.html',
			controller: ManageTournamentCtrl,
			size: 'lg',
			backdrop: 'static',
			resolve: {
				tournament : function(){
					return tournament;
				}
	        }
      	});

	    modalInstance.result.then(function () {
      		$scope.getTournaments();
        },function(){

        });
	}

});

var ManageTournamentCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate, tournament) {
	
	$scope.saving = false;
	$scope.errorMsg = null;
	$scope.selectedTeam = null;
	$scope.tournament = tournament;
	var method = 'POST';
	var url = 'v1/tournaments/'
	$scope.selection = [];
	$scope.teamSelection = [];
	$scope.playerSelection = [];
	$scope.players = [];
	$scope.playerTeamsSelection = {
		"values" : {}
	}

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

	$scope.showPlayers = function(team){
		$scope.players = team.PlayersList;
		$scope.selectedTeam = team;
	}

	$scope.toggleSelection = function toggleSelection(headquarterId) {
		var idx = $scope.selection.indexOf(headquarterId);
	 
	    // si está seleccionado
	    if (idx > -1) {
	       $scope.selection.splice(idx, 1);
	    } else {
	       $scope.selection.push(headquarterId);
	    }
	};

	$scope.toggleTeamSelection = function toggleTeamSelection(teamId) {
		// var idx = $scope.teamSelection.indexOf(teamId);
		var idx = $scope.playerTeamsSelection.values.hasOwnProperty(teamId);

		// var players = {
		// 	"values" : {}
		// };

		// for( var idx in $scope.selection){
		// 	players.values[$scope.selection[idx].Id] = Eval;
		// }
	 
	    // si está seleccionado
	    if (idx) {
	//        	$scope.teamSelection.splice(idx, 1);
			// $scope.playerTeamsSelection.values.splice(teamId, 1)
			delete $scope.playerTeamsSelection.values[teamId];
	    } else {
			$scope.playerTeamsSelection.values[teamId] = [];
	//        	$scope.teamSelection.push(teamId);
	    }
	};

	$scope.togglePlayerSelection = function togglePlayerSelection(playerId) {
		var idx = $scope.playerTeamsSelection.values[$scope.selectedTeam.Id].indexOf(playerId);
	 
	    // si está seleccionado
	    if (idx > -1) {
	       $scope.playerTeamsSelection.values[$scope.selectedTeam.Id].splice(idx, 1);
	    } else {
	       $scope.playerTeamsSelection.values[$scope.selectedTeam.Id].push(playerId)
	    }
		
	};


	if(tournament){
		method = 'PUT';
		url += tournament.Id
		$scope.name = tournament.Name;
		$scope.tournamentFormat = tournament.TournamentFormat;
		$scope.clasificationFormat = tournament.ClasificationFormat;
		$scope.rules = tournament.Rules;
		$scope.prices = tournament.Prices;
		$scope.dates = new Date(tournament.TournamentDatesList[0].date);
		if(tournament.HeadquartersList.length != 0){
			
			//Recorro la lista de sedes para guardarlas en las seleccionadas
			for (var i = 0; i < tournament.HeadquartersList.length; i++) {
				$scope.selection.push(tournament.HeadquartersList[i].Id);
			}
		}

		if(tournament.TeamPlayersList.length != 0){
			var teams = tournament.TeamPlayersList;

			//Recorro la lista de equipos y guardo los ID de los equipos
			for (var i = 0; i < teams.length; i++) {
				//Los guardo en el array que uso para
				$scope.playerTeamsSelection.values[teams[i].Team.Id] = []
				for (var j = 0; j < teams[i].PlayersList.length; j++) {
					var players = teams[i].PlayersList;
					$scope.playerTeamsSelection.values[teams[i].Team.Id].push(players[j].Id)
				}
			}
			// $scope.playerTeamsSelection.values[teamId] = []
		}

		//$scope.dates = tournament.Dates;
	}
	
	$scope.manageTournament = function(){

		if($scope.name == '' || $scope.name == undefined){
			$scope.errorMsg = 'Por favor, ingrese el nombre del torneo.';
			return;
		}

		if($scope.tournamentFormat == undefined){
			$scope.errorMsg = 'Por favor, seleccione el formato del torneo.';
			return;
		}

		if($scope.clasificationFormat == undefined){
			$scope.errorMsg = 'Por favor, seleccione el formato de clasificación del torneo.';
			return;
		}

		if($scope.rules == '' || $scope.rules == undefined){
			$scope.errorMsg = 'Por favor, ingrese las reglamento del torneo.'
			return;
		}

		if($scope.prices == '' || $scope.prices == undefined){
			$scope.errorMsg = 'Por favor, ingrese los premios del torneo.'
			return;
		}

		if($scope.selection.length == 0){
			$scope.errorMsg = 'Por favor, selecione al menos una sede.'
			return;
		}

		if($scope.dates == '' || $scope.dates == undefined){
			$scope.errorMsg = 'Por favor, ingrese las fechas del torneo.'
			return;
		}
		var date = [];
		date.push($scope.dates)

		var teamsAndPlayers = {};
		for (var i = 0; i < $scope.playerTeamsSelection.values.length; i++) {
			teams[i]
		}
		
		

		var data = {
			'Name' : $scope.name,
			'TournamentFormat' : $scope.tournamentFormat,
			'ClasificationFormat' : $scope.clasificationFormat,
			'Rules' : $scope.rules,
			'Prices' : $scope.prices,
			'Headquarters' : $scope.selection,
			'Dates' : date,
			'TeamsPlayers' : $scope.playerTeamsSelection.values
		}



		DataService.manageTournament(method, url, data, function(response){
			$modalInstance.close();
		}, function(response, status){
			$scope.errorMsg = response.Message;
		});
	}

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};

var RulesCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate, tournament) {
	
	$scope.saving = false;
	$scope.errorMsg = null;
	$scope.selectedTeam = null;
	$scope.tournament = tournament;
	

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};