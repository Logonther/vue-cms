<template>
    <div>
        <div class="mui-numbox" data-numbox-min="1" data-numbox-max="maxNum">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" :value="initCount" @change="countChanged" ref="numBox">
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        name: "shopcart_number",
        mounted(){
            mui('.mui-numbox').numbox();
        },
        props:['initCount','goodsId'],
        methods:{
            countChanged(){
                //给当前元素设置ref属性，然后通过this.$refs.属性值 拿到当前dom对象
                //console.log(this.$refs.numBox.value);
                //调用修改数据的方法
                this.$store.commit('updateGoods',{id:this.goodsId , count:this.$refs.numBox.value})
            },
        },
    }
</script>

<style scoped>
    .mui-numbox{
        height: 27px;
    }
</style>