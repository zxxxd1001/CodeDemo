angular.module("hr.service").factory("rcptResource", ["$http", "hrDialog", function ($http, hrDialog) {
    return {
        getOutpRcptByCondition: getOutpRcptByCondition
    };

    function getOutpRcptByCondition(successCallback, errorCallback, queryParam) {
        HrUtils.httpRequest($http, "api/rcpt/outp" + queryParam, successCallback, errorCallback, hrDialog);
    }
}]);