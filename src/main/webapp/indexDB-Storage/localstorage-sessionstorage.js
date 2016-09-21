if(window.localStorage){
    alert("浏览支持localStorage")
} else {
    alert("浏览暂不支持localStorage")
}
console.log("sessionStorage对象",window.sessionStorage);
console.log("localStorage对象",window.localStorage);
console.log("--------------------------------------");
//存储对象在localStorage中
function saveLocalJsonObject(key, jsonObject) {
    window.localStorage.setItem(key, JSON.stringify(jsonObject));
}
//删除在localStorage中的对象
function delLocalJsonObject(key) {
    window.localStorage.removeItem(key);
}
//获取localStorage对象 并转化为JSON
function getLocalJsonObject(key) {
    return  JSON.parse(window.localStorage.getItem(key));
}
function clearLocalJsonObject() {
    window.localStorage.clear();
}
function traverseLocal(){
var storage=window.localStorage;
    storage['personIsSex']="女";
    for(var i=0;i<storage.length;i++){
        var key=storage.key(i);
        var value=storage[storage.key(i)];
        console.log(key,value);
    }
}
// saveLocalJsonObject("personIsName",{name:"张露"});
// saveLocalJsonObject("personIsAge",{age:12});
// saveLocalJsonObject("personIsSex",{age:"男"});
// delLocalJsonObject("personIsSex");
// console.log(getLocalJsonObject("personIsAge"));
// traverseLocal();
clearLocalJsonObject();
