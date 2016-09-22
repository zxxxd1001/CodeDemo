//调用指令内部的方法，并传入参数

angular.module('hr.templateCache').run(['$templateCache', function ($templateCache) {
    $templateCache.put('dyn-column-grid.html', '<!--数据展示部分-->\n<div id="general-height" class="gridStyle" ng-grid="reportOptions" hr-self-height="$(window).height() - 110"></div>\n');
}]);

angular.module('hr.filters').filter('notdisplayzera', function () {
    return function (input) {
        if (input === 0) {
            return "";
        }
        return input;
    };
});
angular.module('hr.directives').directive("dynColumnGrid", [function () {
        var object = {
            restrict: "E",
            templateUrl: "dyn-column-grid.html",
            scope: {
                option: "="
            },
            controller: ["$scope", "$http", "$filter", "hrDialog", "hrProgress",
                function ($scope, $http, $filter, hrDialog, hrProgress) {

                    //定义列
                    var columnDefinedObj = {
                        columnHeaders: [],
                        detailFields: [],
                        columnTextStyles: []
                    };

                    $scope.displayDataList = [];
                    $scope.columnDefsOption = [];

                    /**
                     * 列头对应的字段名称、纵向分组对应的字段名称、统计字段名称
                     * @param requestUrl
                     * @param displayNames  展示的中文名称，依次为（列合计、行合计的表头、固定列的表头）
                     * {columnSumChineseName: "合计（人次）", rowSumChineseName: "总计（人次）", fixedColumnChineseName:"门诊日期"}
                     *
                     * @param queryResultFields 查询出的字段名称,依次为(列分组对应的字段名，行分组对应的字段名，统计列的对应的字段名)
                     * {columnGroupName: "chargeType", rowGroupName: "visitDate", statFieldName: "countNo" }
                     */
                    $scope.option.queryDataByCondition = function (requestUrl, displayNames, queryResultFields) {
                        if (requestUrl) {
                            hrProgress.open();
                            HrUtils.httpRequest($http, requestUrl, function (data) {
                                hrProgress.close();
                                if (data.length === 0) {
                                    hrDialog.dialog(hrDialog.typeEnum.WARN, {message: "未查询到符合条件的数据！"});
                                    return false;
                                } else {

                                    //定义固定列的 field: displayName
                                    var displayNameObj = angular.copy(data[0]);
                                    displayNameObj.rowSumChineseName = displayNames.rowSumChineseName;
                                    displayNameObj.columnSumChineseName = displayNames.columnSumChineseName;
                                    displayNameObj[queryResultFields.columnGroupName] = displayNames.fixedColumnChineseName;

                                    var resultReview = getColumnsAndResultData(data, displayNameObj,
                                        queryResultFields.columnGroupName, queryResultFields.rowGroupName, queryResultFields.statFieldName);
                                    $scope.displayDataList = resultReview.returnDataList;
                                    $scope.columnDefsOption = resultReview.returnColumns;

                                    console.log($scope.displayDataList);
                                    console.log($scope.columnDefsOption);
                                }
                            }, function () {
                                hrProgress.close();
                                hrDialog.dialog(hrDialog.typeEnum.WARN, {message: "查询数据出错！"});
                            });
                        }
                    };

                    //清屏
                    $scope.option.refresh = function () {
                        columnDefinedObj = {
                            columnHeaders: [],
                            detailFields: [],
                            columnTextStyles: []
                        };

                        $scope.displayDataList = [];
                        $scope.columnDefsOption = [];
                    };

                    //根据设计的模板打印
                    $scope.option.printByDesignJasper = function (printParam) {
                        if($scope.displayDataList.length > 0){
                            var printInfoObject = {
                                type: "report",
                                appletParameters: {
                                    report_url: printParam.reportUrl,
                                    printer_name: ((HrStr.isNull(getTopLevelConfig("Report_Printer")) || getTopLevelConfig("Report_Printer") == 0) ? null : getTopLevelConfig("Report_Printer")),
                                    is_direct_print: true,
                                    is_display: true
                                },
                                reportParameter: {
                                    reportFileName: printParam.reportFileName,
                                    parameters: printParam.parameters
                                }
                            };
                            window.parent.top.postMessage(printInfoObject, "*");
                        }
                    };

                    //根据设计的模板excel
                    $scope.option.exportExcelByDesignJasper = function (titleName) {
                        if($scope.displayDataList.length > 0){
                            HrExportExcel.load($http, "/register/with-params-and-data-source/" + titleName, {
                                reportFileName: "reports/register/register-template.jrxml",
                                parameters: {
                                    columnHeader: columnDefinedObj.columnHeaders,
                                    detailFieldsName: columnDefinedObj.detailFields,
                                    columnTextStyles: columnDefinedObj.columnTextStyles,
                                    dataSource: $scope.displayDataList
                                }
                            });
                        }
                    };

                    //根据公用模板打印
                    $scope.option.printByCommonReport = function(printParam){
                        var columnOptions = [{fieldName: "", width: ""}];

                        var gridWidth = document.body.clientWidth - 10;
                        var paperWidth = (printParam.orientationIndicator === 1 ? 842 : 595)-20;
                        angular.forEach($scope.columnDefsOption, function(obj){
                            var width = Math.round(paperWidth * parseInt(obj.width.split(".")[0]) / gridWidth);
                            columnOptions.push({headerName : obj.displayName, fieldName : obj.field, width : width+"", textAlign : "left"});
                        });

                        commonReportExcelFunc.commonReportPrint(
                            printParam.hospitalName,
                            printParam.titleName,
                            printParam.formMaker,
                            printParam.madeBy,
                            printParam.madeDate,
                            printParam.pageHeaderList,
                            columnOptions,
                            $scope.displayDataList,
                            printParam.zebraIndicator,
                            printParam.orientationIndicator);
                    };

                    //计算动态grid的列宽
                    var calDynGridColumnWidth = function(resultList, fixColumnLength){
                        var gridWidth = document.body.clientWidth - 10 - (resultList.length > 25 ? 5 : 0);
                        var displayNameList = [];
                        angular.forEach(resultList, function(result){
                            if(displayNameList.indexOf(result.type) < 0){
                                displayNameList.push(result.type);
                            }
                        });
                        var dynColumnLength = displayNameList.length;
                        if(dynColumnLength > 0 || fixColumnLength > 0){
                            return (1/(dynColumnLength + fixColumnLength))*gridWidth + "px";
                        }
                        return 0 + "px";
                    };

//---------------------------------------- 重写数据组装 start -------------------------------------------------
                    //构造列名
                    var getDisplayName = function (field, displayNames) {
                        var displayName = "";
                        if (displayNames[field]) {
                            displayName = displayNames[field];
                        } else {
                            displayName = "定义新的列头:" + field;
                        }
                        return displayName;
                    };

                    //定义 grid 列，以及统计数据（resultList：查询返回数据
                    // [有三个字段：fixField(固定的列，统计的依据，显示在第一列)、dynField（不固定的列,需要转化为列）、dynValueKey(不固定列对应的结果值)]）
                    var getColumnsAndResultData = function (resultList, displayNames, fixField, dynField, dynValueKey) {
                        var columns = [], fields = [], returnDataList = [];
                        var columnWidth = calDynGridColumnWidth(resultList, 2);
                        angular.forEach(resultList, function (result) {
                            var obj = {};
                            var cacheColumnName =PinYin.CC2PYALL(result[dynField]).replace(/\s+/g,"");
                            obj[fixField] = result[fixField];        //固定列 key、value
                            obj[cacheColumnName] = result[dynValueKey];   //转换列 key、value
                            obj.columnSumChineseName = result[dynValueKey];  //合计列 columnSumChineseName
                            returnDataList.push(obj);
                            if ($.inArray(cacheColumnName, fields) === -1) {
                                fields.push(cacheColumnName);
                                columns.push({
                                    field: cacheColumnName,
                                    displayName: result[dynField],
                                    cellClass: "text-right",
                                    cellFilter: "notdisplayzera",
                                    width: columnWidth
                                });   //转换列对象
                            }
                        });
                        //columns 排序：首字母 ASCII 顺序
                        columns = $filter('orderBy')(columns, 'displayName', false);

                        columns.unshift({
                            field: fixField,
                            displayName: getDisplayName(fixField, displayNames),
                            cellClass: "text-left",
                            width: columnWidth
                        });  //添加第一列对象
                        columns.push({
                            field: "columnSumChineseName",
                            displayName: "合计（人次）",
                            cellClass: "text-right",
                            cellFilter: "notdisplayzera",
                            width: columnWidth
                        });    //添加合计列对象

                        columnDefinedObj.columnHeaders = [];
                        columnDefinedObj.detailFields = [];
                        columnDefinedObj.columnTextStyles = [];
                        angular.forEach(columns, function (column) {
                            columnDefinedObj.columnHeaders.push(column.displayName);
                            columnDefinedObj.detailFields.push(column.field);
                            columnDefinedObj.columnTextStyles.push(column.cellClass.split("-")[1]);
                        });

                        //数据整合
                        var rowEntityList = [], tempEntity = null, sumEntity = null;
                        angular.forEach(returnDataList, function (item, index) {
                            angular.forEach(columns, function (column) {
                                if (column.field !== fixField) {
                                    item[column.field] = item[column.field] ? item[column.field] : 0;
                                }
                            });
                            if (tempEntity === null) {    //tempEntity 为 null，给 tempEntity 赋值
                                tempEntity = item;
                            } else {
                                if (tempEntity[fixField] === item[fixField]) {    //tempEntity 指定的 fixField 值 === item[fixFiled], 求和并赋值给 tempEntity
                                    angular.forEach(tempEntity, function (value, key) {
                                        if (key !== fixField) {
                                            tempEntity[key] += item[key];
                                        }
                                    });
                                } else {    //否则，将 tempEntity 值加入 rowEntityList ，再将 tempEntity 重新赋值
                                    if (sumEntity === null) { //合计行，数据累计
                                        sumEntity = angular.copy(tempEntity);
                                    } else {
                                        angular.forEach(tempEntity, function (value, key) {
                                            if (key !== fixField) {
                                                sumEntity[key] += tempEntity[key]
                                            }
                                        });
                                    }
                                    rowEntityList.push(tempEntity);
                                    tempEntity = item;
                                }
                            }
                            if (index === (returnDataList.length - 1)) {  //如果 遍历到最后一项，将 将 tempEntity 值加入 rowEntityList
                                rowEntityList.push(tempEntity);
                                if (sumEntity === null) { //合计行，数据累计
                                    sumEntity = angular.copy(tempEntity);
                                    sumEntity[fixField] = getDisplayName("rowSumChineseName", displayNames);
                                } else {
                                    angular.forEach(tempEntity, function (value, key) {    //合计行，数据累计并加入 rowEntityList
                                        if (key === fixField) {
                                            sumEntity[fixField] = getDisplayName("rowSumChineseName", displayNames);
                                        } else {
                                            sumEntity[key] += tempEntity[key]
                                        }
                                    });
                                }
                                rowEntityList = $filter('orderBy')(rowEntityList, fixField, false);
                                rowEntityList.push(sumEntity)
                            }
                        });

                        return {
                            returnColumns: columns,
                            returnDataList: rowEntityList
                        };
                    };

//---------------------------------------- 重写数据组装 end -------------------------------------------------

                    //grid
                    $scope.reportOptions = {
                        data: 'displayDataList',
                        enableSorting: false,
                        enableColumnResize: true,
                        i18n: 'zh-cn',
                        columnDefs: "columnDefsOption"
                    };

                }]
        };

        return object;
    }]);


