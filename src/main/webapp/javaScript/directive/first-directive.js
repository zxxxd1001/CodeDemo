angular.module("firstDirectiveApp",[],["$compileProvider", function (compileProvider) {
    compileProvider.directive("customTags", function () {
        return {
            restrict: "ECAM",
            template: "<div>custom-tags</div>",
            compile: function () {
                console.log(1);
            },
            replace: true
        }
    })
}]);
angular.module("firstDirectiveApp").directive("ccTom", function () {
    return {
        restrict: "E",
        templateUrl: "first-directive-Url.html",
        replace: true
    }
}).directive("ccTomm", function () {
        return {
            restrict: "E",
            templateUrl:"cccTomm",
            replace: true
        }
}).directive("cccTomm",function(){
        return {
            restrict: "ECAM",
            template: "<div>新数据,<span ng-transclude></span></div>",
            replace: true,
            transclude:true
        }
}).directive("cccTommm1",function(){
        return {
            restrict: "ECAM",
            template: "<div>2</div>",
            replace: true,
            priority:2
        }
}).directive("cccTommm2",function(){
        return {
            restrict: "ECAM",
            template: "<div>3</div>",
            replace: true,
            priority:3,
            terminal:true
        }
});
angular.module("firstDirectiveApp").controller("firstDirectiveController",["$scope",function($scope){
    $scope.name = "张三";
}]);
