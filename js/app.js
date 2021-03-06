'use strict';
angular.module('Authentication', []);

var torneoFutbol = angular.module('torneoFutbol', ['ngRoute', 'ngCookies', 'ngSanitize', 'ui.bootstrap', 'oc.lazyLoad', 'datatables', 'datatables.bootstrap', 'datatables.columnfilter', 'datatables.tabletools','pascalprecht.translate', 'Authentication', 'highcharts-ng'])
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

	            .when('/jugadores', {
	                templateUrl: './views/players.html',
	               	controller: 'PlayersCtrl'
	            })

	            .when('/sedes', {
	                templateUrl: './views/sedes.html',
	               	controller: 'SedesCtrl'
	            })

	            .when('/torneos', {
	                templateUrl: './views/tournaments.html',
	               	controller: 'TournamentsCtrl'
	            })

	            .when('/equipos', {
	                templateUrl: './views/teams.html',
	               	controller: 'TeamsCtrl'
	            })

	            .when('/equipo/:teamID/:teamName*', {
	                templateUrl: './views/team.html',
	               	controller: 'TeamCtrl'
	            })

	            .when('/gestion-equipos', {
	                templateUrl: './views/teamsManagement.html',
	               	controller: 'TeamsManagementCtrl'
	            })

	            .when('/gestion-sedes', {
	                templateUrl: './views/headquarterManagement.html',
	               	controller: 'HeadquarterManagementCtrl'
	            })

	            .when('/gestion-torneos', {
	                templateUrl: './views/tournamentsManagement.html',
	               	controller: 'TournamentsManagementCtrl'
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
