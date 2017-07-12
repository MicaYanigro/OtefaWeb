torneoFutbol.controller('TeamsManagementCtrl', function ($scope, $rootScope, $location, $modal, $cookieStore, $filter, $translate, DataService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

	$scope.dtOptions = DTOptionsBuilder.newOptions()
                                            .withDOM('frltpi')
                                            .withOption('paging', false)
                                            .withOption('order', [])
                                            .withOption('info', false)
                                            .withOption('autoWidth', false)
                                            .withOption('scrollY', 300)
                                            /*.withOption('fnDrawCallback', function (oSettings) {
													            var api = this.api();
													            var rows = api.rows( {page:'current'} ).nodes();
													            var last=null;
													            api.column(0, {page:'current'} ).data().each( function ( group, i ) {
													                if ( last !== group ) {
													                    $(rows).eq( i ).before(
													                        '<tr class="group text-center headerEquipo"><td colspan="5">'+group+'</td></tr>'
													                    ); 
													                    last = group;
													                }
													            } );
													})*/
                                            .withLanguageSource("js/i18n/datatable/Spanish.json")
                                            .withBootstrap();

});