torneoFutbol.controller('MatchesManagementCtrl', function ($scope, $rootScope, $modal, $location, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

  $scope.getCurrentPath();
	$scope.dtOptions = DTOptionsBuilder.newOptions()
                                            .withDOM('rltpi')
                                            .withOption('paging', false)
                                            .withOption('order', [])
                                            .withOption('info', false)
                                            .withOption('autoWidth', false)
                                            .withOption('scrollY', 300)
                                            .withLanguageSource("js/i18n/datatable/Spanish.json")
                                            .withBootstrap();

	$scope.getMatches = function(){
		DataService.getMatches(function(response){
			$scope.matches = response;
		}, function(response, status){

		});
	}

  $scope.getTournaments = function(){
    DataService.getTournaments(function(response){
      $scope.tournaments = response;
    }, function(response, status){

    })
  }

	$scope.getMatches();
  $scope.getTournaments();

	$scope.newMatch = function(){
    	$scope.editMatch();
    };

    $scope.editMatch = function(match){
		var modalInstance = $modal.open ({

			templateUrl: 'match.html',
			controller: MatchCtrl,
			size: 'lg',
			backdrop: 'static',
			resolve: {
				match : function(){
					return match;
				}
	        }
      	});

	    modalInstance.result.then(function () {
      		$scope.getMatches();
        },function(){

        });
	};

	$scope.loadResults = function(match){
		var modalInstance = $modal.open ({

			templateUrl: 'loadResults.html',
			controller: LoadResultsCtrl,
			size: 'lg',
			backdrop: 'static',
			resolve: {
				match : function(){
					return match;
				}
	        }
      	});

	    modalInstance.result.then(function () {
      		$scope.getMatches();
        },function(){

        });
	};

	var tableToExcel = (function() {

      var uri = "data:application/vnd.ms-excel;base64,",
          template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
                + '<head>'
            + '<meta http-equiv=Content-Type content="text/html; charset=windows-1252">'
            + '<meta name=ProgId content=Excel.Sheet>'
            + '<meta name=Generator content="Microsoft Excel 10">'
                + '<style><!-- '
                + '.otefaTitle{text-align: center;font-weight: bold;text-decoration: underline; font-size:33}'
                + '.otefaSubTitle{text-align: center;font-size:22}'
                + '.align-left-header{text-align: left;font-weight: bold;text-decoration: underline;font-size:17}'
                + '.align-center-header{text-align: center;font-weight: bold;text-decoration: underline;font-size:17}'
                + '.teamTitle{text-align: center;font-weight: bold;text-decoration: underline;font-size:22; background-color:#D9D9D9; border: 1.5px solid}'
                + '.resultTitle{text-align: center;font-weight: bold;font-size:14; background-color:#D9D9D9; border: 1.5px solid}'
                + '.header{text-align: left;font-weight: bold;font-size:14; background-color:#D9D9D9; border: 1.5px solid}'
                + '.noStyle{text-decoration: none;}'
                + '.font15{font-size: 18;}'
                + '.border{border: 1.5px solid}'
                + '.text-center{text-align: center;}'
                + '.imagePosition{text-align: right;}'
                + '--></style>'
                + '<!--[if gte mso 9]><xml>'
                + '<x:ExcelWorkbook>'
                + '<x:ExcelWorksheets>'
                + '<x:ExcelWorksheet>'
                + '<x:Name>{worksheet}</x:Name>'
                + '<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>'
                + '</x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook>'
                + '</xml><![endif]--></head><body>{table}</body></html>',
          base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
          format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) };
      return function(data, name) {
          data = data
          .replace(/á/g, "&#225;")
          .replace(/é/g, "&#233;")
          .replace(/í/g, "&#237;")
          .replace(/ó/g, "&#243;")
          .replace(/ú/g, "&#250;")
          .replace(/ü/g, "&#252;")
          .replace(/ñ/g, "&#241;")
          .replace(/Á/g, "&#193;")
          .replace(/É/g, "&#201;")
          .replace(/Í/g, "&#205;")
          .replace(/Ó/g, "&#211;")
          .replace(/Ú/g, "&#218;")
          .replace(/Ü/g, "&#220;")
          .replace(/Ñ/g, "&#209;")
          .replace(/°/g, "&#176;");
          var ctx = {worksheet:name || "Worksheet", table:data};
          //window.location.href = uri+base64(format(template, ctx));
          var link = document.createElement("a");
          link.download = "Planilla de Partido.xls";
          link.href = uri + base64(format(template, ctx));
          link.click();
      }
  })()

	$scope.exportExcel = function(match){
		var url = ($location.absUrl()).split("#");

		var date = $filter('date')(match.Date, 'dd/MM/yyyy');
		var headquarter = match.Headquarter.Name;
		var round = match.Round;
		var team1 = match.MatchTeamList[0].Team.Name;
		var team2 = match.MatchTeamList[1].Team.Name;
    var playersTeam1 = match.MatchTeamList[0].Team.PlayersList;
    var playersTeam2 = match.MatchTeamList[1].Team.PlayersList;
		var table ='<table>';
		//	<img src=data:image/png;base64,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>
		table += '<tr>'
            + '<th colspan=5 class=otefaTitle>Otefa Fúbol</th>'
            + '<th rowspan=3><img class=imagePosition src="http://otefafutbol.com/api/img/logo-otefa.png"></th>'
        + '</tr>';

        table += '<tr>'
        	+ '<td colspan=5 class=otefaSubTitle>Planilla de partido</td>'
        + '</tr>';

        table += '<tr><th colspan=5></th></tr>';
        table += '<tr><th colspan=6></th></tr>';

        table += '<tr>'
            + '<th width=262 colspan=3 class=align-left-header>Sede:' + '<span class=noStyle> '+ headquarter +'</span>' + '</th>'
            + '<th width=267 colspan=3 class=align-center-header>Fecha:' + '<span class=noStyle> '+ date +'</span>' + ' </th>'
        + '</tr>';

        table += '<tr>'
            + '<th width=262 colspan=3 class=align-left-header>' + round + '° Fecha: ' + team1 + ' vs ' + team2 + '</th>'
            + '<th width=267 colspan=3 class=align-center-header>Horario: ' + ' <span class=noStyle>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>' + ' </th>'
        + '</tr>';

        table += '<tr>'
            + '<th colspan=4 class=teamTitle>Equipo</th>'
            + '<th width=85 class=resultTitle>Abonado:</th>'
            + '<td width=118 class=resultTitle>'+'</td>'
          + '</tr>';

        table += '<tr>'
        	+ '<td colspan=4 class=border>' + team1 + '</td>'
        	+ '<th colspan=2 class=header>Resultado:</th>'
          + '</tr>';

     	table += '<tr>'
         	+ '<th width=120 class=header>Nombre</th>'
            + '<th width=132 class=header>Apellido</th>'
            + '<th width=110 class=header>Dni</th>'
            + '<th width=64 class=header>N°</th>'
            + '<th width=85 class=header>Goles</th>'
            + '<th width=118 class=header>Firma</th>'
          + '</tr>';

        for (var i = 0; i < 16; i++) {
          if(i < playersTeam1.length){
          	table +='<tr>'
          		+ '<td class=border>'+ playersTeam1[i].Name +'</td>'
          		+ '<td class=border>'+ playersTeam1[i].LastName +'</td>'
          		+ '<td class=border>'+ playersTeam1[i].Dni +'</td>'
          		+ '<td class=border></td>'
          		+ '<td class=border></td>'
          		+ '<td class=border></td>'
          	+ '</tr>';
          }else{
            table +='<tr>'
              + '<td class=border></td>'
              + '<td class=border></td>'
              + '<td class=border></td>'
              + '<td class=border></td>'
              + '<td class=border></td>'
              + '<td class=border></td>'
            + '</tr>';
          }
        }
         
        table += '</tr>'
		
		table += '<tr></tr>';

        table += '<tr>'
            + '<th colspan=4 class=teamTitle>Equipo</th>'
            + '<th width=85 class=resultTitle>Abonado:</th>'
            + '<td width=118 class=resultTitle>'+ 'ABONADO' +'</td>'
          + '</tr>';

        table += '<tr>'
        	+ '<td colspan=4 class=border>' + team2 + '</td>'
        	+ '<th class=header>Resultado:</th>'
        	+ '<td class=border></td>'
          + '</tr>';

     	table += '<tr>'
         	+ '<th width=120 class=header>Nombre</th>'
            + '<th width=132 class=header>Apellido</th>'
            + '<th width=110 class=header>Dni</th>'
            + '<th width=64 class=header>N°</th>'
            + '<th width=85 class=header>Goles</th>'
            + '<th width=118 class=header>Firma</th>'
          + '</tr>';

        for (var i = 0; i < 16; i++) {
        	
        	if(i < playersTeam2.length){
            table +='<tr>'
              + '<td class=border>'+ playersTeam2[i].Name +'</td>'
              + '<td class=border>'+ playersTeam2[i].LastName +'</td>'
              + '<td class=border>'+ playersTeam2[i].Dni +'</td>'
              + '<td class=border></td>'
              + '<td class=border></td>'
              + '<td class=border></td>'
            + '</tr>';
          }else{
            table +='<tr>'
              + '<td class=border></td>'
              + '<td class=border></td>'
              + '<td class=border></td>'
              + '<td class=border></td>'
              + '<td class=border></td>'
              + '<td class=border></td>'
            + '</tr>';
          }

        }

        table+= '<tr></tr>';

        table += '<tr><td colspan=6 class=text-center>La firma en esta hoja indica que es responsable por sus actos desligando a la organización de cualquier eventualidad que pudiera ocurrir.</td></tr>';

        table+= '<tr></tr>';

        table+= '<tr>'
        	+ '<td colspan=3 class=font15><b>www.otefafutbol.com</b></td>'
        	+ '<td colspan=3 class=font15><b><u>Celular:</u> (11) 1536005491</b></td>'
        	'</tr>';

        table+= '<tr>'
        	+ '<td colspan=3 class=font15><b>info@otefafutbol.com</b></td>'
        	'</tr>';

     	table += '</table>';

    	tableToExcel(table, "Planilla");
	}

});

var MatchCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate, match) {
	
	$scope.saving = false;
	$scope.errorMsg = null;
	$scope.match = match;
	var method = 'POST';
	var url = 'v1/matches/'
	$scope.teamsSelected = [];

	$scope.getHeadquarters = function(){
		DataService.getHeadquarters(function(response){
			$scope.headquarters = response;
		}, function(response, status){

		});
	};

	$scope.getTeams = function(){
		DataService.getTeams(function(response){
			$scope.teams = response;
		}, function(response, status){

		});
	}

	$scope.getTournaments = function(){
		DataService.getTournaments(function(response){
			$scope.tournaments = response;
		}, function(response, status){

		})
	}

	$scope.getHeadquarters();
	$scope.getTeams();
	$scope.getTournaments();


	if(match){
		method = 'PUT';
		url += match.Id;
		$scope.team1 = match.MatchTeamList[0].Team.Id;
		$scope.team2 = match.MatchTeamList[1].Team.Id;
		$scope.headquarter = match.Headquarter.Id;
		$scope.date = new Date(match.Date);
	}
	
	$scope.manageMatch = function(){

		if($scope.team1 == undefined){
			$scope.errorMsg = 'Por favor, seleccione el primer equipo.';
			return;
		}

		if($scope.team2 == undefined){
			$scope.errorMsg = 'Por favor, seleccione el segundo equipo.';
			return;
		}
		if($scope.team1 == $scope.team2){
			$scope.errorMsg = 'El equipo local y el visitante no pueden ser el mismo equipo. Por favor, modifique uno de los equipos.';
			return;
		}

		if($scope.headquarter == undefined){
			$scope.errorMsg = 'Por favor, seleccione la sede del partido.';
			return;
		}

		if($scope.date == undefined){
			$scope.errorMsg = 'Por favor, seleccione la fecha del partido.'
			return;
		}

		if($scope.tournament == undefined){
			$scope.errorMsg = 'Por favor, seleccione el torneo.'
			return;
		}

		$scope.teamsSelected.push($scope.team1);
		$scope.teamsSelected.push($scope.team2);
		

		var data = {
			"Tournament" : $scope.tournament.Id,
			'Date' : new Date($scope.date),
			'Headquarter' : $scope.headquarter,
			'Teams' : $scope.teamsSelected,
      'Group' : $scope.group,
      'Round' : $scope.round
		}


		$scope.saving = true;
		DataService.manageMatch(method, url, data, function(response){
			$modalInstance.close();
		}, function(response, status){
			$scope.saving = false;
			$scope.errorMsg = response.Message;
		});
	}

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};


var LoadResultsCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate, match) {
	
	$scope.saving = false;
	$scope.init = false;
	$scope.errorMsg = null;
	$scope.match = match;
	var results = match.MatchTeamList;
	$scope.team1 = match.MatchTeamList[0].Team;
	$scope.team2 = match.MatchTeamList[1].Team;
	$scope.playersList = $scope.team1.PlayersList.concat($scope.team2.PlayersList);

	if($scope.match.MatchTeamList[0].Goals == null)
		$scope.init = true;
	
	if($scope.init == true){
		$scope.playersDetailsTeam1 = [];
		$scope.playersDetailsTeam2 = [];
	}else{

    if(match.Figure)
		  $scope.figure = match.Figure.Id;

		$scope.playersDetailsTeam1 = [];
		$scope.playersDetailsTeam2 = [];
		var playersTeam1 = $scope.team1.PlayersList;
		var playersTeam2 = $scope.team2.PlayersList;

		$scope.goalsTeam1 = results[0].Goals;
		$scope.goalsTeam2 = results[1].Goals;
		$scope.hasBonusTeam1 = results[0].HasBonusPoint;
		$scope.hasBonusTeam2 = results[1].HasBonusPoint;

		for (var i = 0; i < playersTeam1.length; i++) {
      if(results[0].PlayersDetails[i].Card == 1){
			 $scope.team1.PlayersList[i].yellowCard = true;
       $scope.team1.PlayersList[i].redCard = false;
      }else{
        if(results[0].PlayersDetails[i].Card == 2){
         $scope.team1.PlayersList[i].yellowCard = false;
         $scope.team1.PlayersList[i].redCard = true;
        }else{
          $scope.team1.PlayersList[i].yellowCard = false;
          $scope.team1.PlayersList[i].redCard = false;
        }
      }
			$scope.team1.PlayersList[i].goals = results[0].PlayersDetails[i].Goals;
			$scope.team1.PlayersList[i].hasPlayed = results[0].PlayersDetails[i].Played;



		}

		for (var i = 0; i < playersTeam2.length; i++) {
			if(results[1].PlayersDetails[i].Card == 1){
       $scope.team2.PlayersList[i].yellowCard = true;
       $scope.team2.PlayersList[i].redCard = false;
      }else{
        if(results[1].PlayersDetails[i].Card == 2){
         $scope.team2.PlayersList[i].yellowCard = false;
         $scope.team2.PlayersList[i].redCard = true;
        }else{
          $scope.team2.PlayersList[i].yellowCard = false;
          $scope.team2.PlayersList[i].redCard = false;
        }
      }
			$scope.team2.PlayersList[i].goals = results[1].PlayersDetails[i].Goals;
			$scope.team2.PlayersList[i].hasPlayed = results[1].PlayersDetails[i].Played;
		}
	}

	$scope.loadResults = function(){

		var playersTeam1 = $scope.team1.PlayersList;
		var playersTeam2 = $scope.team2.PlayersList;

		for (var i = 0; i < playersTeam1.length; i++) {
			var card = playersTeam1[i].yellowCard ? 1 : playersTeam1[i].redCard ? 2 : 0;
			$scope.playersDetailsTeam1.push({
										'PlayerID' : playersTeam1[i].Id,
										'Goals' : playersTeam1[i].goals,
										'Played' : playersTeam1[i].hasPlayed,
										'Card' : card,
										'Observation' : '' 
										});
		}

		for (var j = 0; j < playersTeam2.length; j++) {
			var card = playersTeam2[j].yellowCard ? 1 : playersTeam2[j].redCard ? 2 : 0;
			$scope.playersDetailsTeam2.push({
										'PlayerID' : playersTeam2[j].Id,
										'Goals' : playersTeam2[j].goals,
										'Played' : playersTeam2[j].hasPlayed,
										'Card' : card,
										'Observation' : '' 
										});
		}


		var dataTeam1 = {
			'MatchTeamID' : $scope.match.MatchTeamList[0].Id,
			'Goals' : $scope.goalsTeam1,
			'AgainstGoals' : $scope.goalsTeam2,
			'HasBonusPoint' : $scope.hasBonusTeam1,
			'FigureID' : $scope.figure,
			'PlayersDetails' : $scope.playersDetailsTeam1
		}

		var dataTeam2 = {
			'MatchTeamID' : $scope.match.MatchTeamList[1].Id,
			'Goals' : $scope.goalsTeam2,
			'AgainstGoals' : $scope.goalsTeam1,
			'HasBonusPoint' : $scope.hasBonusTeam2,
			'FigureID' : $scope.figure,
			'PlayersDetails' : $scope.playersDetailsTeam2
		}

		DataService.loadResults($scope.match.Id, dataTeam1, function(response){
			
			DataService.loadResults($scope.match.Id, dataTeam2, function(response){
				$modalInstance.close();
			}, function(response, status){
				$scope.errorMsg = response.Message;
			});


		}, function(response, status){
			$scope.errorMsg = response.Message;
		});


	}

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};