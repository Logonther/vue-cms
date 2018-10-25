<template>
    <div>
        <div class="mui-numbox" data-numbox-min="1" data-numbox-max="maxNum">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numBox">
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        name: "goodsInfo_number",
        mounted(){
            mui('.mui-numbox').numbox();
        },
        props:['maxNum'],
        methods:{
            countChanged(){
                //给当前元素设置ref属性，然后通过this.$refs.属性值 拿到当前dom对象
                //console.log(this.$refs.numBox.value);
                this.$emit('getCount',parseInt(this.$refs.numBox.value));//凡是涉及到数字的加减，需要化整
            },
        },
        watch:{
            //用watch监听最大值，只要监听到maxNum的值改变, 就立马设置最大值
            'maxNum':function (newVal,oldVal) {
                mui('.mui-numbox').numbox().setOption('max',newVal)
            }
        }
    }
</script>

<style scoped>

</style>