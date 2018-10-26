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
Vue.filter('dateFormat',function (dataStr,pattern='YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern);
})
//9、全局配置post提交方式为表单格式
Vue.http.options.emulateJSON = true;
//10、导入缩略图模块
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入vuex
import Vuex from 'vuex'
//安装
Vue.use(Vuex)
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

let store = new Vuex.Store({
    state:{
        cart:cart,
    },
    mutations:{
        //1、点击购物车，将信息保存到cart
        addToCart(state,goodsList){
            //如果之前没有对应的商品，直接push到cart中
            //如果有对应的商品，只需要更新数据的数量
            let flag = false;

            //如果有，通过id找对应的商品
            state.cart.some(item => {
                if(item.id === goodsList.id){
                    item.count += parseInt(goodsList.count);
                    flag = true;
                    return true;
                }
            })
            //如果没有
            if(!flag){
                state.cart.push(goodsList);
            }
            //需要把cart数组存到localstorage里面
            localStorage.setItem('cart',JSON.stringify(state.cart));
        },
        //修改购物车中数量的值
        updateGoods(state, goodsInfo){
            //找到当前操作的数据，然后通过对比id如果相等
            state.cart.some(item => {
                if(item.id == goodsInfo.id){
                    item.count = parseInt(goodsInfo.count);
                    return true;
                }
            });
            //需要把修改后的cart数组存到localstorage里面
            localStorage.setItem('cart',JSON.stringify(state.cart));
        },
        //5、点击删除
        removeGoodsList(state,id){
            state.cart.some((item ,i) => {
                if(item.id == id){
                    state.cart.splice(i ,1);
                    return true;
                }
            })
            localStorage.setItem('cart',JSON.stringify(state.cart))
        },
        //7、更新商品的状态
        updateGoodsSelected(state, info){
            state.cart.some( item => {
                if(item.id == info.id){
                    item.selected = info.selected;
                    return true;
                }
            })
            localStorage.setItem('cart',JSON.stringify(state.cart))
        }
    },
    getters:{
        //2、获取微标的数量
        getAllCount(state){
            let c = 0;
            state.cart.forEach(item => {
                c += item.count;
            });
            return c;
        },
        //3、获取商品数量的方法
        getGoodsCount(state){
            let num = {};
            state.cart.forEach(item => {
                num[item.id] = item.count;
            })
            return num;
        },
        //6、渲染商品数据的状态
        getGoodsSelected(state){
            let sel = {};
            state.cart.forEach( item => {
                sel[item.id] = item.selected;
            });
            return sel;
        },
        //7、计算总价
        getGoodsTotal(state){
            let num = {
                count:0,//记录数量
                amount:0,//记录总价
            }
            state.cart.forEach(item => {
                if(item.selected){
                    num.count += item.count;
                    num.amount += item.price*item.count;
                }
            });
            return num;
        }
    },
})

let vm = new Vue({
    el:'#app',
    render: c => c(app),
    router,
    store,
})