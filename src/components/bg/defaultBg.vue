<template>
    <div class="home">
        <div class="background_img"></div>
    </div>
</template>

<script>
export default {
    // name: "bg",
};
</script>

<style scoped>
.home {
    height: 100%;
    /* home组件的样式 */
}

.background_img {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("./img/white.png");
    background-size: cover;
    /* 背景样式 */
    animation: rotateBackground 720s infinite linear;
}
@keyframes rotateBackground {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
