torneoFutbol.controller('TeamsCtrl', function ($scope, $rootScope, $location, $cookieStore, $filter, $translate, DataService) {
	
	
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

	
});
