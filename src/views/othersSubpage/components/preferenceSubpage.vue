<template>
    <div class="preference">
        <div style="width: 100%;height: 120px; display: flex;justify-content: center;align-items: center;position: relative;">
            <themeManager></themeManager>
        </div>
        <el-scrollbar class="introduce_container">
            <h1>使用方法</h1>
            <h4>1. 长按鼠标滚轮</h4>
            <p>如果操作正确，您将会看到界面上出现圆环菜单栏</p>
            <P>移动鼠标可以进行功能选择</P>
            <P style="color: red !important;font-weight: 600;">请注意：如果在存在滚动条的组件上长按滚轮</P>
            <P style="color: red !important;font-weight: 600;">鼠标会改变样式</P>
            <p style="color: red !important;font-weight: 600;">在松开滚轮后且鼠标离开滚轮区域后恢复</p>
            <p style="color: red !important;font-weight: 600;">如果没有恢复，请回到存在滚动条存在的区域重新完成上述操作</p>
            <P>如果有何种方法避免此问题，欢迎联系我们，非常感谢</P>
            <h4>2. 当进入子页面时</h4>
            <p>2.1 主页菜单栏进入的子页面通过点击菜单栏按钮切换</p>
            <p>2.2 其余子页面不存在退出按钮时，点击左侧空白区域来进行退出</p>
            <p>2.3 其余子页面存在退出按钮时，点击退出按钮来进行退出</p>
        </el-scrollbar>
    </div>
</template>

<script>
import themeManager from "./themeManager/themeManager.vue";
export default {
    components: {
        themeManager,
    },
};
</script>

<style scoped>
.preference {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    /* border: 1px solid red; */
}
.introduce_container {
    position: relative;
    width: 100%;
    height: calc(100% - 70px);
    /* border: 1px solid red; */
    font-family: Heiti;
    color: var(--subpage-aboutSubpage-color);
}
</style>
