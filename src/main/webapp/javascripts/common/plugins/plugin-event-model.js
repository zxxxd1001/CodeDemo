/**
 * 每个函数接口，都会返回一个state对象。
 * success: 标识本次操作是否成功，
 * errorList :
 * warningList :
 * informationList :
 *
 * @type {{success: boolean, errorList: {no: string, info: string}[], warningList: {no: string, info: string}[], informationList: {no: string, info: string}[]}}
 */
var state = {
    success: true,
    errorList: [
        {
            no: "",
            info: ""
        }
    ],
    warningList: [{
        no: "",
        info: ""
    }],
    informationList: [{
        no: "",
        info: ""
    }]
};

//插件输出参数
var pluginEventOutputModel = {
    appendDescription: {
        state: state,
        eventOutData : null //各个接口的业务输出参数
    }
};


