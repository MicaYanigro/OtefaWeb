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
	        postTicketState: function (data, fnSuccess, fnError) {
	            restApi.call({
	                method: 'POST',
	                url: 'v1/ticketstates',
	                data: data,
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },
	        postTicket: function (data, fnSuccess, fnError) {
	            restApi.call({
	                method: 'POST',
	                url: 'v1/tickets',
	                data: data,
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },
	        postComment: function (data, fnSuccess, fnError) {
	            restApi.call({
	                method: 'POST',
	                url: 'v1/ticketcomments',
	                data: data,
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },
	        getTicket: function (data, fnSuccess, fnError) {
	            restApi.call({
	                method: 'GET',
	                url: 'v1/tickets/' + data,
	                data: data,
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        }
      };
	}
]);