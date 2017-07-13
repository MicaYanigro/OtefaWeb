'use strict';
// Authentication service for user variables
angular.module('torneoFutbol').factory('DataService', ['restApi',
	function (restApi) {
	    return {
	        login: function (data, fnSuccess, fnError) {
	            restApi.call({
	                method: 'POST',
	                url: 'token',
	                data: data,
	               	headers: { 
	                	'Content-Type': 'application/json; charset=utf-8'
	                },
	            }, fnSuccess, fnError, true);
	        },
	        postPlayer: function (data, fnSuccess, fnError) {
	            restApi.call({
	                method: 'POST',
	                url: 'v1/players',
	                data: data,
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },
	        manageTeam: function (method, url, data, fnSuccess, fnError) {
	            restApi.call({
	                method: method,
	                url: url,
	                data: data,
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },
	        postTorneo: function (data, fnSuccess, fnError) {
	            restApi.call({
	                method: 'POST',
	                url: 'v1/torneos',
	                data: data,
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },
	        manageHeadquarter: function (method, url, data, fnSuccess, fnError) {
	            restApi.call({
	                method: method,
	                url: url,
	                data: data,
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },

	        getPlayers: function (fnSuccess, fnError) {
	            restApi.call({
	                method: 'GET',
	                url: 'v1/players',
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },
	        getTorneos: function (fnSuccess, fnError) {
	            restApi.call({
	                method: 'GET',
	                url: 'v1/torneos',
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },
	        getEquipos: function (fnSuccess, fnError) {
	            restApi.call({
	                method: 'GET',
	                url: 'v1/equipos',
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },

	        getSedes: function (fnSuccess, fnError) {
	            restApi.call({
	                method: 'GET',
	                url: 'v1/sedes',
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },

	        getHeadquarters: function (fnSuccess, fnError) {
	            restApi.call({
	                method: 'GET',
	                url: 'v1/headquarters',
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },

	        postFiles: function (data, fnSuccess, fnError) {
				restApi.call({
					method: 'POST',
					url: 'v1/files',
					headers: { 
						'Content-Type': 'text/plain'
					},
					data : data
				}, fnSuccess, fnError, true);	
			},

			postFile: function (fullNamePath, fileData, fnSuccess, fnError) {
				restApi.call({
					method: "POST",
					url: "v1/files?UploadsFolder=" + fullNamePath,
					data: fileData,
					transformRequest: angular.identity,
					headers: {
						'Content-Type': undefined
					},
				}, fnSuccess, fnError, true);
			}
      };
	}
]);