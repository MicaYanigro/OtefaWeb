torneoFutbol.controller('TeamsManagementCtrl', function ($scope, $rootScope, $location, $modal, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {


	//Ruta base donde se suben los documentos para los tickets como las imagenes para las jurisdicciones
    $scope.folderUploads = $rootScope.urlApi + "/Files/Uploads/";

    //Ruta donde se almacenan los adjuntos para los tickets
    $scope.folderPathTeams = "Teams/";

    //Ruta donde se almacenan las imagenes adjuntas para las jurisdicciones
    $scope.folderPathJurisdictions = "logos/jurisdictions/";

    $scope.getTeams = function(){
		DataService.getTeams(function(response){
			$scope.teams = response;
			for (var i = 0; i < $scope.teams.length; i++) {
				if($scope.teams[i].TeamImage)
					$scope.teams[i].TeamImage = $scope.folderUploads + $scope.folderPathTeams + $scope.teams[i].Id + '/' + $scope.teams[i].TeamImage;
			}
			
		}, function(response, status){

		})
	}

	$scope.getTeams();
	
	// $scope.getFilesByFolder = function(teamId) {
 //        //Obtengo los archivos asociados al ticket
 //        var path = $scope.folderPathTeams + teamId;
 //        DataService.getFilesByFolder(path, function (data) {
 //        }, function (response, status) {
 //            $scope.teamFiles = response.Files;
 //            //$scope.filePath = "uploads/tickets/docs/" + $scope.idTicket + "/";
 //            $scope.filePath = $scope.folderUploads + $scope.folderPathTeams + teamId + "/" + $scope.teamFiles.Name;
 //        });
 //    }

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
	var url = 'v1/teams/';
	var method = 'POST';

	//Ruta base donde se suben los documentos para los tickets como las imagenes para las jurisdicciones
    $scope.folderUploads = 'http://localhost:1111' + "/Files/Uploads/";//$rootScope.urlApi + "/Files/Uploads/";

    //Ruta donde se almacenan los adjuntos para los tickets
    $scope.folderPathTeams = "Teams/";

    //Ruta donde se almacenan las imagenes adjuntas para las jurisdicciones
    $scope.folderPathJurisdictions = "logos/jurisdictions/";

	$scope.getFilesByFolder = function(teamId) {
        //Obtengo los archivos asociados al ticket
        var path = $scope.folderPathTeams + teamId;
        DataService.getFilesByFolder(path, function (data) {
        }, function (response, status) {
            $scope.teamFiles = response.Files[0];
            //$scope.filePath = "uploads/tickets/docs/" + $scope.idTicket + "/";
            if($scope.teamFiles)
            	$scope.filePath = $scope.folderUploads + $scope.folderPathTeams + teamId + "/" + $scope.teamFiles.Name;
        });
    }

	$scope.team = team;

	if(team){
		url += team.Id;
		method = 'PUT';
		$scope.name = team.Name;
		$scope.teamDelegate = team.TeamDelegate;
		if(team.PlayersList.length != 0){
			for (var i = 0; i < team.PlayersList.length; i++) {
				$scope.selection.push(team.PlayersList[i].Id);
			}
		}
		$scope.getFilesByFolder(team.Id);
	}

	

	$scope.getPlayers = function(){
		DataService.getPlayers(function(response){
			$scope.players = response;
		}, function(response, status){

		});
	}

	$scope.getPlayers();

	

    

    $scope.deleteFile = function(fileName){
        DataService.deleteFile($scope.folderPathTeams + team.Id + '/' + fileName, function (data) {
          
        }, function (response, status) {
            $scope.teamFiles=undefined;
            $scope.filePath=undefined;
        });
    }

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
        	$scope.errorMsg = response.Message;
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

		var teamImage = "";
		var shieldImage = "";

		if($scope.files && $scope.files.length > 0){
			var teamImage = $scope.files[0].name;
		}

		data = {
			'Name' : $scope.name,
			'TeamDelegate' : $scope.teamDelegate,
			'PlayersList' : $scope.selection,
			'TeamImage' : teamImage
		};

		DataService.manageTeam(method, url, data, function(response){
			if($scope.files && $scope.files.length > 0){

				if(!team){
					$scope.postFile(response)
				}
				else{
					$scope.postFile(team.Id)
				}

			}
			$modalInstance.close();
		}, function(response, status){
			$scope.errorMsg = response.Message;
		});

	}

	$scope.fileNameChanged = function(element){
        $scope.files = element.files;
     }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};