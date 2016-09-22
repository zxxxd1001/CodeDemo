angular.module('hr.templateCache').run(['$templateCache', function ($templateCache) {
    $templateCache.put('muliti-condition-sort.html', '<!--排序-->\n<div hr-draggable modal="sortModal" options="sortModalOpts">\n    <div class="modal-header">\n        <button type="button" class="close" ng-click="closeSortModal()">&times;</button>\n        <h5>组合-排序</h5>\n    </div>\n    <div class="modal-body">\n        <div class="sort-content border-line">\n            <div class="hc-title-area">\n                <span>字段名</span>\n                <span>顺序</span>\n            </div>\n            <ul class="content-field li-striped">\n                <li class="sort-field" ng-repeat="fieldsRep in fieldRepeat">\n                    <div class="name-style">\n                        <select ui-select2 ng-model="fieldsRep[\'field\']" id="sortFeild">\n                            <option value="" label=""></option>\n                            <option ng-repeat="field in fields" value="{{field.field}}" code="{{field.displayName}}">\n                                {{field.displayName}}\n                            </option>\n                        </select>\n                    </div>\n                    <!--<div class="vertical-line"></div>-->\n                    <div class="sort-radio">\n                        <label class="radio">\n                            <input type="radio" name="asc{{$index}}" ng-model="fieldsRep[\'sort\']" value="asc"\n                                   checked="true">升序\n                        </label>\n                        <label class="radio">\n                            <input type="radio" name="desc{{$index}}" ng-model="fieldsRep[\'sort\']" value="desc">降序\n                        </label>\n                    </div>\n\n                </li>\n            </ul>\n            <div class="vertical-line"></div>\n        </div>\n    </div>\n    <div class="modal-footer">\n        <button class="btn btn-primary" ng-click="saveGroupOrders()">确定</button>\n        <button class="btn" ng-click="closeSortModal()">取消</button>\n    </div>\n</div>\n        <style type="text/css">\n            /*挂号组排序弹出层公共样式 start*/\n            .multi-sort-modal.modal.fade {\n                width: 40%;\n            }\n\n            .multi-sort-modal .modal-body {\n                overflow-y: hidden;\n                padding: 5px;\n            }\n\n            .multi-sort-modal .modal-body .hc-title-area span {\n                display: inline-block;\n                vertical-align: middle;\n                width: 47%;\n                text-align: center;\n            }\n\n            .multi-sort-modal .modal-body .hc-title-area span:nth-child(2) {\n                padding-left: 18px;\n            }\n\n            .multi-sort-modal .modal-body .content-field {\n                padding: 2px 0;\n                margin: 0;\n                height: 221px;\n            }\n\n            .multi-sort-modal .modal-body ul li:nth-child(even) {\n                padding-top: 4px;\n                padding-bottom: 4px;\n            }\n\n            .multi-sort-modal .modal-body .sort-content {\n                position: relative;\n            }\n\n            .multi-sort-modal .modal-body .sort-content .sort-field {\n                width: 99%;\n                margin-top: 1px;\n            }\n\n            .multi-sort-modal .modal-body .sort-content .sort-field .name-style {\n                display: inline-block;\n                vertical-align: middle;\n                width: 54%;\n                /*text-align:center; 这样设置会让select中的选中内容居中，不要这样做.....*/\n            }\n\n            .multi-sort-modal .modal-body .sort-content .vertical-line {\n                border-left: 1px solid #ddd;\n                display: inline-block;\n                vertical-align: middle;\n                height: 210px;\n                position: absolute;\n                top: 37px;\n                left: 55%;\n            }\n\n            .multi-sort-modal .modal-body .sort-content .sort-field .name-style .select2-container {\n                width: 195px;\n                margin-left: 10px;\n            }\n\n            .multi-sort-modal .modal-body .sort-content .sort-field .radio input {\n                margin: 8px 5px;\n            }\n\n            .multi-sort-modal .modal-body .sort-radio {\n                display: inline-block;\n                vertical-align: middle;\n                width: 44%;\n                /*margin-left:18px;*/\n                text-align: center;\n            }\n\n            .multi-sort-modal .modal-body .sort-content .radio {\n                display: inline-block;\n                vertical-align: middle;\n                height: 28px;\n                line-height: 29px;\n                padding-left: 0;\n            }\n\n            /*挂号组排序弹出层公共样式 end*/\n\n            @media (min-width:1270px) {\n                .multi-sort-modal .modal-body .sort-content .sort-field .name-style .select2-container {\n                    margin-left: 35px;\n                }\n            }\n            @media (min-width : 1430px) {\n                .multi-sort-modal .modal-body .sort-content .sort-field .name-style .select2-container {\n                    margin-left: 50px;\n                }\n            }\n            @media (min-width : 1590px) {\n                .multi-sort-modal .modal-body .sort-content .sort-field .name-style .select2-container {\n                    margin-left: 70px;\n                }\n            }\n        </style>\n        \n        ');
}]);

angular.module("ngGrid")
    .run(['$sortService', function ($sortService) {//修改ngGrid的$sortService——对于String类型的比较，使用localeCompare进行比较。
        var sortService = $sortService;
        sortService.localCompare = function (a, b) {//字符串，中文排序
            return a.localeCompare(b);
        };
        sortService.guessSortFn = function (item) {
            var itemType = typeof(item);
            switch (itemType) {
                case "number":
                    return sortService.sortNumber;
                case "boolean":
                    return sortService.sortBool;
                case "string":
                    return item.match(/^[-+]?[£$¤]?[\d,.]+%?$/) ? sortService.sortNumberStr : sortService.localCompare;
                default:
                    if (Object.prototype.toString.call(item) === '[object Date]') {
                        return sortService.sortDate;
                    }
                    else {
                        return sortService.basicSort;
                    }
            }
        };
    }])
    .factory("sortService", ['$sortService', function ($sortService) {
        return function (configGridOptions, sortInfo, data) {
            var _sortInfo = angular.copy(sortInfo);
            if (_sortInfo.columns) {
                _sortInfo.columns.length = 0;
            } else {
                _sortInfo.columns = [];
            }
            angular.forEach(configGridOptions.$gridScope.columns, function (c) {
                var i = _sortInfo.fields.indexOf(c.field);
                if (i !== -1) {
                    c.sortDirection = _sortInfo.directions[i] || 'asc';
                    _sortInfo.columns[i] = c;
                }
            });
            $sortService.Sort(_sortInfo, data);
            return angular.copy(data);
        };
    }]);

angular.module('hr.directives').directive("mulitiConditionSort", [
    function () {
        return {
            restrict: "E",
            templateUrl: "muliti-condition-sort.html",
            scope: {
                option: "=",
                close: "&"
            },
            controller: ["$scope", function ($scope) {

                var curFuncName = getCurrentFuc().funcSrc.split("/");
                var curFunc = curFuncName[curFuncName.length - 1].split(".")[0];

                var cur_page_config = {
                    sortField: curFunc.replace("-", "") + "field",
                    sortCondition: curFunc.replace("-", "") + "condition"
                };

                $scope.sortModalOpts = {
                    dialogClass: "modal multi-sort-modal",
                    backdropFade: true,
                    dialogFade: true,
                    keyboard: false,
                    backdrop: true,
                    backdropClick: false
                };

                $scope.sortModal = false; //排序modal默认关闭
                $scope.fields = []; //选择的字段列表
                $scope.fieldRepeat = []; //选择条件个数的列表

                //设置的排序条件
                $scope.option = {
                    sortInfo :{
                        fields: [],
                        directions: []
                    }
                };

                //设置排序条件的列表
                var setSortConditionList = function(){
                    for (var i = 0; i < 6; i++) {
                        var obj = {field: "field" + i + "", sort: "sort" + i + ""};
                        $scope.fieldRepeat.push(obj);
                    }

                    //设置默认值
                    if($scope.option.sortInfo.fields.length > 0){
                        angular.forEach($scope.option.sortInfo.fields, function(item, index){
                            $scope.fieldRepeat[index].field = item;
                            $scope.fieldRepeat[index].sort = $scope.option.sortInfo.directions[index];

                        });
                    }
                };

                //打开排序modal,并初始化排序条件列表
                $scope.option.openSortModal = function (columnDefs) {
                    $scope.sortModal = true;
                    $scope.fields = [];
                    setSortConditionList();
                    if(columnDefs && columnDefs.length > 0){
                        columnDefs.forEach(function (columnDef) {
                            if (columnDef.field) {
                                $scope.fields.push( {
                                    displayName: columnDef.displayName,
                                    field: columnDef.field
                                });
                            }
                        });
                    }
                };

                //保存排序条件
                $scope.saveGroupOrders = function () {
                    var sortInfoStr = {
                        fields : "",
                        directions : ""
                    };

                    for (var i = 0; i < $scope.fieldRepeat.length; i++) {
                        if ($scope.fieldRepeat[i].field) {
                            sortInfoStr.fields = sortInfoStr.fields + $scope.fieldRepeat[i].field + ";";
                            sortInfoStr.directions = sortInfoStr.directions + $scope.fieldRepeat[i].sort + ";";
                        }
                    }

                    localStorage.setItem(cur_page_config.sortField, sortInfoStr.fields);
                    localStorage.setItem(cur_page_config.sortCondition, sortInfoStr.directions);
                    convertSortGrid();
                    $scope.closeSortModal();
                };

                //构造选中条件
                var convertSortGrid = function () {
                    if (localStorage.getItem(cur_page_config.sortField)) {
                        var cacheSortFields = localStorage.getItem(cur_page_config.sortField).split(";");
                        $scope.option.sortInfo.fields = cacheSortFields.slice(0, cacheSortFields.length - 1);
                    }
                    if (localStorage.getItem(cur_page_config.sortCondition)) {
                        $scope.option.sortInfo.directions = localStorage.getItem(cur_page_config.sortCondition).split(";");
                    }
                };
                convertSortGrid();

                $scope.closeSortModal = function () {
                    $scope.sortModal = false;
                    $scope.close();
                };
            }]
        }
    }]);