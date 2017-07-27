torneoFutbol.controller('TeamCtrl', function ($scope, $rootScope, $routeParams, $modal, $location, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

	$scope.getTeam = function(){
		
		DataService.getTeamByID($routeParams.teamID, function(response){
			$scope.team = response;
		}, function(response, status){
			$location.path('404');
		})


	
	/*
		DataService.getTeams(function(response){
			$scope.teams = response;

			$scope.team = $filter('filter')($scope.teams, {Id : $routeParams.teamID})[0];
			if($scope.team.length == 0){
				$location.path('404');
			}
		}, function(response, status){

		});
	*/


	};

	$scope.getTeam();


});