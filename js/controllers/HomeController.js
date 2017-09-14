torneoFutbol.controller('HomeCtrl', function ($scope, $rootScope, $location, $cookieStore, $filter, $translate, DataService) {

    $scope.getCurrentPath();	
	//Ruta base donde se suben los documentos para los tickets como las imagenes para las jurisdicciones
	$scope.folderUploads = $rootScope.urlApi + "/Files/Uploads/";

    //Ruta donde se almacenan los adjuntos para los tickets
    $scope.folderPathImages = "HomeImages";

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

    $scope.getFilesByFolder();
	
	
});
