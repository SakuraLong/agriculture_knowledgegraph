<template>
    <div class="background_word" @click="setActiveTab('features')">
        <div class="background_word1">中软国际</div>
        <div class="background_word2">农业知识图谱</div>
        <div class="background_word3">Agriculture Knowledgegraph</div>
    </div>
</template>

<script>
export default {
    name: "mainWord",
    methods:{
        setActiveTab(tab) {
            this.activeTab = tab;
            this.initialTab = tab;
            if (tab === "home") {
                this.$emit("update-page", {
                    is_main: true,
                    is_func: false,
                    is_other: false,
                });
            } else if (tab === "features") {
                this.$emit("update-page", {
                    is_main: false,
                    is_func: true,
                    is_other: false,
                });
            } else if (tab === "other") {
                this.$emit("update-page", {
                    is_main: false,
                    is_other: true,
                    is_func: false,
                });
            }
            console.log("传递成功");
        },
    },
};
</script>

<style scoped>

.background_word{
    width: 800px; /* 调整导航栏的宽度 */
    position: fixed; /* 设置为固定定位 */
    top: 45%; /* 距离顶部的距离 */
    left: 45%; /* 距离左侧的距离 */
    height: 100%; /* 设置导航栏的高度 */
    transition: transform 0.3s ease-in-out;
}


.background_word:hover {
    animation: example 1.5s infinite linear;
}

@keyframes example {
        0% {transform: scale(1) }
        50% {transform: scale(1.05) translate(1%, 1%);}
        100%{transform: scale(1) ;}
    }

.background_word1{
    font-family: "FZZJ-WHJZTJW", sans-serif; /* 使用自定义字体 */
    font-size: 70px; /* 设置字体大小 */
    font-weight: 100; /* 设置字体粗细 */
    display: block;
    padding: 5px 10px;
    text-decoration: none;
    color: var(--main-text-font-color);
    text-align:left;
    letter-spacing:1px;
}

.background_word2{
    font-family: "FZZJ-WHJZTJW", sans-serif; /* 使用自定义字体 */
    font-size: 90px; /* 设置字体大小 */
    font-weight: 300; /* 设置字体粗细 */
    display: block;
    padding: 5px 10px;
    text-decoration: none;
    color: var(--main-text-font-color);
    text-align:left;
    letter-spacing:1px;
}
.background_word3{
    font-family: "FZZJ-WHJZTJW", sans-serif; /* 使用自定义字体 */
    font-size: 37px; /* 设置字体大小 */
    font-weight: 0; /* 设置字体粗细 */
    display: block;
    padding: 5px 10px;
    text-decoration: none;
    color: var(--main-text-font-color);
    text-align:left;
}
</style>
