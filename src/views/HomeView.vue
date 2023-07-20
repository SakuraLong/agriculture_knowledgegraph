<template>
    <div
        class="container"
        id="container"
        :class="{ blur: page.is_login || page.is_personal_setting }"
        onselectstart="return false"
    >
        <transition name="opacity400">
            <div
                style="
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                "
                v-show="show"
            >
                <bg />
                <navBar @avatarClick="avatarClick" class="nav_bar" />
                <div class="body_container">
                    <div class="body_bar_container">
                        <transition :name="bar_change">
                            <mainBar
                                v-if="page.is_main_page"
                                @update-page="updatePage"
                                class="home_view_bar"
                                ref="main_bar"
                            />
                            <showerBar
                                class="home_view_bar home_view_bar_shower"
                                @backToHome="backToHome"
                                @goToShowerOther="goToShowerOther"
                                v-else-if="page.is_func_page"
                            />
                        </transition>
                    </div>
                    <div class="body_shower_container">
                        <transition name="slide">
                            <mainWord
                                v-if="page.main.is_main && page.is_main_page"
                                :key="page.main.is_main"
                                @click="goToShower"
                            />
                            <showerSubpage
                                v-else-if="page.is_func_page"
                            ></showerSubpage>
                        </transition>
                    </div>
                </div>
                <transition name="shutter">
                    <othersSubpage
                        v-if="page.is_main_page && page.main.is_other"
                    ></othersSubpage>
                    <othersSubpageShower
                        @leaveOtherShower="leaveOtherShower"
                        v-else-if="page.is_shower_other"
                    ></othersSubpageShower>
                    <functionSubpage
                        v-else-if="page.is_main_page && page.main.is_func"
                        :changeFunction="changeFunction"
                    />
                    <personalSubpage
                        v-else-if="page.is_personal"
                        @leavePersonal="leavePersonal"
                        @toEditRealName="toPersonalRealSetting"
                        @toEditPersonal="toEditPersonal"
                        @logOut="logOut"
                    />
                </transition>
                <transition name="shutter">
                    <realNameSetting
                        v-if="page.is_realname"
                        @toPersonal="leavePersonalRealSetting"
                    ></realNameSetting>
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
    <mouseSelector
        ref="mouse_selector"
        v-if="mouse_selector_show"
    ></mouseSelector>
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
import showerBar from "@/components/showerBar/showerBarNew.vue"; // 功能界面左侧导航栏
import othersSubpage from "@/views/othersSubpage/othersSubpage.vue";
import othersSubpageShower from "@/views/othersSubpage/othersSubpageShower.vue";
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
import showerSubpage from "./showerSubpage/showerSubpage.vue";

import utils from "@/assets/js/utils.js";
import store from "@/store/index.js";
import testMsg from "@/assets/js/testMsg.js";
import storage from "@/assets/js/storage/storage.js";
import mouseSelector from "@/components/mouse/mouseSelector.vue";
export default {
    data() {
        return {
            show: false,
            bar_change: "bar_change_1",
            mouse_selector_show: false,
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
                is_shower_other: false, // 功能页面的other
                main: {
                    is_main: true, // 主页面主页
                    is_func: false, // 主页面选择功能页面
                    is_other: false, // 主页面其他页面
                },
            },
            login: {
                is_login: false,
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
        othersSubpageShower,
        othersSubpage,
        functionSubpage,
        personalSubpage,
        personalMsgSettingSubpage,
        // defaultShutters,
        bg,
        mainWord,

        realNameSetting,

        showerSubpage,
        mouseSelector,

        // baseBox,
        // forgetPassword,
        // updateEmail,
        // threeSubpage,
    },
    methods: {
        logOut() {
            this.page.is_personal = false;
            utils.setLogOut();
        },
        changeFunction(index) {
            storage.set(0, "METHODS", index + 1);
            this.page.main.is_main = true;
            this.page.main.is_func = false;
            this.goToShower();
        },
        backToHome() {
            this.bar_change = "bar_change_1";
            this.page.is_main_page = true;
            this.page.is_func_page = false;
        },
        goToShower() {
            this.bar_change = "bar_change_0";
            this.page.is_main_page = false;
            this.page.is_func_page = true;
        },
        goToShowerOther() {
            console.log(12);
            this.page.is_shower_other = true;
        },
        leaveOtherShower() {
            this.page.is_shower_other = false;
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
        leavePersonal() {
            this.page.is_personal = false;
        },
        leavePersonalRealSetting() {
            this.page.is_realname = false;
        },
        toPersonalRealSetting() {
            this.page.is_realname = true;
        },
        toEditPersonal() {
            this.page.is_personal_setting = true;
        },
        toPersonal() {
            this.page.is_personal = true;
        },
        mouseCenterDown(e) {
            // 鼠标中键按下
            if (!store.state.can_click_button) return;
            if (
                this.page.is_login ||
                this.page.is_personal_setting ||
                this.page.is_forget_password ||
                this.page.is_update_password ||
                this.page.is_update_email ||
                this.page.is_realname
            )
                return;
            if (e.button === 1) {
                this.mouse_selector_show = true;
                let x = e.clientX;
                let y = e.clientY;
                let t = setInterval(() => {
                    try {
                        this.$refs.mouse_selector.mouseNowPos(x, y);
                        clearInterval(t);
                    } catch {
                        //
                    }
                }, 50);
            }
        },
        mouseCenterUp(e) {
            // 鼠标中键抬起
            if (!store.state.can_click_button) return;
            if (e.button === 1 && this.mouse_selector_show) {
                this.mouse_selector_show = false;
                let a = this.$refs.mouse_selector.mouseCenterUp();
                switch (a) {
                    case 1:
                        // 实体识别
                        this.page.is_func_page = false;
                        Storage.set(0, "METHODS", 1);
                        this.page.is_personal = false; // 个人信息界面显示
                        this.page.is_login = false; // 登录注册页面显示
                        this.page.is_personal_setting = false; // 个人信息设置页面显示
                        this.page.is_forget_password = false; // 忘记密码界面显示
                        this.page.is_update_password = false; // 更新密码界面显示
                        this.page.is_update_email = false; // 更新邮箱界面显示
                        this.page.is_realname = false; // 实名认证界面显示
                        this.page.main.is_main = true;
                        this.page.main.is_func = false;
                        this.page.main.is_other = false;
                        this.page.is_shower_other = false; // 功能页面的other
                        setTimeout(() => {
                            this.goToShower();
                        }, 50);
                        break;
                    case 2:
                        // 其他
                        if (this.page.is_main_page) {
                            this.page.is_personal = false; // 个人信息界面显示
                            this.page.is_login = false; // 登录注册页面显示
                            this.page.is_personal_setting = false; // 个人信息设置页面显示
                            this.page.is_forget_password = false; // 忘记密码界面显示
                            this.page.is_update_password = false; // 更新密码界面显示
                            this.page.is_update_email = false; // 更新邮箱界面显示
                            this.page.is_realname = false; // 实名认证界面显示
                            this.page.main.is_main = false;
                            this.page.main.is_func = false;
                            this.page.main.is_other = true;
                            this.$refs.main_bar.setSelectedEle(2);
                        } else {
                            this.goToShowerOther();
                        }
                        break;
                    case 3:
                        // 主页
                        this.page.is_personal = false; // 个人信息界面显示
                        this.page.is_login = false; // 登录注册页面显示
                        this.page.is_personal_setting = false; // 个人信息设置页面显示
                        this.page.is_forget_password = false; // 忘记密码界面显示
                        this.page.is_update_password = false; // 更新密码界面显示
                        this.page.is_update_email = false; // 更新邮箱界面显示
                        this.page.is_realname = false; // 实名认证界面显示
                        this.page.is_shower_other = false; // 功能页面的other
                        if (this.page.is_main_page) {
                            this.page.main.is_main = true;
                            this.page.main.is_func = false;
                            this.page.main.is_other = false;
                            this.$refs.main_bar.setSelectedEle(0);
                        } else {
                            this.backToHome();
                        }
                        break;
                    case 4:
                        // 点击头像
                        this.page.is_personal_setting = false; // 个人信息设置页面显示
                        this.page.is_forget_password = false; // 忘记密码界面显示
                        this.page.is_update_password = false; // 更新密码界面显示
                        this.page.is_update_email = false; // 更新邮箱界面显示
                        this.page.is_realname = false; // 实名认证界面显示
                        this.page.is_shower_other = false; // 功能页面的other
                        this.page.main.is_main = true;
                        this.page.main.is_func = false;
                        this.page.main.is_other = false;
                        if (store.state.is_login) {
                            this.page.is_personal = true;
                        } else {
                            this.page.is_login = true;
                        }
                        break;
                    case 5:
                        // 农知问答
                        this.page.is_func_page = false;
                        Storage.set(0, "METHODS", 5);
                        this.page.is_personal = false; // 个人信息界面显示
                        this.page.is_login = false; // 登录注册页面显示
                        this.page.is_personal_setting = false; // 个人信息设置页面显示
                        this.page.is_forget_password = false; // 忘记密码界面显示
                        this.page.is_update_password = false; // 更新密码界面显示
                        this.page.is_update_email = false; // 更新邮箱界面显示
                        this.page.is_realname = false; // 实名认证界面显示
                        this.page.main.is_main = true;
                        this.page.main.is_func = false;
                        this.page.main.is_other = false;
                        this.page.is_shower_other = false; // 功能页面的other
                        setTimeout(() => {
                            this.goToShower();
                        }, 50);
                        break;
                    case 6:
                        // 知识概览
                        this.page.is_func_page = false;
                        Storage.set(0, "METHODS", 4);
                        this.page.is_personal = false; // 个人信息界面显示
                        this.page.is_login = false; // 登录注册页面显示
                        this.page.is_personal_setting = false; // 个人信息设置页面显示
                        this.page.is_forget_password = false; // 忘记密码界面显示
                        this.page.is_update_password = false; // 更新密码界面显示
                        this.page.is_update_email = false; // 更新邮箱界面显示
                        this.page.is_realname = false; // 实名认证界面显示
                        this.page.main.is_main = true;
                        this.page.main.is_func = false;
                        this.page.main.is_other = false;
                        this.page.is_shower_other = false; // 功能页面的other
                        setTimeout(() => {
                            this.goToShower();
                        }, 50);
                        break;
                    case 7:
                        // 关系查询
                        this.page.is_func_page = false;
                        Storage.set(0, "METHODS", 3);
                        this.page.is_personal = false; // 个人信息界面显示
                        this.page.is_login = false; // 登录注册页面显示
                        this.page.is_personal_setting = false; // 个人信息设置页面显示
                        this.page.is_forget_password = false; // 忘记密码界面显示
                        this.page.is_update_password = false; // 更新密码界面显示
                        this.page.is_update_email = false; // 更新邮箱界面显示
                        this.page.is_realname = false; // 实名认证界面显示
                        this.page.main.is_main = true;
                        this.page.main.is_func = false;
                        this.page.main.is_other = false;
                        this.page.is_shower_other = false; // 功能页面的other
                        setTimeout(() => {
                            this.goToShower();
                        }, 50);
                        break;
                    case 8:
                        // 实体查询
                        this.page.is_func_page = false;
                        Storage.set(0, "METHODS", 2);
                        this.page.is_personal = false; // 个人信息界面显示
                        this.page.is_login = false; // 登录注册页面显示
                        this.page.is_personal_setting = false; // 个人信息设置页面显示
                        this.page.is_forget_password = false; // 忘记密码界面显示
                        this.page.is_update_password = false; // 更新密码界面显示
                        this.page.is_update_email = false; // 更新邮箱界面显示
                        this.page.is_realname = false; // 实名认证界面显示
                        this.page.main.is_main = true;
                        this.page.main.is_func = false;
                        this.page.main.is_other = false;
                        this.page.is_shower_other = false; // 功能页面的other
                        setTimeout(() => {
                            this.goToShower();
                        }, 50);
                        break;
                }
            }
        },
        mouseMove(e) {
            // 鼠标移动事件
            if (!store.state.can_click_button) return;
            let x = e.clientX;
            let y = e.clientY;
            if (this.mouse_selector_show) {
                let w = window.innerWidth;
                let h = window.innerHeight;
                if (x < 0 || y < 0 || x > w || y > h) {
                    this.mouse_selector_show = false;
                    return;
                }
                this.$refs.mouse_selector.mouseNowPos(x, y);
            }
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
        // testMsg.localStorageIsLogin();
        utils.setLogOut();
        console.log(utils.getUserMsg());
    },
    mounted() {
        setTimeout(() => {
            this.show = true;
        }, 400);
        document.getElementById("html").onmousedown = this.mouseCenterDown;
        document.getElementById("html").onmouseup = this.mouseCenterUp;
        document.getElementById("html").onmousemove = this.mouseMove;
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
.nav_bar {
    position: relative;
    z-index: 20;
}
.body_container {
    position: absolute;
    width: 100%;
    height: 90%;
    bottom: 0;
    left: 0;
    /* border: 1px solid red; */
    display: flex;
    flex-direction: row;
}
.body_bar_container {
    position: relative;
    height: 100%;
    width: 20%;
    /* border: 1px solid red; */
}
.body_shower_container {
    position: relative;
    height: 100%;
    width: 80%;
    /* border: 1px solid red; */
}
.home_view_bar {
    /* border: 1px solid red; */
    width: 100%;
    height: 90%;
    position: absolute;
    /* top: 10%; */
}
.home_view_bar_shower {
    height: 100vh;
    position: absolute;
    bottom: 0;
}
.main_lottie {
    position: absolute;
    z-index: 100;
    width: 90%;
    height: 90%;
    top: 0%;
    left: 0%;
    /* border: 1px solid red; */
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
