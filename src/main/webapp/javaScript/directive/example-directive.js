angular.module("exampleApp",[]);
var num = 0;
angular.module("exampleApp").directive("costomTags",function(){
    return {
        restrict: "ECAM",
        template: "<div>{{user.name}}</div>",
        replace: true,
        //compile做的是将当前页面的结构显示出来 
        compile: function (tElement, tAttrs, transclude) {
            //compile中返回的就是link函数  定义compile就不要定义link 应为返回的值就是link
            //必须有返回值 返回的是link 主要处理当前的compile 连接我们scope绑定及事件绑定
            //compile中可以改变dom结构
            tElement.append(angular.element("<div>{{user.cont}}</div>"));
            console.log("costomtags compile 编译阶段。。。");
            return {
                //表示在编译阶段之后，指令连接到子元素之前元素
                pre: function preLink(scope, tElement, tAttrs, transclude) {
                    console.log("costomtags preLink");
                },
                //表示所有子元素指令都连接之后才运行
                post: function postLink(scope, tElement, tAttrs, transclude) {
                    //对特定的元素注册事件  需要用到scope参数来实现dom元素的一些行为
                    console.log(" postLink");
                    tElement.on("click", function () {
                        scope.$apply(scope.user.name = num++
                            , scope.user.cont = num++);
                    });
                }
            };
            //可以直接返回 postLink函数
            //return function postLink(){
            //    console.log("compile return fun");
            //}
        },
        //此link表示的就是 postLink
        link: function () {
            console.log("link");
        }
    }
});
angular.module("exampleApp").directive("costomTags2", function () {
    return {
        restrict: "ECAM",
        replace: true,
        compile: function () {
            console.log("costomtags2 compile 编译阶段。。。");
            return {
                //表示在编译阶段之后，指令连接到子元素之前元素
                pre: function preLink() {
                    console.log("costomtags2 preLink");
                },
                //表示所有子元素指令都连接之后才运行
                post: function postLink() {
                    console.log("22 postLink");
                }
            }
        }
    }
}).directive("costomTags3", function () {
    //直接返回function 就是postLink
    return function () {

    }
});
angular.module("exampleApp").controller("exampleController",["$scope",function($scope){
    $scope.user = [
        {
            id: 10,
            name: "张三"
        },
        {
            id: 20,
            name: "李四"
        }
    ]
}]);