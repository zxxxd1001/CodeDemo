angular.module("correctApp",[]);
angular.module("correctApp").service("UseSer",["$location",function($location) {
    //模拟http返回数据
    var users = [
        {
            user: "admin",
            id: "1"
        }, {
            user: "zhangxd",
            id: "2"
        }, {
            user: "Sping",
            id: "3"
        }
    ];
    function User(use) {
        for(var i=0;i<users.length;i++){
            if(users[i].id==use){
                return users[i];
            }
        }
    }
    return{
        User:User
    }
}]);
angular.module("correctApp").controller("correctController",["$scope","UseSer",function($scope,UseSer){
    $scope.user={};
    $scope.id='1';
    $scope.getUser=function(id){
        $scope.user=UseSer.User(id);
    };
}]);
