<template>
    <div class="container">
        <div class="toggle" @click="changeEmailAndVCode"></div>
        <transition name="rotateX300" mode="out-in">
            <borderInput
                v-if="is_email"
                title="邮箱"
                @msgChange="emailChange"
                ref="borderInput"
                :msg="email.email"
            ></borderInput>
            <borderInput
                v-else-if="!is_email"
                title="验证码"
                @msgChange="vcodeChange"
                ref="borderInput"
                :msg="vcode.vcode"
            ></borderInput>
        </transition>
        <transition name="opacity400">
            <linePrompt
                v-if="error"
                style="width: 260px"
                :data_left="error"
                :data_right="error_right"
                :type="prompt_type"
                @click="sendVcode"
            ></linePrompt>
        </transition>
    </div>
</template>

<script>
import ref from "vue";
import store from "@/store/index.js";
import borderInput from "@/components/inputs/borderInput/borderInput.vue";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import Checker from "@/assets/js/checker/checker.js";
import Connector from "@/assets/js/connector/connector.js";
export default {
    data() {
        return {
            error: "",
            error_right: "",
            prompt_type: "default",
            is_email: true,
            email: {
                email: "",
                sended_email: "",
            },
            vcode: {
                vcode: "",
            },
        };
    },
    components: {
        borderInput,
        linePrompt,
    },
    methods: {
        changeEmailAndVCode() {
            this.is_email = !this.is_email;
        },
        sendVcode() {
            if (!store.state.can_click_button) return;
            // 发送验证码
            if (
                !new Checker(this.email.email, [
                    "sql-check",
                    "no-base-symbols",
                    "no-zh-Hans",
                    "no-spacing",
                ]).check()
            ) {
                this.prompt_type = "error";
                this.error = "请检查邮箱";
                this.error_right = "";
            } else {
                console.log("发送验证码");
                this.email.sended_email = this.email.email;
                Connector.test(
                    this.sendVcodeCallback,
                    this.sendVcodeWaiting,
                    this.sendVcodeTimeout,
                    4000,
                    true,
                    2000,
                    { success: true }
                );
            }
        },
        sendVcodeCallback(msg) {
            if (msg.success) {
                this.prompt_type = "success";
                this.error = "发送成功";
                this.error_right = "重新发送？";
                this.emailChange(this.$refs.borderInput.get()); // 防止用户在发送过程中修改邮箱
            } else {
                this.prompt_type = "error";
                this.error = "发送失败";
                this.error_right = "重新发送？";
                this.email.sended_email = "";
            }
        },
        sendVcodeWaiting(is_waiting) {
            if (is_waiting) {
                store.state.can_click_button = false;
                this.prompt_type = "waiting";
                this.error = "发送中";
                this.error_right = "";
            } else {
                store.state.can_click_button = true;
                this.prompt_type = "default";
                this.error = "";
                this.error_right = "";
            }
        },
        sendVcodeTimeout() {
            this.prompt_type = "error";
            this.error = "发送失败";
            this.error_right = "重新发送？";
            this.email.sended_email = "";
        },
        emailChange(msg) {
            // 判断是不是邮箱
            if (!store.state.can_click_button) return;
            if(this.email.email === msg) return;
            else this.email.email = msg;
            if (new Checker(msg, ["is-email"]).check()) {
                if (this.email.sended_email === "") {
                    this.error = "发送验证码";
                    this.error_right = "";
                    this.prompt_type = "default";
                } else {
                    if (this.email.sended_email === msg) {
                        this.error = "发送成功";
                        this.error_right = "重新发送？";
                        this.prompt_type = "success";
                    } else {
                        this.error = "邮箱已更改";
                        this.error_right = "重新发送？";
                        this.prompt_type = "warning";
                    }
                }
            } else {
                this.error = "";
                this.error_right = "";
            }
        },
        vcodeChange(msg) {
            this.vcode.vcode = msg;
        },
        getEmailOrId() {
            this.error_right = "";
            let str = this.email.email;
            if (new Checker(str, ["no-null"]).check()) {
                if (new Checker(str, ["is-email"]).check()) {
                    if (
                        new Checker(str, [
                            "sql-check",
                            "no-zh-Hans",
                            "no-spacing",
                            "no-base-symbols",
                        ]).check()
                    ) {
                        this.error = "";
                        return { "email": str, "id": "" };
                    } else {
                        this.prompt_type = "error";
                        this.error = "请填写合法邮箱";
                        return false;
                    }
                } else {
                    if (
                        new Checker(str, [
                            "is-num",
                            "@length-max=9",
                            "@length-min=9",
                        ]).check()
                    ) {
                        this.error = "";
                        return { "id": str, "emial": "" };
                    } else {
                        this.prompt_type = "error";
                        this.error = "ID是9位数字";
                        return false;
                    }
                }
            } else {
                this.prompt_type = "error";
                this.error = "邮箱或ID不能为空";
                return false;
            }
        },
        getVCode(){
            this.error_right = "";
            if(new Checker(this.vcode.vcode, ["no-null"]).check()){
                if(new Checker(this.vcode.vcode, ["is-num", "@length-min=6", "@length-max=6"]).check()){
                    return this.vcode.vcode;
                }else{
                    this.prompt_type = "error";
                    this.error = "验证码为6位数字";
                    return false;
                }
            }else{
                this.prompt_type = "error";
                this.error = "验证码不能为空";
                return false;
            }
        }
    },
};
</script>

<style scoped>
.container {
    /* border: 1px solid red; */
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
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
    -webkit-mask-image: url("../img/toggle_0.png");
    -webkit-mask-size: 30px;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;

    transition: all 0.5s ease-in-out;
}
.toggle:hover {
    transform: rotateX(180deg);
    transition: all 0.5s ease-in-out;
}
</style>
