torneoFutbol.controller('AppCtrl', function ($scope, $rootScope, $window, $http, restApi, $cookieStore, $location, $modal, $translate, AuthenticationService, DataService) {

    $scope.home = function () {
        $location.path('/home');
    };
  
    $scope.imprimir = function() {
        window.print();
    };

    $rootScope.loader = false;
	
    $scope.loginUser = function (user, pass) {
        // $scope.dataLoading = true;
        // AuthenticationService.Login(user, pass, function (response) {
        //     if(response.success) {
        //       AuthenticationService.SetCredentials(response.resp, null);
        //         DataService.getEmpleadoByLdapUser(user, function (data) {
        //             AuthenticationService.SetCredentials(response.resp, data);
        //             $scope.empleado = $rootScope.globals.currentUser;

        //             //TODO: Jorge, HARDCODE
        //             if ($scope.empleado.pais.trim().toUpperCase() == 'BRASIL'){
        //                 $translate.use('pt');
        //             } else {
        //                 $translate.use('es');
        //             }

        //             $http.defaults.headers.common['Accept-Language'] = $translate.use();
        //             $location.path('/home');
        //             $scope.dataLoading = false;				
        //         }, function(){
        //             $scope.dataLoading = false;
        //         });
        //     } else {
        //         $scope.dataLoading = false;
        //         $scope.openTempMessage($translate.instant('app.errorIniciarSesion'), response.error, true, null, null, null);
        //     }
        //  });

        $location.path('/home');
    };

    $scope.salir = function () {
        // $scope.openTempMessage($translate.instant('app.cerrarSesion'), $translate.instant('app.confirmaCerrarSesion'), true, true, function(){
        //     AuthenticationService.ClearCredentials();
        //     $scope.empleado = $rootScope.globals.currentUser;
        //     $location.path('/');
        // });

        $location.path('/');
    };

   
    var modalInstance = null;
    $scope.closeTempMessage = function () {
        modalInstance.dismiss();
    };

    $scope.openTempMessage = function (title, message, showOkButton, showCancelButton, fnOk, fnDismiss) {
        modalInstance = $modal.open({
            templateUrl: 'generic-popup.html',
            controller: GenericPopupModalInstanceCtrl,
            backdrop: 'static',
            size: 'lg',
            keyboard: false,
            resolve: {
                title: function () {
                    return title;
                },
                message: function () {
                    return message;
                },
                showOkButton: function () {
                    return showOkButton;
                },
                showCancelButton: function () {
                    return showCancelButton;
                }
            }
        });

        modalInstance.result.then(function () {
            if(fnOk)
                fnOk();
        }, function () {
            if(fnDismiss)
                fnDismiss();
        });
    };
});



// ************************************* POPUP CONTROLLERS *********************************** //
var GenericPopupModalInstanceCtrl = function ($scope, $location, $modalInstance, $sce, title, message, showOkButton, showCancelButton) {
    $scope.title = $sce.trustAsHtml(title);
    $scope.message = $sce.trustAsHtml(message);
    $scope.showOkButton = showOkButton;
    $scope.showCancelButton = showCancelButton;

    $scope.closePopupOk = function () {
        $modalInstance.close();
    };

    $scope.closePopupCancel = function () {
        $modalInstance.dismiss('cancel');
    };
};


var IdiomaModalInstanceCtrl = function ($scope, $location, $modalInstance, $translate, $http, items){
    $scope.idiomasList = items;
    $scope.idioma = null;

    for(i = 0; i < $scope.idiomasList.length; i++){
        if($scope.idiomasList[i].id == $translate.use()){
            $scope.idioma = $scope.idiomasList[i];
            break;
        }
    }

    if($scope.idioma == null && $scope.idiomasList.length > 0){
        $scope.idioma = $scope.idiomasList[0];
    }

    $scope.aceptar = function () {
        $translate.use($scope.idioma.id);
        $http.defaults.headers.common['Accept-Language'] = $translate.use();
        $modalInstance.close();
    };

    $scope.cancelar = function () {
        $modalInstance.dismiss();
    };
};