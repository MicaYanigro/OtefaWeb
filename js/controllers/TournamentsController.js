torneoFutbol.controller('TournamentsCtrl', function ($scope, $rootScope, $location, $modal, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

    $scope.getCurrentPath();
	$scope.dtOptions = DTOptionsBuilder.newOptions()
                                            .withDOM('frltpi')
                                            .withOption('paging', false)
                                            .withOption('order', [])
                                            .withOption('info', false)
                                            .withOption('autoWidth', false)
                                            .withLanguageSource("js/i18n/datatable/Spanish.json")
                                            .withBootstrap();

	
	////////////////////////////////////////////////////////////////
	$scope.getTournaments = function(){
		DataService.getTournaments(function(response){
			$scope.tournaments = response;
		}, function(response, status){

		});
	}

	$scope.getTournaments();

	$scope.showFormatName = function(tournamentFormat){
    	if(tournamentFormat){
    		switch(tournamentFormat){
    			case 1:
    				return 'Fútbol 5';

    			case 2:
    				return 'Fútbol 6';

    			case 3:
    				return 'Fútbol 7';

    			case 4:
    				return 'Fútbol 8';

    			case 5:
    				return 'Fútbol 9';

    			case 6:
    				return 'Fútbol 11';
    		}
    	}
    };

    $scope.showClasificationFormatName = function(clasificationFormat){
    	if(clasificationFormat){
    		switch(clasificationFormat){
    			case 1:
    				return 'Liga (Zona Clasificacion + Zona Definicion)';

    			case 2:
    				return 'Liga (Zona Clasificacion + PlayOff)';

    			case 3:
    				return 'Liga';

    			case 4:
    				return 'Play Off';
    		}
    	}
    };

    $scope.openRules = function(tournament){
		var modalInstance = $modal.open ({

			templateUrl: 'rules.html',
			controller: RulesCtrl,
			size: 'lg',
			backdrop: 'static',
			resolve: {
				tournament : function(){
					return tournament;
				}
	        }
      	});

	    modalInstance.result.then(function () {
      		
        },function(){

        });
	}

});

var RulesCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate, tournament) {
	
	$scope.saving = false;
	$scope.errorMsg = null;
	$scope.selectedTeam = null;
	$scope.tournament = tournament;
	

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};