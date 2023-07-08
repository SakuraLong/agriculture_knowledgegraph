<template>
    <div
        class="container"
        id="container"
        :class="{ blur: page.is_login || page.is_personal }"
        onselectstart="return false"
    >
        <!-- <defaultShutters>
            <template #show_child_page>
                <othersSubpage></othersSubpage>
            </template>
        </defaultShutters>  -->
        <!-- <div class="main_lottie" id="main_lottie__"></div> -->
        <!-- <router-view></router-view> -->
        <bg />
        <transition name="slide">
            <mainWord v-if="page.main.is_main" :key="page.main.is_main" />
        </transition>

        <navBar @toLogin="avatarClick" />

        <transition name="bar_change" mode="out-in">
            <mainBar v-if="page.is_main_page" @update-page="updatePage" />
            <!-- <showerBar v-else-if="page.is_func_page" /> -->
        </transition>

        <!-- <transition name="subpage_change" mode="out-in">
            <othersSubpage v-if="page.is_main_page && page.main.is_other" />
            <functionSubpage v-else-if="page.is_main_page && page.main.is_func" />
            <personalSubpage v-else-if="page.is_personal" />
        </transition>
        
        <showerSubpage v-if="page.is_func_page" /> -->
    </div>
    <transition name="app_subpage" mode="out-in">
        <personalMsgSettingSubpage
            v-if="page.is_personal"
            @leaveSetting="leaveSetting"
        />
        <loginAndRegister v-else-if="page.is_login" @leaveLogin="leaveLogin" />
    </transition>
    <!-- 这里还有修改密码和换绑邮箱 -->
</template>

<script>
// 子页面
import loginAndRegister from "@/views/loginAndRegister/loginAndRegister.vue"; // 登录注册--子页面
// import showerSubpage from "@/views/showerSubpage/showerSubpage.vue"; // 功能界面右侧展示区域
// import othersSubpage from "@/views/othersSubpage/othersSubpage.vue"; // 其他--子页面
// import functionSubpage from "@/views/functionSubpage/functionSubpage.vue"; // 功能--子页面
// import personalSubpage from "@/views/personalSubpage/personalSubpage.vue"; // 个人信息--子页面
import personalMsgSettingSubpage from "@/views/personalMsgSettingSubpage/personalMsgSettingSubpage.vue"; // 个人信息修改--子页面
// 组件
import navBar from "@/components/navBar/navBar.vue"; // 顶部导航栏组件
import mainBar from "@/components/mainBar/mainBar.vue"; // 主页左侧导航栏
// import showerBar from "@/components/showerBar/showerBar.vue"; // 功能界面左侧导航栏
import othersSubpage from "@/views/othersSubpage/othersSubpage.vue";
import defaultShutters from "@/components/shutter/defaultShutter.vue"; // 个人信息--子页面

// import lottie from "lottie-web";
// import mainCirle from "@/assets/lottie/light/data1.json";

import bg from "@/components/bg/defaultBg.vue"; // 引入home组件
import mainWord from "@/components/mainWord/mainWord.vue";

import Code from "@/assets/js/code/code.js";
import CodeConfig from "@/assets/js/code/config.js";
import Storage from "@/assets/js/storage/storage.js";

import utils from "@/assets/js/utils.js";
export default {
    data() {
        return {
            page: {
                is_main_page: true,
                is_func_page: false,
                is_personal: false,
                is_login: false,
                main: {
                    is_main: true,
                    is_func: false,
                    is_other: false,
                },
            },
            login: {
                is_login: true,
            },
            user: {
                is_login: false,
            },
        };
    },
    components: {
        loginAndRegister,
        navBar,
        mainBar,
        // showerBar,
        // showerSubpage,
        // othersSubpage,
        // functionSubpage,
        // personalSubpage,
        personalMsgSettingSubpage,
        defaultShutters,
        bg,
        mainWord,
        othersSubpage,
        // threeSubpage,
    },
    methods: {
        updatePage(data) {
            this.page.main.is_main = data.is_main;
            this.page.main.is_func = data.is_func;
            this.page.main.is_other = data.is_other;
        },
        avatarClick() {
            this.page.is_personal = this.user.is_login ? true : false;
            this.page.is_login = !this.user.is_login ? true : false;
        },
        leaveLogin() {
            this.page.is_login = false;
        },
        leaveSetting() {
            this.page.is_personal = false;
            console.log("leaveSetting");
        },
        autoLoginCallBack(msg) {
            console.log("自动登录成功");
        },
        autoLoginTimeout() {
            console.log("自动登录失败");
            this.is_login =false;
            utils.setLogOut();
        },
    },
    created() {
        // console.log(Code.CryptoJS.encrypt("asca87283r23y09c09ywch89y29fh"));
        let user_msg = utils.checkLogin(); // 检查是否满足登录条件
        console.log("user_msg", user_msg);
        utils.autoLogin(
            user_msg,
            this.autoLoginCallBack,
            this.autoLoginTimeout
        ); // 执行自动登录
    },
    mounted() {
        // let param = {
        //     container: document.getElementById("main_lottie__"), // the dom element that will contain the animation
        //     renderer: "svg",
        //     loop: true,
        //     autoplay: true,
        //     animationData: mainCirle,
        //     // path:"https://labs.nearpod.com/bodymovin/demo/markus/halloween/markus.json"
        // };
        // lottie.loadAnimation(param);
    },
};
</script>

<style scoped>
.main_lottie {
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
</style>

<style>
#app {
    font-family: FZZJ-WHJZTJW;
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

.slide-enter-active {
    transition: transform 1s;
}
.slide-leave-active {
    transition: transform 1s;
}

.slide-enter-from {
    transform: translateX(150%);
}
.slide-leave-to {
    transform: translateX(150%);
}

.slide-leave-active {
    position: absolute;
}
</style>
