angular.module("myInjectorApp",[])
    .factory("data",function(){
        return{
            date:new Date()
        }
    })
    .controller("myInjectorController",["$scope","data",function($scope,data){
        $scope.name="行内注入声明";
        $scope.date=data.date;
    }])
    .controller("myThreeInjectorController",["$scope","data",function($scope,data){
        $scope.name="隐示注入声明";
        $scope.date=data.date;
    }]);

angular.module("myInjectorApp").controller("myTwoInjectorController",testInjector);
testInjector.$inject=["$scope","data"];
function testInjector($scope,data){
    $scope.name="显示注入！";
    $scope.date=data.date;
};


