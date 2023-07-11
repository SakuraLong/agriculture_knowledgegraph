<template>
    <defaultAvatar class="" @click="clickAvatar" id="nav_avatar">登录</defaultAvatar>
    <div class="nav_avatar_name">{{ user_name }}</div>
</template>
<script>
import defaultAvatar from "@/components/avatar/defaultAvatar.vue";
export default{
    components:{
        defaultAvatar
    },
    data(){
        return {
            is_logged:false,
            user_name:"登录发现更多事物"
        };
    },
    methods:{
        clickAvatar(){
            if(!this.is_logged){
                this.$emit("toLogin", "msg changed by childA");
            }
        }
    }
};
</script>
<style scoped>
.nav_avatar{
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Heiti;
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
.nav_avatar_name{
    font-family: Heiti;
    padding-left: 20px;
}
</style>