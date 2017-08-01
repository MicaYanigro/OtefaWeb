torneoFutbol.controller('TournamentDetailsCtrl', function ($scope, $rootScope, $routeParams, $location, $modal, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

	$scope.getTournament = function(){
		DataService.getTournamentByID($routeParams.tournamentID, function(response){
			$scope.tournament = response;
		}, function(response, status){
			$location.path('404');
		})
	};

	$scope.getTournament();

});