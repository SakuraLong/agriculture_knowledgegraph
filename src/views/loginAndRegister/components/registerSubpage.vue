<template>
    <div class="register_comp" onselectstart="return false">
        <div class="register_text">R E G I S T E R</div>
        <registerEmailInput ref="registerEmailInput" :disabled="disabled"></registerEmailInput>
        <registerPasswordsInput
            ref="registerPasswordsInput"
            :disabled="disabled"
        ></registerPasswordsInput>
        <confirmButton
            @confirmClick="registerClick"
            :content="content"
        ></confirmButton>
    </div>
</template>

<script>
// import ref from "vue";
// import Checker from "@/assets/js/checker/checker.js";
import store from "@/store/index.js";
import Connector from "@/assets/js/connector/connector.js";

import registerEmailInput from "./inputs/registerEmailInput.vue";
import registerPasswordsInput from "./inputs/registerPasswordsInput.vue";
import confirmButton from "@/components/buttons/loginAndRegisterButton/confirmButton/confirmButton.vue";
export default {
    components: {
        registerEmailInput,
        registerPasswordsInput,
        confirmButton,
    },
    data() {
        return {
            email: "",
            password: "",
            content:"注册",
            disabled:null,
            timer:null
        };
    },
    watch: {},
    methods: {
        registerClick() {
            if (!store.state.can_click_button) return;
            // 发送注册请求
            this.email = this.$refs.registerEmailInput.get();
            this.password = this.$refs.registerPasswordsInput.get();
            if (!this.email || !this.password) {
                return;
            } else {
                // 执行注册
                Connector.test(
                    this.registerCallback,
                    this.registerWaiting,
                    this.registerTimeout,
                    4000,
                    true,
                    1000,
                    {
                        success: true,
                    }
                );
            }
        },
        registerCallback(msg) {
            console.log("成功");
            if(msg.success){
                // 开始循环发送注册请求
                this.intervalLogin();
            }else{
                this.$refs.registerPasswordsInput.setError("邮件发送失败");
            }
        },
        registerWaiting(is_waiting) {
            if (is_waiting) {
                store.state.can_click_button = false;
                this.$refs.registerPasswordsInput.setWaiting(is_waiting, "注册中");
            } else {
                store.state.can_click_button = true;
                this.$refs.registerPasswordsInput.setWaiting(is_waiting);
            }
        },
        registerTimeout() {
            console.log("超时");
            this.$refs.registerPasswordsInput.setError("访问服务器失败");
        },
        intervalLogin(){
            clearInterval(this.timer);
            this.$refs.registerPasswordsInput.setWaiting(true, "请点击您邮箱中的验证链接");
            this.disabled = "disabled";
            this.content = "重新发送";
            const waiting_time = 300000; // 5min
            let begin = new Date().getTime();
            this.timer = setInterval(()=>{
                let now = new Date().getTime();
                if(now - begin >= waiting_time){
                    clearInterval(this.timer);
                    this.$refs.registerPasswordsInput.setWaiting(false);
                    return;
                }
            }, 3000);
        },
        autoLoginCallback(msg){

        },
        autoLoginWaiting(is_waiting){

        },
        autoLoginTimeout(){
            console.log("超时");
        }
    },
};
</script>

<style scoped>
.login_email_area {
    position: relative;
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
