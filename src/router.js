
import Vue from 'vue'
//1、安装路由
//2、导入路由模块
import  VueRouter from 'vue-router'
//3、使用路由模块
Vue.use(VueRouter);
//5、导入相关组件
import Home from './components/tabbar/home.vue'
import Member from './components/tabbar/member.vue'
import Shopcart from './components/tabbar/shopcart.vue'
import Search from './components/tabbar/search.vue'
import NewsList from './components/news/newsList.vue'
import NewsInfo from './components/news/newsInfo.vue'
import PhotoList from './components/photos/photoList.vue'

//4、创建路由对象

let router = new VueRouter({
    //设置路由高亮显示
    linkActiveClass:'mui-active',
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:Home},
        {path:'/member',component:Member},
        {path:'/shopcart',component:Shopcart},
        {path:'/search',component:Search},
        {path:'/home/newsList',component:NewsList},
        {path:'/home/newsInfo/:id',component:NewsInfo},
        {path:'/home/photoList/',component:PhotoList},
    ]
})

//最后：把路由对象暴露出去
export default router