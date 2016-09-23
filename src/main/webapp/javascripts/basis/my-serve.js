angular.module('myServeApp',[],function($provide, $filterProvider,$controllerProvider){
    //自定义服务
    $provide.provider('Service',function(){
        this.$get=function(){
            return{
                messagr:"Service messagr"
            }
        }
    });
    //可以有多个服务
    $provide.provider('Service2',function(){
        this.$get=function(){
            return{
                messagr:"Service2 messagr"
            }
        }
    });
    //工厂方法
    $provide.factory('factoryDome',function(){
        //返回任何类型
        return "asdasasd";
    });
    //自定义服务  返回的必须是对象 ，引用类型
    $provide.service('serviceDome',function(){
        return [1,2,3,4,5,6,7];
    });
    $filterProvider.register("filterAge",function(){
        return function(obj){
            var newObj=[];
            angular.forEach(obj,function(date){
                if(date.age>20){
                    newObj.push(date);
                }
            });
            return newObj;
        }
    });
    $controllerProvider.register("filterController",function($scope){
        $scope.date=new Date();
    });
});
angular.module('myServeApp')
    .controller('myServeController',["$scope","Service","Service2","factoryDome","serviceDome",
        function($scope,Service,Service2,factoryDome,serviceDome){
            $scope.name="provide";
            console.log(Service);
            console.log(Service2);
            console.log(factoryDome);
            console.log(serviceDome);
}]);