var exampleApp = angular.module('exampleApp',[]);
exampleApp.controller('exampleController',['$scope', function($scope){
    $scope.name = "张三";
    $scope.testInject = function(){
        var $injector = angular.injector(['ng']);
        $injector.invoke(function($http) {
            var scopes = angular.element(document.body).scope();
            scopes.name = "李四";//这里可以同http请求获得数据
        });
    };
}]);