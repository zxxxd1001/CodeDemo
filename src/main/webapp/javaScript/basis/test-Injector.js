angular.module("myInjectorApp",[])
    .factory("data",function(){
        return{
            date:new Date()
        }
    })
    .controller("myInjectorController",["$scope","data",function($scope,data){
        $scope.name="行内注入声明！";
        $scope.date=data.date;
    }])
    .controller("myThreeInjectorController",["$scope","data",function($scope,data){
        $scope.name="隐示注入声明！";
        $scope.date=data.date;
    }]);

angular.module("myInjectorApp").controller("myTwoInjectorController",testInjector);
testInjector.$inject=["$scope","data","$injector"];
function testInjector($scope,data,$injector){
    $scope.name="显示注入！";
    $scope.date=data.date;
    var data=$injector.get('data');
    console.log(data.date);

    console.log($injector);
    console.log(angular.injector());
    var inject=angular.injector(["ng"]);
    var scope=inject.get('$rootScope').$new();
    console.log(scope);
    inject.invoke(function() {
        var scopes = angular.element(myTwoInjectorController).scope();
        console.log(scopes);
        scopes.name = "显示注入";
    });
    //annotate帮助injector判断哪些服务会在函数调用时注入进去
    console.log(inject.annotate(function($scope,$q){}));
};


