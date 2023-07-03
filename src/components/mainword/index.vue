<template>
    <div class="background_word">
        <div class="background_word1">中软国际</div>
        <div class="background_word2">农业知识图谱</div>
        <div class="background_word3">Agriculture Knowledgegraph</div>
    </div>
</template>

<script>
export default {
    name: "mainword",
};
</script>

<style scoped>
.background_word{
    width: 800px; /* 调整导航栏的宽度 */
    position: fixed; /* 设置为固定定位 */
    top: 45%; /* 距离顶部的距离 */
    left: 45%; /* 距离左侧的距离 */
    height: 100%; /* 设置导航栏的高度 */
}
.background_word1{
    font-family: 'CustomFont', sans-serif; /* 使用自定义字体 */
    font-size: 70px; /* 设置字体大小 */
    font-weight: 100; /* 设置字体粗细 */
    display: block;
    padding: 5px 10px;
    text-decoration: none;
    color: #000000;
    text-align:left;
    letter-spacing:1px;
}
.background_word2{
    font-family: 'CustomFont', sans-serif; /* 使用自定义字体 */
    font-size: 90px; /* 设置字体大小 */
    font-weight: 300; /* 设置字体粗细 */
    display: block;
    padding: 5px 10px;
    text-decoration: none;
    color: #000000;
    text-align:left;
    letter-spacing:1px;
}
.background_word3{
    font-family: 'CustomFont', sans-serif; /* 使用自定义字体 */
    font-size: 37px; /* 设置字体大小 */
    font-weight: 0; /* 设置字体粗细 */
    display: block;
    padding: 5px 10px;
    text-decoration: none;
    color: #000000;
    text-align:left;
}
@font-face {
  font-family: 'CustomFont'; /* 自定义字体名称 */
  src: url('../../assets/font/FZZJ-WHJZTJW.TTF'); /* 字体文件路径 */
}
</style>
