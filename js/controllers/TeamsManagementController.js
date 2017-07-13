torneoFutbol.controller('TeamsManagementCtrl', function ($scope, $rootScope, $location, $modal, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

	$scope.teams = [
					{
						"ID" : 1,
						"Shield:" :"escudoEquipo1.png",
						"TeamImage" : "fotoEquipo1.jpg", 
						"Name" : "Equipo 1",
						"Players" : [
										{
											"ID" : 1,
											"Name" : "Jose",
											"LastName" : "Perez"
										},
										{
											"ID" : 2,
											"Name" : "Mario",
											"LastName" : "Gonzalez"
										},
										{
											"ID" : 3,
											"Name" : "Lucas",
											"LastName" : "Parla"
										},
										{
											"ID" : 4,
											"Name" : "Pablo",
											"LastName" : "Tapia"
										},
										{
											"ID" : 5,
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
											"ID" : 7,
											"Name" : "Lucas",
											"LastName" : "Oroz"
										},
										{
											"ID" : 8,
											"Name" : "Ramiro",
											"LastName" : "Perla"
										},
										{
											"ID" : 9,
											"Name" : "Luciano",
											"LastName" : "Giraudo"
										},
										{
											"ID" : 10,
											"Name" : "Santiago",
											"LastName" : "Donoso"
										},
										{
											"ID" : 11,
											"Name" : "Franco",
											"LastName" : "Ocaña"
										}
						],
						"Delegate" : "Marcelo Jaque"
					}
	];

	$scope.getTeams = function(){
		DataService.getTeams(function(response){
			$scope.teams = response;
		}, function(response, status){

		})
	}

	$scope.newTeam = function(){
		$scope.editTeam();
	}

	$scope.editTeam = function(team){
		var modalInstance = $modal.open ({

			templateUrl: 'manageTeam.html',
			controller: ManageTeamCtrl,
			size: 'lg',
			backdrop: 'static',
			resolve: {
				team : function(){
					return team;
				}
			}
      	});

	    modalInstance.result.then(function () {
      		$scope.getTeams();
        },function(){

        });
	}

});

var ManageTeamCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate, team) {
	$scope.saving = false;
	$scope.errorMsg = null;
	$scope.selection = [];
	var url = 'v1/teams';
	var method = 'POST';

	$scope.team = team;
	if(team){
		$scope.name = team.Name;
		
		if(team.TeamDelegate){
			$scope.teamDelegate = team.Delegate;
		}

		url += team.Id;
		method = 'PUT'

	}

	 //Ruta base donde se suben los documentos para los tickets como las imagenes para las jurisdicciones
    // $scope.folderUploads = $rootScope.urlApi + "/Files/Uploads/";

    //Ruta donde se almacenan los adjuntos para los tickets
    $scope.folderPathTeams = "Teams/";

    //Ruta donde se almacenan las imagenes adjuntas para las jurisdicciones
    $scope.folderPathJurisdictions = "logos/jurisdictions/";

	$scope.getPlayers = function(){
		DataService.getPlayers(function(response){
			$scope.players = response;
		}, function(response, status){

		});
	}

	$scope.getPlayers();

	// $scope.getFilesByFolder = function() {
 //        //Obtengo los archivos asociados al ticket
 //        var path = $scope.folderPathTickets + $scope.idTicket;
 //        DataService.getFilesByFolder(path, function (data) {
 //        }, function (response, status) {
 //            $scope.ticketFiles = response.Files;
 //            //$scope.filePath = "uploads/tickets/docs/" + $scope.idTicket + "/";
 //            $scope.filePath = $scope.folderUploads + $scope.folderPathTickets + $scope.idTicket + "/";
 //        });
 //    }

    $scope.postFile = function(teamId) {
        var length = $scope.files.length;
        if (length > 0) {
          var fileData = new FormData();
          for (i = 0; i < length; i++) {
              fileData.append("file" + i, $scope.files[i]);
          }
        }

        DataService.postFile($scope.folderPathTeams + teamId, fileData, function (data) {
            //console.info(data);
            // $scope.getFilesByFolder();
        }, function (response, status) {
        	$scope.errorMsg = response;
            //console.info(response);
            // $scope.getFilesByFolder();
        });
    }

	$scope.refreshData = function(data){
		var idx = $scope.selection.indexOf(data.Id);
		if(idx <= -1){
			return data;
		}
	}

	$scope.setPlayerID = function(item){
		var idx = $scope.selection.indexOf(item.Id);
		$scope.playerID = '';
	 
	    // si está seleccionado
	    if (idx <= -1) {
	       $scope.selection.push(item.Id);
	    } else {
	       $scope.selection.splice(idx, 1);
	    }
    }

    $scope.toggleSelection = function toggleSelection(playerId) {
		var idx = $scope.selection.indexOf(playerId);
	 
	    // si está seleccionado
	    if (idx > -1) {
	       $scope.selection.splice(idx, 1);
	    } else {
	       $scope.selection.push(playerId);
	    }
	};
	
	$scope.manageTeam = function(){
		
		if($scope.name == '' || $scope.name == undefined){
			$scope.errorMsg = "Por favor, ingrese el nombre del equipo.";
			return;
		}

		data = {
			'Name' : $scope.name,
			'TeamDelegate' : $scope.teamDelegate,
			'PlayersList' : $scope.selection
		};

		DataService.manageTeam(method, url, data, function(response){
			if($scope.files.length > 0){
				$scope.postFile(response)
			}
		}, function(response, status){
			$scope.errorMsg = response;
		});

	}

	$scope.fileNameChanged = function(element){
        $scope.files = element.files;
     }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};