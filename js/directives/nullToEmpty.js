torneoFutbol.directive('nullToEmpty', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            ctrl.$parsers.push(function(viewValue) {
                if(viewValue == null || viewValue == undefined) {
                    return '';
                }
                return viewValue;
            });
        }
    };
});