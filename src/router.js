
import Vue from 'vue'
//1、安装路由
//2、导入路由模块
import  VueRouter from 'vue-router'
//3、使用路由模块
Vue.use(VueRouter);
//5、导入相关组件
/*import Home from './components/home.vue'
import Cart from './components/cart.vue'
import Register from './components/children/register.vue'
import User from './components/children/user.vue'*/
//4、创建路由对象
/*let router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:Home},
        {path:'/cart',component:Cart,children:[
                {path:'register',component:Register},
                {path:'user',component:User},
            ]},
    ]
})*/

//最后：把路由对象暴露出去
export default router