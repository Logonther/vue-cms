<template>
    <div class="goodsInfo-container">
        <!--小球-->
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="flag"></div>
        </transition>
        <!--轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :bannerList="banner" :isFull="false"></swiper>
                </div>
            </div>
        </div>
        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价: <del>{{goodsinfo.market_price }}</del>&nbsp;&nbsp;
                        销售价: <span class="now_price">{{goodsinfo.sell_price }}</span>
                    </p>
                    <p>
                        购买数量:<number @getCount="getNumber" :maxNum="goodsinfo.stock_quantity"></number>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addShopcar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
            <!--
            分析: 加入购物车时候，怎么拿到选择的数量
            1.按钮属于goodsInfo页面, 数量属于number页面
            2.传值：子传父
            3.其本质：父向子传递方法，子调用这个方法，同时把数据当作参数传递给这个方法
            4.子组件什么时候把值传给父组件? 当数字改变的时候，用change事件
            5.设置最大值: 父传子
            -->
        </div>
        <!--商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{goodsinfo.goods_no}}</p>
                    <p>库存情况:{{goodsinfo.stock_quantity}}</p>
                    <p>上架时间:{{goodsinfo.add_time | dateFormat()}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import swiper from '../subcomponents/swiper.vue'
    import number from '../subcomponents/goodsInfo_number.vue'

    export default {
        name: "goodsInfo",
        components:{
            swiper,
            number,
        },
        created(){
            this.getBanner();
            this.getGoodsInfo();
        },
        data(){
            return {
                id:this.$route.params.id,
                banner:[],
                goodsinfo:{},
                flag:false,
                //商品的数量
                selectedCount:1,
            }
        },
        methods:{
            //获取轮播图的数据
            getBanner() {
                this.$http.get("api/getthumimages/" + this.id).then(result => {
                    if (result.body.status === 0) {
                        //this.banner = result.body.message;
                        result.body.message.forEach(item => {
                            item.img = item.src;
                        });
                        this.banner = result.body.message;
                        //分析：为什么轮播图样式很怪
                        //首页中的轮播图使用的是百分百宽度
                    }
                });
            },
            //获取商品信息的数据
            getGoodsInfo() {
                this.$http.get("api/goods/getinfo/" + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.goodsinfo = result.body.message[0];
                    }
                });
            },
            //点击跳转图文介绍
            goDesc(id){
                this.$router.push({name:'goodsDesc',parmas:{id}})
            },
            //点击跳转评论页面
            goComment(id){
                this.$router.push({name:'goodsComment',parmas:{id}})
            },
            //点击添加购物车
            addShopcar(){
                this.flag = !this.flag;
            },

            beforeEnter(el){
                el.style.transform = 'translate(0,0)'
            },
            enter(el,done){
                el.offsetWidth;
                /*
                * 分析小球优化思路：
                * 1、问题：每个屏幕的分辨率都不同
                * 2、解决思路：动态计算这个坐标值，先得到微标和小球的横纵坐标，求差
                * 3、怎么
                * */
                //获取小球位置
                const ball = document.querySelector('.ball').getBoundingClientRect();
                //console.log(ball);
                //获取微标位置
                const badge = document.querySelector('.mui-badge').getBoundingClientRect();
                //console.log(badge);
                //求差
                const x = badge.left - ball.left;
                const y = badge.top - ball.top;

                el.style.transform = `translate(${x}px, ${y}px)`;
                el.style.transition = 'all 1s cubic-bezier(.45,-0.14,1,.68)';
                done();
            },
            afterEnter(el){
                this.flag = !this.flag
            },
            getNumber(count){
                //console.log('拿到的值：'+count);
                this.selectedCount = count;
            }
        }
    }
</script>

<style scoped lang="scss">
    .goodsInfo-container{
        background-color: #eee;
        overflow: hidden;
        .mui-card-footer{
            display: block;
            button{
                margin:10px 0;
            }
        }
        .now_price {
            color: red;
            font-size: 16px;
            font-weight: bold;
        }
        .ball {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            top: 445px;
            left: 146px;
            z-index: 666;
        }
    }
</style>