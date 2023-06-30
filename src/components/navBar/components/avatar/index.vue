<template>
    <div class="nav_avatar">
        <!-- <img src="" alt="" class="nav_avatar_border"> -->
        <div class="nav_avatar_img">登录</div>
    </div>
    <div class="nav_avatar_name">登录发现更多事物</div>
</template>
<script>
export default{
};
</script>
<style scoped>
.nav_avatar{
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
}
.nav_avatar_img{
    position: relative;
    width: 90%;
    height: 90%;
    border-radius: 50%;
    /* border: 2px solid rgb(255, 0, 0); */
    background-color: #8222965F;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    font-weight: 500;
    -webkit-text-stroke: 0.3px white;
    font-size: 15px;
}
.nav_avatar_img::after{
    content: " ";
    background-image: var(--avatar-border, url("./img/de.png"));
    background-size: cover;
    width: 160%;
    height: 160%;
    position: absolute;
    left: -30%;
    top: -30%;
    /* border: 1px solid red; */
    overflow: hidden;
}
.nav_avatar_name{
    padding-left: 20px;
}
</style>