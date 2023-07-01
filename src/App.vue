<template>
    <div class="container" id="container" :class="{ blur: page.is_login }">
        <div class="main_lottie" id="main_lottie__"></div>
        <navBar @toLogin="toLogin" />
        <mainBar v-if="page.is_main_page" />
        <showerBar v-if="page.is_func_page" />

        <other v-if="page.is_main_page && page.main.is_other" />
        <functions v-if="page.is_main_page && page.main.is_other" />
        <personal v-if="page.is_personal" />
        <shower v-if="page.is_func_page" />
    </div>
    <!-- <shutter /> -->
    <transition name="login_an">
        <login v-if="page.is_login" @leaveLogin="leaveLogin" />
    </transition>
</template>
<script>
import login from "@/components/login/index.vue";           // 登录注册组件
import navBar from "@/components/navBar/index.vue";         // 顶部导航栏组件
import mainBar from "@/components/mainBar/index.vue";       // 主页左侧导航栏
import showerBar from "@/components/showerBar/index.vue";   // 功能界面左侧导航栏
import shower from "@/components/shower/index.vue";        // 功能界面右侧展示区域
import other from "@/components/other/index.vue";           // 其他--子页面
import functions from "@/components/funcs/index.vue";   // 功能--子页面
import personal from "@/components/personal/index.vue";     // 个人信息--子页面

import shutter from "@/components/shutter/index.vue";     // 个人信息--子页面

import lottie from "lottie-web";
import mainCirle from "@/assets/lottie/light/data.json";
export default{
    data(){
        return{
            page:{
                is_main_page:true,
                is_func_page:false,
                is_personal:false,
                is_login:false,
                main:{
                    is_main:true,
                    is_func:false,
                    is_other:false,
                }
            },
            login:{
                is_login:true
            }
        };
    },
    components:{
        login,
        navBar,
        mainBar,
        showerBar,
        shower,
        other,
        functions,
        personal,
        // shutter
    },
    methods:{
        /**
         * 导航栏点击登录调用的函数
         */
        toLogin(){
            console.log("999");
            this.page.is_login = true;
        },
        /**
         * 登录组件点击退出调用的函数
         */
        leaveLogin(){
            this.page.is_login = false;
        }
    },
    mounted(){
        let param = {
            container: document.getElementById("main_lottie__"), // the dom element that will contain the animation
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: mainCirle
            // path:"https://labs.nearpod.com/bodymovin/demo/markus/halloween/markus.json"
        };
        lottie.loadAnimation(param);
    }
};
</script>

<style scoped>
.main_lottie{
    position: absolute;
    z-index: 100;
    width: 90%;
    height: 90%;
    top: 0%;
    left: 0%;
    border: 1px solid red;
}
.container {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */
}
.blur {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    /* background-color: aqua; */
    filter: blur(4px);
}
.s {
    filter: none;
}
</style>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}

.login-view {
    border: 1px solid blue;
    pointer-events: none;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100vh;
    /* filter: blur(2px); */
    z-index: 5;
}
</style>
