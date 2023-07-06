<template>
    <div class="avatar">
        <!-- <img src="" alt="" class="nav_avatar_border"> -->
        <div class="nav_avatar_img" :style="{backgroundImage:setBackgroundImageUrl}">登录</div>
    </div>
</template>
<script>
export default{
    data(){
        return {
            is_logged:false
        };
    },
    props:{
        "setBackgroundImageUrl":{}
    }
};
</script>
<style scoped>
.avatar{
    margin: 10px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
}
.nav_avatar_img{
    pointer-events: all;
    position: relative;
    width: 90%;
    height: 90%;
    border-radius: 50%;
    background-color: #8222965F;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    font-weight: 500;
    -webkit-text-stroke: 0.3px white;
    font-size: 15px;

    background-image: url("./img/back.png");
    background-size: contain;
    background-repeat: no-repeat;
}
.nav_avatar_img::after{
    content: " ";
    background-image: var(--avatar-border, " ");
    background-size: cover;
    width: 160%;
    height: 160%;
    position: absolute;
    left: -30%;
    top: -30%;
    overflow: hidden;
}
</style>