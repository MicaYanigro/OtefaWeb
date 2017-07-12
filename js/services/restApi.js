(function () {
    'use strict';
    var SERVER_URL = 'http://localhost:1111';
    
    angular.module('torneoFutbol').factory('restApi', ['$http', '$location', '$rootScope', '$cookieStore',
        function ($http, $location, $rootScope, $cookieStore) {
            return {
                call: function (config, fnSuccess, fnError) {
                    config.url = SERVER_URL + '/' + config.url;
                    $http(config).success(function (data, status, headers, config) {                    
                        if (fnSuccess) {
                            fnSuccess(data, status, headers, config);
                        }
                    }).error(function (data, status, headers, config) {
                        if(status === 401){
                            $rootScope.globals = {};
                            $cookieStore.remove('globals');
                            $http.defaults.headers.common.Authorization = 'Token ';
                            $location.path('/');
                        }
                        if (fnError) {                                                    
                            fnError(data, status, headers, config);
                        }
                    });
                },
                getUrl: function () {
                    return SERVER_URL;
                }				
            };
        },
    ]);
})();