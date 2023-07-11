<template>
    <div class="showerbar">
        <div class="showerbar-ele" @click="BackToHome">回到首页</div>
        <div class="showerbar-ele" @click="BackToHome">实体查询</div>
        <div class="showerbar-ele" @click="BackToHome">关系查询</div>
        <div class="showerbar-ele" @click="BackToHome">知识概览</div>
        <div class="showerbar-ele" @click="BackToHome">知识问答</div>
        <div class="showerbar-ele" @click="BackToHome">关于我们</div>
    </div>
</template>

<script>
export default {
    data() {
        // 实时添加需要的数据信息
        return {};
    },
    methods: {
        // 返回主页函数
        BackToHome() {},
    },
};
</script>

<style scoped>
.showerbar {
    position: relative;
    border: solid 1px black;
}

.showerbar-ele {
    cursor: pointer;
    font-family: "幼圆";
    font-size: 30px;
    color: #000;
    border: 2px solid transparent; /* 使用 transparent 设置初始边框颜色为透明 */
    margin: 15px;
    position: relative;
    overflow: hidden;
}

.showerbar-ele::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-color: lightgray;
    opacity: 0;
    transition: left 0.3s, opacity 0.3s;
    z-index: -1; /* 使伪元素位于文本和边框之下 */
}

.showerbar-ele:hover::before {
    left: 0;
    opacity: 1;
    /* transition: all 0.3s; */
}

.showerbar-ele:hover {
    border-left-color: #000; /* 在 hover 时设置边框左侧颜色 */
    transform: scale(1.1);
    /* transition: all 0.3s; */
}
</style>
