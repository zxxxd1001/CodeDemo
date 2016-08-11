angular.module("myFirstApp",[]);
angular.module("myFirstApp").controller("moduleController",["$scope",function($scope){
    $scope.name='angular.module("myApp",[]) 相当于AngularJS模块的setter方法 ,定义模块';
    $scope.namevalue=' 声明模块,第一个是模块参数"+\n+"第二个是依赖列表' +
        '也就是说可以被注入到模块中的对象列表 ';
    $scope.names='angular.module("myApp") 相当于AngularJS模块的getter方法，获取模块的引用';
}]);