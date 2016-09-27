(function(){
    angular.module("myTableGrid", []);
    var tableInit=function($scope,iElement,tableGrid){
        var defaults = {
            data: [],
            columnDefs: undefined,
            rowTemplate: undefined
        };
        $.extend(defaults,tableGrid);
        if(typeof defaults.data==="string"){
            $scope.columnData=$scope.$eval(tableGrid.data);
        }
        $scope.columnHeader=[];
        columnTemplate($scope,defaults);
    };
    var columnTemplate=function($scope,defaults){
        if(typeof defaults.columnDefs==="undefined"){
            for(var item in $scope.columnData[0]){
                $scope.columnHeader.push({header:item});
            }
            var width=100/$scope.columnHeader.length+"%";
            for(var i=0;i<$scope.columnHeader.length-1;i++){
                $scope.columnHeader[i].width=width;
            }
        }
        if(typeof defaults.columnDefs==="object"){
            for(var item in defaults.columnDefs){
                $scope.columnHeader.push({header:defaults.columnDefs[item].displayName,width:defaults.columnDefs[item].width});
            }
        }
    };
    angular.module("myTableGrid").directive("myTableGrid", function () {
        return {
            scope: true,
            templateUrl:"tableGrid.html",
            link:{
                pre:function ($scope,iElement,iAttr) {
                    var tableGrid=$scope.$eval(iAttr.myTableGrid);
                    tableInit($scope,iElement,tableGrid);
                },
                post:function($scope,iElement,iAttr){

                }
            },
            controller:["$scope",function($scope){

            }]
        }
    });
    angular.module("myTableGrid").run(["$templateCache",function($templateCache){
        $templateCache.put("tableGrid.html", "<div class=\"modal-body\">\n    <div class=\"hr-table-header-div\">\n        <div class=\"hr-div-th\">\n            <table class=\"table table-bordered\">\n                <thead>\n                <tr>\n                    <th width=\"{{column.width}}\" ng-repeat=\'column in columnHeader\' ng-bind=\'column.header\'></th>\n                </tr>\n                </thead>\n            </table>\n        </div>\n        <span class=\"hr-span-th\"></span>\n    </div>\n\n    <div class=\"hr-table-content-div\" style=\'h\'>\n        <table class=\"table table-bordered table-striped\">\n            <tbody>\n            <tr ng-repeat=\"data in columnData\">\n                <td width=\"{{columnHeader[0].width}}\" ng-bind=\'data.id\'></td>\n                <td width=\"{{columnHeader[1].width}}\" ng-bind=\'data.name\'></td>\n                <td width=\"{{columnHeader[2].width}}\" ng-bind=\'data.age\'></td>\n                <td width=\"{{columnHeader[3].width}}\" ng-bind=\'data.sex\'></td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n<style>\n    .hr-table-header-div table,\n    .hr-table-content-div table\n    {\n        width:100%;\n        max-width: 100%;\n\n    }\n    .hr-table-header-div .table thead{\n        background-color: #eaeaea;\n\n    }\n    .hr-table-header-div .table th{\n        padding-top:5px;\n        padding-bottom:5px;\n        background-color: #eaeaea;\n        background-image: none;\n        border: 1px solid #d4d4d4;\n    }\n    .hr-table-content-div .table td{\n        padding-top:5px;\n        padding-bottom:5px;\n        border: 1px solid #d4d4d4;\n\n    }\n    .hr-table-header-div{\n        position: relative;\n    }\n    .hr-div-th{\n        overflow-y:scroll;\n    }\n    .hr-span-th{\n        display: inline-block;\n        vertical-align: middle;\n        width:9px;\n        height:30px;\n        border: 1px solid #ddd;\n        background-color:#eaeaea;\n        right: 0;\n        top: 0;\n        border-left: 0;\n        position:absolute;\n    }\n    .hr-table-content-div {\n        /*height:202px;*/\n        overflow-y: scroll;\n        background-color: #FFF;\n        border-top: none;\n        margin-top: -1px;\n    }\n</style>");
    }]);
})();