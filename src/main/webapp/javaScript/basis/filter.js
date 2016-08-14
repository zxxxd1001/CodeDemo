angular.module('myFilterApp', []).factory('date', function () {
    return {
        date: new Date(),
        message: "ZhangXueDong",
        care: [
            {name: "山西", py: "shanxi"},
            {name: "北京", py: "beijing"},
            {name: "太原", py: "taiyuan"}
        ],
        num: 123456789
    }
}).controller('myFilterController', function ($scope, date, $filter) {
    $scope.date = date.date;
    $scope.message = date.message;
    $scope.care = date.care;
    var a = $filter("number")(date.num);
    console.log(a);
    console.log("----------------");
    var json=$filter("json")(date.care);
    console.log(json);
    console.log(date.care);
    //自定义
    $scope.clickname=function (obj){
        console.log(obj);
    }
});