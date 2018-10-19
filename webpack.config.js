//这是node.js引入模块的语法,而webpack是基于node构建的，任何合法的node代码都是支持的
const path = require('path');

//1、导入模块
const htmlWebpackPlugin = require('html-webpack-plugin');
//注意：只要是插件，一定要放到plugin节点中去
//这个插件的作用
//1、会自动在内存中根据指定页面生成一个内存页面
//2、会自动把打包好的main.js追加到页面中去

//通过node中的模块操作，向外暴露出一个配置对象
module.exports = {
    mode:'development',
    //入口文件 表示要使用webpack打包哪个文件
    entry:path.join(__dirname,'./src/index.js'),
    //输出文件 表示的是将打包好的文件输出到哪个目录中去
    output:{
        path:path.join(__dirname,'./dist'),//输出路径
        filename:'main.js'
    },
    //这是所有webpack插件配置的节点
    plugins:[
        new htmlWebpackPlugin({
            //指定模板文件的路径
            template:path.join(__dirname,'./src/index.html'),
            //设置生成内存页面的名称
            filename:'index.html',
        })
    ],
    //这是配置所有第三方loader模块的
    module: {
        //匹配第三方模块的规则
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.(png|jpg|gif|jpeg|bmp)$/,use:['url-loader?limit=57944&name=[hash:8][name].[ext]']},
            //图片会默认打包成base64格式的图片，若不想这样，可以传参?limit=图片的大小（以字节来算）
            //传参后会解析成hash值，最多有32位，为了防止图片重名
            //若想使用图片自己的名字，传参&name=[name].[ext]
            //若想图片的名字且不冲突，在前面加上hash值
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            //需要注意的是，一定要把node_modules文件夹添加到排除项：
            //原因1：不排除的话，babel会把里面所有的第三方js全部打包编译，会非常消耗cpu
            //原因2：就算全部转换完毕了，
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},
            {test:/\.vue$/,use:'vue-loader'}
        ]
    },
    //修改vue被导入时的路径
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    }
}