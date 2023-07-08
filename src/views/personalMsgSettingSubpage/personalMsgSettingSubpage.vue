<template>
    <div class="personal_setting">
        <div class="container">
            <div class="container_son title">
                <div class="title_text" data-text="个人信息设置">
                    个人信息设置
                </div>
            </div>
            <div class="container_son content">
                <div class="content_top">
                    <batteryElement
                        class="battery_element"
                        battery_width="30"
                    ></batteryElement>
                </div>
                <div class="content_body">
                <!-- <el-scrollbar  class="content_body_" wrap-class="" min-size="300"> -->
                    <dialogAvatarBox
                        is_left="true"
                        :content="dailog.name.default"
                    ></dialogAvatarBox>
                    <div class="content_ele">
                        <borderInput
                            title="昵称"
                            :msg="dailog.name.name_show"
                        ></borderInput>
                    </div>
                    <dialogAvatarBox
                        is_left="true"
                        :content="dailog.avatar.default"
                    ></dialogAvatarBox>
                    <dialogAvatarBox
                        is_left="true"
                        :content="dailog.born.default"
                    ></dialogAvatarBox>
                    <dialogAvatarBox
                        is_left="true"
                        :content="dailog.sex.default"
                    ></dialogAvatarBox>
                    <dialogAvatarBox
                        is_left="true"
                        :content="dailog.occu.default"
                    ></dialogAvatarBox>
                <!-- </el-scrollbar> -->
                </div>
                <div class="content_bottom">
                    <transition name="opacity400">
                        <linePrompt
                            class="line_prompt"
                            :data_left="line_prompt.msg"
                            v-if="line_prompt.msg"
                        ></linePrompt>
                    </transition>
                </div>
            </div>
            <div class="container_son bottom">
                <div class="exit_text" data-text="退出" @click="leaveSetting">退出</div>
                <div class="save_text" data-text="保存">保存</div>
            </div>
        </div>
    </div>
</template>
<script>
// import Checker from "@/assets/js/checker/checker.js";
// import { ref } from "vue";
import dialogAvatarBox from "@/components/dialogBoxes/dialogAvatarBox/dialogAvatarBox.vue";
import borderInput from "@/components/inputs/borderInput/borderInput.vue";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import store from "@/store/index.js";
import batteryElement from "./components/batteryElement.vue";
import Code from "@/assets/js/code/code.js";
import Storage from "@/assets/js/storage/storage.js";
import util from "@/assets/js/utils.js";
export default {
    data() {
        return {
            dailog: {
                name: {
                    name: "",
                    name_show: "",
                    default: "希望我们怎么称呼你呢？",
                },
                avatar: {
                    default: "设置一个头像叭？",
                },
                born: {
                    default: "希望在什么时候为你送上生日祝福？",
                },
                sex: {
                    default: "方便告诉我们你的性别吗？",
                },
                occu: {
                    default: "方便告诉我们你的职业吗？",
                },
            },
            line_prompt: {
                msg: "",
            },
        };
    },
    created() {
        // 检查登录情况
        // let user_msg = JSON.parse(Code.CryptoJS.decrypt(Storage.get(0, "USER_MSG",  Code.CryptoJS.encrypt("{}"))));
        // let is_login = Code.CryptoJS.decrypt(Storage.get(0, "IS_LOGIN", Code.CryptoJS.encrypt("false")));
        // if(!util.checkIntegrality(user_msg)||is_login==="false"){
        //     Storage.set(0, "IS_LOGIN", Code.CryptoJS.encrypt("false"));
        //     // this.eleaveSettingxit();
        // }
    },
    mounted() {
        
    },
    components: {
        // avatar,
        // dailogBox,
        // datePicker
        // calendar
        dialogAvatarBox,
        borderInput,
        linePrompt,
        batteryElement,
    },
    methods: {
        leaveSetting() {
            console.log("leaveSetting");
            if (!store.state.can_click_button) return;
            this.$emit("leaveSetting");
        },
        saveSetting() {
            console.log("leaveSetting");
            if (!store.state.can_click_button) return;
            this.$emit("leaveSetting");
        },
    },
    watch: {},
};
</script>
<style scoped>
.personal_setting {
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
.container {
    position: relative;
    width: var(--login-width);
    height: var(--login-height);
    background-color: var(--login-background-color);
    /* border-radius: 30px; */
    box-shadow: 0px 0px 20px rgba(130, 34, 150, 0.5);
    /* border: 1px solid red; */
}
.container_son {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.title {
    position: relative;
    border: 1px solid red;
    width: 100%;
    height: 10%;
}
.content {
    position: relative;
    width: 100%;
    height: 80%;
    border: 1px solid red;
}
.bottom {
    position: relative;
    width: 100%;
    height: 10%;
    flex-direction: row;
}
.title_text,
.exit_text,
.save_text {
    position: relative;
    height: auto;
    width: auto;
    font-family: FZZJ-WHJZTJW;
    font-size: 30px;
    z-index: 1;
}
.exit_text,
.save_text {
    cursor: pointer;
    margin: 0px 10px 0px 10px;
    padding: 0px 5px 0px 5px;
}
.exit_text:hover,
.save_text:hover {
    box-shadow: 0px 0px 5px rgba(230, 146, 255, 0.8),
        inset 0px 0px 5px rgba(230, 146, 255, 0.8);
}
.title_text::after,
.exit_text::after,
.save_text::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    -webkit-text-stroke: 3px rgba(230, 146, 255, 0.5);
}
.content_top,
.content_bottom {
    width: 100%;
    height: 5%;
    border: 1px solid red;
}
.content_bottom {
    display: flex;
    justify-content: center;
    align-items: center;
}
.content_body {
    width: calc(100% - 50px);
    height: 90%;
    /* border: 1px solid rgb(0, 255, 4); */
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-left: 50px;
}
.content_body::-webkit-scrollbar {
    width: 12px;
    margin-right: 5px;
    background-color: rgba(255, 255, 255, 0.485);
    opacity: 0;
}
/* 滚动槽 */
.content_body::-webkit-scrollbar-track {
    /* visibility: hidden; */
    margin-right: 5px;
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.485);
    /* background-color: aquamarine; */
    border-radius: 10px;
}
/* 滚动条滑块 */
.content_body::-webkit-scrollbar-thumb {
    opacity: 0;
    margin-right: 5px;
    border-radius: 10px;
    background: rgba(165, 94, 177, 0.3);
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.5);
    /* transition: all 0.5 ease; */
}
/* .content_body::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(255, 0, 0, 0.4);
} */
.content_ele {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.line_prompt {
    position: relative;
    top: 5px;
    width: 300px;
}
.battery_element {
    position: absolute;
    right: 3%;
}
</style>
