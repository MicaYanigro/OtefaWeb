torneoFutbol.controller('TournamentsManagementCtrl', function ($scope, $rootScope, $location, $modal, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

	$scope.getCurrentPath();
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

	$scope.postFixture = function(tournament){
		DataService.postFixture(tournament.Id, function(response){
			$scope.getTournaments();
		}, function(response, status){
			$scope.errorMsg = response.Message;
		})
	}

	$scope.postFixtureByGroups = function(tournament){
		var modalInstance = $modal.open ({

			templateUrl: 'groupFixture.html',
			controller: GroupFixtureCtrl,
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
	};

	$scope.addGroups = function(tournament){
		var modalInstance = $modal.open ({

			templateUrl: 'addGroups.html',
			controller: AddGroupsCtrl,
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
	$scope.showGroups = false;
	$scope.groups = 0;
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
		
		$scope.models = {
	        selected: null,
	        lists: {}
	    };


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
			// Generate initial model
			$scope.tournamentId = response.id
		 	$scope.tournamentTeams = response.teams;
		    for (var i = 0; i < $scope.groups; ++i) {
		    	if(i == 0){
		        	$scope.models.lists[i] = $scope.tournamentTeams;
		    	}
		        else{
		        	$scope.models.lists[i] = [];
		        }
		    }
			$scope.showGroups = true;
			$scope.groupName = {};
		}, function(response, status){
			$scope.errorMsg = response.Message;
		});
	}

	$scope.confirmGroups = function(){
		var groups = [];
		var teams = [];

		var length = Object.keys($scope.groupName).length;

		if(length == undefined || length == 0){
			$scope.errorMsg = "Ingrese el nombre de el/los grupos"
			return;
		}else{
			for (var i = 0; i < $scope.groupName.length; i++) {
				if($scope.groupName[i] == "" || $scope.groupName[i] == undefined){
					$scope.errorMsg = "Ingrese el nombre de el/los grupos"
					return;
				}
			}
		}
		
		var length = Object.keys($scope.models.lists).length;
		for (var i = 0; i < length; i++) {
			groups.push({"Name": $scope.groupName[i], "TeamsId" : []})
			var list = $scope.models.lists[i];

			for (var j = 0; j < list.length; j++) {
				groups[i].TeamsId.push(list[j].Team.Id);
			}
		}

		DataService.postGroups(groups, $scope.tournamentId, function(response){
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


var GroupFixtureCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate, tournament) {
    
	$scope.saving = false;
	$scope.errorMsg = null;
	$scope.tournament = tournament;
	$scope.groups = tournament.GroupList

	$scope.postFixture = function(){
		if(!$scope.group){
			$scope.errorMsg = 'POR FAVOR, SELECCIONE UN GRUPO PARA GENERAR EL FIXTURE.'
			return;
		}

		DataService.postGroupFixture($scope.tournament.Id, $scope.group.Id, function(response){
			$modalInstance.close();
		}, function(response, status){
			$scope.errorMsg = response.Message;
		})
	}

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};

var AddGroupsCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate, tournament) {
    
	$scope.saving = false;
	$scope.errorMsg = null;
	$scope.tournament = tournament;
	$scope.groups = tournament.GroupList
	$scope.tournamentTeams = tournament.TeamPlayersList;
	$scope.models = {
        selected: null,
        lists: {}
    };

	$scope.numberSelected = function(){
		$scope.models = {
	        selected: null,
	        lists: {}
	    };

		for (var i = 0; i < $scope.cantidad; ++i) {
		    	if(i == 0){
		        	$scope.models.lists[i] = $scope.tournamentTeams;
		    	}
		        else{
		        	$scope.models.lists[i] = [];
		        }
		    
			$scope.groupName = {};
		}
	}

	$scope.confirmGroups = function(){
		var groups = [];
		var teams = [];

		var length = Object.keys($scope.groupName).length;

		if(length == undefined || length == 0){
			$scope.errorMsg = "Ingrese el nombre de el/los grupos"
			return;
		}else{
			for (var i = 0; i < $scope.groupName.length; i++) {
				if($scope.groupName[i] == "" || $scope.groupName[i] == undefined){
					$scope.errorMsg = "Ingrese el nombre de el/los grupos"
					return;
				}
			}
		}
		
		var length = Object.keys($scope.models.lists).length;
		for (var i = 0; i < length; i++) {
			groups.push({"Name": $scope.groupName[i], "TeamsId" : []})
			var list = $scope.models.lists[i];

			for (var j = 0; j < list.length; j++) {
				groups[i].TeamsId.push(list[j].Team.Id);
			}
		}

		DataService.postGroups(groups, $scope.tournament.Id, function(response){
			$modalInstance.close();
		}, function(response, status){
			$scope.errorMsg = response.Message;
		});
	}

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};