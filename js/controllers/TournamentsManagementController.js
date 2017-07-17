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

    $scope.newTournament = function(){
    	$scope.editTournament();
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
	$scope.tournament = tournament
	var method = 'POST';
	var url = 'v1/tournaments/'
	$scope.selection = [];
	$scope.teamSelection = [];
	$scope.playerSelection = [];
	$scope.players = [];

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
		var idx = $scope.teamSelection.indexOf(teamId);
	 
	    // si está seleccionado
	    if (idx > -1) {
	       $scope.teamSelection.splice(idx, 1);
	    } else {
	       $scope.teamSelection.push(teamId);
	    }
	};

	$scope.togglePlayerSelection = function togglePlayerSelection(playerId) {
		var idx = $scope.playerSelection.indexOf(playerId);
	 
	    // si está seleccionado
	    if (idx > -1) {
	       $scope.playerSelection.splice(idx, 1);
	    } else {
	       $scope.playerSelection.push(playerId);
	    }
	};


	if(tournament){
		$scope.name = tournament.Name;
		$scope.tournamentFormat = tournament.TournamentFormat;
		$scope.clasificationFormat = tournament.ClasificationFormat;
		$scope.rules = tournament.Rules;
		$scope.prices = tournament.Prices;
		$scope.headquarters = tournament.Headquarters;
		$scope.dates = tournament.Dates
	}
	
	$scope.manageTournament = function(){

		if($scope.name == '' || $scope.name == undefined){
			$scope.errorMsg = 'Por favor, ingrese el nombre del torneo.'
			return;
		}

		if($scope.tournamentFormat == undefined){
			$scope.errorMsg = 'Por favor, seleccione el formato del torneo.'
			return;
		}

		if($scope.clasificationFormat == undefined){
			$scope.errorMsg = 'Por favor, seleccione el formato de clasificación del torneo.'
			return;
		}

		if($scope.rules == '' || $scope.rules == undefined){
			$scope.errorMsg = 'Por favor, ingrese las reglas del torneo.'
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
		var data = {
			'Name' : $scope.name,
			'TournamentFormat' : $scope.tournamentFormat,
			'ClasificationFormat' : $scope.clasificationFormat,
			'Rules' : $scope.rules,
			'Prices' : $scope.prices,
			'Headquarters' : $scope.selection,
			'Dates' : date
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