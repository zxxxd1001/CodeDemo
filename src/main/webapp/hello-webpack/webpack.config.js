const path=require("path");
const htmlWebpackPlugin=require("html-webpack-plugin");
/**
 * 创建一个插件实例对象
 * 将html插入内存
 */
const htmlPlugin=new htmlWebpackPlugin({
    template:path.join(__dirname,"./public/index.html"),
    filename:"index.html"
});

module.exports = {
    entry: __dirname+'/src/main.jsx',   // 入口文件
    output: {                     // 输出配置
        filename: 'bundle.js',      // 输出文件名
        path: path.resolve(__dirname,'public')   //输出文件路径配置
    },
    mode:"development",//development production
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            //babel处理js
            {
                test: /\.js|\.jsx$/,
                exclude: /node_modules/, //排除此文件夹
                use: [
                    'babel-loader'
                ]
            }

        ]
    },
    plugins: [
        htmlPlugin
    ]
    //在内存中生成打包好的js文件 跟路径
    // devServer: {
    //     contentBase: 'public/' //虚拟内存的地址
    // }

};
//__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。