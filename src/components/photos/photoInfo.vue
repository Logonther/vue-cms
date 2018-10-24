<template>
    <div class="photoInfo-container">
        <!--大标题-->
        <h3 class="title">{{ photoinfo.title }}</h3>
        <!--子标题-->
        <p class="subTitle">
            <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
            <span>点击：{{ photoinfo.click }}次</span>
        </p>
        <hr>
        <vue-preview :slides="thumbs" @close="handleClose"></vue-preview>
        <!--内容区域-->
        <div class="content" v-html="photoinfo.content">ccc</div>
        <!--评论区域-->
        <!--3、调用子组件-->
        <comment-box :id="id"></comment-box>
    </div>
</template>

<script>
    //1、引入
    import comment from '../subcomponents/comment.vue'
    export default {
        name: "photoInfo",
        components:{
            //2、注册组件名
            commentBox:comment,
        },
        data(){
            return {
                //从路由中获取的图片id
                id:this.$route.params.id,
                photoinfo:{},
                thumbs:[]
            }
        },
        created(){
            this.getPhotoInfo();
            this.getThumbs();
        },
        methods:{
            //获取图片详情
            getPhotoInfo(){
                this.$http.get('api/getimageInfo/'+this.id).then( result => {
                    if(result.body.status === 0){
                        this.photoinfo = result.body.message[0];
                        console.log(this.photoinfo);
                    }
                })
            },
            //获取缩略图
            getThumbs() {
                this.$http.get("api/getthumimages/" + this.id).then( result => {
                    if (result.body.status === 0) {
                        // 循环每个图片的数据，补全图片的宽和高和小图片
                        result.body.message.forEach(item => {
                            item.msrc = item.src;
                            item.w = 600;
                            item.h = 400;
                        });
                        this.thumbs = result.body.message;
                    }
                });
            },
            handleClose () {
                console.log('close event')
            },
        },
    }
</script>

<style lang="scss">
    .photoInfo-container{
        padding: 0 4px;
        .title{
            color: #26a2ff;
            margin: 15px 0;
            text-align: center;
            font-size: 15px;
        }
        .subTitle{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
        .content{
            font-size: 13px;
            img{
                width: 100% !important;
            }
        }
    }
    figure{
        display: inline-block;
        margin: 1em 25px;
        img{
            width: 88px;
            height: 58px;
        }
    }
</style>