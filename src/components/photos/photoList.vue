<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-scroll-wrapper">
                <div class="mui-scroll">
                    <a :class='["mui-control-item",item.id==0?"mui-active":""]'
                       v-for="item in cates" :key="item.id" @click="getPhotoList(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoInfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    //报错：可能是webpack默认是启用严格模式的
    //解决：把webpack打包的时候的严格模式去掉
    export default {
        name: "photoList",
        data(){
            return {
                cates:[],//所有分类信息
                list:[],//所有图片信息
            }
        },
        created(){
            this.getAllCategory();
            this.getPhotoList(0)
        },
        mounted(){
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods:{
            //获取图片的分类
            getAllCategory(){
                this.$http.get('api/getimgcategory').then( result => {
                    if(result.body.status ===0){
                        //手动拼接一个全部的分类列表
                        result.body.message.unshift({title:"全部",id:0});
                        this.cates = result.body.message;

                    }
                })
            },
            //获取图片信息列表
            getPhotoList(id){
                this.$http.get('api/getimages/'+id).then( result => {
                    if(result.body.status === 0){
                        this.list = result.body.message
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    * {
        touch-action: pan-y;
    }
    .photo-list {
        list-style: none;
        margin: 0;
        padding: 10px;
        img[lazy="loading"] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        li {
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;
            img {
                width: 100%;
                display: block;
            }
            .info {
                max-height: 84px;
                color: white;
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color: rgba(0,0,0,0.4);
                .info-title {
                    font-size: 14px;
                }
                .info-body {
                    font-size: 13px;
                }
            }
        }
    }
</style>