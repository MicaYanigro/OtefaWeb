torneoFutbol.controller('LoginCtrl', function ($scope, $rootScope, $window, $location, AuthenticationService, DataService) {

    $scope.login = function () {
		  $scope.loginUser($scope.user, $scope.pass);
    };
});

