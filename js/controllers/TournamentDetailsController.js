torneoFutbol.controller('TournamentDetailsCtrl', function ($scope, $rootScope, $routeParams, $location, $modal, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

	$scope.getCurrentPath();
	$scope.dtOptions = DTOptionsBuilder.newOptions()
                                            .withDOM('rltpi')
                                            .withOption('paging', true)
                                            .withOption('lengthChange', false)
                                            .withOption('order', [])
                                            .withOption('info', false)
                                            .withOption('autoWidth', false)
                                            .withOption('lengthMenu', [5, 10, 15, 20])
                                            // .withOption('scrollY', 300)
                                            .withOption('scrollX', true)
                                            .withLanguageSource("js/i18n/datatable/Spanish.json")
                                            .withBootstrap();

	$scope.dtOptions2 = DTOptionsBuilder.newOptions()
                                            .withDOM('rltpi')
                                            .withOption('paging', false)
                                            // .withOption('lengthChange', false)
                                            .withOption('order', [])
                                            .withOption('info', false)
                                            .withOption('autoWidth', false)
                                            // .withOption('lengthMenu', [5, 10, 15, 20])
                                            // .withOption('scrollY', 300)
                                            .withOption('scrollX', true)
                                            .withLanguageSource("js/i18n/datatable/Spanish.json")
                                            .withBootstrap();

	$scope.getTournament = function(){
		DataService.getTournamentByID($routeParams.tournamentID, function(response){
			$scope.tournament = response;
		}, function(response, status){
			$location.path('404');
		})
	};

	$scope.getPositions = function(){
		DataService.getPositionsByTournamentId($routeParams.tournamentID, function(response){
			$scope.positions = response;
		}, function(response, status){

		});
	};

	$scope.getMatches = function(){
		DataService.getMatchesByTournamentId($routeParams.tournamentID, function(response){
			$scope.matches = response;
		}, function(response, status){

		})		
	}

	$scope.getTournament();
	$scope.getPositions();
	$scope.getMatches();

	$scope.dataList = [{
							'Local' : 'Equipo 1',
							'GoalsLocal': 3,
							'Visitor' : 'Equipo 2',
							'GoalsVisitor' : 1,
							'Headquarter' : 'Sede 1',
							'Date' : new Date(2017,1,3)
						},
						{
							'Local' : 'Equipo 3',
							'GoalsLocal': 5,
							'Visitor' : 'Equipo 4',
							'GoalsVisitor' : 2,
							'Headquarter' : 'Sede 2',
							'Date' : new Date(2017,3,7)
						},
						{
							'Local' : 'Equipo 5',
							'GoalsLocal': 7,
							'Visitor' : 'Equipo 6',
							'GoalsVisitor' : 2,
							'Headquarter' : 'Sede 5',
							'Date' : new Date(2017,3,10)
						},
						{
							'Local' : 'Equipo 7',
							'GoalsLocal': 7,
							'Visitor' : 'Equipo 8',
							'GoalsVisitor' : 9,
							'Headquarter' : 'Sede 2',
							'Date' : new Date(2017,2,6)
						},
						{
							'Local' : 'Equipo 9',
							'GoalsLocal': 5,
							'Visitor' : 'Equipo 10',
							'GoalsVisitor' : 1,
							'Headquarter' : 'Sede 4',
							'Date' : new Date(2017,5,5)
						},
						{
							'Local' : 'Equipo 11',
							'GoalsLocal': 13,
							'Visitor' : 'Equipo 12',
							'GoalsVisitor' : 7,
							'Headquarter' : 'Sede 1',
							'Date' : new Date(2017,1,23)
						},
						{
							'Local' : 'Equipo 13',
							'GoalsLocal': 15,
							'Visitor' : 'Equipo 14',
							'GoalsVisitor' : 12,
							'Headquarter' : 'Sede 2',
							'Date' : new Date(2017,5,27)
						},
						{
							'Local' : 'Equipo 15',
							'GoalsLocal': 10,
							'Visitor' : 'Equipo 16',
							'GoalsVisitor' : 5,
							'Headquarter' : 'Sede 5',
							'Date' : new Date(2017,6,20)
						},
						{
							'Local' : 'Equipo 17',
							'GoalsLocal': 3,
							'Visitor' : 'Equipo 18',
							'GoalsVisitor' : 8,
							'Headquarter' : 'Sede 2',
							'Date' : new Date(2017,2,16)
						},
						{
							'Local' : 'Equipo 19',
							'GoalsLocal': 4,
							'Visitor' : 'Equipo 20',
							'GoalsVisitor' : 9,
							'Headquarter' : 'Sede 4',
							'Date' : new Date(2017,3,8)
						}


	];

/*
	$scope.positions = [{
							'Team' : 'Equipo 1',
							'Points' : 23,
							'Ganados' : 11,
							'Empatados' : 1,
							'Perdidos' : 0,
							'Favor' : 24,
							'Contra' : 3
						},
						{
							'Team' : 'Equipo 5',
							'Points' : 25,
							'Ganados' : 12,
							'Empatados' : 11,
							'Perdidos' : 2,
							'Favor' : 30,
							'Contra' : 2 
						},
						{
							'Team' : 'Equipo 2',
							'Points' : 6,
							'Ganados' : 3,
							'Empatados' : 0,
							'Perdidos' : 10,
							'Favor' : 6,
							'Contra' : 20 
						},
						{
							'Team' : 'Equipo 3',
							'Points' : 43,
							'Ganados' : 20,
							'Empatados' : 3,
							'Perdidos' : 7,
							'Favor' : 44,
							'Contra' : 16
						},
						{
							'Team' : 'Equipo 4',
							'Points' : 29,
							'Ganados' : 10,
							'Empatados' : 9,
							'Perdidos' : 8,
							'Favor' : 34,
							'Contra' : 12
						},
						{
							'Team' : 'Equipo 5',
							'Points' : 65,
							'Ganados' : 30,
							'Empatados' : 5,
							'Perdidos' : 8,
							'Favor' : 77,
							'Contra' : 29
						}
	]
*/

});