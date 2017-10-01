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
	        managePlayer: function (method, url, data, fnSuccess, fnError) {
	            restApi.call({
	                method: method,
	                url: url,
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
	        manageTournament: function (method, url, data, fnSuccess, fnError) {
	            restApi.call({
	                method: method,
	                url: url,
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

	        manageMatch: function (method, url, data, fnSuccess, fnError) {
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

	        getTournaments: function (fnSuccess, fnError) {
	            restApi.call({
	                method: 'GET',
	                url: 'v1/tournaments',
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },

	        getTournamentByID: function (tournamentID, fnSuccess, fnError) {
	            restApi.call({
	                method: 'GET',
	                url: 'v1/tournaments/' + tournamentID,
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },

	        getTeams: function (fnSuccess, fnError) {
	            restApi.call({
	                method: 'GET',
	                url: 'v1/teams',
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },

	        getTeamByID: function (teamId, fnSuccess, fnError) {
	            restApi.call({
	                method: 'GET',
	                url: 'v1/teams/' + teamId,
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },

	        getMatches: function (fnSuccess, fnError) {
	            restApi.call({
	                method: 'GET',
	                url: 'v1/matches',
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
			},

			getFiles: function (fnSuccess, fnError) {
				restApi.call({
					method: 'GET',
					url: 'v1/files',
					headers: { 
						'Content-Type': 'application/json'
					},
				}, fnSuccess, fnError, true);
			},


			getFileByTeamId: function (fullNamePath, data, fnSuccess, fnError) {
				restApi.call({
					method: 'GET',
					url: 'v1/files/GetByFolderPath?FolderPath=' + fullNamePath,
					data: data,
					headers: { 
						'Content-Type': 'application/json'
					},
				}, fnSuccess, fnError, true);
			},

			getFilesByFolder: function (folderPath, data, fnSuccess, fnError) {
				restApi.call({
					method: 'GET',
					url: 'v1/files/GetByFolderPath?FolderPath=' + folderPath,
					data: data,
					headers: { 
						'Content-Type': 'application/json'
					},
				}, fnSuccess, fnError, true);
			},

			deleteFile: function (fullNamePath, data, fnSuccess, fnError) {
				restApi.call({
					method: 'DELETE',
					url: 'v1/files?FileNamePath=' + fullNamePath,
					data : data,

					headers: { 
						'Content-Type': 'application/json'
					},
				}, fnSuccess, fnError, true);
			},

			loadResults: function (matchID, data, fnSuccess, fnError) {
	            restApi.call({
	                method: 'PUT',
	                url: 'v1/matches/results/' + matchID,
	                data: data,
	               	headers: { 
	                	'Content-Type': 'application/json'
	                },
	            }, fnSuccess, fnError, true);
	        },

	        getPositionsByTournamentId: function (tournamentID, fnSuccess, fnError) {
				restApi.call({
					method: 'GET',
					url: 'v1/tournaments/' + tournamentID + '/positions',
					headers: { 
						'Content-Type': 'application/json'
					},
				}, fnSuccess, fnError, true);
			},

	        getStadisticsByTeamId: function (teamID, fnSuccess, fnError) {
				restApi.call({
					method: 'GET',
					url: 'v1/teams/' + teamID + '/stadistics',
					headers: { 
						'Content-Type': 'application/json'
					},
				}, fnSuccess, fnError, true);
			},

	        getMatchesByTournamentId: function (tournamentID, fnSuccess, fnError) {
				restApi.call({
					method: 'GET',
					url: 'v1/tournaments/' + tournamentID + '/matches',
					headers: { 
						'Content-Type': 'application/json'
					},
				}, fnSuccess, fnError, true);
			},

	        postFixture: function (tournamentID, fnSuccess, fnError) {
				restApi.call({
					method: 'POST',
					url: 'v1/tournaments/' + tournamentID + '/fixture',
					headers: { 
						'Content-Type': 'application/json'
					},
				}, fnSuccess, fnError, true);
			},

	        getHistoricalStadistics: function (teamID, fnSuccess, fnError) {
				restApi.call({
					method: 'POST',
					url: 'v1/teams/' + teamID + '/historicalStadistics',
					headers: { 
						'Content-Type': 'application/json'
					},
				}, fnSuccess, fnError, true);
			},

	        getUpcomingMatchesByTeam: function (teamID, fnSuccess, fnError) {
				restApi.call({
					method: 'POST',
					url: 'v1/teams/' + teamID + '/upcomingMatches',
					headers: { 
						'Content-Type': 'application/json'
					},
				}, fnSuccess, fnError, true);
			},

	        sendEmail: function (data, fnSuccess, fnError) {
				restApi.call({
					method: 'POST',
					url: 'v1/emails/',
					data: data,
					headers: { 
						'Content-Type': 'application/json'
					},
				}, fnSuccess, fnError, true);
			},

	        postGroups: function (data, tournamentID,  fnSuccess, fnError) {
				restApi.call({
					method: 'POST',
					url: 'v1/tournaments/' + tournamentID + '/groups',
					data: data,
					headers: { 
						'Content-Type': 'application/json'
					},
				}, fnSuccess, fnError, true);
			}

      };
	}
]);