(function(window,$){
    console.log(window);
    console.log($);
    angular.module("tableGridApp", []);
    angular.module("tableGridApp").directive("tableGrid", function () {
        var tableGridDirective = {
            scope:true,
            compile: function (element, attr) {
                console.log(element);
                console.log(attr);
                return {
                    pre: function (scope, element, attr) {
                        console.log(element);
                        console.log(attr);
                        var $element=$(element);
                        var options = scope.$eval(attr.tableGrid);
                        options.gridDim = new ngDimension({ outerHeight: $($element).height(), outerWidth: $($element).width() });
                        var table = new tableGrid(scope,options);
                    }
                }
            }
        };
        return tableGridDirective;
    });
    var tableGrid=function table($scope,options){
        var self;
        var defaults={
            data:[],
            columnDefs:undefined,
            rowTemplate: undefined
        };
        console.log($scope);
        console.log(options);
        self=$.extend(defaults,options);
        console.log(self);
        var data=$scope.$eval(self.data);
    };
    var ngDimension = function (options) {
        this.outerHeight = null;
        this.outerWidth = null;
        $.extend(this, options);
    };
})(window,jQuery);