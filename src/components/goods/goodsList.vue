<template>
    <div class="goods-list">
        <!--<router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h3>{{ item.title }}</h3>
            <div class="info">
                <p class="price">
                    <span class="now">{{ item.sell_price }}</span>
                    <span class="old">{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </router-link>-->
        <div class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h3>{{ item.title }}</h3>
            <div class="info">
                <p class="price">
                    <span class="now">{{ item.sell_price }}</span>
                    <span class="old">{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>
    </div>
    <!--
    在网页当中，有两种跳转方式
    ①使用a标签的形式 叫做标签跳转
    ②使用window.location.href的形式 叫做编程式导航跳转
    -->
</template>

<script>
    export default {
        name: "goodsList",
        data(){
            return {
                pageindex: 1,
                goodslist: [] // 存放商品列表的数组
            }
        },
        created(){
            this.getGoodsList();
        },
        methods:{
            //获取商品列表
            getGoodsList(){
                this.$http.get('api/getgoods?pageindex'+this.pageIndex).then( result => {
                    if(result.body.status === 0){
                        this.goodslist = this.goodslist.concat(result.body.message);
                    }
                })
            },
            goDetail(id){
                console.log(this);
                this.$router.push({name:'goodsInfo',params:{id}})
            }
        }
    }
</script>

<style scoped lang="scss">
    .goods-list{
        display: flex;
        justify-content: space-between;
        padding: 7px;
        //让弹性盒子在必要的时候拆行
        flex-wrap: wrap;
        .goods-item{
            border: 1px solid #ccc;
            width: 49%;
            box-shadow: 0 0 9px #ccc;
            margin: 3px 0;
            padding: 2px;
            display: flex;
            /*设置盒子将垂直显示*/
            flex-direction: column;
            justify-content: space-between;
            img{
                width: 100%;
            }
            h3{
                font-size: 14px;
            }
            .info{
                background-color: #eee;
                p{
                    padding: 5px;
                    margin: 0;
                }
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>