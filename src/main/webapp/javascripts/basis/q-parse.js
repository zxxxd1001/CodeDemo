angular.module("qPromiseApp",[]);
angular.module("qPromiseApp").controller("qPromiseController",["$scope","$q","$http","$templateCache","$parse",function($scope,$q,$http,$templateCache,$parse){
    $scope.triggerIncident=function(){
       init().then(function(data){
           console.log("调用成功！");
          // console.log(data);
       });
    };
    var init=function(){
        return initTemplates().then(function(data){
            console.log(data);
            //return data;
        },function(data){
            console.log(data);
        });
    };
    var initTemplates=function(){
        var template=["dome","dome1","dome2"];
        var q=$q.defer();
        var a={};
        template.forEach(function(item){
            item+=".html";
            $http.get(item, {cache: $templateCache}).success(function (data) {
                a[item]=data;
                q.resolve(a);
            }).error(function (err) {
                q.reject("Could not load template: " + item);
            });
        });
        return q.promise;
    };
    $scope.triggerIncidentTwo=function(){
        initTemplate().then(function(data){
            console.log(data);
        },function(data){
            console.log(data);
        });
    };
    var initTemplate=function(){
        var template=["dome","dome1","dome2"];
        var q=$q.defer();
        var a=[];
        template.forEach(function(itme){
            a.push(getTemplate(itme));
        });
        return $q.all(a);
    };
    var getTemplate=function(itme){
        var q=$q.defer();
        itme+=".html";
        var a={};
        $http.get(itme, {cache: $templateCache}).success(function (data) {
            a[itme]=data;
            q.resolve(a);
        }).error(function (err) {
            q.reject("Could not load template: " + itme);
        });
        return q.promise;
    };

    $scope.triggerParse=function(){
        var a=$parse("num(1,2)")(context);
        console.log(a);
        $parse("add(b,c)")(context,data);
        console.log("--------------------------");
        $parse("numS(b,a)")($scope,$scope.data);
        $parse("numS(5,7)")($scope);
    };
    $scope.data={
        a:5,
        b:6,
        c:1
    };
    $scope.numS=function(a,b){
        console.log(a*b);
    };
    var data={a:1, b:2, c:3};
    var context={
        add:function(a,b){
            console.log(a*b);
        },
        num:function(a,b){
            return a*b;
        }
    }

}]);
angular.module("qPromiseApp").run(["$templateCache",function($templateCache){
    $templateCache.put("dome.html","adad");
    $templateCache.put("dome1.html","adad");
    $templateCache.put("dome2.html","adad");
}]);