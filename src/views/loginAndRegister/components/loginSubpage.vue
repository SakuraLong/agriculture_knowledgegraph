<template>
    <div class="login_comp" onselectstart="return false">
        <div class="login_text">L O G I N</div>
        <div class="input_container">
            <loginEmailInput ref="loginEmailInput"></loginEmailInput>
            <loginPasswordInput ref="loginPasswordInput"></loginPasswordInput>
        </div>
        <confirmButton @confirmClick="loginClick" content="登录"></confirmButton>
        <div class="login_forget_password">忘记密码?</div>
    </div>
</template>
<script>
import ref from "vue";
import Checker from "@/assets/js/checker/checker.js";
import Connector from "@/assets/js/connector/connector.js";
import store from "@/store/index.js";

import loginEmailInput from "./inputs/loginEmailInput.vue";
import loginPasswordInput from "./inputs/loginPasswordInput.vue";
import confirmButton from "@/components/buttons/loginAndRegisterButton/confirmButton/confirmButton.vue";
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
    components: {
        loginEmailInput,
        loginPasswordInput,
        confirmButton
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
            let id_email = this.$refs.loginEmailInput.get();
            let password = this.$refs.loginPasswordInput.get();
            if (!id_email) return;
            if (!password) return;

            this.login(id_email, password);
        },
        login(id_email, password, ) {
            console.log(id_email);
            console.log(password);
            Connector.send(
                [1, 2, 3],
                "register",
                this.loginCallback,
                this.loginWaiting,
                this.loginTimeout
            );
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
.input_container{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(100% - 20px);
    height: 50%;
    padding-top: 20px;
}
.login_comp {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    font-family: FZZJ-WHJZTJW;
}
.login_text {
    font-size: 40px;
    position: relative;
    margin-top: 50px;
    width: 100%;
    height: 10%;
}
.login_forget_password {
    cursor: pointer;
    margin-top: 20px;
    font-size: 18px;
}
.login_forget_password:hover {
    color: rgb(175, 123, 186);
}
</style>
<style></style>
