<template>
    <div class="background_word">
        <div class="background_word1">中软国际</div>
        <div class="background_word2">农业知识图谱</div>
        <div class="background_word3">Agriculture Knowledgegraph</div>
        <img src="./img/arrow.png" class="arrow" />
    </div>
</template>

<script>
export default {
    name: "mainWord",
    methods: {},
};
</script>

<style scoped>
.background_word {
    width: 700px; /* 调整导航栏的宽度 */
    position: fixed; /* 设置为固定定位 */
    top: 45%; /* 距离顶部的距离 */
    left: 45%; /* 距离左侧的距离 */
    height: 300px; /* 设置导航栏的高度 */
    cursor: pointer;
    /* border: 1px solid red; */
    /* transition: transform 0.3s ease-in-out; */
}
.arrow {
    position: absolute;
    right: 10%;
    top: 35%;
    width: 80px;
    height: 80px;
    animation: arrow_move 0.8s infinite linear;
    opacity: 0;
    transition: opacity 0.3s linear;
}
@keyframes arrow_move {
    0% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(-5px);
    }
    50% {
        transform: translateX(0);
    }
    75% {
        transform: translateX(5px);
    }
    100% {
        transform: translateX(0);
    }
}
.background_word:hover>.arrow {
    transition: opacity 0.3s linear;
    opacity: 1;
}

@keyframes example {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05) translate(1%, 1%);
    }
    100% {
        transform: scale(1);
    }
}

.background_word1 {
    font-family: "FZZJ-WHJZTJW", sans-serif; /* 使用自定义字体 */
    font-size: 70px; /* 设置字体大小 */
    font-weight: 100; /* 设置字体粗细 */
    display: block;
    padding: 5px 10px;
    text-decoration: none;
    color: var(--main-text-font-color);
    text-align: left;
    letter-spacing: 1px;
}

.background_word2 {
    font-family: "FZZJ-WHJZTJW", sans-serif; /* 使用自定义字体 */
    font-size: 90px; /* 设置字体大小 */
    font-weight: 300; /* 设置字体粗细 */
    display: block;
    padding: 5px 10px;
    text-decoration: none;
    color: var(--main-text-font-color);
    text-align: left;
    letter-spacing: 1px;
}
.background_word3 {
    font-family: "FZZJ-WHJZTJW", sans-serif; /* 使用自定义字体 */
    font-size: 37px; /* 设置字体大小 */
    font-weight: 0; /* 设置字体粗细 */
    display: block;
    padding: 5px 10px;
    text-decoration: none;
    color: var(--main-text-font-color);
    text-align: left;
}
</style>
