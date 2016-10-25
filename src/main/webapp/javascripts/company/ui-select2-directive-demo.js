/**
 * @author 张雪冬
 * @date 2016/10/25 11:25
 */
angular.module("uiSelectDemoApp", ['hr','ui','ui.bootstrap']);
angular.module("uiSelectDemoApp").controller("uiSelectDemoController", ["$scope", function ($scope) {
    /*-------------------------------select-------------------------------*/
    $scope.SelectDate=[
        {name:"中国合伙人",code:"zghhr"},
        {name:"致我们终将逝去的青春",code:"zwmzjsqdqc"},
        {name:"钢铁侠3",code:"gtx3"}
    ];
    $scope.oneSelect='zghhr';
    $scope.selectOneOpts = {
        // placeholder: "请选择",//标签上加比较方便
       // minimumResultsForSearch: -1//设置没有搜索框 -1不显示
        allowClear: true,//显示清楚按钮
        matcher: function (term, text, opt) {
            /**
             * term 搜索输入内容
             * text html显示内容
             * opt Dom元素
             */
            console.log("搜索输入值:   "+term);
            console.log("HTML显示内容:   "+text);
            console.log("Dom元素:     "+opt);
            var code = opt.attr('code') || '';
            var reg = new RegExp(term);
            return reg.test(code) || reg.test(text);
        }
    };

    /*---------------------------input----------------------------------*/
    $scope.selectTwoOpts={
        dropdownAutoWidth: true,//显示项目的列表宽度是否自适应
        id: "code",//指定那个字段作为本记录的id
        // hrResultType:"id", //ng-model绑定 指定值 否则绑定整个对象
        // placeholder: "请选择",//标签上加比较方便
        query: function (query)  {  //搜索数据时调用方法同时组织数据   //组织数据源的方式，还可以通过data属性或者ajax属性等
            var result = {results: []};
            var reg = new RegExp(query.term);
            $.each($scope.SelectDate, function(){
                if(query.term.length === 0 || reg.test(this.code)){
                    result.results.push(this);
                }
            });
            console.log(query);//点击弹出搜索时触发
            //增加表头,此行增加“disabled: true”属性后，将不被选中
            result.results.splice(0,0, {'name': '名称', 'code': 'CODE "本行不会被选中 样式自己写CSS"', disabled: true});
            query.callback(result);
        },
        formatResult:function (data) {
            var markup="<span class='select2-input'>" + data.name+"+";
                markup+="<span class='select2-input'>" + data.code;
            return markup;
        },//格式化显示列表样式函数
        formatSelection:function (data) {
            return data.name;
        }//格式化选中结果样式
    };

    $scope.threeSelect="zghhr";
    $scope.selectThreeOpts={
        data:$scope.SelectDate,
        dropdownAutoWidth: true,//显示项目的列表宽度是否自适应
        id: "code",//指定那个字段作为本记录的id
        allowClear: true,//显示清楚按钮
        matcher: function (term, text, option) {//搜素内容
            var reg = new RegExp(term);
            console.log(option);//搜索时触发
            return reg.test(option.code);
        },
        formatResult:function (data) {
            return "<span class='select2-input'>"+ data.name;
        },//格式化显示列表样式函数
        formatSelection:function (data) {
            return data.name;
        }//格式化选中结果样式
    };

    $scope.fourSelect="zghhr";
    $scope.selectFourOpts = {
        dropdownAutoWidth: true,//显示项目的列表宽度是否自适应
        id: "code",//指定那个字段作为本记录的id，
        hrResultType: 'id',//ng-model绑定 指定值 否则绑定整个对象
        placeholder: "请选择",
        query: function (query) { //搜索数据
            var result = {results: []};
            var reg = new RegExp(query.term.toUpperCase());
            $.each($scope.SelectDate, function () {
                if (query.term.length === 0 || reg.test(this.code.toUpperCase()) || reg.test(this.name)) {
                    result.results.push(this);
                }
            });
            query.callback(result);//组织数据
        },
        initSelection: function (element, callback) {//初始化调用 过滤显示数据
            var id = element.val();
            $.each($scope.SelectDate, function () {
                if (angular.equals(id, this.code)) {
                    callback(this);
                }
            });
        },
        formatResult: function (data) {
            console.log("Result: "+data);
            return "<span class='select2-input'>" + data.name;
        },//格式化显示列表样式函数
        formatSelection: function (data) {
            console.log("Selection:  "+data);
            console.log("给属性赋值在 Selection中进行 只会执行一次");
            return data.name;
        }//格式化选中结果样式
    };
}]);