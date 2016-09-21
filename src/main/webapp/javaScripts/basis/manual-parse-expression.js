angular.module("myExpressionApp",[]);
angular.module("myExpressionApp").controller("expressionController",["$scope","$parse",
    function($scope,$parse){
        $scope.$watch('expr', function(newVal, oldVal, scope) {
            if (newVal !== oldVal) {
                // Let's set up our parseFun with the expression
                var parseFun = $parse(newVal);
                // Get the value of the parsed expression, set it on the scope for output
                scope.parsedExpr = parseFun(scope);
            }
        });
}]);

angular.module("myExpressionApp").controller("inserExpressionController",["$scope","$interpolate",function($scope,$interpolate){
    $scope.to = 'ari@fullstack.io';
    $scope.emailBody = 'Hello {{ to }},\n\nMy name is Ari too!';
    $scope.$watch('emailBody', function(body) {
        if (body) {
            var template = $interpolate(body);
            $scope.previewText = template({to: $scope.to});
        }
    });
}]);