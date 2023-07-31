<!-- 知识概览子页面 -->
<template>
    <div class="os_subpage_container" ref="container">ososos</div>
</template>
<script>
export default {
    methods:{
        getOffsetTop(){
            return this.$refs.container.offsetTop;
        }
    }
};
</script>

<style scoped>
.os_subpage_container {
    position: relative;
    border: 1px solid red;
    float: right;
    width: 98%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    box-sizing: content-box;
    display: block;
}
</style>
