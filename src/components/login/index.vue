<template>
    <div class="login">
        <div class="login_container">
            <img id="login_container_girl_1" src="" alt="" class="login_container_girl_1" draggable="false">
            <div class="login_area">
                <div class="login_msg" id="login_msg"  onselectstart="return false">
                    <div class="login_msg_girl">
                        <img v-show="!is_password" src="" alt="" class="login_msg_girl_0_0" draggable="false">
                        <img v-show="is_password" src="" alt="" class="login_msg_girl_0_1" draggable="false">
                        <img v-show="!is_password" src="" alt="" class="login_msg_girl_0_l_h" draggable="false">
                        <img v-show="!is_password" src="" alt="" class="login_msg_girl_0_r_h" draggable="false">
                        <img v-show="is_password" src="" alt="" class="login_msg_girl_0_l_h login_msg_girl_0_l_h_p" draggable="false">
                        <img v-show="is_password" src="" alt="" class="login_msg_girl_0_r_h login_msg_girl_0_r_h_p" draggable="false">
                    </div>
                    <div class="login_msg_title" data-text="农业知识图谱">农业知识图谱</div>
                    <transition name="login_register" mode="out-in">
                        <div v-show="is_login" class="login_msg_login">
                            <div class="msg_login_register" @click="toRegisterArea">
                                <div class="msg_login_register_text" data-text="没有账号？注册一个！">
                                    没有账号？注册一个！
                                </div>
                            </div>
                        </div>
                    </transition>
                    <transition name="login_register" mode="out-in">
                        <div v-show="is_register" class="login_msg_register">
                            <div class="login_msg_register_register">
                                <div class="login_msg_register_register_text" data-text="注册" @click="register">注册</div>
                                <div>用户协议</div>
                                <div>隐私政策</div>
                            </div>
                            <div class="msg_login_register" @click="toLoginArea">
                                <div class="msg_login_register_text" data-text="已有账号？登录登录！">
                                    已有账号？登录登录！
                                </div>
                            </div>
                        </div>
                    </transition>
                    <div class="login_msg_return"  @click="leaveLogin" data-text="返回">
                        返回
                        <div class="login_msg_return_logo"></div>
                    </div>
                </div>
            </div>
            <transition name="login_register" mode="out-in">
                <loginAC v-show="is_login" class="login_area_container" @passwordOnFocus="passwordOnFocus" @passwordOnBlur="passwordOnBlur"></loginAC>
            </transition>
            <transition name="login_register" mode="out-in">
                <registerAC v-show="is_register" class="register_area_container" ref="login_register_ele" @passwordOnFocus="passwordOnFocus" @passwordOnBlur="passwordOnBlur"></registerAC>
            </transition>
        </div>
    </div>
</template>
<script>
import loginAC from "./components/login/index.vue";
import registerAC from "./components/register/index.vue";
import store from "@/store/index.js";
export default{
    data(){
        return {
            is_password:false,
            is_login:true,
            is_register:false
        };
    },
    components:{
        loginAC,
        registerAC
    },
    methods:{
        register(){
            if(!this.$refs.login_register_ele.register()){
                return;
            }else{
                // 成功
                this.$refs.login_register_ele.sendRegister();
            }
        },
        leaveLogin(){
            if(!store.state.can_click_button) return;
            this.$emit("leaveLogin");
        },
        toRegisterArea(){
            if(!store.state.can_click_button) return;
            document.getElementById("login_msg").style.animationName = "login-goto-register";
            this.is_login = false;
            this.is_register = true;
        },
        toLoginArea(){
            if(!store.state.can_click_button) return;
            document.getElementById("login_msg").style.animationName = "register-goto-login";
            this.is_login = true;
            this.is_register = false;
        },
        passwordOnFocus(){
            this.is_password = true;
            document.getElementById("login_container_girl_1").style.animationName = "login_container_girl_hide";
        },
        passwordOnBlur(){
            this.is_password = false;
            document.getElementById("login_container_girl_1").style.animationName = "login_container_girl_show";
        }
    }
};
</script>
<style scoped>
.login_msg_register_register{
    position: absolute;
    top: 40%;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 50%;
}
.login_msg_register_register_text {
    cursor:pointer;
    position: relative;
    font-size: 25px;
    font-family: Heiti;
    z-index: 1;
    color: rgb(217, 149, 230);
    width: 140px;
    height: 40px;
    line-height: 40px;
    border-radius: 40px;
    box-shadow: 1px 1px 5px rgba(199, 14, 250, .5);
    border: 2px solid rgba(199, 14, 250, .5);
}
.login_msg_register_register_text::after {
    content: attr(data-text);
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    /* color: aqua; */
    -webkit-text-stroke: 3px rgba(199, 14, 250, .5);
}
.login_msg_register_register_text:hover {
    background-color: rgba(199, 14, 250, .3);
    color: rgba(199, 14, 250, .5);
}
.login_msg_register_register_text:hover::after {
    -webkit-text-stroke: 3px rgba(255, 255, 255, .7);
}
.login{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
}
.login_area_container, .register_area_container{
    width: 50%;
    height: 100%;
    position: absolute;
    right: 5%;
    /* border: 1px solid red; */
}
.register_area_container{
    left: 5%;
    height: 90%;
    bottom: 0%;
}
.login_container{
    position: relative;
    width: var(--login-width);
    height: var(--login-height);
    background-color: var(--login-background-color);
    /* border-radius: 30px; */
    box-shadow: 0px 0px 20px rgba(130, 34, 150, 0.5);
    /* border: 1px solid red; */
}
.login_area{
    position: absolute;
    width: var(--login-width);
    height: var(--login-height);
    background-color: var(--login-background-color);
}
.login_msg{
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    left: 0.8%;
    top: -2%;
    width: 39.2%;
    height: 104%;
    background-color: #d5b4dc;
    border-radius: 2%;
    animation-duration: 0.8s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    z-index: 99;
}
.msg_login_register, .msg_login_register_text{
    cursor:pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: FZZJ-WHJZTJW;
    font-size: 18px;
    width: 220px;
    height: 30px;
    border: 1px solid #d5b4dc;
    border-radius: 20px;
    overflow: hidden;
}
.msg_login_register{
    position: absolute;
    bottom: 5%;
}
.msg_login_register_text{
    pointer-events: none;
    z-index: 1;
    width: 213px;
    height: 23px;
    background-color: #d5b4dc;
}
.msg_login_register::after{
    content: " ";
    position: absolute;
    width: 150%;
    height: 80%;
    background:linear-gradient(90deg, rgb(199, 14, 250) 40%, rgb(255, 255, 255) 70%);
    /* border-radius: 20px; */
}
.msg_login_register:hover::after{
    animation: login-msg-login-goto-register;
    animation-duration: 6s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}
.login_msg_login, .login_msg_register{
    position: absolute;
    top: 14%;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    margin-top: 20px;
    border: 1px solid blue;
    width: 75%;
    height: 60%;
}
.login_msg_girl{
    width: 100%;
    height: 45%;
    position: absolute;
    bottom: 90%;
    left: 0%;
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
}
.login_msg_girl_0_0, .login_msg_girl_0_1{
    /* border: 1px solid red; */
    position: relative;
    z-index: 0;
    top: 0%;
    content: url("@/assets/img/girls/girl_0_0.png");
    height: 100%;
}
.login_msg_girl_0_1{
    content: url("@/assets/img/girls/girl_0_1.png");
}
.login_msg_girl_0_l_h,.login_msg_girl_0_r_h{
    position: absolute;
    bottom: 17%;
    height: 30px;
}
.login_msg_girl_0_l_h{
    content: url("@/assets/img/girls/left_hand.png");
    right: 20%;
}
.login_msg_girl_0_l_h_p{
    content: url("@/assets/img/girls/left_hand.png");
    right: 25%;
}
.login_msg_girl_0_r_h{
    content: url("@/assets/img/girls/right_hand.png");
    left: 20%;
}
.login_msg_girl_0_r_h_p{
    content: url("@/assets/img/girls/right_hand.png");
    left: 25%;
}
.login_container_girl_1{
    position: absolute;
    left: 93%;
    bottom: 8.5%;
    height: 100%;
    content: url("@/assets/img/girls/girl_1.png");
    z-index: 0;
    animation-duration: 0.6s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in;
}
.login_msg_title{
    position: relative;
    margin-top: 40px;
    font-family: FZZJ-WHJZTJW;
    font-size: 30px;
    z-index: 1;
}
.login_msg_return{
    cursor:pointer;
    position: absolute;
    bottom: 10%;
    width: 80px;
    height: 30px;
    line-height: 30px;
    /* background-image: url("./img/back.png"); */
    background-size: auto 80%;
    background-repeat: no-repeat;
    background-position: center;
    font-family: FZZJ-WHJZTJW;
    font-size: 25px;
    border: 3px solid #8222966F;
    border-radius: 30px;
    z-index: 1;
}
.login_msg_return:hover{
    /* background-image: url("./img/back.png"); */
    color: #d5b4dc00;
    border: 3px solid rgba(199, 14, 250, .5);
    box-shadow: inset 0px 0px 8px rgba(199, 14, 250, .3), 0px 0px 8px rgba(199, 14, 250, .3);
}
.login_msg_return:hover::after{
    -webkit-text-stroke: 0px white;
}
.login_msg_return:hover > .login_msg_return_logo{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgb(199, 14, 250) 40%, rgb(255, 255, 255) 70%);
    -webkit-mask-image: url("./img/back.png");
    -webkit-mask-size: 30px;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
}
.login_msg_title::after, .login_msg_return::after{
    position: absolute;
    left: 0%;
    top: 0%;
    z-index: -1;
    width: 100%;
    height: 100%;
    -webkit-text-stroke: 2px white;
    content: attr(data-text);
}
</style>
<style>
.login_label{
    font-family: Heiti;
    position: relative;
    width: 260px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(144, 119, 149);
    margin-top: 10px;
    margin-bottom: 10px;
}
.login_label::after{
    padding-left: 5px;
    padding-right: 5px;
    font-size: 17px;
    display: flex;
    align-items: center;
    width: auto;
    height: 20px;
    position: absolute;
    left: 5%;
    top: -12px;
    background-color: white;
    content: attr(data-text);
    z-index: 1;
    color: rgb(144, 119, 149);
}
.login_label:has(.login_input:focus)::after{
    color:#e77ffb;
}
.login_label:has(.login_input:focus){
    border: 2px solid #e77ffb;
}
.login_label:has(.login_input:hover){
    box-shadow: 0px 0px 2px #e77ffb;
}
.login_input{
    position: relative;
    width: 240px;
    height: 40px;
    border: 0;/*清除自带的2px的边框*/
    padding: 0;/*清除自带的padding间距*/
    outline: none;/*清除input点击之后的黑色边框*/
    /* border: 1px solid red; */
    z-index: 0;
    font-size: 24px;
}
.login_input:focus{
    caret-color:#e77ffb;
}
@keyframes login-msg-login-goto-register {
    from{
        rotate: 0deg;
    }
    to{
        rotate: 360deg;
    }
}
@keyframes login-goto-register {
    from{
        left: 0.8%;
    }
    to{
        left: 59.2%;
    }
}
@keyframes register-goto-login {
    from{
        left: 59.2%;
    }
    to{
        left: 0.8%;
    }
}
@keyframes login_container_girl_hide {
    from{
        left: 93%;
    }to{
        left: 73%;
    }
}
@keyframes login_container_girl_show {
    from{
        left: 73%;
    }to{
        left: 93%;
    }
}
</style>