angular.module('hr.service').factory('HrPrintRcpt', ['$http', 'PluginManager', function($http, PluginManager) {
    var printRcpt = function (chargeType, operatorId, traceNo, factRcptNo, rcptNo, param, callback) {
        var result = {
            state: {
                success: false,
                errorList: [],
                warningList: [],
                informationList: []
            },
            eventOutData: ""
        };
        console.log(param);
        if (angular.equals("自费", chargeType)) {
            result.state.success = true;
            result.eventOutData = selfPrint(operatorId, rcptNo, param);
            if (typeof callback === "function") {
                callback(result);
            }
        } else {
            var businessObj = {
                operationType: "PrintInvoice",
                chargeType: chargeType,
                sender: operatorId,
                tradeNo: traceNo,
                factRcptNo: factRcptNo,
                businessInfo: rcptNo
            };
            console.log(businessObj);
            PluginManager.sendTransToPlugin("apportion", "001", angular.toJson(businessObj), {
                success: function (data) {
                    console.log("------PrintRcpt success------------");
                    console.log(data);
                    var appendDescription = angular.fromJson(data.appendDescription);
                    if(appendDescription == null) {
                        result.state.success = true;
                        result.eventOutData = selfPrint(operatorId, rcptNo, param);
                    }
                    if (typeof callback === "function") {
                        callback(appendDescription);
                    }
                },
                error: function (data) {
                    console.log("------PrintRcpt error------------");
                    console.log(data);
                    if (typeof callback === "function") {
                        callback({state : {success : false, errorList: [{no : "", info : "打印票据异常!"}]}});
                    }
                }
            });
        }
    };

    var selfPrint = function(operatorId, rcptNo, param) {
        var printInfoObject = {
            //消息类型是report
            type: "report",
            //此次报表打印操作、关于applet的设置信息：包括报表资源URL地址（report_url）、打印机名称（printer_name）、是否直接打印（is_direct_print）等等;
            appletParameters: {
                is_direct_print: true,
                is_display: false,
                printer_name: param.printerName,
                report_url: "api/jasper-prints/bill/rcpt"
            },
            /**“报表生成”相关的参数：比如报表文件名称（reportFileName）、传递给报表的参数（parameters）
             * reportParameter是一个普通的JavaScript字面量对象，包含两个属性:
             * 1、reportFileName，它的值是要填充的报表文件；
             * 2、reportParameters，它的值是传递给报表文件的参数(键值对)。
             */
            reportParameter: {
                reportFileName:"reports/bill/bill-rcpt.jasper",
                parameters:{
                    rcptNo: null,
                    clinicCate: param.clinicCate
                }
            }
        };
        printInfoObject.reportParameter.parameters.rcptNo = rcptNo;

        console.info("发送postMessage消息");
        delete printInfoObject.method;
        console.info(printInfoObject);

        window.parent.top.postMessage(printInfoObject, "*");
    };

    var rePrintRcpt = function(chargeType, operatorId, traceNo, factRcptNo, rcptNo, param, callback) {

    };
    return {
        printRcpt: printRcpt,
        rePrintRcpt: rePrintRcpt
    };
}]);

