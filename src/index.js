//1、导入vue组件
import Vue from 'vue'
//2、导入主模板并用render渲染
import app from './App.vue'
//3、引入mint-ui相关组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);
//4、导入mui库
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
//5、导入router.js
import router from './router.js'
//6、导入view-resource模块
import VueResource from 'vue-resource'
Vue.use(VueResource);
//7、全局配置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//8、定义全局过滤器
import moment from 'moment'
Vue.filter('dateFormat',function (dataStr,pattern='YYYY-MM-DD') {
    return moment(dataStr).format(pattern);
})

let vm = new Vue({
    el:'#app',
    render: c => c(app),
    router,//挂到vm实例上
})