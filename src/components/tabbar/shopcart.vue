<template>
    <div class="shopcar-container">
        <div class="mui-card goods-list" v-for="(item,i ) in goodsList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selected(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="info">
                        <h1>{{item.title}}</h1>
                        <p>
                            <span class="price">¥{{item.sell_price}}</span>&nbsp;&nbsp;
                            <number :initCount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></number>&nbsp;&nbsp;
                            <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!--商品结算区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品<span>{{$store.getters.getGoodsTotal.count}}</span>件，
                            总价<span>￥{{$store.getters.getGoodsTotal.amount}}</span>
                        </p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import number from '../subcomponents/shopcart_number.vue'
    export default {
        name: "shopcart",
        components:{
            number,
        },
        data(){
            return {
                goodsList:[]//购物车所有商品的数据
            }
        },
        created(){
            this.getGoodsList();
        },
        methods:{
            //获取购物车商品列表
            getGoodsList(){
                let idArr = [];
                this.$store.state.cart.forEach(item=>{
                    idArr.push(item.id);
                })
                //如果购物车中没有商品，直接返回，不需要请求数据接口
                if(idArr.length <= 0) return;
                console.log(idArr);
                this.$http.get("api/goods/getshopcarlist/" + idArr.join(",")).then(result=>{
                    if (result.body.status === 0) {
                        this.goodsList = result.body.message;
                    }
                })
            },
            //点击删除商品数据 分别从页面上和store仓库里
            remove(id,index){
                this.goodsList.splice(index,1);
                //调用store中的删除数据的方法
                this.$store.commit('removeGoodsList',id)
            },
            selected(id, status){
                this.$store.commit('updateGoodsSelected',{id : id , selected: status});
            }
        },
    }
</script>

<style scoped lang="scss">
    .shopcar-container{
        background-color: #eee;
        overflow: hidden;
        .goods-list {
            .mui-card-content-inner {
                display: flex;
                align-items: center;
            }
            img {
                width: 60px;
            }
            h1 {
                font-size: 13px;
            }
            .info {
                .price {
                    color: red;
                    font-weight: bold;
                }
                p{
                    display: flex;
                    align-items: center;
                }
            }
        }
        .jiesuan {
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>