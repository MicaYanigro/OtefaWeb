torneoFutbol.controller('TeamsManagementCtrl', function ($scope, $rootScope, $location, $modal, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {


	//Ruta base donde se suben los documentos para los tickets como las imagenes para las jurisdicciones
    $scope.folderUploads = $rootScope.urlApi + "/Files/Uploads/";

    //Ruta donde se almacenan los adjuntos para los tickets
    $scope.folderPathTeams = "Teams/";

    //Ruta donde se almacenan las imagenes adjuntas para las jurisdicciones
    $scope.path = $scope.folderUploads + $scope.folderPathTeams;

    $scope.getTeams = function(){
		DataService.getTeams(function(response){
			$scope.teams = response;
			// for (var i = 0; i < $scope.teams.length; i++) {
			// 	if($scope.teams[i].TeamImage){
			// 		$scope.teams[i].TeamImage = $scope.folderUploads + $scope.folderPathTeams + $scope.teams[i].Id + '/' + $scope.teams[i].TeamImage;
			// 	}

			// 	if($scope.teams[i].ShieldImage){
			// 		$scope.teams[i].ShieldImage = $scope.folderUploads + $scope.folderPathTeams + $scope.teams[i].Id + '/' + $scope.teams[i].ShieldImage;
			// 	}
			// }
			
		}, function(response, status){

		})
	}

	$scope.getTeams();

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
				},
				urlApi : function(){
					return $rootScope.urlApi;
				}
			}
      	});

	    modalInstance.result.then(function () {
      		$scope.getTeams();
        },function(){

        });
	}

});

var ManageTeamCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate, team, urlApi) {
	$scope.saving = false;
	$scope.errorMsg = null;
	$scope.selection = [];
	var url = 'v1/teams/';
	var method = 'POST';
	$scope.team = team;

	//Ruta base donde se suben los documentos para los tickets como las imagenes para las jurisdicciones
    $scope.folderUploads = urlApi + "/Files/Uploads/";//$rootScope.urlApi + "/Files/Uploads/";

    //Ruta donde se almacenan los adjuntos para los tickets
    $scope.folderPathTeams = "Teams/";

    //Ruta donde se almacenan las imagenes adjuntas para las jurisdicciones
    if(team){
    	$scope.path =  $scope.folderUploads + $scope.folderPathTeams + team.Id + "/";
    }

	$scope.getFilesByFolder = function(teamId) {
        //Obtengo los archivos asociados al ticket
        var path = $scope.folderPathTeams + teamId;
        DataService.getFilesByFolder(path, function (data) {
        }, function (response, status) {
        	if(response.Files.length > 0){
	            $scope.teamFiles = response.Files;

	            for (var i = 0; i < $scope.teamFiles.length; i++) {
		            
		            if($scope.team.TeamImage == $scope.teamFiles[i].Name){
		            	$scope.filePath = $scope.path + $scope.teamFiles[i].Name;
		            	$scope.teamImageName = $scope.teamFiles[i].Name;
		            }else{
		            	if($scope.team.ShieldImage == $scope.teamFiles[i].Name){
		            		$scope.imagePath = $scope.path + $scope.teamFiles[i].Name
		            		$scope.shieldImageName = $scope.teamFiles[i].Name;
		            	}
		            }

	            }

	            
	            
        	}
        });
    }


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
            $scope.filePath=undefined;
            $scope.imagePath=undefined;
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

        if($scope.shieldFile && $scope.shieldFile.length > 0){
        	var fileData = new FormData();
			for (i = 0; i < length; i++) {
			  fileData.append("file" + i, $scope.shieldFile[i]);
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
		}else{
			teamImage = $scope.teamImageName;
		}

		if($scope.shieldFile && $scope.shieldFile.length > 0){
			var shieldImage = $scope.shieldFile[0].name;
		}else{
			shieldImage = $scope.shieldImageName;
		}

		data = {
			'Name' : $scope.name,
			'TeamDelegate' : $scope.teamDelegate,
			'PlayersList' : $scope.selection,
			'TeamImage' : teamImage,
			'ShieldImage' : shieldImage
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

 	$scope.shieldFileNameChanged = function(element){
        $scope.shieldFile = element.files;
 	}

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};