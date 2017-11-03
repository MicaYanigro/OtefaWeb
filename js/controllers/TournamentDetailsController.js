torneoFutbol.controller('TournamentDetailsCtrl', function ($scope, $rootScope, $routeParams, $location, $modal, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

	$scope.showFixture = true;
	$scope.getCurrentPath();
	$scope.dtOptions = DTOptionsBuilder.newOptions()
                                            .withDOM('rltpi')
                                            .withOption('paging', true)
                                            .withOption('lengthChange', false)
                                            .withOption('order', [])
                                            .withOption('info', false)
                                            .withOption('autoWidth', false)
                                            .withOption('lengthMenu', [5, 10, 15, 20])
                                            // .withOption('scrollY', 300)
                                            .withOption('scrollX', true)
                                            .withLanguageSource("js/i18n/datatable/Spanish.json")
                                            .withBootstrap();

	$scope.dtOptions2 = DTOptionsBuilder.newOptions()
                                            .withDOM('rltpi')
                                            .withOption('paging', false)
                                            // .withOption('lengthChange', false)
                                            .withOption('order', [])
                                            .withOption('info', false)
                                            .withOption('autoWidth', false)
                                            // .withOption('lengthMenu', [5, 10, 15, 20])
                                            // .withOption('scrollY', 300)
                                            .withOption('scrollX', true)
                                            .withLanguageSource("js/i18n/datatable/Spanish.json")
                                            .withBootstrap();

	$scope.getTournament = function(){
		DataService.getTournamentByID($routeParams.tournamentID, function(response){
			$scope.tournament = response;
		}, function(response, status){
			$location.path('404');
		})
	};

	$scope.getPositions = function(){
		DataService.getPositionsByTournamentId($routeParams.tournamentID, function(response){
			$scope.positions = response;
		}, function(response, status){

		});
	};

	$scope.getPositionsByGroups = function(){
		DataService.getPositionsByGroups($routeParams.tournamentID, function(response){
			$scope.groupsPosition = response;
			$scope.getMatches();
		}, function(response, status){

		});
	}

	$scope.getMatches = function(){
		DataService.getMatchesByTournamentId($routeParams.tournamentID, function(response){
			$scope.matches = response;
			$scope.groupsData = [];
			for (var i = 0; i < $scope.matches.length; i++) {
				$scope.groupsData.push($scope.matches[i]);
				$scope.groupsData.push($scope.groupsPosition[i]);
			}
			
		}, function(response, status){

		})
	}

	$scope.toggleTabs = function(status){
		$scope.showFixture = status;
	}

	$scope.getTournament();
	$scope.getPositionsByGroups();


	$scope.openDetails = function(match){
		var modalInstance = $modal.open ({

			templateUrl: 'matchDetail.html',
			controller: MatchDetailCtrl,
			size: 'lg',
			backdrop: 'static',
			resolve: {
				match : function(){
					return match;
				}
	        }
      	});

	    modalInstance.result.then(function () {

        },function(){

        });
	}

});


var MatchDetailCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate, match) {

    DataService.getMatchById(match.Id, function(response){
    	$scope.match = response;
    	$scope.team1 = $scope.match.MatchTeamList[0];
    	$scope.team2 = $scope.match.MatchTeamList[1];
    	console.log(response);
    }, function(response, status){

    });

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};
