//费用分解和退费用分解输入参数
//var feeItemList = [{
//    orderDetailVo: null, //医嘱信息
//    billDetailVoList: [] //费用明细信息
//}];
//var pluginEventInputModel = {
//    sender: "", //操作员id号
//    operationType: "", //操作类型
//    patientId: "",//患者ID
//    chargeType: "", //出读卡外,其他插件以费别识别
//    clinicCate: "", //医疗类别
//    settleStatus: "",// 1分摊  -1退分摊
//    factRcptNo: "", //收费单据号(收据号，财政局统一制定)
//    feeItemList: [], //
//    recipeVoList: [], //处方信息
//    tradeNo: "" //交易流水号
//};
//
////费用分解时返回信息
//var apportionItemList = [
//    {
//        sectName: "", //分摊段类型
//        apportAmount: "", //金额
//        payorType: ""//支付人类型
//    }
//];
//var settleMaster = {
//    traceNo: null,//交易流水号
//    totalCosts: null,  //总费用
//    totalCharges: null,//应收费
//    totalReduces: null, //减免总额
//    totalApportBala: null,//分摊总结算差额
//    totalNeedSelfpay: null,  //患者应自行支付合计
//    apportionItemList: apportionItemList //分摊详情
//};
//
//var pluginEventOutputModel = {
//    appendDescription: {
//        state: state,
//        eventOutData: settleMaster
//    }
//};

angular.module("hr.service").factory("HrApportion", ["$http", "HrClinicCate", "PluginManager", "hrDialog", function ($http, HrClinicCate, PluginManager, hrDialog) {

    var settleStatusEnum = {
        RECEIPTS: 1,
        REFUND: -1
    };

    var apportion = function (clinicCate, settleStatus, chargeType, extraInfo, callback) {
        var apportionResult = {
            state: {
                success: false,
                errorList: [],
                warningList: [],
                informationList: []
            },
            eventOutData: {
                printFactRcpt: false,
                settleMaster: {}
            }
        };
        console.log(extraInfo);
        if (settleStatus === settleStatusEnum.RECEIPTS) {
            apportionResult.eventOutData.printFactRcpt = true;
        }
        //todo 应该在插件中完成
        if (angular.equals(chargeType, "北京医保")) {
            apportionResult.eventOutData.printFactRcpt = true;
        }

        if (angular.equals("自费", chargeType)) {
            apportionResult.state.success = true;
            apportionResult.eventOutData.settleMaster = selfApportion(clinicCate, settleStatus, chargeType, extraInfo.billDetails, extraInfo.operatorEmpId, extraInfo.factRcptNo);
            if (typeof callback === "function") {
                callback(apportionResult);
            }
        } else {
            handleApportionPrepareData(clinicCate, extraInfo.billDetails, function(data) {
                var businessObj = {
                    operationType: "Apportion",
                    sender: extraInfo.operatorEmpId,
                    patientId : (extraInfo.billDetails.length > 0 ? extraInfo.billDetails[0].patientId : ""),
                    clinicCate: clinicCate,
                    visitType: "",
                    settleStatus: settleStatus,
                    chargeType: chargeType,
                    factRcptNo: extraInfo.factRcptNo,
                    tradeNo: extraInfo.traceNo !== undefined ? extraInfo.traceNo : "",
                    recipeVoList: data.recipeVos,
                    feeItemList: data.feeItemVos
                };

                if (clinicCate == HrClinicCate.REGISTER) {
                    businessObj.visitType = extraInfo.visitType !== undefined ? extraInfo.visitType : "";
                } else {
                    businessObj.visitType = data.visitType !== undefined ? data.visitType : "";
                }

                if (settleStatus === settleStatusEnum.REFUND) {
                    businessObj.settleMaster = {};
                    businessObj.settleMaster.totalCosts = extraInfo.oriSettleMaster.totalCosts;
                    businessObj.settleMaster.totalCharges = extraInfo.oriSettleMaster.totalCharges;
                    businessObj.settleMaster.totalReduces = extraInfo.oriSettleMaster.totalReduces;
                    businessObj.settleMaster.totalApportBala = extraInfo.oriSettleMaster.totalApportBala;
                    businessObj.settleMaster.totalNeedSelfpay = extraInfo.oriSettleMaster.totalNeedSelfpay;
                    businessObj.settleMaster.apportionItemses = [];
                    extraInfo.oriSettleMaster.apportionItemses.forEach(function(apportionItems) {
                        businessObj.settleMaster.apportionItemses.push({sectName: apportionItems.sectName, apportAmount: apportionItems.apportAmount, payorType: apportionItems.payorType});
                    });
                }

                console.log(businessObj);
                PluginManager.sendTransToPlugin("apportion", "001", angular.toJson(businessObj), {
                    success: function (data) {
                        console.log("------apportion success------------");
                        console.log(data);
                        var apportionResultTemp = angular.fromJson(data.appendDescription);
                        if (apportionResultTemp !== null) {
                            apportionResult.state = angular.copy(apportionResultTemp.state);
                            console.log(apportionResult);
                            if (apportionResultTemp.eventOutData == null) {
                                apportionResult.eventOutData.settleMaster = selfApportion(clinicCate, settleStatus, chargeType, extraInfo.billDetails,
                                    extraInfo.operatorEmpId, extraInfo.factRcptNo);
                            } else {
                                apportionResult.eventOutData.settleMaster = apportionResultTemp.eventOutData.settleMaster;
                                apportionResult.eventOutData.settleMaster.clinicCate = clinicCate;
                                apportionResult.eventOutData.settleMaster.chargeType = chargeType;
                                apportionResult.eventOutData.settleMaster.settleStatus = settleStatus;
                                apportionResult.eventOutData.settleMaster.operatorEmpId = extraInfo.operatorEmpId;
                                apportionResult.eventOutData.settleMaster.billDetails = extraInfo.billDetails;
                            }
                        } else {
                            apportionResult.state = {
                                success: true
                            };
                            apportionResult.eventOutData.settleMaster = selfApportion(clinicCate, settleStatus, chargeType, extraInfo.billDetails, extraInfo.operatorEmpId, extraInfo.factRcptNo);
                        }
                        if (typeof callback === "function") {
                            console.log("-------------callback------------------fun");
                            console.log(apportionResult);
                            callback(apportionResult);
                        }
                    },
                    error: function (data) {
                        console.log("------apportion error------------");
                        console.log(data);
                        apportionResult.state = {success : true, errorList : [{no: "", info: "未返回分摊信息！"}]};
                        apportionResult.eventOutData.settleMaster = selfApportion(clinicCate, settleStatus, chargeType, extraInfo.billDetails, extraInfo.operatorEmpId, extraInfo.factRcptNo);
                        if (typeof callback === "function") {
                            callback(apportionResult);
                        }
                    }
                });
            });
        }
    };

    var handleApportionPrepareData = function(clinicCate, billDetails, callback) {
        if (clinicCate === HrClinicCate.INP) {
            var feeItemVos = [{billDetailVoList: billDetails}];
            callback({feeItemVos: feeItemVos});
        } else {
            HrUtils.httpRequest($http, "api/settles/recipe/" + clinicCate, function (data) {
                console.log(data);
                callback(data);
            }, null, hrDialog, HrUtils.httpMethod.POST, billDetails);
        }
    };

    var selfApportion = function (clinicCate, settleStatus, chargeType, billDetails, operatorEmpId, factRcptNo) {
        var settleMaster = {};
        var totalCosts = 0;
        var totalCharges = 0;
        billDetails.forEach(function (billDetail) {
            totalCosts = HrMath.fixArithmetic(totalCosts, billDetail.costs, "+");
            totalCharges = HrMath.fixArithmetic(totalCharges, billDetail.charges, "+");
        });
        settleMaster.totalCosts = totalCosts;
        settleMaster.totalCharges = totalCharges;
        settleMaster.totalReduces = 0;
        settleMaster.totalApportBala = 0;
        settleMaster.totalNeedSelfpay = totalCharges;
        settleMaster.apportionItemses = [{sectName: "个人自付", apportAmount: totalCharges, payorType: "1"}];
        if (totalCosts !== totalCharges) {
            settleMaster.apportionItemses.push({
                sectName: "医院减免",
                apportAmount: HrMath.fixArithmetic(totalCosts, totalCharges, "-"),
                payorType: "2"
            });
        }
        settleMaster.clinicCate = clinicCate;
        settleMaster.chargeType = chargeType;
        settleMaster.settleStatus = settleStatus;
        settleMaster.operatorEmpId = operatorEmpId;
        settleMaster.billDetails = billDetails;

        return settleMaster;
    };

    var selfConfirmApportion = function(result, payNo, callback){
        HrUtils.httpRequest($http, "api/payments/finish/" + payNo, function(data) {
            result.state.success = true;
            if (typeof callback === "function") {
                callback(result);
            }
        }, function(data, status) {
            result.state.success = false;
            result.state.errorList.push({no: "", info: "HIS系统确认交易失败"});
            if (typeof callback === "function") {
                callback(result);
            }
        }, hrDialog, HrUtils.httpMethod.POST, null);
    };

    var confirmApportion = function (chargeType, tradeNo, settleStatus, sender, payNo, callback) {
        var result = {
            state: {
                success: false,
                errorList: [],
                warningList: [],
                informationList: []
            }
        };
        if (angular.equals("自费", chargeType)) {
            selfConfirmApportion(result, payNo, function(confirmResult){
                callback(confirmResult);
            });
        } else {
            var businessObj = {
                operationType: "ConfirmTrade",
                chargeType: chargeType,
                tradeNo : tradeNo,
                settleStatus : settleStatus,
                sender : sender
            };
            console.log(businessObj);
            PluginManager.sendTransToPlugin("apportion", "001", angular.toJson(businessObj), {
                success: function (data) {
                    console.log("------ConfirmTrade success------------");
                    console.log(data);
                    var appendDescription = angular.fromJson(data.appendDescription);
                    if(appendDescription !== null){
                        result.state = angular.copy(appendDescription.state);
                        if (result.state.success) {
                            HrUtils.httpRequest($http, "api/payments/finish/" + payNo, function(data) {
                                if (typeof callback === "function") {
                                    callback(result);
                                }
                            }, function(data, status) {
                                result.state.success = false;
                                result.state.errorList.push({no: "", info: "HIS系统确认交易失败"});
                                if (typeof callback === "function") {
                                    callback(result);
                                }
                            }, hrDialog, HrUtils.httpMethod.POST, null);
                        } else {
                            if (typeof callback === "function") {
                                callback(result);
                            }
                        }
                    }else{
                        selfConfirmApportion(result, payNo, function(confirmResult){
                            callback(confirmResult);
                        });
                    }
                },
                error: function (data) {
                    console.log("------ConfirmTrade error------------");
                    console.log(data);
                    if (typeof callback === "function") {
                        callback({state : {success : false, errorList : [{no: "", info: "确认结算异常"}]}});
                    }
                }
            });
        }
    };

    var putExRxInfo = function (clinicCate, chargeType, extraInfo, callback) {
        var result = {
            state: {
                success: false,
                errorList: [],
                warningList: [],
                informationList: []
            }
        };
        HrUtils.httpRequest($http, "api/settles/recipe/" + clinicCate, function (data) {
            console.log(data);
            var businessObj = {
                operationType: "PutExRxInfo",
                sender: extraInfo.operatorEmpId,
                patientId : (extraInfo.billDetails.length > 0 ? extraInfo.billDetails[0].patientId : ""),
                clinicCate: clinicCate,
                chargeType: chargeType,
                recipeVoList: data.recipeVos,
                feeItemList: data.feeItemVos
            };
            if (clinicCate == HrClinicCate.REGISTER) {
                businessObj.visitType = extraInfo.visitType !== undefined ? extraInfo.visitType : "";
            } else {
                businessObj.visitType = data.visitType !== undefined ? data.visitType : "";
            }
            console.log(businessObj);
            //构造输出数据
            var convertPluginResult = function (pluginEvent) {
                if (pluginEvent) {
                    if (pluginEvent.appendDescription) {
                        return angular.fromJson(pluginEvent.appendDescription);
                    } else {
                        return {state: {success: true}};
                    }
                } else {
                    return {state: {success: false, errorList: [{no: "", info: "初始化设备异常!"}]}};
                }
            };

            PluginManager.sendTransToPlugin("apportion", "001", angular.toJson(businessObj), {
                success: function (data) {
                    console.log("------apportion success------------");
                    console.log(data);
                    if (typeof callback === "function") {
                        callback(convertPluginResult(data));
                    }
                },
                error: function (data) {
                    console.log("------apportion error------------");
                    console.log(data);
                    if (typeof callback === "function") {
                        callback({state : {success : false, errorList : [{no: "", info: "上传外配处方信息失败!"}]}});
                    }
                }
            });
        }, null, hrDialog, HrUtils.httpMethod.POST, extraInfo.billDetails);
    };

    //构造输出数据
    var convertPluginResult = function (pluginEvent) {
        if (pluginEvent) {
            if (pluginEvent.appendDescription) {
                return angular.fromJson(pluginEvent.appendDescription);
            } else {
                return {state: {success: true}, eventOutData: {tradeState: 1}};
            }
        } else {
            return {state: {success: true}, eventOutData: {tradeState: 1}};
        }
    };


    var commitTradeState = function(chargeType, tradeNo, callback){
        var businessObj = {
            operationType: "CommitTradeState",
            chargeType: chargeType,
            tradeNo : tradeNo
        };
        console.log(businessObj);
        PluginManager.sendTransToPlugin("apportion", "001", angular.toJson(businessObj), {
            success: function (data) {
                console.log("------commitTradeState success------------");
                console.log(data);
                if (typeof callback === "function") {
                    callback(convertPluginResult(data));
                }
            },
            error: function (data) {
                console.log("------commitTradeState error------------");
                console.log(data);
                if (typeof callback === "function") {
                    callback({state : {success : false, errorList : [{no: "", info: "确认交易状态异常"}]}});
                }
            }
        });
    };

    return {
        settleStatus: settleStatusEnum,
        apportion: apportion,
        confirmApportion: confirmApportion,
        putExRxInfo: putExRxInfo,
        commitTradeState : commitTradeState
    };
}]);

