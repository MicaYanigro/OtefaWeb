torneoFutbol.controller('ConfigurationCtrl', function ($scope, $rootScope, $location, $modal, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

	$scope.images = true;
    $scope.getCurrentPath();
	//Ruta base donde se suben los documentos para los tickets como las imagenes para las jurisdicciones
    $scope.folderUploads = $rootScope.urlApi + "/Files/Uploads/";

    //Ruta donde se almacenan los adjuntos para los tickets
    $scope.folderPathImages = "HomeImages/";

	$scope.tabSelect = function(type){
        
        $scope.errorMsg = '';
        $scope.info = '';
        
        switch (type) {
            case "images":
                $scope.images = true;
                
                break;
        }
    };

    $scope.getFilesByFolder = function() {
        //Obtengo los archivos asociados al ticket
        var path = $scope.folderPathImages;
        DataService.getFilesByFolder(path, function (data) {
        }, function (response, status) {
            $scope.homeImages = response.Files;
            //$scope.filePath = "uploads/tickets/docs/" + $scope.idTicket + "/";
        	$scope.filePath = $scope.folderUploads + $scope.folderPathImages + "/";
        });
    };

    $scope.fileNameChanged = function(element){
        $scope.files = element.files;
     };

    $scope.deleteFile = function(fileName){
        DataService.deleteFile($scope.folderPathImages + '/' + fileName, function (data) {
        	$scope.getFilesByFolder();
        }, function (response, status) {
        	$scope.getFilesByFolder();
            // $scope.teamFiles=undefined;
            // $scope.filePath=undefined;
        });
    };

    $scope.postFile = function() {
        if(!$scope.files || $scope.files.length == 0){
        	$scope.openTempMessage('OTEFA', 'Seleccione al menos una imagen para agregar al inicio', true, null, null, null);
        }
        
        var length = $scope.files.length;
        if (length > 0) {
          var fileData = new FormData();
          for (i = 0; i < length; i++) {
              fileData.append("file" + i, $scope.files[i]);
          }
        }

        DataService.postFile($scope.folderPathImages, fileData, function (data) {
            //console.info(data);
            $scope.getFilesByFolder();
            $scope.files = null;
            document.getElementById("uploadFiles").value = "";
            // $modalInstance.close();
        }, function (response, status) {
            //console.info(response);
            $scope.errorMsg = response.Message;
            $scope.getFilesByFolder();
        });
    };

    $scope.getFilesByFolder();

});