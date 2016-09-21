angular.module("myCustomApp",[], function ($provide, $filterProvider,$controllerProvider){
    $provide.service("date", function () {
        return [
            {name: "张露", age: "20", city: "榆次"},
            {name: "王鹏", age: "30", city: "北京"}
        ];
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
    $controllerProvider.register("myCustomController",function($scope,date){
        $scope.date=date;
    })
}).filter("filtercity",function(){
    return function(obj){
        console.log(obj);
        var newObj=[];
        angular.forEach(obj,function(date){
            if(date.city=="榆次"){
                newObj.push(date);
            }
        });
        return newObj;
    }
});