<template>
    <div class="login_comp" onselectstart="return false">
        <div class="login_text">L O G I N</div>
        <label class="login_label login_label_login" data-text="登录邮箱或是ID">
            <input
                class="login_id login_input"
                type="text"
                v-model="login_id_or_email"
            />
        </label>
        <transition name="login_an">
            <div
                v-show="check.id_or_email"
                class="login_error"
                :data-text="login_msg"
            ></div>
        </transition>
        <label class="login_label login_label_login" data-text="密码">
            <input
                class="login_password login_input"
                type="password"
                v-model="password"
                @focus="passwordOnFocus"
                @blur="passwordOnBlur"
            />
        </label>
        <transition name="login_an" mode="out-in">
            <div
                v-if="check.password"
                class="password_error"
                :data-text="password_msg"
            ></div>
            <div
                v-else-if="back_error.has_error"
                class="password_error"
                :data-text="back_error.content"
            ></div>
            <div
                v-else-if="waiting.is_waiting"
                class="password_error waiting"
                :data-text="waiting.content"
            ></div>
        </transition>
        <div class="login_login_text" data-text="登录" @click="loginClick">
            登录
        </div>
        <div class="login_forget_password">忘记密码?</div>
    </div>
</template>
<script>
import Checker from "@/assets/js/checker/checker.js";
import Connector from "@/assets/js/connector/connector.js";
import store from "@/store/index.js";
export default {
    data() {
        return {
            login_msg: "",
            password_msg: "",
            login_id_or_email: "",
            password: "",
            check: {
                id_or_email: false,
                password: false,
            },
            back_error: {
                has_error: false,
                content: "",
            },
            waiting: {
                content: "登录中",
                is_waiting: false,
            },
        };
    },
    methods: {
        passwordOnFocus() {
            this.$emit("passwordOnFocus");
        },
        passwordOnBlur() {
            this.$emit("passwordOnBlur");
        },
        /**
         * 点击登录按钮
         */
        loginClick() {
            /* 检查字符串 */
            if (!store.state.can_click_button) return;
            this.back_error.has_error = false;
            this.waiting.is_waiting = false;
            let login_check = false;
            let is_id = false;
            let password_check = false;
            if (new Checker(this.login_id_or_email, ["no-null"]).check()) {
                if (new Checker(this.login_id_or_email, ["is-email"]).check()) {
                    // 是邮箱
                    if (
                        new Checker(this.login_id_or_email, [
                            "sql-check",
                            "no-zh-Hans",
                            "no-spacing",
                            "no-base-symbols",
                        ]).check()
                    ) {
                        // 检查通过
                        login_check = true;
                        this.check.id_or_email = false;
                    } else {
                        // 存在非法字符串
                        this.login_msg = "存在非法字符串";
                        this.check.id_or_email = true;
                    }
                } else {
                    if (
                        new Checker(this.login_id_or_email, [
                            "@length-min=9",
                            "@length-max=9",
                        ]).check()
                    ) {
                        // 长度是9
                        if (
                            new Checker(this.login_id_or_email, [
                                "is-num",
                            ]).check()
                        ) {
                            // 检查通过
                            this.check.id_or_email = false;
                            login_check = true;
                            is_id = true;
                        } else {
                            // 只能是数字
                            this.login_msg = "ID只能是数字";
                            this.check.id_or_email = true;
                        }
                    } else {
                        // 长度不是9
                        this.login_msg = "ID长度是9";
                        this.check.id_or_email = true;
                    }
                }
            } else {
                this.login_msg = "登录邮箱或ID不能为空";
                this.check.id_or_email = true;
            }
            if (new Checker(this.password, ["no-null"]).check()) {
                if (new Checker(this.password, ["@length-min=6"]).check()) {
                    if (
                        new Checker(this.password, ["@length-max=20"]).check()
                    ) {
                        if (
                            new Checker(this.password, [
                                "sql-check",
                                "no-zh-Hans",
                                "no-spacing",
                                "no-base-symbols",
                            ]).check()
                        ) {
                            // 检查通过
                            this.check.password = false;
                            password_check = true;
                        } else {
                            // 存在非法字符串
                            this.password_msg = "存在非法字符串";
                            this.check.password = true;
                        }
                    } else {
                        this.password_msg = "密码长度不能超过20";
                        this.check.password = true;
                    }
                } else {
                    this.password_msg = "密码长度不能小于6";
                    this.check.password = true;
                }
            } else {
                this.password_msg = "密码不能为空";
                this.check.password = true;
            }

            this.login(login_check, is_id, password_check);
        },
        login(login_check, is_id, password_check) {
            console.log(login_check);
            console.log(password_check);
            if (!login_check || !password_check) {
                console.log(0);
                return;
            } else {
                // 执行登录
                Connector.send(
                    [1, 2, 3],
                    "register",
                    this.loginCallback,
                    this.loginWaiting,
                    this.loginTimeout
                );
            }
        },
        loginCallback(msg) {
            store.state.can_click_button = true;
        },
        loginWaiting(is_waiting) {
            this.waiting.is_waiting = is_waiting;
            if (is_waiting) {
                store.state.can_click_button = false;
            }
        },
        loginTimeout() {
            store.state.can_click_button = true;
            this.back_error.has_error = true;
            this.back_error.content = "登录失败";
        },
    },
};
</script>
<style scoped>
.login_error,
.password_error {
    pointer-events: all;
    position: absolute;
    top: 39%;
    color: rgb(144, 119, 149);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Heiti;
    width: 260px;
    height: 0px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid rgb(255, 61, 61);
    background-color: white;
    font-size: 17px;
    z-index: 10;
}
.password_error {
    top: 60%;
}
.login_error::after,
.password_error::after {
    font-weight: 600;
    position: absolute;
    left: 5%;
    top: -15px;
    content: attr(data-text);
    color: rgb(255, 61, 61);
    background-color: white;
    width: auto;
    height: 20px;
    padding-left: 5px;
    padding-right: 5px;
}
.login_login_text {
    cursor:pointer;
    position: relative;
    font-size: 25px;
    font-family: Heiti;
    z-index: 1;
    color: white;
    width: 140px;
    height: 40px;
    line-height: 40px;
    border-radius: 40px;
    box-shadow: 1px 1px 5px rgb(217, 149, 230);
    border: 2px solid rgb(217, 149, 230);
}
.login_login_text::after {
    content: attr(data-text);
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    /* color: aqua; */
    -webkit-text-stroke: 3px rgb(217, 149, 230);
}
.login_login_text:hover {
    background-color: rgb(217, 149, 230);
    color: rgb(217, 149, 230);
}
.login_login_text:hover::after {
    -webkit-text-stroke: 3px white;
}
.login_label_login {
    margin-top: 30px;
    margin-bottom: 30px;
}
.login_comp {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: FZZJ-WHJZTJW;
}
.login_text {
    font-size: 40px;
    position: absolute;
    top: 10%;
}
.login_forget_password {
    cursor:pointer;
    margin-top: 20px;
    font-size: 18px;
}
.login_forget_password:hover {
    color: rgb(175, 123, 186);
}
.waiting {
    border: 1px solid rgb(144, 119, 149);
}
.waiting::after {
    color: rgb(144, 119, 149);
}
.waiting::before {
    content: " ";
    width: 6px;
    height: 6px;
    position: absolute;
    left: 0%;
    top: -3px;
    border-radius: 6px;
    background-color: rgb(144, 119, 149);

    animation: waiting-moving;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
}
</style>
<style></style>
