angular.module("firstDirective", []);
angular.module("firstDirective").run(["$templateCache", function ($templateCache) {
    $templateCache.put("clinic-dept-type-template.html", '<div class="check-charge-type-frame" ng-show="show">\n    <div class="frame-header">\n        <button type="button" class="close" ng-click="closeCheckChargeType()">&times;</button>\n        <h5>挂号</h5>\n    </div>\n    <div class="frame-body">\n        <div>\n            <span>姓名:{{person.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n            <span>年龄:{{person.age}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n            <span>年龄:{{person.age}}</span>\n        </div>\n        <div>\n            <label class="checkbox" ng-repeat="register in registerList">\n                <span ng-bind=\'register.clinicDept\'></span>\n                <span ng-bind=\'register.doctor\'></span>\n                <input type="checkbox" ng-model=\'register.flag\'>\n            </label>\n        </div>\n    </div>\n    <div class="frame-footer">\n        <button class="btn btn-primary" id="confirm" ng-click="saveCheckChargeType()">确&nbsp;认</button>\n        <button class="btn btn-primary" id="cancel" ng-click="closeCheckChargeType()">取&nbsp;消</button>\n    </div>\n</div>\n<style type="text/css">\n    .check-charge-type-frame {\n        position: absolute;\n        z-index: 1050;\n        border: 4px solid #2f94e1;\n        border-radius: 2px;\n        background-color: #ffffff;\n        width: 600px;\n        left: 50%;\n        margin-left: -300px;\n        top: 25%;\n    }\n\n    .frame-header {\n        height: 20px;\n        padding: 4px 12px;\n        cursor: move;\n        background-color: #2f94e1;\n        border-bottom: 1px solid #eee;\n    }\n\n    .frame-body {\n        padding: 7px 10px;\n        max-height: 750px;\n    }\n\n    .frame-footer {\n        margin-bottom: 0;\n        text-align: right;\n        background-color: #f5f5f5;\n        border-top: 1px solid #ddd;\n        border-radius: 0;\n        -webkit-box-shadow: inset 0 1px 0 #ffffff;\n        -moz-box-shadow: inset 0 1px 0 #ffffff;\n        box-shadow: inset 0 1px 0 #ffffff;\n        padding: 5px 15px 5px;\n    }\n\n    button.close {\n        float: right;\n        margin: -5px -5px 8px;\n        color: #ffffff;\n        font-size: 30px;\n        cursor: pointer;\n        background: transparent;\n        border: 0;\n        padding: 0;\n    "\n    }\n\n    h5 {\n        color: #ffffff;\n        margin: 0;\n        font-size: 16px;\n    }\n\n    h6 {\n        margin: 0;\n        font-size: 16px;\n        padding: 10px 10px 10px 4px;\n    }\n\n    h6.warning {\n        color: #FF7E00 !important;\n    }\n\n    h6.error {\n        color: #E4393C !important;\n    }\n\n    h6.information {\n        color: #00a300 !important;\n    }\n</style>\n</div>');
    $templateCache.put("bill-payment-dialog.html","<!--bootstrap model插件-->\n<div class=\"modal hide fade in hc-bill-payment-dialog\" id=\"billPayment\" tabindex=\"-1\" role=\"dialog\"\n     aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" ng-click=\"closePayModal()\">&times;</button>\n        <h5>支付</h5>\n    </div>\n    <div class=\"modal-body form-horizontal\">\n        <h4>金额：{{options.result.price}}</h4>\n        <h4>支付金额：<input type=\'text\' ng-model=\'price\' ng-change=\'changePrice()\'></h4>\n        <h6>找零：{{theChange}}</h6>\n    </div>\n    <div class=\"modal-footer btn-container\">\n        <button class=\"btn btn-primary\" ng-click=\"confirmPayment()\">确认</button>\n        <button class=\"btn btn-primary\" ng-click=\"closePayModal()\">取消</button>\n    </div>\n</div>");
}]);
angular.module("firstDirective").directive("clinicDeptType", function () {
    var clinicDeptTypeObject = {
        restrict: "E",
        templateUrl:"clinic-dept-type-template.html",
        scope: {
            show: "=",
            close: "&", //关闭时的回调代码
            options: "=" //传递的函数 配置挂号窗口的参数对象 同时选中信息会放置到本对象的result属性上。
        },
        controller: ["$scope", "$element", function ($scope) {
            $scope.registerList=[
                {clinicDept:"呼吸内科",doctor:"张庆生",price:20,flag:false},
                {clinicDept:"脑科",doctor:"周一仙",price:12,flag:false},
                {clinicDept:"骨科",doctor:"张小凡",price:8,flag:false}
            ];
            $scope.person={
                name:"",
                age:"",
                sex:""
            };
            $scope.options.checkChargeType=function(name,age,sex){
                $scope.person.name=name;
                $scope.person.age=age;
                $scope.person.sex=sex;
            };
            console.log("clinicDeptType",$scope.show);
            $scope.saveCheckChargeType=function(){
                console.log($scope.registerList);
                var price=0;
                $scope.registerList.forEach(function(item){
                    if(item.flag){
                        price+=item.price;
                    }
                });
                $scope.options.result={price:price};
                $scope.close();
            };
            $scope.closeCheckChargeType=function(){
                $scope.show=false;
            };
        }]
    };
    return clinicDeptTypeObject;
});
angular.module("firstDirective").directive("billPaymentDialogMy",function(){
    var billPaymentDialogDirectiveObject = {
        restrict: "E",
        templateUrl: "bill-payment-dialog.html",
        scope: {
            show: "=",//显隐控制相关的变量：true显示，false隐藏。
            close: "&",//关闭时的回调代码
            options: "="//配置本支付窗口的参数对象，同时本次交易完成后的结果信息也会放置到本对象的result属性上。
        },
        controller: ["$scope", "$element", function ($scope,$element) {
            console.log("myBillPaymentDialog",$scope.show);
            $scope.closePayModal=function(){
                $scope.show=false;
            };
            $scope.confirmPayment=function(){
                if($scope.price<$scope.options.result.price){
                    alert("现金太少了!");
                }else{
                    $scope.options.result.theChange=$scope.theChange;
                    $scope.close();
                }
            };
            $scope.changePrice=function(){
                $scope.theChange=undefined;
                if($scope.price>=$scope.options.result.price){
                    $scope.theChange=$scope.price-$scope.options.result.price;
                }
            };
            //弹出支付窗口参数
            var popPaymentOpts = {
                dialogClass: "modal hc-bill-payment-dialog",
               // backdropFade: true,
               // dialogFade: true,
                keyboard: false,
                backdrop: false,
               // backdropClick: false,
                show: false
            };
            $('#billPayment').modal(popPaymentOpts);

            var deregShow =$scope.$watch("show", function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    if (newValue) {
                        $scope.show = true;
                        $(".hc-bill-payment-dialog.modal")[0].style.display = "block";
                        setTimeout(function () {
                            $("#money-type").select2("focus");
                        }, 350);
                    } else {
                        $scope.show = false;
                        $(".hc-bill-payment-dialog.modal")[0].style.display = "none";
                    }
                }
            }, true);
            $element.bind("$destroy", function () {
                if (deregShow) {
                    deregShow();
                }
            });
        }]
    };
    return billPaymentDialogDirectiveObject;
});