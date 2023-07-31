<!-- 农业知识问答子页面 -->
<template>
    <div class="qa_subpage_container" ref="container">ersersers</div>
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
.qa_subpage_container {
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
