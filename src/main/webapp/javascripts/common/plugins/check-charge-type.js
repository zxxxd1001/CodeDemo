/**
 * 费别校验时输入参数
 * @type {{chargeType: string, patientId: string, userChoiceList: Array, operationType: string}}
 */
var inputData = {
    chargeType: "",
    patientId: "",
    userChoiceList: [],
    operationType: "CheckChargeType"
};

/**
 * 费别校验时返回信息
 * 选择信息
 * title ： 选择题目
 * selectedOption ： 默认选中项/选中项
 * selectionOptionList : 待选择列表
 * @type {{title: string, selectedOption: {optionCode: string, optionName: string}, selectionOptionList: {optionCode: string, optionName: string}[]}[]}
 */
var outputData = [
    {
        title: "",
        selectedOption: {optionCode: "", optionName: ""},
        selectionOptionList: [{optionCode: "", optionName: ""}, {optionCode: "", optionName: ""}]
    }
];

angular.module("hr.service").factory("checkChargeType", ["$http", "PluginManager", function ($http, PluginManager) {
    var checkChargeType = function (chargeType, patientId, userChoiceList, clinicCate, settleStatus, callback) {

        //构造输出数据
        var convertPluginResult = function (pluginEvent) {
            if (pluginEvent) {
                if (pluginEvent.appendDescription) {
                    return angular.fromJson(pluginEvent.appendDescription);
                } else {
                    return {state: {success: true}};
                }
            } else {
                return {state: {success: true}};
            }
        };

        PluginManager.sendTransToPlugin("Apportion", "0", angular.toJson({
            chargeType: chargeType,
            patientId: patientId,
            userChoiceList: userChoiceList,
            clinicCate: (clinicCate ? clinicCate : 1),
            settleStatus: (settleStatus ? settleStatus : -1),
            operationType: "CheckChargeType"
        }), {
            success: function (pluginEvent) {
                console.log("get card info success----success---");
                callback(convertPluginResult(pluginEvent));
            }, error: function (pluginEvent, status) {
                console.log("get card info error----error---");
                console.log(pluginEvent);
                //console.log(angular.fromJson(pluginEvent.appendDescription));
                callback(convertPluginResult(pluginEvent));
            }
        });
    };
    return {
        checkChargeType: checkChargeType
    };
}]);


angular.module('hr.templateCache').run(['$templateCache', function ($templateCache) {
    $templateCache.put('check-charge-type-template.html', '<div class="check-charge-type-frame" ng-if="show">\n    <div class="frame-header">\n        <button type="button" class="close" ng-click="closeCheckChargeType()">&times;</button>\n        <h5>费别校验</h5>\n    </div>\n    <div class="frame-body">\n        <div>\n            <div ng-repeat="userChoice in userChoiceList track by $index">\n                <h6 ng-bind="userChoice.title"></h6>\n\n                <div ng-repeat="selectionOption in userChoice.selectionOptionList track by $index">\n                   <label>\n                       <input type="radio" value="{{userChoice.selectedOption.optionCode}}" ng-checked="userChoice.selectedOption.optionCode == selectionOption.optionCode"\n                              ng-click="changeChoiceOption($parent.$index, $index)">\n                       {{selectionOption.optionName}}\n                   </label>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="frame-footer">\n        <button class="btn btn-primary" id="confirm" ng-click="saveCheckChargeType()">确&nbsp;认</button>\n        <button class="btn btn-primary" id="cancel" ng-click="closeCheckChargeType()">取&nbsp;消</button>\n    </div>\n</div>\n        \n        <style type="text/css">\n            .check-charge-type-frame{\n                position: absolute;\n                z-index: 1050;\n                border: 4px solid #2f94e1;\n                border-radius: 2px;\n                background-color: #ffffff;\n                width: 600px;\n                left: 50%;\n                margin-left: -300px;\n                top: 25%;\n            }\n\n            .frame-header{\n                height: 20px;\n                padding: 4px 12px;\n                cursor: move;\n                background-color: #2f94e1;\n                border-bottom: 1px solid #eee;\n            }\n\n            .frame-body{\n                padding: 7px 10px;\n                max-height: 750px;\n            }\n\n            .frame-footer{\n                margin-bottom: 0;\n                text-align: right;\n                background-color: #f5f5f5;\n                border-top: 1px solid #ddd;\n                border-radius: 0;\n                -webkit-box-shadow: inset 0 1px 0 #ffffff;\n                -moz-box-shadow: inset 0 1px 0 #ffffff;\n                box-shadow: inset 0 1px 0 #ffffff;\n                padding: 5px 15px 5px;\n            }\n\n            button.close{\n                float: right;\n                margin: -5px -5px 8px;\n                color: #ffffff;\n                font-size: 30px;\n                cursor: pointer;\n                background: transparent;\n                border: 0;\n                padding: 0;"\n            }\n            h5{color: #ffffff;\n                margin: 0;\n                font-size: 16px;\n            }\n\n            h6{\n                margin: 0;\n                font-size: 16px;\n                padding: 10px 10px 10px 4px;\n            }\n            \n            h6.warning{\n                color: #FF7E00 !important;\n            }\n            h6.error{\n                color: #E4393C !important;\n            }\n            h6.information {\n                color : #00a300 !important;\n            }\n        </style>\n\n\n    \n\n   \n\n\n        ');
}]);

angular.module('hr.directives').directive("hrCheckChargeType", ["$parse", "$http", "checkChargeType", "hrProgress", "hrPluginDialog",
    function ($parse, $http, checkChargeType, hrProgress, hrPluginDialog) {
        var hrCheckChargeTypeObject = {
            restrict: "E",
            templateUrl: "check-charge-type-template.html",
            scope: {
                show: "=",
                close: "&", //关闭时的回调代码
                options: "=" //传递的函数
            },
            controller: ["$scope", "$element", function ($scope, $element) {

                var localParameter = {
                    CHARGE_TYPE: getTopLevelConfig("INP_CHANGED_CHARGE") || "自费"
                };

                //默认费别校验框关闭
                $scope.show = false;

                $scope.userChoiceList = [];

                var callCheckCharTypePlugin = function (chargeType, patientId, userChoiceList, clinicCate, settleStatus) {
                    hrProgress.open();
                    checkChargeType.checkChargeType(chargeType, patientId, userChoiceList, clinicCate, settleStatus, function (checkResult) {
                        console.log(checkResult);
                        hrProgress.close();
                        hrPluginDialog.dialog(checkResult.state, function (result) {
                            if (result == hrPluginDialog.typeEnum.CONTINUE) {
                                $scope.userChoiceList = angular.copy(checkResult.eventOutData);
                                $scope.options.result = {chargeType: chargeType, patientId: patientId};
                                if ($scope.userChoiceList && $scope.userChoiceList.length > 0) {
                                    $scope.show = true;
                                    setTimeout(function () {
                                        $("#confirm").focus();
                                    }, 10);
                                    bindChargeTypeModalKey();
                                } else {
                                    $scope.show = false;
                                    $scope.close();
                                }
                            } else {
                                $scope.options.result = {chargeType: localParameter.CHARGE_TYPE, patientId: patientId};
                                $scope.show = false;
                                $scope.close();
                            }
                        });
                    })
                };

                var copyData = {
                    clinicCate: "",
                    settleStatus: ""
                };
                //校验费别
                $scope.options.checkChargeType = function (chargeType, patientId, clinicCate, settleStatus) {
                    console.log(chargeType);
                    console.log(chargeType);
                    copyData = {
                        clinicCate: angular.copy(clinicCate),
                        settleStatus: angular.copy(settleStatus)
                    };
                    callCheckCharTypePlugin(chargeType, patientId, null, clinicCate, settleStatus);
                };

                //确认
                $scope.saveCheckChargeType = function () {
                    callCheckCharTypePlugin($scope.options.result.chargeType, $scope.options.result.patientId, $scope.userChoiceList,
                        copyData.clinicCate, copyData.settleStatus);
                };

                //关闭
                $scope.closeCheckChargeType = function () {
                    $scope.show = false;
                    $scope.options.result = {chargeType: localParameter.CHARGE_TYPE};
                    $scope.close();
                };

                //选择
                $scope.changeChoiceOption = function (choiceIndex, optionIndex) {
                    $scope.userChoiceList[choiceIndex].selectedOption =
                        angular.copy($scope.userChoiceList[choiceIndex].selectionOptionList[optionIndex]);
                    console.log($scope.userChoiceList)
                };

                //绑定费别校验modal快捷键
                var modalKeyList = null;
                var chargeTypeModalKey = {
                    defaultEnter: 1  //默认选中的按钮【确认】 1确认 2取消
                };
                var bindChargeTypeModalKey = function () {
                    modalKeyList = angular.copy(Mousetrap.getKeyMap());
                    Mousetrap.reset();

                    var bindLeftRight = function () {
                        if (chargeTypeModalKey.defaultEnter === 1) {
                            chargeTypeModalKey.defaultEnter = 2;
                            setTimeout(function () {
                                $("#cancel").focus();
                            }, 10);
                        } else {
                            chargeTypeModalKey.defaultEnter = 1;
                            setTimeout(function () {
                                $("#confirm").focus();
                            }, 10);
                        }
                    };

                    Mousetrap.bindGlobal("enter", function (e) {
                        if (chargeTypeModalKey.defaultEnter === 1) {
                            $scope.saveCheckChargeType();
                        } else {
                            $scope.closeCheckChargeType();
                        }
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        return false;
                    });

                    Mousetrap.bindGlobal("right", function (e) {
                        bindLeftRight();
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        return false;
                    });

                    Mousetrap.bindGlobal("left", function (e) {
                        bindLeftRight();
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        return false;
                    });
                };

                $scope.keyMap = {};
                var deregShow = $scope.$watch("show", function (newValue, oldValue) {
                    console.log(newValue);
                    if (newValue !== oldValue) {
                        if (newValue) {
                            $scope.keyMap = angular.copy(Mousetrap.getKeyMap());
                        } else {
                            Mousetrap.reset();
                            Mousetrap.setKeyMap($scope.keyMap);
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
        return hrCheckChargeTypeObject;
    }]);