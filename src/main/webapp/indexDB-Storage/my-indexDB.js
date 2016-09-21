//创建数据库的名字
var _dbName = "MyTestDatabase";
//这样写能让代码更具可读性和更加简洁
var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
//版本号
var _version = 8;
var db = null;

// 现在我们可以连接我们的数据库
// open并不能简单的看成是打开数据库，而是在打开数据库的基础上启动了一个version_change事件方法回调。
//在这个回调方法里自动启动了一个事务，用于version_change。IDBDatabase对象必须要在这个事务中才能取得。
//indexedDB.deleteDatabase(_dbName);
var request = indexedDB.open(_dbName, _version);
console.log(request);
var myData = [
    {ssn: "444-44-4444", name: "Bill", age: 25, email: "bill@company.com", nickName: ["1", "2", "3"]},
    {ssn: "555-55-5555", name: "Donna", age: 34, email: "donna@home.org"},
    {ssn: "666-66-6666", name: "Jack", age: 14, email: "jack@sina.com.cn"}
];

//数据库创建或者连接成功回调函数
request.onsuccess = function (event) {
    console.log(event);
    db = request.result;
    console.log(db);
};
//异常处理
request.onerror = function (event) {
    console.log("------------报错信息-------------");
    console.log(event);
    alert("Why didn't you allow my web app to use IndexedDB?!");
    // 针对这个数据库的所有请求的异常都统一在这个异常事件处理程序中完成。
    // （译者：这样做有效减少监听的数量，在事件冒泡过程的最顶层实现一次监听就可以了，这也是提高JS运行效率的一种技巧。）
    console.log("Database error: ", event.target);
    console.log("--------------------------------");
};
// onupgradeneeded 处理函数是唯一个地方允许你修改数据库的结构和设计
// 数据库版本改变时 [优先] 触发函数 只有在版本更新时或是创建数据库时调用
request.onupgradeneeded = function (event) {
    console.log(event);
    db = event.target.result;
    if (db.objectStoreNames.contains('customers')) {
        //如果有此表删除掉
        db.deleteObjectStore("customers")
    }
    // 创建一个名为“objectStore”的对象来存储我们的客户数据。(表)
    var objectStore = db.createObjectStore("customers", {keyPath: "ssn", autoIncrement: false});

    // 创建一个通过name属性去查找客户数据的索引。因为可能出现
    // 出现重复，所以我们不能使用唯一索引. (索引)
    objectStore.createIndex("name", "name", {unique: false});

    //与createObjectStore()这个函数一样，
    // createIndex（）都有一个可选的对象参数，这个对象参数用于约束你所要创建的索引。
    objectStore.createIndex("email", "email", {unique: true});

    // 用我们刚新建的objectStore来存储客户数据.
    for (i in myData) {
        objectStore.add(myData[i]);
    }
};

//当版本发生变化但是有页面在使用旧版本会触发此函数 当
request.onblocked=function(event){
    // 当其他的选项卡都加载了数据库时，那么数据库要先关闭。
    // 在我们开始着手之前.
    console.log(event);
    alert("请将打开此站点的其他浏览器选项卡都关闭掉!");
};

//添加操作
function insertData(table, data) {
    var request = indexedDB.open(_dbName, _version);
    request.onsuccess = function () {
        // var transaction = db.transaction(["customers"],"readwrite").objectStore("customers");
        // transaction.add({ssn: "888-88-8888", name: "hao", age: 22, email: "304940045@126.com"});
        var transaction = request.result.transaction([table.tableName], "readwrite");
        console.log(transaction);
        var objectStore = transaction.objectStore(table.tableName);
        console.log(objectStore);
        //add 添加的数据不允许有相同的值 类似与JPA中的persist
        var re = objectStore.add(data);
        //put 不关心添加的数据是否存在数据库 类似与JPA中的merge
        //var re =objectStore.put(data);
        console.log(re);

        // 当你创建了一个事务你需要了解它的生命周期。事务性能与事件循环密切相关。
        // 如果当你没有操作这个事务并且将它返回给事件冒泡的环路上，则事务会处于睡眠状态，要激活它的唯一途径就是向事务发出请求。
        // 当你完成请求后你会得到一个DOM事件，假设这个请求成功，你还可以在回调函数里做一些对该事务的扩展，
        // 当你没有对事务进行扩展则就返回给事件冒泡环路，则事务依然将处于睡眠状态，等等。实际上只有一直请求来维持事务的激活状态。
        // 事务的生命周期其实好简单，但它可能需要你一些时间来熟悉它和习惯它。看多一些例子同样有所帮助。
        // 当你把一些东西弄错的时候，你可以开始检查RANSACTION_INACTIVE_ERR标识符所显示的错误代码片段以供找出错误的根源。
        /*事务可以监听3种不同类型的DOM事件：error（异常），abort（中止）和complete（完成）。我*/
        transaction.oncomplete = function (event) {
            console.log("-----oncomplete 完成处理-----");
            console.log(event);
        };
        //其中比较隐蔽的点在于当请求事务的异常出现的时候，这个异常有个默认行为，就是去中止事务。
        //除非你对异常事件对象执行preventDefault（）方法来阻止其默认行为的发生，那么整个事务将会回滚。
        transaction.onerror = function (event) {
            console.log("-----transaction 异常处理-----");
            console.log("error! ", event.target.error.message);
            console.log("error! ", event.target.error.name);
        };
        //这种设计的目的在于让你去思考当出现异常的时候该进行如何的处理方式，但你可以添加一个可以处理各种请求异常的归总处理程序
        //（利用事件冒泡，在冒泡阶段的最顶层设置监听），如果对冒泡阶段的每一层都实现监听异常，那将会显得很笨重。
        // 如果你不想对异常事件做任何处理，你可以对事务调用abort（）来中止事件，那时事务将会回滚并且中止事件会被事务对象所触发。
        transaction.onabort = function (event) {
            console.log("--onabort 中止函数--");
            console.log(event);
            console.log("-------------------");
        };
    };
}
//insertData({tableName: "customers"}, {ssn: "999-99-9999", name: "dong", age: 23, email: "798731693@126.com"});

//删除操作
function  deleteData(table,id){
    var request=indexedDB.open(_dbName, _version);
    request.onsuccess=function(){
        var db=request.result;
        if (db.objectStoreNames.contains(table.tableName)) {
            var transaction=db.transaction([table.tableName],"readwrite");
            var objectStore=transaction.objectStore(table.tableName);
            //只可以根据主键去删除数据
            request=objectStore.delete(id);
            request.onsuccess=function (event){
                console.log("delete key==【" + id + "】 data success");
            }
        }
    };
}
//deleteData({tableName: "customers"},"666-66-6666");

//清空数据
function clearData(table,cellback){
    var request=indexedDB.open(_dbName, _version);
    request.onsuccess=function(){
        var db=request.result;
        if (db.objectStoreNames.contains(table.tableName)) {
            var transaction=db.transaction([table.tableName],"readwrite");
            var objectStore=transaction.objectStore(table.tableName);
            request=objectStore.clear();
            request.onsuccess=function (event){
                console.log("clear store=【" + table.tableName + "】 data success");
                cellback();
            };
            request.onerror = function (event) {
                console.log(event);
            };
        }
    };
}
//clearData({tableName: "customers"},function(){});

//根据主键查询数据
function getData(table,id,cellback){
    var request=indexedDB.open(_dbName, _version);
    request.onsuccess=function(){
        var db=request.result;
        if (db.objectStoreNames.contains(table.tableName)) {
            //只是用于查询可以不给"readwrite" 事物有三种类型 "readonly" "readwrite"可读可写 "versionchange"版本升级
            //如果你没有指定操作模式的方式调用transaction（）那么你创建的事务将会是只读的模式的。
            var transaction=db.transaction([table.tableName]);
            var objectStore=transaction.objectStore(table.tableName);
            request=objectStore.get(id);
            request.onsuccess=function (event){
                //无需对你请求的记录保存为一个可变类型的对象，而是通过DOM事件会在后台被传入一个请求对象，
                // 而event事件对象的target属性的result属性就是你要获取的记录对象，是不是很简单？！
                cellback(event);
            };
            request.onerror = function (event) {
                console.log(event);
            };
        }
    };
}
// getData({tableName: "customers"},"666-66-6666",function(data){
//     console.log(data);
//     console.log(data.target.result);
// });

//查询记录总数
function countStoreData(table) {
    var request = indexedDB.open(_dbName, _version);
    request.onsuccess = function () {
        var db = request.result;
        if (db.objectStoreNames.contains(table.tableName)) {
            var transaction = db.transaction([table.tableName]);
            var objectStore = transaction.objectStore(table.tableName);
            objectStore.count().onsuccess = function (event) {
                console.log("count store=【" + table.tableName + "】 data success! is count ===   " + event.target.result);
            };
        }
    };
}
//countStoreData({tableName: "customers"});

//通过游标查询所有记录 (设值结果集的排序  默认 升  降序 IDBCursor.PREV)
function getDataByCursor(table,cellback){
    var request = indexedDB.open(_dbName, _version);
    var arr=[];
    request.onsuccess = function () {
        var objectStore=request.result.transaction([table.tableName]).objectStore(table.tableName);
        //这个openCursor()方法需要几个参数。第一个，你可以通过键变化幅度对象来指定记录的最大。第二个，你可以指定游标遍历的顺序，默认为升序
        request=objectStore.openCursor().onsuccess = function (event) {
            //这个success回调函数有一些特殊。游标本身就是请求对象的 result对象（我们使用了简写，所以为event.target.result）。
            //那么我们实际需要的键，值则可以通过游标对象的key和 value属性获取。
            var cursor = event.target.result;
            if (cursor) {
                console.log(cursor);
                arr.push(cursor.value);
                //continue 获取每一条记录
                cursor.continue();
            } else {
                //当你已经获取玩最后一条记录（或者已经没有实体数据符合你openCursor（）方法请求的要求)
                //程序依然会执行success回调函数，但这个result属性的值为undefined。
                console.log("没有更多的实例了!");
                cellback(arr);
            }
        }
    };
}
// getDataByCursor({tableName: "customers"},function(data){
//     console.log(data);
// });

//通过索引查询所有记录 (配合游标  及游标的配置)
function getDataByIndex(table,indexName,indexId,callback){
    var request = indexedDB.open(_dbName, _version);
    var arr = [];
    request.onsuccess = function (event) {
        var range = null;
        if (indexId != undefined || indexId != null) {
            // 只匹配 indexId
            range = IDBKeyRange.only(indexId);
            /*
            //  匹配"Donna"之后所有记录, 并且包括"Donna"   boolean值是控制边界的
            //如果设置true则不包括处于边界值上的记录，false则包括边界值上的记录
            range =IDBKeyRange.lowerBound("Donna");
            // 匹配"Bill"之后的所有记录, 但不包括"Bill"
            range= IDBKeyRange.lowerBound("Bill", true);
            // 匹配“Donna”之前的所有记录, 但不包括 "Donna"
            range= IDBKeyRange.upperBound("Donna", true);
            // 匹配在"Bill"  和 "Donna"之间的所有记录，包括“Bill”，但不包括“Jack”
            range= IDBKeyRange.bound("Bill", "Jack", false, true);
             */
        }
        var index=request.result.transaction([table.tableName]).objectStore(table.tableName).index(indexName);
        //不限制唯一的所有索引用 get 方式只可以获取一个实例  （首先获取键值低的记录， 比如 第六和第七 索引值是一样的 那么获取的就是第六条记录）
        // index.get(indexId).onsuccess=function(event){
        //     callback(event.target.result);
        // };

        //通过游标的方式去获取 不限制唯一的所有索引 的所有实例
        index.openCursor(range,IDBCursor.PREV).onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                arr.push(cursor.value);
                cursor.continue();
            } else {
                callback(arr);
            }
        };
    };
}
//insertData({tableName:"customers"},{ssn: "999-99-9999", name: "", age: 23, email: "798731693@126.com"});
// getDataByIndex({tableName:"customers"},"name","Jack",function(data){
//     console.log(data);
// });

