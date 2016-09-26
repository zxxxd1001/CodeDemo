(function (window, $) {
    var TEMPLATE_REGEXP = /<.+>/;

    angular.module('tableGrid.services',[]);

    angular.module("tableGrid", ['tableGrid.services']);
    var tableGrid = function ($scope, options, $q, $templateCache,$utils) {
        var defaults = {
                data: [],
                columnDefs: undefined,
                rowTemplate: undefined,
                tableGrid:undefined
            },
            self = this;
        self.config = $.extend(defaults, options);
        self.data = [];
        self.gridId = "ng" + $utils.newId();
        self.initTemplates=function(){
            var templates = ['tableGrid'];

            var promises = [];
            angular.forEach(templates, function (template) {
                promises.push(self.getTemplate(template));
            });
            return $q.all(promises);
        };

        self.getTemplate = function (key) {
            var t = self.config[key];
            var uKey = self.gridId + key + ".html";
            var p = $q.defer();
            if (t && !TEMPLATE_REGEXP.test(t)) {
                $http.get(t, {
                    cache: $templateCache
                })
                    .success(function (data) {
                        $templateCache.put(uKey, data);
                        p.resolve();
                    })
                    .error(function (err) {
                        p.reject("Could not load template: " + t);
                    });
            } else if (t) {
                $templateCache.put(uKey, t);
                p.resolve();
            } else {
                var dKey = key + ".html";
                $templateCache.put(uKey, $templateCache.get(dKey));
                p.resolve();
            }

            return p.promise;
        };

        self.init = function () {
            return self.initTemplates().then(function(){
                
            });
        };
    };
    var ngDimension = function (options) {
        this.outerHeight = null;
        this.outerWidth = null;
        $.extend(this, options);
    };

    angular.module('tableGrid.services').factory('$utilityService', ['$parse', function ($parse) {
        var funcNameRegex = /function (.{1,})\(/;
        var utils = {
            visualLength: function (node) {
                var elem = document.getElementById('testDataLength');
                if (!elem) {
                    elem = document.createElement('SPAN');
                    elem.id = "testDataLength";
                    elem.style.visibility = "hidden";
                    document.body.appendChild(elem);
                }
                $(elem).css('font', $(node).css('font'));
                $(elem).css('font-size', $(node).css('font-size'));
                $(elem).css('font-family', $(node).css('font-family'));
                elem.innerHTML = $(node).text();
                return elem.offsetWidth;
            },
            forIn: function (obj, action) {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        action(obj[prop], prop);
                    }
                }
            },
            evalProperty: function (entity, path) {
                return $parse(path)(entity);
            },
            endsWith: function (str, suffix) {
                if (!str || !suffix || typeof str !== "string") {
                    return false;
                }
                return str.indexOf(suffix, str.length - suffix.length) !== -1;
            },
            isNullOrUndefined: function (obj) {
                if (obj === undefined || obj === null) {
                    return true;
                }
                return false;
            },
            getElementsByClassName: function (cl) {
                var retnode = [];
                var myclass = new RegExp('\\b' + cl + '\\b');
                var elem = document.getElementsByTagName('*');
                for (var i = 0; i < elem.length; i++) {
                    var classes = elem[i].className;
                    if (myclass.test(classes)) {
                        retnode.push(elem[i]);
                    }
                }
                return retnode;
            },
            newId: (function () {
                var seedId = new Date().getTime();
                return function () {
                    return seedId += 1;
                };
            })(),
            seti18n: function ($scope, language) {
                var $langPack = window.ngGrid.i18n[language];
                for (var label in $langPack) {
                    $scope.i18n[label] = $langPack[label];
                }
            },
            getInstanceType: function (o) {
                var results = (funcNameRegex).exec(o.constructor.toString());
                if (results && results.length > 1) {
                    var instanceType = results[1].replace(/^\s+|\s+$/g, "");
                    return instanceType;
                }
                else {
                    return "";
                }
            },
            ieVersion: (function () {
                var version = 3, div = document.createElement('div'), iElems = div.getElementsByTagName('i');
                do {
                    div.innerHTML = '<!--[if gt IE ' + (++version) + ']><i></i><![endif]-->';
                } while (iElems[0]);
                return version > 4 ? version : undefined;
            })()
        };

        $.extend(utils, {
            isIe: (function () {
                return utils.ieVersion !== undefined;
            })()
        });
        return utils;
    }]);

    angular.module("tableGrid").directive("tableGrid", ["$templateCache", "$q","$utilityService", function ($templateCache, $q,$utils) {
        var tableGridDirective = {
            scope: true,
            compile: function () {
                return {
                    pre: function ($scope, iElement, iAttr) {
                        var $element = $(iElement);
                        var options = $scope.$eval(iAttr.tableGrid);
                        options.gridDim = new ngDimension({
                            outerHeight: $($element).height(),
                            outerWidth: $($element).width()
                        });
                        var table = new tableGrid($scope, options, $q, $templateCache,$utils);
                        return table.init().then(function () {
                            if (typeof options.data === "string") {
                                var dataWatcher=function(data){
                                    table.data= $.extend([], data);
                                };
                                $scope.$parent.$watch(options.data+".length",function(newValue,oldValue){
                                    dataWatcher($scope.$eval(options.data));
                                });
                            }
                        });
                    }
                }
            }
        };
        return tableGridDirective;
    }]);
    angular.module("tableGrid").run(["$templateCache", function ($templateCache) {
        $templateCache.put("tableGrid.html", "<div class=\"table-grid\">\n    <table class=\"table table-bordered\">\n        <thead>\n        <tr>\n            <td ng-repeat=\'header in header\' ng-bind=\'header\'></td>\n        </tr>\n        </thead>\n    </table>\n    <div class=\"table-body special\">\n        <table class=\"table table-bordered table-striped table-hover\">\n            <tbody>\n            <tr ng-class=\"{\'bg-selected-color\':flagcolor==$index}\" class=\"special-height\">\n              \n            </tr>\n            </tbody>\n        </table>\n    </div>\n</div>");
    }]);
})(window, jQuery);