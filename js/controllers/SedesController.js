torneoFutbol.controller('SedesCtrl', function ($scope, $rootScope, $modal, $location, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {
	
	$scope.dtOptions = DTOptionsBuilder.newOptions()
                                            .withDOM('frltpi')
                                            .withOption('paging', false)
                                            .withOption('order', [])
                                            .withOption('info', false)
                                            .withOption('autoWidth', false)
                                            .withOption('scrollY', 300)
                                            .withLanguageSource("js/i18n/datatable/Spanish.json")
                                            .withBootstrap();

	$scope.sedes = [
						{
							"Nombre" : "Avellaneda FC",
							"Direccion" : "Salta 2243",
							"Localidad" : "Avellaneda",
							"Torneo" : "Torneo 1"
						},
						{
							"Nombre" : "Caballito FC",
							"Direccion" : "Yerbal 1252",
							"Localidad" : "CABA",
							"Torneo" : ""
						},
						{
							"Nombre" : "La Plata FC",
							"Direccion" : "Calle 12 521",
							"Localidad" : "La Plata",
							"Torneo" : "Torneo 3"
						}
	];


	$scope.initMap = function(){
		
	}

	$scope.openImages = function(sede){
		var modalInstance = $modal.open ({

			templateUrl: 'sedeImages.html',
			controller: SedeImagesCtrl,
			size: 'lg',
			backdrop: 'static',
			resolve: {
				sede : function(){
					return sede;
				}
	        }
      	});

	    modalInstance.result.then(function () {
      		
        },function(){

        });
	}

	$scope.openMap = function(sede){

		var modalInstance = $modal.open ({

			templateUrl: 'location.html',
			controller: LocationCtrl,
			size: 'lg',
			backdrop: 'static',
			resolve: {
				sede : function(){
					return sede;
				}
	        }
      	});

	    modalInstance.result.then(function () {
      		
        },function(){

        });

	}
	
});


var LocationCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate, sede) {
	
	// $window.checkScript = function(){

	// 	if ($("#googleScript").length == 0) {
	//         var s = document.createElement("script");
	//         s.id = "googleScript";
	//         s.type = "text/javascript";
	//         //s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAa90coJfue9EpwiZhK2hyTeBiz4MLgfXg";
	//         s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAxU9cTtBI5Pt1cz8pVi63cXoFJRSs-n4c&callback=initMap";
	//         $("head").append(s);
	// 	}else{
	// 		initMap();
	// 	}
 //    }

	$scope.saving = false;
	$scope.errorMsg = null;
	$scope.sede = sede;
	var map;
	var loc = {lat: 34.063311, lng: -118.236825};

	$window.initMap = function(){
		var markers = [];
		var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: {lat: -34.397, lng: 150.644}
        });
        google.maps.event.trigger(map, "resize");
        var geocoder = new google.maps.Geocoder();
        $scope.geocodeAddress(geocoder, map, markers);
	}

	$scope.geocodeAddress = function (geocoder, resultsMap, markers) {
        var infowindow = new google.maps.InfoWindow();
        var address = sede.Direccion + ' ' + sede.Localidad;
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                resultsMap.setCenter(results[0].geometry.location);
                for (i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                }
                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });

                place = results[0];

                google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent('<div><strong>' + place.formatted_address + '</strong></div>');
                //console.log(place);
                infowindow.open(map, this);
            });
                markers.push(marker);
            } else {
                $rootScope.mostrarModal("No se pudo encontrar la dirección solicitada. Verifique que los datos ingresados son correctos");
            }
        });
    }


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};


var SedeImagesCtrl = function ($scope, $window, $filter, DataService, $modalInstance, $translate, sede) {
	
	


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};