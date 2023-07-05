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
                    
                </div>
                <div class="content_body">
                    <dialogAvatarBox is_left=true :content="dailog.name.default"></dialogAvatarBox>
                    <div class="content_ele">
                        <borderInput title="昵称" :msg="dailog.name.name_show"></borderInput>
                    </div>
                    <dialogAvatarBox is_left=true :content="dailog.avatar.default"></dialogAvatarBox>
                    <dialogAvatarBox is_left=true :content="dailog.born.default"></dialogAvatarBox>
                    <dialogAvatarBox is_left=true :content="dailog.sex.default"></dialogAvatarBox>
                    <dialogAvatarBox is_left=true :content="dailog.occu.default"></dialogAvatarBox>
                </div>
                <div class="content_bottom">
                    <transition name="opacity400">
                        <linePrompt class="line_prompt" :data_left="line_prompt.msg" v-if="line_prompt.msg"></linePrompt>
                    </transition>
                </div>
            </div>
            <div class="container_son bottom">
                <div class="exit_text" data-text="退出" @click="exit">退出</div>
                <div class="save_text" data-text="保存">保存</div>
            </div>
        </div>
    </div>
    <!-- <div class="personal_container">
        <div class="personal_msg_setting" data-text="个人信息设置">
            个人信息设置
        </div>
        <div class="setting_container">
            <div class="setting_name">
                <div class="dailog_box dailog_left">
                    <div class="dailog_avatar_container">
                        <avatar
                            class="dailog_avatar"
                            :setBackgroundImageUrl="avatar.right"
                        ></avatar>
                    </div>
                    <dailogBox is_left="true">该怎么称呼你呢？</dailogBox>
                </div>
                <label class="login_label" data-text="昵称">
                    <input
                        class="login_input personal_input"
                        type="text"
                        v-model="personal.name.name"
                        placeholder="请输入昵称"
                    />
                </label>
            </div>
            <div class="setting_avatar">
                <div class="dailog_box dailog_left">
                    <div class="dailog_avatar_container">
                        <avatar
                            class="dailog_avatar"
                            :setBackgroundImageUrl="avatar.left"
                        ></avatar>
                    </div>
                    <dailogBox is_left="true">设置一个头像叭？</dailogBox>
                </div>
            </div>
            <div class="setting_born">
                <div class="dailog_box dailog_left">
                    <div class="dailog_avatar_container">
                        <avatar
                            class="dailog_avatar"
                            :setBackgroundImageUrl="avatar.right"
                        ></avatar>
                    </div>
                    <dailogBox is_left="true"
                        >希望在什么时候为你送上生日祝福？</dailogBox
                    >
                    <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="Pick a day"
                        :size="size"
                        value-format="YYYY-MM-DD"
                    />
                </div>
                <div>
                    ssss
                    <datePicker v-model="personal.born.born"></datePicker>
                </div>
            </div>
            <div class="setting_sex">
                <div class="dailog_box dailog_left">
                    <div class="dailog_avatar_container">
                        <avatar
                            class="dailog_avatar"
                            :setBackgroundImageUrl="avatar.left"
                        ></avatar>
                    </div>
                    <dailogBox is_left="true"
                        >方便告诉我们你的性别吗？</dailogBox
                    >
                </div>
                <div></div>
            </div>
            <div class="setting_occu">
                <div class="dailog_box dailog_left">
                    <div class="dailog_avatar_container">
                        <avatar
                            class="dailog_avatar"
                            :setBackgroundImageUrl="avatar.right"
                        ></avatar>
                    </div>
                    <dailogBox is_left="true"
                        >方便告诉我们你的职业吗？</dailogBox
                    >
                </div>
                <div>方便告诉我们你的职业吗？</div>
            </div>
            <div class="setting_confirm">
                <div class="dailog_box dailog_left">
                    <div class="dailog_avatar_container">
                        <avatar
                            class="dailog_avatar"
                            :setBackgroundImageUrl="avatar.left"
                        ></avatar>
                    </div>
                    <dailogBox is_left="true"
                        >以上做为你的个人信息保存吗？</dailogBox
                    >
                </div>
                <div>方便告诉我们你的职业吗？</div>
            </div>
        </div>
        <div
            onselectstart="return false"
            class="personal_msg_setting jump"
            data-text="跳过"
        >
            跳过
        </div>
    </div> -->
</template>
<script>
import Checker from "@/assets/js/checker/checker.js";
import { ref } from "vue";
import dialogAvatarBox from "@/components/dialogBoxes/dialogAvatarBox/dialogAvatarBox.vue";
import borderInput from "@/components/inputs/borderInput/borderInput.vue";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import store from "@/store/index.js";
export default {
    data() {
        return {
            radio1:"",
            battery: {
                level: "",
                charging: "",
            },
            dailog:{
                name:{
                    name:"",
                    name_show:"",
                    default:"希望我们怎么称呼你呢？"
                },
                avatar:{
                    default:"设置一个头像叭？"
                },
                born:{
                    default:"希望在什么时候为你送上生日祝福？"
                },
                sex:{
                    default:"方便告诉我们你的性别吗？"
                },
                occu:{
                    default:"方便告诉我们你的职业吗？"
                }
            },
            line_prompt:{
                msg:""
            }
        };
    },
    mounted() {
        let ele = this;
        navigator.getBattery().then(function (battery) {
            ele.updateBatteryStatus(battery);
            battery.addEventListener("chargingchange", function () {
                ele.updateBatteryStatus(battery);
            });
            battery.addEventListener("levelchange", function () {
                ele.updateBatteryStatus(battery);
            });
            battery.addEventListener("chargingtimechange", function () {
                ele.updateBatteryStatus(battery);
            });
            battery.addEventListener("dischargingtimechange", function () {
                ele.updateBatteryStatus(battery);
            });
        });
    },
    components: {
        // avatar,
        // dailogBox,
        // datePicker
        // calendar
        dialogAvatarBox,
        borderInput,
        linePrompt
    },
    methods: {
        updateBatteryStatus(battery) {
            let batteryLevel = battery.level * 100;
            let batteryCharging = battery.charging ? "Yes" : "No";
            let batteryTimeRemaining = battery.charging
                ? "Calculating…"
                : this.formatTime(battery.dischargingTime);
            this.battery.level = batteryLevel.toFixed(0);
            this.battery.charging = batteryCharging;
            // console.log(batteryTimeRemaining);
        },
        formatTime(seconds) {
            let hours = Math.floor(seconds / 3600);
            let minutes = Math.floor((seconds - hours * 3600) / 60);
            return hours + " hours, " + minutes + " minutes";
        },
        exit(){
            if (!store.state.can_click_button) return;
            this.$emit("leaveSetting");
        }
    },
    watch: {
        "battery.level"() {
            // 监控电池电量
        },
        "battery.charging"() {
            // 监控充电情况
        },
    },
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
.exit_text,.save_text{
    cursor: pointer;
    margin: 0px 10px 0px 10px;
    padding: 0px 5px 0px 5px;
}
.exit_text:hover,.save_text:hover{
    box-shadow: 0px 0px 5px rgba(230, 146, 255, 0.8), inset 0px 0px 5px rgba(230, 146, 255, 0.8);
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
.content_bottom{
    width: 100%;
    height: 5%;
    border: 1px solid red;
}
.content_bottom{
    display: flex;
    justify-content: center;
    align-items: center;
}
.content_body{
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
    background-color: rgba(255, 255, 255, 0.485);
}
/* 滚动槽 */
.content_body::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.485);
    border-radius: 10px;
}
/* 滚动条滑块 */
.content_body::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(165, 94, 177, 0.3);
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.5);
}
.content_body::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(255, 0, 0, 0.4);
}
.content_ele{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.line_prompt{
    position: relative;
    top: 5px;
    width: 300px;
}
</style>
