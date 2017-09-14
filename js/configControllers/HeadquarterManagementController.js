torneoFutbol.controller('HeadquarterManagementCtrl', function ($scope, $rootScope, $location, $modal, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

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

	$scope.getHeadquarters = function(){
		DataService.getHeadquarters(function(response){
			$scope.headquarters = response;
		}, function(response, status){

		});
	}

	$scope.getHeadquarters();

	$scope.newHeadquarter = function(){
		$scope.editHearquearter();
	}

	$scope.editHearquearter = function(headquarter){
		var modalInstance = $modal.open ({

			templateUrl: 'Hearquearter.html',
			controller: HeadquarterCtrl,
			size: 'lg',
			backdrop: 'static',
			resolve: {
				headquarter : function(){
					return headquarter;
				},
				urlApi : function(){
					return $rootScope.urlApi;
				}
	        }
      	});

	    modalInstance.result.then(function () {
      		$scope.getHeadquarters();
        },function(){

        });
	}

});


var HeadquarterCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate, headquarter, urlApi) {
	$scope.saving = false;
	$scope.errorMsg = null;
	$scope.headquarter = headquarter
	var method = 'POST';
	var url = 'v1/headquarters/';

	//Ruta base donde se suben los documentos para los tickets como las imagenes para las jurisdicciones
    $scope.folderUploads = urlApi + "/Files/Uploads/";

    //Ruta donde se almacenan los adjuntos para los tickets
    $scope.folderPathHeadquarters = "Headquarters/";

    //Ruta donde se almacenan las imagenes adjuntas para las jurisdicciones
    $scope.folderPathJurisdictions = "logos/jurisdictions/";

	$scope.getFilesByFolder = function(headquarterId) {
        //Obtengo los archivos asociados al ticket
        var path = $scope.folderPathHeadquarters + headquarterId;
        DataService.getFilesByFolder(path, function (data) {
        }, function (response, status) {
            $scope.headquarterFiles = response.Files;
            //$scope.filePath = "uploads/tickets/docs/" + $scope.idTicket + "/";
        	$scope.filePath = $scope.folderUploads + $scope.folderPathHeadquarters + headquarterId + "/";
        });
    }

    $scope.fileNameChanged = function(element){
        $scope.files = element.files;
     }

    $scope.deleteFile = function(fileName){
        DataService.deleteFile($scope.folderPathHeadquarters + $scope.headquarter.Id + '/' + fileName, function (data) {
        	$scope.getFilesByFolder(headquarter.Id);
        }, function (response, status) {
        	$scope.getFilesByFolder(headquarter.Id);
            // $scope.teamFiles=undefined;
            // $scope.filePath=undefined;
        });
    }

    $scope.postFile = function(headquarterId) {
        var length = $scope.files.length;
        if (length > 0) {
          var fileData = new FormData();
          for (i = 0; i < length; i++) {
              fileData.append("file" + i, $scope.files[i]);
          }
        }

        DataService.postFile($scope.folderPathHeadquarters + headquarterId, fileData, function (data) {
            //console.info(data);
            // $scope.getFilesByFolder();
            $modalInstance.close();
        }, function (response, status) {
            //console.info(response);
            $scope.errorMsg = response.Message;
            // $scope.getFilesByFolder();
        });
    }

	if(headquarter){
		$scope.name = headquarter.Name;
		$scope.address = headquarter.Address;
		$scope.city = headquarter.City;
		method = 'PUT';
		url += headquarter.Id;
		$scope.getFilesByFolder(headquarter.Id)
	}


	$scope.accept = function(){

		if($scope.name == '' || $scope.name == undefined){
			$scope.errorMsg = 'Por favor, ingrese el nombre de la sede.';
			return;
		}

		if($scope.address == '' || $scope.address == undefined){
			$scope.errorMsg = 'Por favor, ingrese la dirección de la sede.';
			return;
		}

		if($scope.city == '' || $scope.city == undefined){
			$scope.errorMsg = 'Por favor, ingrese la localidad de la sede.';
			return;
		}

		var data = {
			'Name' : $scope.name,
			'Address' : $scope.address,
			'City' : $scope.city
		};

		DataService.manageHeadquarter(method, url, data, function(response){
			if($scope.files && $scope.files.length != 0){
				
				if(method == 'POST'){
					$scope.postFile(response);
				}else{
					$scope.postFile(headquarter.Id);
				}
			}else{
				$modalInstance.close();
			}
		}, function(response, status){
			$scope.errorMsg = response.Message;
		});
	}


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};