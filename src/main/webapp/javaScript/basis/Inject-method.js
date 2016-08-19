var exampleApp = angular.module('exampleApp',[]);
exampleApp.controller('exampleController',['$scope', function($scope){
    $scope.name = "boyi";
    $scope.inject = function(){
        var $injector = angular.injector(['ng']);
        $injector.invoke(function($http) {
            var scopes = angular.element(document.body).scope();
            scopes.name = "博弈网络";//这里可以同http请求获得数据
        });
    };
}]);