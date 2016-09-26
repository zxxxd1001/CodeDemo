angular.module("myTableGrid", []);
angular.module("myTableGrid").run(["$templateCache",function($templateCache){
    $templateCache.put("tableGrid.html", "<div class=\"table-grid\">\n    <table class=\"table table-bordered\">\n        <thead>\n        <tr>\n            <th ng-repeat=\'header in header\' ng-bind=\'header\'></th>\n        </tr>\n        </thead>\n    </table>\n    <div class=\"table-body special\" style=\'height:70px\'>\n        <table class=\"table table-bordered table-striped table-hover\">\n            <tbody>\n            <tr ng-repeat=\'data in columnData\' class=\"special-height\">\n                <td ng-bind=\'data.id\'></td>\n                <td ng-bind=\'data.name\'></td>\n                <td ng-bind=\'data.age\'></td>\n                <td ng-bind=\'data.sex\'></td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n</div>");
}]);
angular.module("myTableGrid").directive("myTableGrid", function () {
    return {
        scope: true,
        templateUrl:"tableGrid.html",
        link:{
            pre:function ($scope,iElement,iAttr) {
                var tableGrid=$scope.$eval(iAttr.myTableGrid);
                if(typeof tableGrid.data==="string"){
                   $scope.columnData=$scope.$eval(tableGrid.data);
                }
                $scope.header=[];
                for(var item in $scope.columnData[0]){
                    $scope.header.push(item);
                }
            },
            post:function($scope,iElement,iAttr){

            }
        },
        controller:["$scope",function($scope){
        }]
    }
});