angular.module("setScreenHeightApp",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("template.html","<h4>templateUrl引用模版!</h4>");
    $templateCache.put("annotation.html","<div>\n    <h4>restrict:\"EACM\" 指令使用形式 E元素element;A属性attribute; [C样式类class;M注视] 不常用</h4>\n    <h4>template|templateUrl: 自定义指令模版&nbsp;&nbsp;&nbsp;\n        <U style=\'color:#FF0000\'>多个指令绑定在一个元素上时，只能有且仅有一个指令拥有template哦，不然会报错的</U>\n    </h4>\n    <h4>replace:true 是否在element中显示自定义指令 默认是false显示(Html中)</h4>\n    <h4>transclude:true 保存原有数据 默认为false不保存 数据会放在 ng-transclude 中</h4>\n    <h4>priority:3 执行优先级 默认为0 优先级相同会根据directive名字第一个字母顺序执行 ng-init 450 ng-repeat=1000</h4>\n    <h4>terminal:true 默认false 同一个元素上的其他指令的优先级高于本指令的将停止执行</h4>\n    <h4 style=\'color:#FF0000\'><U>scope默认为false不会新建一个作用域，使用父级作用域 [true 会创建一个新的子作用域，原型继承于父级作用域。]\n        <p>{} 会新建一个隔离作用域，不会原型继承父作用域</p>\n         一个元素上绑定多个指令 只允许有一个[隔离作用域]指令 <a  target=\"_blank\" href=\'http://www.cnblogs.com/giggle/p/5746523.html\'>参考文档</a>\n    </U></h4>\n    <h4>scope:{options:\"&|=|@\"} &返回的是一个方法 =双向绑定 @只能读取非引用类型</h4>\n    <h4>require:\"^?指令名字\"指令controller之间搭建一个桥梁</h4>\n    <h4>controllerAs:\"\" 给controller起一个别名</h4>\n    <h4>compile: <U style=\'color:red\'>1.compile做的是将当前页面的结构显示出来,compile中可以改变dom结构\n        <p>2.compile中返回的就是link函数, 所以在外面定义link：function是不会被调用的</p>\n        <p>3.可以直接返回 postLink函数 return function postLink(){}</p>\n    </U></h4>\n    <h4>link:<U style=\'color:red\'>主要处理当前的compile 连接我们scope绑定及事件绑定</U></h4>\n    <h3><U>[directive直接返回function 就是postLink]、[compile和link直接返回function 就是postLink] </U></h3>\n    \n    <hr>\n    \n    <h4 style=\'color: #FF0000;\'>优先级大的数字最后调用 &nbsp;&nbsp;&nbsp;Link函数执行顺序 link:function(){}简写\n        <p>link:{pre:function(){},post:function(){}}</p>\n        <p><U>pre的执行次序是由高（优先级）至低（优先级）。post的执行次序是由低至高。</U></p>\n    </h4>\n   \n</div>");
}]);
angular.module("setScreenHeightApp").directive("settingScreenHeight",function(){
    var setScreenHeight={
        restrict:"EACM",
        //templateUrl:"template.html",
        scope:{
            //取值为html中的字面量/直接量 (可以理解为 单向绑定)
            options:"@",
            //双向绑定(从$scope上取值)
            show:"=",
            //函数回调方法(从 $scope上取方法)
            callback:"&",
            data:"@"
        },
        controller:["$scope",function($scope){
            if($scope.show){
                $scope.callback();
                console.log($scope.options);
                console.log($scope.data);
            }
        }]
    };
    return setScreenHeight;
});
angular.module("setScreenHeightApp")
    .directive("helloDirective",function(){
        return{
            restrict : "E",
            controller : function($scope){
                $scope.name = "helloDirective";
                this.information = {
                    name : $scope.name,
                    age : 25,
                    job : "程序员"
                }
            },
            //首先执行所有指令compile函数 其次执行preLink[按priority顺序加载] 最后执行postLink[按priority倒序加载]
            //compile做的是将当前页面的结构显示出来
            //compile中可以改变dom结构 tElement原始dom结构
            compile:function(tElement, tAttrs, transclude){
                console.log("helloDirective compile!",tElement.html());
                //compile中返回的就是link函数 element是compile处理过后的dom结构
                return {
                    //表示在编译阶段之后，指令连接到子元素之前元素
                    pre:function preLink(scope,element,attrs){
                        console.log("helloDirective preLink!",element.html());
                    },
                    //表示所有子元素指令都连接之后才运行
                    post:function postLink(scope,element,attrs){
                        console.log("helloDirective postLink!",element.html());
                    }
                }
            }
        }
    })
    .directive("beautifulGirl",function(){
        return {
            restrict : "E",
            require : "?helloRequire",
            compile:function(element,attrs){
                console.log("beautifulGirl compile!",element.html());
                return {
                    pre:function preLink(scope,element,attrs,helloRequire){
                        console.log("beautifulGirl preLink!",element.html());
                    },
                    post:function postLink(scope,element,attrs,helloRequire){
                        console.log("beautifulGirl postLink!",element.html());
                    }
                }
            },
            link : function (scope,element,attrs,helloRequire) {
                console.log(helloRequire.name)
            }
        }
    })
    .directive("helloRequire",function(){
        return {
            restrict : "A",
            require : "?^helloDirective",
            controller : function(){
                this.name = "helloDirective";
                console.log(this);
            },
            compile:function(element,attrs){
                console.log("helloRequire compile!",element.html());
                return {
                    pre:function preLink(scope,element,attrs,helloDirective){
                        console.log(scope,element,attrs);
                        console.log(helloDirective);
                        console.log("helloRequire preLink!");
                    },
                    post:function postLink(scope,element,attrs,helloDirective){
                        console.log(scope,element,attrs);
                        console.log(helloDirective);
                        console.log("helloRequire postLink!");
                    }
                }
            }
        }
    });