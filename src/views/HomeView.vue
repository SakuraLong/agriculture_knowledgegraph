<template>
    <div
        class="container"
        id="container"
        :class="{ blur: page.is_login || page.is_personal_setting }"
        onselectstart="return false"
    >
        <transition name="opacity400">
            <div style="position: absolute;width: 100%;height: 100%;left: 0;top: 0;" v-show="show">
                <bg />
                <transition name="slide">
                    <mainWord
                        v-if="page.main.is_main&&page.is_main_page"
                        :key="page.main.is_main"
                        @update-page="updatePage"
                        @click="test"
                    />
                </transition>

                <navBar @avatarClick="avatarClick" />

                <transition :name="bar_change">
                    <mainBar
                        v-if="page.is_main_page"
                        @update-page="updatePage"
                        class="home_view_bar"
                    />
                    <showerBar
                        class="home_view_bar"
                        v-else-if="page.is_func_page"
                    />
                </transition>
                <transition name="shutter">
                    <othersSubpage
                        v-if="page.is_main_page && page.main.is_other"
                    />
                    <functionSubpage
                        v-else-if="page.is_main_page && page.main.is_func"
                        :changeFunction="changeFunction"
                    />
                    <personalSubpage v-else-if="page.is_personal" />
                    <realNameSetting v-else-if="page.is_realname" />
                </transition>
            </div>
        </transition>
    </div>
    <transition name="app_subpage" mode="out-in">
        <personalMsgSettingSubpage
            v-if="page.is_personal_setting"
            @leaveSetting="leaveSetting"
        />
        <loginAndRegister v-else-if="page.is_login" @leaveLogin="leaveLogin" />
    </transition>
    <!-- <updateEmail></updateEmail> -->
    <!-- 这里还有修改密码和换绑邮箱 -->
</template>

<script>
// 子页面
import loginAndRegister from "@/views/loginAndRegister/loginAndRegister.vue"; // 登录注册--子页面
// import showerSubpage from "@/views/showerSubpage/showerSubpage.vue"; // 功能界面右侧展示区域
// import othersSubpage from "@/views/othersSubpage/othersSubpage.vue"; // 其他--子页面
import functionSubpage from "@/views/functionSubpage/functionSubpage.vue"; // 功能--功能选择
import personalSubpage from "@/views/personalSubpage/personalSubpage.vue"; // 个人信息--子页面
import personalMsgSettingSubpage from "@/views/personalMsgSettingSubpage/personalMsgSettingSubpage.vue"; // 个人信息修改--子页面
import realNameSetting from "@/views/realNameSetting/realNameSetting.vue"; //实名认证--子页面
// 组件
import navBar from "@/components/navBar/navBar.vue"; // 顶部导航栏组件
import mainBar from "@/components/mainBar/mainBarNew.vue"; // 主页左侧导航栏
import showerBar from "@/components/showerBar/showerBar.vue"; // 功能界面左侧导航栏
import othersSubpage from "@/views/othersSubpage/othersSubpage.vue";
import defaultShutters from "@/components/shutter/defaultShutter.vue"; // 个人信息--子页面

// import lottie from "lottie-web";
// import mainCirle from "@/assets/lottie/light/data1.json";

import bg from "@/components/bg/defaultBg.vue"; // 引入home组件
import mainWord from "@/components/mainWord/mainWord.vue";

import Code from "@/assets/js/code/code.js";
import CodeConfig from "@/assets/js/code/config.js";
import Storage from "@/assets/js/storage/storage.js";
import baseBox from "@/components/baseBox/baseBox.vue";

import forgetPassword from "./forgetPassword/forgetPassword.vue";
import updateEmail from "./updateEmail/updateEmail.vue";

import utils from "@/assets/js/utils.js";
import store from "@/store/index.js";
export default {
    data() {
        return {
            show: false,
            bar_change: "bar_change_1",
            page: {
                is_main_page: true, // 在主页面
                is_func_page: false, // 在功能页面
                is_personal: false, // 个人信息界面显示
                is_login: false, // 登录注册页面显示
                is_personal_setting: false, // 个人信息设置页面显示
                is_forget_password: false, // 忘记密码界面显示
                is_update_password: false, // 更新密码界面显示
                is_update_email: false, // 更新邮箱界面显示
                is_realname: false, // 实名认证界面显示

                main: {
                    is_main: true, // 主页面主页
                    is_func: false, // 主页面选择功能页面
                    is_other: false, // 主页面其他页面
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
        showerBar,
        // showerSubpage,
        othersSubpage,
        functionSubpage,
        personalSubpage,
        personalMsgSettingSubpage,
        // defaultShutters,
        bg,
        mainWord,
        // baseBox,
        // forgetPassword,
        // updateEmail,
        // threeSubpage,
    },
    methods: {
        changeFunction(index){
            console.log(index);
        },
        test(){
            this.bar_change = this.bar_change === "bar_change_0" ? "bar_change_1" : "bar_change_0";
            this.page.is_main_page = !this.page.is_main_page;
            this.page.is_func_page = !this.page.is_func_page;
        },
        updatePage(data) {
            this.page.main.is_main = data.is_main;
            this.page.main.is_func = data.is_func;
            this.page.main.is_other = data.is_other;
        },
        avatarClick() {
            if (store.state.is_login) {
                this.page.is_personal = true;
            } else {
                this.page.is_login = true;
            }
        },
        leaveLogin() {
            this.page.is_login = false;
        },
        leaveSetting() {
            this.page.is_personal_setting = false;
            console.log("leaveSetting");
        },
        autoLoginCallBack(msg) {
            console.log("自动登录成功");
        },
        autoLoginTimeout() {
            console.log("自动登录失败");
            this.is_login = false;
            utils.setLogOut();
        },
    },
    created() {
        // console.log(Code.CryptoJS.encrypt("asca87283r23y09c09ywch89y29fh"));
        // let user_msg = utils.checkLogin(); // 检查是否满足登录条件
        // console.log("user_msg", user_msg);
        // utils.autoLogin(
        //     user_msg,
        //     this.autoLoginCallBack,
        //     this.autoLoginTimeout
        // ); // 执行自动登录
        // let t = Code.CryptoJS.encrypt("123456longwen", "aisjdnfu3jdf98h2");
        // console.log(t);
        // console.log(Code.CryptoJS.decrypt(t, "aisjdnfu3jdf98h2"));
        // let j = {
        //     name: "longwen",
        //     avatar: "",
        //     born: "2002-12-09",
        //     sex: "1",
        //     occu: "mprq31i93LM+uws+CtcYWQ==",
        //     id: "25f9e794323b453885f5181f1b624d0b",
        //     password: "EAAyB92jdgDd1f8GW3dTcQ==",
        //     email: "XKJrIgHdeKgRfdIfCj2xWw==",
        // };
        // let b = JSON.stringify(j).toString();
        // console.log(b);
        // let a = Code.CryptoJS.encrypt(b);
        // Storage.set(0, "USER_MSG", a);
        // console.log(a);
        // utils.userLoginInit();
    },
    mounted() {
        setTimeout(() => {
            this.show = true;
        }, 400);
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
.home_view_bar {
    /* border: 1px solid red; */
    width: 300px;
    height: 700px;
    position: absolute;
    top: 10%;
    left: 2%;
}
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
    background-color: var(--homeview-bg-color, rgb(255, 255, 255));
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
