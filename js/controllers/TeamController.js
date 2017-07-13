torneoFutbol.controller('TeamCtrl', function ($scope, $rootScope, $routeParams, $modal, $location, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

	$scope.teams = [
					{
						"ID" : 1,
						"Shield:" :"escudoEquipo1.png",
						"TeamImage" : "fotoEquipo1.jpg", 
						"Name" : "Equipo 1",
						"Players" : [
										{
											"Name" : "Jose",
											"LastName" : "Perez"
										},
										{
											"Name" : "Mario",
											"LastName" : "Gonzalez"
										},
										{
											"Name" : "Lucas",
											"LastName" : "Parla"
										},
										{
											"Name" : "Pablo",
											"LastName" : "Tapia"
										},
										{
											"Name" : "Mariano",
											"LastName" : "Volker"
										}
						],
						"Delegate" : "Cristian Gamarra"
					},
					{
						"ID" : 2,
						"Name" : "Equipo 2",
						"Shield:" :"escudoEquipo2.png",
						"TeamImage" : "fotoEquipo2.jpg",
						"Players" : [
										{
											"Name" : "Lucas",
											"LastName" : "Oroz"
										},
										{
											"Name" : "Ramiro",
											"LastName" : "Perla"
										},
										{
											"Name" : "Luciano",
											"LastName" : "Giraudo"
										},
										{
											"Name" : "Santiago",
											"LastName" : "Donoso"
										},
										{
											"Name" : "Franco",
											"LastName" : "Ocaña"
										}
						],
						"Delegate" : "Marcelo Jaque"
					}
	];

	$scope.getTeam = function(){
		
	/*
		DataService.getTeamByID($routeParams.teamID, function(response){
			$scope.team = response;
		}, function(response, status){
			$location.path('404');
		})
	*/

		$scope.team = $filter('filter')($scope.teams, {ID : $routeParams.teamID})[0];
		if($scope.team.length == 0){
			$location.path('404');
		}

	};

	$scope.getTeam();


});