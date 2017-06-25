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
	        postJugador: function (data, fnSuccess, fnError) {
	            restApi.call({
	                method: 'POST',
	                url: 'v1/jugadores',
	                data: data,
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },
	        postEquipo: function (data, fnSuccess, fnError) {
	            restApi.call({
	                method: 'POST',
	                url: 'v1/equipos',
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
	        postSede: function (data, fnSuccess, fnError) {
	            restApi.call({
	                method: 'POST',
	                url: 'v1/sedes',
	                data: data,
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },
	        getJugadores: function (fnSuccess, fnError) {
	            restApi.call({
	                method: 'GET',
	                url: 'v1/jugadores',
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
	        }
      };
	}
]);