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

let vm = new Vue({
    el:'#app',
    render: c => c(app)
})