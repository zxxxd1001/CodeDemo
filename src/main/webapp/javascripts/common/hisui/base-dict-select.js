angular.module('hr.templateCache').run(['$templateCache', function ($templateCache) {
    $templateCache.put('register-tips-template.html', '<div class="table-dict-tips-input" id= "inside-id" click-outside="closeMe(\'outside\')" style="font-size: 14px">\n    <div class=" table-dict-item-name">\n        <div class="tip-item-name-table">\n            <table class="table table-striped table-hover" >\n                <tr ng-repeat="tableDict in displayedRecords track by tableDict.codeId"  ng-click="clickToSelect(tableDict)" \n                    ng-class="{\'bg-selected-color\': activateTableItem == tableDict}">\n                    <td ng-if="!inputParametes.isHide" class="first-td">{{::tableDict.inputCode}}</td>\n                    <td >{{::tableDict.codeName}}</td>\n                </tr>\n            </table>\n        </div>\n        <div class="page-field">\n            <a ng-click="prevPage()" ng-disabled="pageInfo.currentPageNo == 1" class="left-arrow" >\n                <i> < </i> \n            </a>\n            \n            <!--<span>{{pageInfo.currentPageNo}}/{{pageInfo.totalPageNo}}</span>-->\n            \n            <span ng-bind="pageInfo.currentPageNo"></span>\n            /\n            <span ng-bind="pageInfo.totalPageNo"></span>\n            \n            \n            <a  ng-click="nextPage()" ng-disabled="pageInfo.currentPageNo == pageInfo.totalPageNo" class="right-arrow"> \n                <i > > </i> \n            </a>\n        </div>\n    </div>\n</div>\n');
    $templateCache.put('table-dict-tips.html', '<div class="table-dict-tips-input" click-outside="closeMe()">\n  \n    <div class="tip-item-name-table">\n        <table class="table table-striped table-hover" >\n            <tr ng-repeat="tableDict in dataSource track by tableDict.codeId"  id="{{$index}}" ng-click="clickToSelectedItem(tableDict)"\n                ng-class="{\'bg-selected-color\': activateIndex == $index}">\n                <td ng-if="!configOptions.hideInputCodeColumn" class="first-td" ng-bind="tableDict.inputCode"></td>\n                <td ng-bind="tableDict.codeName"></td>\n            </tr>\n        </table>\n    </div>\n    <div class="page-field">\n        <a ng-click="prevPage()" ng-disabled="pageInfo.currentPageNo == 1" class="left-arrow" >\n            <i> < </i>\n        </a>\n\n        <span ng-bind="pageInfo.currentPageNo"></span>\n        /\n        <span ng-bind="pageInfo.totalPageNo"></span>\n\n\n        <a  ng-click="nextPage()" ng-disabled="pageInfo.currentPageNo == pageInfo.totalPageNo" class="right-arrow">\n            <i > > </i>\n        </a>\n    </div>\n    \n    <style type="text/css">\n        .table-dict-tips-input {font-size: 14px;position: absolute;border: 1px solid #adadad;background: white;height: 177px;z-index: 5;box-shadow: 0 0 5px rgba(0,0,0, .3);-ms-box-shadow: 0 0 5px rgba(0,0,0, .3); -webkit-box-shadow: 0 0 5px rgba(0,0,0, .3);border-radius: 2px;-webkit-border-radius: 2px;-ms-border-radius: 2px;}\n        .table-dict-tips-input table {margin-bottom: 0;table-layout:fixed;}\n        .table-dict-tips-input .table th {padding: 2px 4px;height: 21px;}\n        .table-dict-tips-input .table td { height: 21px;line-height: 21px;padding: 2px 4px;white-space: nowrap;overflow:hidden;border: none;}\n        .table-dict-tips-input .table .first-td{width:40%;border-right: 1px solid #ddd}\n        /*.table-dict-tips-input .table-dict-item-name {float: left;}*/\n        .table-dict-tips-input .tip-item-name-table { height: 125px;}\n        .table-dict-tips-input .page-field{margin-top: 26px;height: 25px;line-height: 25px;border: 1px solid #aaa;border-right: none;border-left: none;border-radius: 0 0 2px 2px;-webkit-border-radius: 0 0 2px 2px;background-image: -webkit-linear-gradient(bottom,#dddddd,#f9f9f9);text-align: center;}\n        .table-dict-tips-input .page-field i{font-size: 20px;font-weight: bold;}\n        .table-dict-tips-input .page-field a{width: 23px;text-align: center;}\n        .table-dict-tips-input  .page-field .page-number{margin-left: 50px}\n        .table-dict-tips-input  .page-field .left-arrow{float: left; margin-left: 10px}\n        .table-dict-tips-input  .page-field .right-arrow{float:right;margin-right: 10px}\n        .table-dict-tips-input .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {background-color:#7fc3ff;}\n    </style>\n</div>\n  \n     ');
}]);
//输入法
angular.module('hr.directives').directive('tableDictTips', ['$parse', '$compile', '$templateCache', '$document', '$timeout', '$debounce', 'hrPosition', function ($parse, $compile, $templateCache, $document, $timeout, $debounce, hrPosition) {
    var tableDictTips = {
        require: 'ngModel',
        restrict: 'A',

        scope: {
            tableDictTips: "=",
            ngModel: "="
        },

        controller: ['$scope', '$http', 'hrPosition', '$element', function ($scope, $http, hrDialog, $element) {

            var _template = null;
            var _closeFlag = true;
            var _originalKeyMap = [];
            var DISPLAY_NUM_EVERY_PAGE = 6;     //每页最多显示几个记录

            $scope.displayedRecords = [];  //每页显示的记录数组
            $scope.activateTableItem = null;//当前选中的项目

            //页数
            $scope.pageInfo = {
                totalPageNo: 0,
                currentPageNo: 0
            };

            //指令接受参数
            $scope.inputParametes = {
                tableName: null,
                filter: 0,
                inputNumber: null,
                isHide: false
            };

            var cleanAllData = function () {
                $scope.displayedRecords.length = 0;
                $scope.pageInfo = {
                    totalPageNo: 0,
                    currentPageNo: 0
                };
                cacheArray = [];
                $scope.tableDicts = [];
                $scope.tableDicts.length = 0;
                $scope.displayedRecords = [];
            };
            function getPageCount(arr, num) {
                var count = (arr.length - (arr.length % num)) / num;
                if (arr.length % num !== 0) {
                    count += 1;
                }
                return count;
            }
            var getReturnedObject = function(codeName){
                var returnedObject = {
                    codeId : "",
                    codeName : ""
                };
                for(var d in $scope.tableDicts){
                    if($scope.tableDicts[d].codeName === codeName){
                        returnedObject = {
                            codeId : $scope.tableDicts[d].codeId,
                            codeName : $scope.tableDicts[d].codeName
                        };
                        break;
                    }
                }
                return returnedObject;
            };

            $scope.closeMe = function (status) {
                Mousetrap.reset();
                Mousetrap.setKeyMap(_originalKeyMap);

                if (status === "outside") {
                    $scope.activateTableItem = null;
                }
                if (!_closeFlag) {
                    var returnedObject = null;
                    if(HrStr.isNull($scope.activateTableItem) ){
                        if($scope.ngModel){
                            returnedObject = getReturnedObject($scope.ngModel);
                        }else{
                            returnedObject = {
                                codeId : "",
                                codeName : ""
                            };
                        }
                    }else{
                        returnedObject = getReturnedObject($scope.activateTableItem.codeName);
                    }
                    $scope.tableDictTips.selectedItem(returnedObject, status);
                    cleanAllData();
                    _template.remove();
                    _template = null;
                    _closeFlag = true;
                    $scope.activateTableItem = null;
                }
            };

            $scope.openMe = function (targetElement) {
                if (targetElement) {
                    if (_closeFlag) {
                        _closeFlag = false;
                        _template = angular.element(
                            angular.copy($templateCache.get('register-tips-template.html'))
                        );
//                    $scope._template.attr("inside-id", targetElement[0].id);
                        $compile(_template)($scope);
                        if ($scope.inputParametes.isHide) {
                            _template.width($element.width() + 5);
                            _template.find(".table-dict-item-name").width($element.width() + 5);
                            _template.find(".page-field").width($element.width() + 5);
                        } else {
                            _template.width(210);
                            _template.find(".table-dict-item-name").width(210);
                            _template.find(".page-field").width(210);
                        }
                        var resultTop = 0;
                        var resultLeft = 0;
                        var position = hrPosition.offset(targetElement);
                        var windowHeight = $(window).height();

                        if ((windowHeight - (position.top + position.height)) < 180) {
                            resultTop = position.top - 180;
                        } else {
                            resultTop = position.top + 30;
                        }
                        resultLeft = position.left;
                        $(_template).css({top: resultTop + "px", left: resultLeft + "px"});
                        $document.find('body').append(_template);
                        _originalKeyMap = angular.copy(Mousetrap.getKeyMap());

                        Mousetrap.reset();
                        bindKeys();
                        num = 1;
                        getItemNameDictByInputNumber();
                    } else {
                        getItemNameDictByInputNumber();
                    }
                }else{
                    getItemNameDictByInputNumber();
                }
            };

            //数据源
            var cacheArray = [];
            var getItemNameDictByInputNumber = function () {
                if ($scope.inputParametes.tableName) {
                    var requestUri = Path.getUri("api/identification-class/table-tips");
                    requestUri += QueryUriParamBuilder
                        .queryParam($scope.inputParametes.tableName, "tableName")
                        .queryParam($scope.inputParametes.filter, "filter")
                        .build();
                    $http.get(requestUri).success(function (data) {
                        cacheArray = [];
                        $scope.tableDicts = angular.copy(data);
                        if (data.length > 0) {
                            if (HrStr.isNull($scope.inputParametes.inputNumber)) {
                                cacheArray = angular.copy(data);
                                if (data.length <= DISPLAY_NUM_EVERY_PAGE) {
                                    $scope.displayedRecords = data;
                                } else {
                                    $scope.displayedRecords = data.splice(0, DISPLAY_NUM_EVERY_PAGE);
                                }
                            } else {
                                var reg = new RegExp("^" + $scope.inputParametes.inputNumber, "i");
                                angular.forEach(data, function (value) {
                                    if (reg.test(value.inputCode) || reg.test(value.codeName)) {
                                        cacheArray.push(value);
                                    }
                                });
                                $scope.displayedRecords = cacheArray.splice(0, DISPLAY_NUM_EVERY_PAGE);
                                $scope.activateTableItem = $scope.displayedRecords[0];
                            }
                            $scope.pageInfo.totalPageNo = getPageCount(cacheArray, DISPLAY_NUM_EVERY_PAGE);
                            if ( $scope.pageInfo.totalPageNo === 0 ) {
                                $scope.pageInfo.currentPageNo = 0;
                            } else {
                                $scope.pageInfo.currentPageNo = 1;
                            }
                        }
                    });
                }
            };

            //点击页数，显示该页的记录
            var clickCurrentPageNum = function (value) {
                $scope.pageInfo.currentPageNo = value;
                $scope.displayedRecords = displayedNumber(cacheArray, (value - 1), value, DISPLAY_NUM_EVERY_PAGE);
                $scope.activateTableItem = $scope.displayedRecords[0];
            };

            //下一页记录
            var num = 1;
            $scope.nextPage = function () {
                if (num < $scope.pageInfo.totalPageNo) {
                    num++;
                    clickCurrentPageNum(num);
                }
            };

            //上一页记录
            $scope.prevPage = function () {
                if (num > 1) {
                    num--;
                    clickCurrentPageNum(num);
                }
            };

            //选中
            $scope.clickToSelect = function (item) {
                $scope.activateTableItem = item;
                $scope.closeMe();
                return false;
            };

            var bindKeys = function () {
                Mousetrap.reset();
                Mousetrap.bindGlobal("esc", function () {
                    _template.remove();
                    _closeFlag = true;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    return false;
                });

                Mousetrap.bindGlobal("enter", function () {
                    $scope.closeMe();
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    return false;
                });

                Mousetrap.bindGlobal("up", function () {
                    var index;
                    index = $scope.displayedRecords.indexOf($scope.activateTableItem);
                    if (index > 0) {
                        $scope.activateTableItem = $scope.displayedRecords[index - 1];
                    }
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    return false;
                });

                Mousetrap.bindGlobal("down", function () {
                    var index;
                    index = $scope.displayedRecords.indexOf($scope.activateTableItem);
                    if (index < $scope.displayedRecords.length - 1) {
                        $scope.activateTableItem = $scope.displayedRecords[index + 1];
                    }
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    return false;
                });

                Mousetrap.bindGlobal("pagedown", function () {
                    $scope.nextPage();
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    return false;
                });

                Mousetrap.bindGlobal("pageup", function () {
                    $scope.prevPage();
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    return false;
                });

                Mousetrap.bindGlobal("up", function () {
                    var index;
                    //当前选中高亮在价表别名列表
                    index = $scope.displayedRecords.indexOf($scope.activateTableItem);
                    if (index > 0) {
                        $scope.activateTableItem = $scope.displayedRecords[index - 1];
                    }
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    return false;
                });

                Mousetrap.bindGlobal("down", function () {
                    var index;
                    index = $scope.displayedRecords.indexOf($scope.activateTableItem);
                    if (index < $scope.displayedRecords.length - 1) {
                        $scope.activateTableItem = $scope.displayedRecords[index + 1];
                    }
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    return false;
                });

                Mousetrap.bindGlobal("pagedown", function () {
                    $scope.nextPage();
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    return false;
                });

                Mousetrap.bindGlobal("pageup", function () {
                    $scope.prevPage();
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    return false;
                });
            };
        }],

        link: function (scope, element, attrs) {
            element.bind('focus', function (event) {
                $debounce(function () {
                    scope.inputParametes = {
                        tableName: attrs.tablename,
                        filter: attrs.filter,
                        inputNumber: null,
                        isHide: false
                    };
                    if (attrs.ishide === "true") {
                        scope.inputParametes.isHide = true;
                    } else {
                        scope.inputParametes.isHide = false;
                    }

                    $(event.target).select();
                    scope.openMe($(event.target));
                }, 100);
            });

            //子变 更新父
            scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    scope.ngModel = newValue;
                    scope.inputParametes.tableName = attrs.tablename;
                    scope.inputParametes.filter = attrs.filter;
                    scope.inputParametes.inputNumber = newValue;
                    scope.openMe();
                }
            }, true);

            //父变 更新子
            scope.$watch('ngModel', function (newValue, oldValue) {
                $parse(attrs.ngModel).assign(scope, newValue);
            }, true);
        }
    };
    return tableDictTips;
}]);


angular.module('hr.directives').directive("baseDictSelect", ["$compile", "$templateCache", "$document", "hrPosition",
    function ($compile, $templateCache, $document, hrPosition) {
        return {
            restrict: "A",
            scope: {
                configOption: "@",  //{tableName : "", filter : "", hideInputCodeColumn : "", width : ""}
                ngModel: "="
            },
            replace: true,
            compile: function (tElement, tAttrs, transclude) {
                var setInsideId = function () {
                    var insideId = tElement[0].id;
                    tElement.attr("inside-id", insideId);
                };
                setInsideId();

                return function (scope, iElement, iAttrs, ctrl) {
                    scope.template = {};
                    var compileTypeList = function () {
                        scope.template = angular.element(angular.copy($templateCache.get('table-dict-tips.html')));

                        var ePosition = hrPosition.offset(iElement);
                        var winHeight = $(window).height();

                        var resultTop = 0;
                        if (ePosition.top > winHeight - 178) {
                            resultTop = ePosition.top - 178
                        } else {
                            resultTop = ePosition.top + 30;
                        }

                        $(scope.template).css({
                            top: resultTop + "px",
                            left: ePosition.left + "px",
                            width: (angular.fromJson(scope.configOption).width ? angular.fromJson(scope.configOption).width : ePosition.width) + "px"
                        });

                        $compile(scope.template)(scope);
                        $document.find('body').append(scope.template);
                    };

                    iElement.bind('click', function () {
                        compileTypeList();
                        scope.bindDataSource();
                    });
                }
            },

            controller: ["$scope", "$http", "hrDialog", function ($scope, $http, hrDialog) {
                var DISPLAY_NUM_EVERY_PAGE = 6;
                var cacheDataSource = [];
                $scope.dataSource = [];
                $scope.activateIndex = -1;
                var originData = {
                    modelValue : null,
                    mouseKeys : null
                };

                //输入法配置{tableName : "", filter : "", hideInputCodeColumn : "", width : ""}
                $scope.configOptions = angular.fromJson($scope.configOption);

                //检测输入框的变化
                $scope.$watch('ngModel', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        filterData(newValue);
                    }
                });

                //过滤数据
                var filterData = function (inputCode) {
                    var filterArr = [];
                    if (inputCode) {
                        var reg = new RegExp("^" + inputCode, "i");
                        filterArr = cacheDataSource.filter(function (value) {
                            return reg.test(value.inputCode) || reg.test(value.codeName);
                        });
                    } else {
                        filterArr = angular.copy(cacheDataSource);
                    }
                    calPageNo(filterArr);
                    setDisplayDataSource(filterArr, false);
                };

                //绑定数据源
                $scope.bindDataSource = function () {
                    originData.mouseKeys = angular.copy(Mousetrap.getKeyMap());
                    originData.modelValue = angular.copy($scope.ngModel);
                    bindKeys();
                    var requestUri = Path.getUri("api/identification-class/table-tips");
                    requestUri += QueryUriParamBuilder
                        .queryParam($scope.configOptions.tableName, "tableName")
                        .queryParam($scope.configOptions.filter, "filter")
                        .build();

                    HrUtils.httpRequest($http, requestUri, function (data) {
                        cacheDataSource = angular.copy(data);
                        //计算页数
                        calPageNo(data);

                        //设置展示的记录和默认选中的记录
                        setDisplayDataSource(data, true);
                    }, function (data, status) {
                        HrUtils.httpError(data, status, hrDialog);
                    }, hrDialog, HrUtils.httpMethod.GET, null);

                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                };

                var setDisplayDataSource = function (data, filterIndicator) {
                    if (data.length > 0) {

                        //设置展示的数据源
                        if (data.length <= DISPLAY_NUM_EVERY_PAGE) {
                            $scope.dataSource = angular.copy(data);
                        } else {
                            $scope.dataSource = angular.copy(data).splice(0, DISPLAY_NUM_EVERY_PAGE);
                        }

                        //设置默认选中的记录
                        if ($scope.ngModel && filterIndicator) {
                            angular.forEach($scope.dataSource, function (obj, index) {
                                if (obj.codeName === $scope.ngModel) {
                                    $scope.activateIndex = index;
                                }
                            });
                        } else {
                            $scope.activateIndex = -1;
                        }
                    } else {
                        $scope.dataSource = [];
                        $scope.activateIndex = -1;
                    }
                };

                var getPageCount = function (arr, num) {
                    var count = (arr.length - (arr.length % num)) / num;
                    if (arr.length % num !== 0) {
                        count += 1;
                    }
                    return count;
                };
                var calPageNo = function (cacheDataSource) {
                    $scope.pageInfo.totalPageNo = getPageCount(cacheDataSource, DISPLAY_NUM_EVERY_PAGE);
                    if ($scope.pageInfo.totalPageNo === 0) {
                        $scope.pageInfo.currentPageNo = 0;
                    } else {
                        $scope.pageInfo.currentPageNo = 1;
                    }
                };

                //单击选中
                $scope.clickToSelectedItem = function (obj) {
                    if(obj){
                        $scope.ngModel = obj.codeName;
                    }
                    $scope.closeMe();
                };

                $scope.closeMe = function () {
                    setTimeout(function () {
                        $scope.template.remove();
                        Mousetrap.reset();
                        Mousetrap.setKeyMap(originData.mouseKeys);
                    }, 0);
                };

                //页数
                $scope.pageInfo = {
                    totalPageNo: 0,
                    currentPageNo: 0
                };

                var displayedNumber = function (array, which, value, displayNumEveryPage) {
                    return array.slice(which * displayNumEveryPage, value * displayNumEveryPage);
                };

                //点击页数，显示该页的记录
                var clickCurrentPageNum = function (value) {
                    $scope.pageInfo.currentPageNo = value;
                    $scope.dataSource = displayedNumber(cacheDataSource, (value - 1), value, DISPLAY_NUM_EVERY_PAGE);
                    $scope.activateIndex = 0;
                };

                //下一页记录
                var num = 1;
                $scope.nextPage = function () {
                    if (num < $scope.pageInfo.totalPageNo) {
                        num++;
                        clickCurrentPageNum(num);
                    }
                };

                //上一页记录
                $scope.prevPage = function () {
                    if (num > 1) {
                        num--;
                        clickCurrentPageNum(num);
                    }
                };


                var setOriginValueToModel = function(){
                    $scope.ngModel = originData.modelValue;
                    $scope.closeMe();
                };


                var bindKeys = function () {
                    Mousetrap.reset();
                    Mousetrap.bindGlobal("esc", function () {
                        setOriginValueToModel();
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        return false;
                    });

                    Mousetrap.bindGlobal("enter", function () {
                        console.log("enter-----------------enter");
                        $scope.clickToSelectedItem($scope.dataSource[$scope.activateIndex]);
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        return false;
                    });

                    Mousetrap.bindGlobal("up", function () {
                        if ($scope.activateIndex > 0) {
                            $scope.activateIndex--;
                        }
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        return false;
                    });

                    Mousetrap.bindGlobal("down", function () {
                        if ($scope.activateIndex < $scope.dataSource.length - 1) {
                            $scope.activateIndex++;
                        }
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        return false;
                    });

                    Mousetrap.bindGlobal("pagedown", function () {
                        $scope.nextPage();
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        return false;
                    });

                    Mousetrap.bindGlobal("pageup", function () {
                        $scope.prevPage();
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        return false;
                    });
                };
            }]
        };
    }]);