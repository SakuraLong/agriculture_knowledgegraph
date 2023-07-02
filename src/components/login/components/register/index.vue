<template>
    <div class="register_comp" onselectstart="return false">
        <div class="register_text">R E G I S T E R</div>
        <div class="login_email_area">
            <Transition name="login_an">
                <div
                    v-show="email.is_sended"
                    class="toggle"
                    @click="changeEmailAndVeri"
                ></div>
            </Transition>
            <Transition name="register_evc" mode="out-in">
                <label
                    v-if="is_email"
                    class="login_label login_label_regi"
                    data-text="登录邮箱"
                >
                    <input
                        class="login_id login_input"
                        type="text"
                        v-model="email.email"
                        placeholder="请输入需要绑定的邮箱"
                    />
                </label>
                <label
                    v-else-if="!is_email"
                    class="login_label login_label_regi"
                    data-text="请输入验证码"
                >
                    <input
                        class="login_id login_input"
                        type="text"
                        v-model="v_code.v_code"
                        placeholder="请输入6位验证码"
                    />
                </label>
            </Transition>
        </div>
        <transition name="login_an">
            <div
                v-if="email.has_hint"
                class="register_line"
                :class="{
                    register_send_email: email.is_email_address,
                    waiting: email.is_waiting,
                    finish_send: email.is_finish,
                    unlike: email.is_unlike,
                    error: email.is_error,
                    res_error: email.is_res_error,
                }"
                :data-text="email.msg_left"
                :data-res="email.msg_right"
                @click="registerSend"
            ></div>
        </transition>
        <label class="login_label login_label_regi" data-text="密码">
            <input
                class="login_id login_input"
                type="text"
                placeholder="请输入6~20位密码"
                v-model="password.password"
                @focus="passwordOnFocus"
                @blur="passwordOnBlur"
            />
        </label>
        <label class="login_label login_label_regi" data-text="确认密码">
            <input
                class="login_id login_input"
                type="text"
                placeholder="请输入6~20位密码"
                v-model="password.password_confirm"
                @focus="passwordCOnFocus"
                @blur="passwordCOnBlur"
            />
        </label>
        <transition name="login_an">
            <div
                v-show="password.has_error"
                class="register_line password_line"
                :class="{
                    unlike: password.is_unlike,
                    error: password.is_error,
                }"
                :data-text="password.msg_left"
                :data-res="password.msg_right"
            ></div>
        </transition>
        <label class="login_label login_label_regi" data-text="昵称">
            <input
                class="login_id login_input"
                type="text"
                v-model="name.name"
                placeholder="٩(๑^o^๑)۶"
                @blur="nameOnBlur"
            />
        </label>
        <transition name="login_an">
            <div
                v-show="name.has_error"
                class="register_line password_line"
                :class="{
                    error: name.has_error,
                }"
                :data-text="name.msg_left"
                :data-res="name.msg_left"
                @click="registerSend"
            ></div>
        </transition>
        <!-- <div class="register_register_text" data-text="注册">注册</div> -->
    </div>
</template>

<script>
import Checker from "@/assets/js/checker/checker.js";
import store from "@/store/index.js";
import Connector from "@/assets/js/connector/connector.js";
export default {
    data() {
        return {
            is_email: true,
            email: {
                is_email: true, // 是email的输入界面
                is_email_address: false, // 输入的是邮箱地址
                has_hint: false, // 有提示
                is_sended: false, // 验证码已经发送
                email: "", // 输入的邮箱地址
                sended_email: "", // 上次发送的邮箱地址
                is_waiting: false, // 等待服务器响应
                is_error: false, // 前端检查的错误
                is_res_error: false, // 服务器返回的错误
                is_finish: false, // 发送完成
                is_unlike: false, // 验证码发送之后修改了邮箱
                msg_left: "",
                msg_right: "",
            },
            v_code: {
                v_code: "",
                has_error: false,
                msg_left: "",
                msg_right: "",
            },
            password: {
                password: "",
                password_confirm: "",
                has_error: false,
                password_has_error: false,
                msg_left: "",
                msg_right: "",
                is_unlike: false,
                is_error: false,
            },
            name: {
                name: "",
                has_error: false,
                msg_left: "",
                msg_right: "",
            },
            password_confirm: "",
            is_waiting: false, // 等待服务器响应
            is_error: false, // 发送有错误
            is_finish: false, // 发送完成
            is_unlike: true, // 验证码发送之后修改了邮箱
            sended_email: "",
        };
    },
    watch: {
        "email.email"() {
            if (!store.state.can_click_button) return;
            this.email.is_res_error = false;
            if (
                new Checker(this.email.email, [
                    "no-null",
                    "is-email",
                    "sql-check",
                ]).check()
            ) {
                if (this.email.sended_email === "") {
                    this.email.has_hint = true;
                    this.email.is_email_address = true;
                    this.email.is_error = false;
                    this.email.msg_left = "发送验证码";
                    this.email.msg_right = "";
                    this.email.is_unlike = false;
                    this.email.is_finish = false;
                } else if (
                    this.email.sended_email === this.email.email &&
                    this.email.email !== ""
                ) {
                    this.email.has_hint = true;
                    this.email.is_email_address = false;
                    this.email.is_error = false;
                    this.email.msg_left = "发送成功";
                    this.email.msg_right = "重新发送？";
                    this.email.is_unlike = false;
                    this.email.is_finish = true;
                } else {
                    this.email.has_hint = true;
                    this.email.is_email_address = false;
                    this.email.is_error = false;
                    this.email.msg_left = "邮箱已更改";
                    this.email.msg_right = "重新发送？";
                    this.email.is_unlike = true;
                    this.email.is_finish = false;
                }
            } else if (this.email.sended_email === "") {
                this.email.has_hint = false;
                this.email.is_email_address = false;
                this.email.is_unlike = false;
            } else {
                this.email.has_hint = false;
            }
        },
    },
    methods: {
        sendRegister(){
            // 发送注册请求

        },
        register() {
            // 父组件调用来进行检查
            // 检查邮箱
            if (
                !new Checker(this.email.email, [
                    "is-email",
                    "sql-check",
                    "no-base-symbols",
                    "no-zh-Hans",
                ]).check()
            ) {
                // 检查失败
                this.name.has_error = true;
                this.name.msg_left = "注册失败，请检查邮箱";
                return false;
            }
            // 检查验证码
            if (
                !new Checker(this.v_code.v_code, [
                    "@length-min=6",
                    "@length-max=6",
                    "is-num",
                ]).check()
            ) {
                // 检查失败
                this.name.has_error = true;
                this.name.msg_left = "注册失败，请检查验证码";
                return false;
            }
            // 检查密码
            if (
                !new Checker(this.password.password, [
                    "@length-min=6",
                    "@length-max=20",
                    "sql-check",
                    "no-base-symbols",
                    "no-zh-Hans",
                ]).check() ||
                this.password.password !== this.password.password_confirm
            ) {
                // 检查失败
                this.name.has_error = true;
                this.name.msg_left = "注册失败，请检查密码";
                return false;
            }
            // 检查昵称
            if (
                !new Checker(this.name.name, [
                    "sql-check",
                    "no-base-symbols",
                    "no-null",
                ]).check()
            ) {
                // 检查失败
                this.name.has_error = true;
                this.name.msg_left = "注册失败，请检查昵称";
                return false;
            }
            this.name.has_error = false;
            return true;
        },
        passwordOnFocus() {
            this.$emit("passwordOnFocus");
        },
        passwordOnBlur() {
            this.$emit("passwordOnBlur");
            if (new Checker(this.password.password, ["no-null"]).check()) {
                if (
                    new Checker(this.password.password, [
                        "@length-min=6",
                    ]).check()
                ) {
                    if (
                        new Checker(this.password.password, [
                            "@length-max=20",
                        ]).check()
                    ) {
                        if (
                            new Checker(this.password.password, [
                                "sql-check",
                                "no-zh-Hans",
                                "no-spacing",
                                "no-base-symbols",
                            ]).check()
                        ) {
                            // 检查通过
                            this.password.has_error = false;
                            this.password.is_error = false;
                            this.password.password_has_error = false;
                        } else {
                            // 存在非法字符串
                            this.password.msg_left = "存在非法字符串";
                            this.password.has_error = true;
                            this.password.is_error = true;
                            this.password.password_has_error = true;
                        }
                    } else {
                        this.password.msg_left = "密码长度不能超过20";
                        this.password.has_error = true;
                        this.password.is_error = true;
                        this.password.password_has_error = true;
                    }
                } else {
                    this.password.msg_left = "密码长度不能小于6";
                    this.password.has_error = true;
                    this.password.is_error = true;
                    this.password.password_has_error = true;
                }
            } else {
                if (this.password.password_confirm !== "") {
                    this.password.msg_left = "密码不能为空";
                    this.password.has_error = true;
                    this.password.is_error = true;
                    this.password.password_has_error = true;
                } else {
                    this.password.has_error = false;
                    this.password.is_error = true;
                    this.password.password_has_error = false;
                }
            }
        },
        passwordCOnFocus() {
            this.$emit("passwordOnFocus");
            if (this.password.password_has_error) return;
            if (this.password.password_confirm !== this.password.password) {
                if (this.password.password === "") {
                    this.password.msg_left = "密码不能为空";
                    this.password.has_error = true;
                    this.password.is_error = true;
                    this.password.password_has_error = true;
                    return;
                }
                this.password.msg_left = "两次密码不相等";
                this.password.has_error = true;
                this.password.is_error = true;
                return;
            }
            if (
                new Checker(this.password.password_confirm, ["no-null"]).check()
            ) {
                if (
                    new Checker(this.password.password, [
                        "@length-min=6",
                    ]).check()
                ) {
                    if (
                        new Checker(this.password.password, [
                            "@length-max=20",
                        ]).check()
                    ) {
                        if (
                            new Checker(this.password.password, [
                                "sql-check",
                                "no-zh-Hans",
                                "no-spacing",
                                "no-base-symbols",
                            ]).check()
                        ) {
                            // 检查通过
                            this.password.has_error = false;
                            this.password.is_error = false;
                        } else {
                            // 存在非法字符串
                            this.password.msg_left = "存在非法字符串";
                            this.password.has_error = true;
                            this.password.is_error = true;
                        }
                    } else {
                        this.password.msg_left = "密码长度不能超过20";
                        this.password.has_error = true;
                        this.password.is_error = true;
                    }
                } else {
                    this.password.msg_left = "密码长度不能小于6";
                    this.password.has_error = true;
                    this.password.is_error = true;
                }
            } else {
                // this.password.msg_left = "密码不能为空";
                this.password.has_error = false;
                this.password.is_error = true;
            }
        },
        passwordCOnBlur() {
            this.$emit("passwordOnBlur");
            console.log(this.password.password_has_error);
            if (this.password.password_has_error) return;
            if (this.password.password_confirm !== this.password.password) {
                if (this.password.password === "") {
                    this.password.msg_left = "密码不能为空";
                    this.password.has_error = true;
                    this.password.is_error = true;
                    this.password.password_has_error = true;
                    return;
                }
                this.password.msg_left = "两次密码不相等";
                this.password.has_error = true;
                this.password.is_error = true;
                return;
            }
            if (
                new Checker(this.password.password_confirm, ["no-null"]).check()
            ) {
                if (
                    new Checker(this.password.password, [
                        "@length-min=6",
                    ]).check()
                ) {
                    if (
                        new Checker(this.password.password, [
                            "@length-max=20",
                        ]).check()
                    ) {
                        if (
                            new Checker(this.password.password, [
                                "sql-check",
                                "no-zh-Hans",
                                "no-spacing",
                                "no-base-symbols",
                            ]).check()
                        ) {
                            // 检查通过
                            this.password.has_error = false;
                            this.password.is_error = false;
                        } else {
                            // 存在非法字符串
                            this.password.msg_left = "存在非法字符串";
                            this.password.has_error = true;
                            this.password.is_error = true;
                        }
                    } else {
                        this.password.msg_left = "密码长度不能超过20";
                        this.password.has_error = true;
                        this.password.is_error = true;
                    }
                } else {
                    this.password.msg_left = "密码长度不能小于6";
                    this.password.has_error = true;
                    this.password.is_error = true;
                }
            } else {
                // this.password.msg_left = "密码不能为空";
                this.password.has_error = false;
                this.password.is_error = true;
            }
        },
        /**
         * 发送邮箱验证码
         */
        registerSend() {
            // 检查
            if (!store.state.can_click_button) return;
            if (
                !new Checker(this.email.email, [
                    "no-zh-Hans",
                    "sql-check",
                    "no-base-symbols",
                    "no-spacing",
                ]).check()
            ) {
                // 不通过
                this.email.has_hint = true;
                this.email.is_email_address = false;
                this.email.is_error = true;
                this.email.msg_left = "邮箱不符合规范";
                this.email.msg_right = "";
            } else {
                this.email.is_email_address = true;
                if (this.email.sended_email === "") {
                    // 第一次发
                    this.email.sended_email = this.email;
                } else {
                    // 之后
                }
                this.email.sended_email = this.email.email;
                // 测试用！！！
                Connector.test(
                    this.getVCodeCallback,
                    this.getVCodeWaiting,
                    this.getVCodeTimeout,
                    4000,
                    true,
                    1000,
                    {
                        success: true,
                    }
                );
            }
        },
        getVCodeCallback(msg) {
            store.state.can_click_button = true;
            if (msg.success) {
                this.email.is_sended = true; // 显示切换邮箱和验证码的组件
                this.email.msg_left = "发送成功";
                this.email.msg_right = "重新发送？";
                this.email.is_waiting = false;
                this.email.is_error = false;
                this.email.is_email_address = false;
                this.email.is_res_error = false;
                this.email.is_finish = true;
                this.email.is_unlike = false;
            } else {
                this.email.msg_left = "发送失败";
                this.email.msg_right = "重新发送？";
                this.email.is_waiting = false;
                this.email.is_error = false;
                this.email.is_email_address = false;
                this.email.is_res_error = true;
                this.email.is_finish = false;
                this.email.sended_email = "";
                this.email.is_unlike = false;
            }
        },
        getVCodeWaiting(is_waiting) {
            this.email.is_waiting = is_waiting;
            if (is_waiting) {
                store.state.can_click_button = false;
                this.email.msg_left = "发送中";
            }
        },
        getVCodeTimeout() {
            store.state.can_click_button = true;
            this.email.msg_left = "发送失败";
            this.email.msg_right = "重新发送？";
            this.email.is_waiting = false;
            this.email.is_error = false;
            this.email.is_email_address = false;
            this.email.is_res_error = true;
            this.email.is_finish = false;
            this.email.sended_email = "";
            this.email.is_unlike = false;
        },
        /**
         * 更改邮箱和验证码的显示
         */
        changeEmailAndVeri() {
            this.is_email = !this.is_email;
        },
        nameOnBlur() {
            if (new Checker(this.name.name, ["no-null"]).check()) {
                if (
                    new Checker(this.name.name, [
                        "sql-check",
                        "no-base-symbols",
                    ]).check()
                ) {
                    this.name.has_error = false;
                } else {
                    this.name.has_error = true;
                    this.name.msg_left = "含有非法字符串";
                }
            } else {
                this.name.has_error = false;
            }
        },
    },
};
</script>

<style scoped>
.register_line {
    pointer-events: all;
    position: relative;
    color: rgb(144, 119, 149);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Heiti;
    width: 260px;
    height: 0px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid rgb(144, 119, 149);
    background-color: white;
    font-size: 17px;
    z-index: 10;
}
.register_line::after,
.register_line::before {
    font-weight: 600;
    position: absolute;
    left: 5%;
    top: -15px;
    content: attr(data-text);
    color: rgb(144, 119, 149);
    background-color: white;
    width: auto;
    height: 20px;
    padding-left: 5px;
    padding-right: 5px;
}
.register_line::before {
    content: attr(data-res);
    left: auto;
    right: 5%;
}
.password_line::before {
    content: none;
}
.register_send_email {
    cursor: pointer;
    border: 1px solid rgb(144, 119, 149);
}
.register_send_email::before {
    content: none;
}
.register_send_email:hover {
    border: 1px solid #e77ffb;
    animation: send-flash;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
}
.register_send_email:hover::after {
    color: #e77ffb;
    font-weight: 600;
    opacity: 1;
}

/**.error  */
.error,
.res_error {
    border: 1px solid rgb(255, 65, 65);
}
.error::after,
.res_error::after {
    color: rgb(255, 65, 65);
}
.res_error::before {
    color: rgb(255, 65, 65);
    /* content: attr(data-res); */
}
.error::before {
    content: none;
}

.finish_send {
    cursor: pointer;
    color: rgb(4, 255, 0);
    border: 1px solid rgb(4, 255, 0);
}
.finish_send::after,
.finish_send::before {
    color: rgb(4, 255, 0);
}

.unlike {
    cursor: pointer;
    border: 1px solid rgb(248, 208, 9);
}
.unlike::after,
.unlike::before {
    color: rgb(248, 208, 9);
}

.register_register_text {
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
.register_register_text::after {
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
.register_register_text:hover {
    background-color: rgb(217, 149, 230);
    color: rgb(217, 149, 230);
}
.register_register_text:hover::after {
    -webkit-text-stroke: 3px white;
}
input::placeholder {
    font-size: 16px;
    color: rgba(144, 119, 149, 0.5);
}
.login_email_area {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
}
.toggle {
    cursor: pointer;
    position: absolute;
    left: 2%;
    height: 50px;
    width: 50px;
    background: linear-gradient(
        180deg,
        rgb(199, 14, 250) 50%,
        rgb(221, 175, 235) 50%
    );
    -webkit-mask-image: url("./img/toggle_0.png");
    -webkit-mask-size: 30px;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;

    transition: all 0.5s ease-in-out;
}
.toggle:hover {
    transform: rotateX(180deg);
    transition: all 0.5s ease-in-out;
}
.register_comp {
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: FZZJ-WHJZTJW;
}
.register_text {
    font-size: 40px;
    position: absolute;
    top: 0%;
}
.waiting {
    pointer-events: all;
    position: relative;
    color: rgb(144, 119, 149);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Heiti;
    width: 260px;
    height: 0px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid rgb(144, 119, 149);
    background-color: white;
    font-size: 17px;
    z-index: 10;
}
.waiting::after {
    font-weight: 600;
    position: absolute;
    left: 5%;
    top: -15px;
    content: attr(data-text);
    color: rgb(144, 119, 149);
    background-color: white;
    width: auto;
    height: 20px;
    padding-left: 5px;
    padding-right: 5px;
}
.waiting {
    pointer-events: none;
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
<style>
@keyframes send-flash {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}
@keyframes waiting-moving {
    0% {
        left: 0%;
        width: 6px;
    }
    50% {
        width: 36px;
    }
    100% {
        left: 99%;
        width: 6px;
    }
}
</style>
