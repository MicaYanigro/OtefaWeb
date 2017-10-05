torneoFutbol.controller('ConfigurationCtrl', function ($scope, $rootScope, $location, $modal, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

	$scope.images = true;
    $scope.getCurrentPath();
	//Ruta base donde se suben los documentos para los tickets como las imagenes para las jurisdicciones
    $scope.folderUploads = $rootScope.urlApi + "/Files/Uploads/";

    //Ruta donde se almacenan los adjuntos para los tickets
    $scope.folderPathImages = "HomeImages/";

    $scope.folderPathNews = "News/";

    $scope.newsImagesPath = $scope.folderUploads + $scope.folderPathNews + "/";

	$scope.tabSelect = function(type){
        
        $scope.errorMsg = '';
        $scope.info = '';
        
        switch (type) {
            case "images":
                $scope.images = true;
                
                break;
        }
    };

    $scope.getNews = function(){
        DataService.getNews(function(response){
            $scope.newsList = response;
        }, function(response, status){

        });
    }

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
    $scope.getNews();

    $scope.postNews = function(){
        $scope.editNews();
    }

    $scope.editNews = function(news){
        var modalInstance = $modal.open ({

            templateUrl: 'manageNews.html',
            controller: ManageNewsCtrl,
            size: 'lg',
            backdrop: 'static',
            resolve: {
                news : function(){
                    return news;
                },
                urlApi : function(){
                    return $rootScope.urlApi;
                }
            }
        });

        modalInstance.result.then(function () {
            $scope.getNews();
        },function(){

        });
    }

});



var ManageNewsCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate, news, urlApi) {
    $scope.saving = false;
    $scope.errorMsg = null;
    $scope.news = news
    var url = 'v1/news/';
    var method = 'POST';


    //Ruta base donde se suben los archivos
    $scope.folderUploads = urlApi + "/Files/Uploads/";//$rootScope.urlApi + "/Files/Uploads/";

    //Ruta donde se almacenan los adjuntos para las noticias
    $scope.folderPathNews = "News/";

    $scope.filePath = $scope.folderUploads + $scope.folderPathNews + "/";

    if(news){
        $scope.path =  $scope.folderUploads + $scope.folderPathNews + news.Id + "/";
    }

    // $scope.getFilesByFolder = function(newsId) {
    //     //Obtengo los archivos asociados al ticket
    //     var path = $scope.folderPathNews;
    //     DataService.getFilesByFolder(path, function (data) {
    //     }, function (response, status) {
    //         $scope.newsImages = response.Files;
    //         //$scope.filePath = "uploads/tickets/docs/" + $scope.idTicket + "/";
            // $scope.filePath = $scope.folderUploads + $scope.folderPathNews + "/";
    //     });
    // }


    if(news){
        url += news.Id;
        method = 'PUT';
        $scope.title = news.Title;
        $scope.body =  news.Body;
        $scope.date = new Date();
        $scope.image = news.Image;
        // $scope.getFilesByFolder(news.Id);
    }

    $scope.fileNameChanged = function(element){
        $scope.files = element.files;
     };

    $scope.deleteFile = function(fileName){
        DataService.deleteFile($scope.folderPathNews + '/' + fileName, function (data) {
            $scope.image = null;
            // $scope.getFilesByFolder();
        }, function (response, status) {
            $scope.image = null;
            // $scope.getFilesByFolder();
            // $scope.teamFiles=undefined;
            // $scope.filePath=undefined;
        });
    };

    $scope.postFile = function() {
        if(!$scope.files || $scope.files.length == 0){
            $scope.errorMsg = 'Seleccione al menos una imagen para agregar a la noticia';
            return;
        }
        
        var length = $scope.files.length;
        if (length > 0) {
          var fileData = new FormData();
          for (i = 0; i < length; i++) {
              fileData.append("file" + i, $scope.files[i]);
          }
        }

        DataService.postFile($scope.folderPathNews, fileData, function (data) {
            //console.info(data);
            // $scope.getFilesByFolder();
            $scope.files = null;
            document.getElementById("uploadFiles").value = "";
            // $modalInstance.close();
        }, function (response, status) {
            //console.info(response);
            $scope.errorMsg = response.Message;
            // $scope.getFilesByFolder();
        });
    };
    
    $scope.manageNews = function(){
        
        if($scope.title == '' || $scope.title == undefined){
            $scope.errorMsg = "Por favor, ingrese el título de la noticia.";
            return;
        }

        if($scope.body == '' || $scope.body == undefined){
            $scope.errorMsg = "Por favor, ingrese el cuerpo de la noticia.";
            return;
        }

        if($scope.files && $scope.files.length > 0){
            var teamImage = $scope.files[0].name;
        }else{
            teamImage = $scope.teamImageName;
        }

        data = {
            'Date' : new Date(),
            'Body' : $scope.body,
            'Title' : $scope.title,
            'Image' : $scope.image
        };

        DataService.manageNews(method, url, data, function(response){
            if($scope.files && $scope.files.length > 0){

                $scope.postFile();
            }
            $modalInstance.close();
        }, function(response, status){
            if($scope.files && $scope.files.length > 0){

                $scope.postFile();
            }
            $modalInstance.close();
            $scope.errorMsg = response.Message;
        });

    }

    $scope.fileNameChanged = function(element){
        $scope.files = element.files;
        $scope.image = $scope.files[0].name;
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};