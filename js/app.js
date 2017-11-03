'use strict';
angular.module('Authentication', []);

var torneoFutbol = angular.module('torneoFutbol', ['dndLists', 'ngRoute', 'ngCookies', 'ngSanitize', 'ui.bootstrap', 'oc.lazyLoad', 'datatables', 'datatables.bootstrap', 'datatables.columnfilter', 'datatables.tabletools','pascalprecht.translate', 'Authentication', 'highcharts-ng'])
		.config(['$routeProvider','$translateProvider', function($routeProvider, $translateProvider, $ocLazyLoadProvider) {
		  $routeProvider

	            // .when('/', {
	            //     templateUrl: './views/login.html',
	            //     controller: 'LoginCtrl'
	            // })

			  	.when('/', {
	                templateUrl: './views/home.html',
	               	controller: 'HomeCtrl'
	            })

	            .when('/contacto', {
	                templateUrl: './views/contact.html',
	               	controller: 'ContactCtrl'
	            })

	            .when('/admin/jugadores', {
	                templateUrl: './configViews/players.html',
	               	controller: 'PlayersCtrl',
							resolve: {
	            		loadPlayersCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
	            			return $ocLazyLoad.load('js/configControllers/PlayersController.js');
	            		}]
	            	}
	            })

	            .when('/sedes', {
	                templateUrl: './views/sedes.html',
	               	controller: 'SedesCtrl',
							resolve: {
	            		loadSedesCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
	            			return $ocLazyLoad.load('js/controllers/SedesController.js');
	            		}]
	            	}
	            })

	            .when('/torneos', {
	                templateUrl: './views/tournaments.html',
	               	controller: 'TournamentsCtrl',
							resolve: {
	            		loadTournamentsCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
	            			return $ocLazyLoad.load('js/controllers/TournamentsController.js');
	            		}]
	            	}
	            })

	            .when('/torneo/:tournamentID/:tournamentName*', {
	                templateUrl: './views/tournamentDetails.html',
	               	controller: 'TournamentDetailsCtrl',
							resolve: {
	            		loadTournamentCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
	            			return $ocLazyLoad.load('js/controllers/TournamentDetailsController.js');
	            		}]
	            	}
	            })

	            .when('/equipos', {
	                templateUrl: './views/teams.html',
	               	controller: 'TeamsCtrl',
							resolve: {
	            		loadTeamsCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
	            			return $ocLazyLoad.load('js/controllers/TeamsController.js');
	            		}]
	            	}
	            })

	            .when('/equipo/:teamID/:teamName*', {
	                templateUrl: './views/team.html',
	               	controller: 'TeamCtrl',
	               	params:{idEquipo: 222},
							resolve: {
	            		loadTeamCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
	            			return $ocLazyLoad.load('js/controllers/TeamController.js');
	            		}]
	            	}
	            })

	            .when('/admin/gestion-equipos', {
	                templateUrl: './configViews/teamsManagement.html',
	               	controller: 'TeamsManagementCtrl',
							resolve: {
	            		loadTeamsManagementCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
	            			return $ocLazyLoad.load('js/configControllers/TeamsManagementController.js');
	            		}]
	            	}
	            })

	            .when('/admin/gestion-sedes', {
	                templateUrl: './configViews/headquarterManagement.html',
	               	controller: 'HeadquarterManagementCtrl',
							resolve: {
	            		loadHeadquarterManagementCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
	            			return $ocLazyLoad.load('js/configControllers/HeadquarterManagementController.js');
	            		}]
	            	}
	            })

	            .when('/admin/gestion-torneos', {
	                templateUrl: './configViews/tournamentsManagement.html',
	               	controller: 'TournamentsManagementCtrl',
							resolve: {
	            		loadTournamentsManagementCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
	            			return $ocLazyLoad.load('js/configControllers/TournamentsManagementController.js');
	            		}]
	            	}
	            })

	            .when('/admin/gestion-partidos', {
	                templateUrl: './configViews/matchesManagement.html',
	               	controller: 'MatchesManagementCtrl',
							resolve: {
	            		loadMatchesManagementCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
	            			return $ocLazyLoad.load('js/configControllers/MatchesManagementController.js');
	            		}]
	            	}
	            })

	            .when('/admin', {
	                templateUrl: './configViews/configuration.html',
	               	controller: 'ConfigurationCtrl',
							resolve: {
	            		loadConfigurationCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
	            			return $ocLazyLoad.load('js/configControllers/ConfigurationController.js');
	            		}]
	            	}
	            })

	            .otherwise({
	                templateUrl: './views/404.html'
	                // controller: 'Error404Ctrl'
	            })

			$translateProvider.preferredLanguage('es');

			$translateProvider.useStaticFilesLoader({
				prefix: 'js/i18n/',
				suffix: '.json'
			});
		}])

		.run(['$rootScope', '$location', '$cookieStore', '$http', '$templateCache', function ($rootScope, $location, $cookieStore, $http, $templateCache) {
	        	// keep user logged in after page refresh

	        	$rootScope.urlApi = 'http://localhost:1111';

		        $rootScope.globals = $cookieStore.get('globals') || {};
		        if ($rootScope.globals.currentUser) {
		            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.authdata.access_token;
		        }

		        $rootScope.$on('$locationChangeStart', function (event, next, current) {
		            // redirect to login page if not logged in
		            // if ($location.path() !== '/' && !$rootScope.globals.currentUser) {
		            //     $location.path('/');
		            // } else {
		            // 	if ($location.path() == '/' && $rootScope.globals.currentUser) {
			           //      $location.path('/home');
			           //  }
		            // }
		        });

		        $rootScope.$on('$routeChangeStart', function(event, next, current) {
	        		if (typeof(current) !== 'undefined'){
			            $templateCache.remove(current.templateUrl);
			        }
			    });
    	}]);
