angular.module("myScopeApp",[]).run(function($rootScope){
    $rootScope.name='张三';
});
angular.module("myScopeApp").controller("scopeController",["$scope","$rootScope",
    function($scope,$rootScope){
        /**
         * rootScope是AngularJS最接近全局作用域的对象。
         * 在rootScope上附加太多业务逻辑并不是好注意，这与污染JavaScript的全局作用域是一样的。
         */
        $rootScope.rootPerson=function(){
            console.log("rootScope的rootPerson方法");
        };
        //查看rootScope
        console.log("$rootScope",$rootScope);
        /**
         * $scope对象就是一个普通的JavaScript对象，我们可以在其上随意修改或添加属性。
         * $scope对象在angularJS中充当数据模型，但与传统的数据模型不一样，
         * $scope并不负责处理和操作数据，他只是视图和HTML之间的桥梁，它是视图和控制器之间的胶水。
         * 这个功能让XHR请求等promise对象的实现变得非常容易。
         */
        $scope.person=function(){
            console.log("person");
        };
        //查看Scope
        console.log("scopeController$scope",$scope);
        $scope.persons=[
            {name:'王五', age:18},
            {name:'李四', age:20},
            {name:'张露', age:25}
        ];
        //调用父类 rootScope
        $scope.$parent.rootPerson();
        //$scope可以调用下一个
        $scope.$watch("$$nextSibling",function(newV,oldV){
            console.log("nextSibling$scope",newV);
        })
}]);
angular.module("myScopeApp").controller("firstController",["$scope",function($scope){
    //controller 貌似不可以被注入使用

    console.log("firstController$scope",$scope);
    $scope.$parent.rootPerson();

    //$scope可以调用上一个
    console.log("prevSibling$scope",$scope.$$prevSibling);
}]);
angular.module("myScopeApp").controller("threeController",["$scope",function($scope){
    console.log("threeController$scope",$scope);
    console.log("获取id为2的scope",$scope.$$prevSibling.$$prevSibling);
    console.log(angular.module("myScopeApp"));
}]);