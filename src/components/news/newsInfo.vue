<template>
    <div class="newsInfo-container">
        <!--大标题-->
        <h3 class="title">{{newsinfo.title}}</h3>
        <!--子标题-->
        <p class="subTitle">
            <span>发表时间：{{newsinfo.add_time}}</span>
            <span>点击：{{newsinfo.click}}</span>
        </p>
        <hr>
        <!--内容区域-->
        <div v-html="newsinfo.content" class="content">内容</div>
        <!--评论区域-->
        <!--3、调用子组件-->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
    //1、引入
    import comment from '../subcomponents/comment.vue'
    export default {
        name: "newsInfo",
        components:{
            //2、注册组件名
            commentBox:comment,
        },
        created(){
            this.getNewsInfo();
        },
        data(){
            return {
                id:this.$route.params.id,
                newsinfo:{},
            }
        },
        methods:{
            getNewsInfo(){
                console.log(this.$route.params.id);
                this.$http.get('api/getnew/'+this.id).then( result => {
                    console.log(result.body.message[0]);
                    if(result.body.status === 0){
                        this.newsinfo = result.body.message[0]
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .newsInfo-container{
        padding: 0 4px;
        .title{
            color: red;
            margin: 15px 0;
            text-align: center;
        }
        .subTitle{
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #226aff;
        }
        .content{
            img{
                width: 100% !important;
            }
        }
    }
</style>