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
                        @change="onNameSelected"
                    ></dialogAvatarBox>
                    <div class="content_ele">
                        <borderInput
                            ref="nameRef"
                            title="昵称"
                            :msg="dailog.name.name_show"
                        ></borderInput>
                    </div>
                    <dialogAvatarBox
                        is_left="true"
                        :content="dailog.avatar.default"
                    ></dialogAvatarBox>
                    <div class="content_ele">
                        <defaultAvatar
                            class="default_avatar"
                            edit="true"
                            :edit_func="editClick"
                        ></defaultAvatar>
                    </div>
                    <dialogAvatarBox
                        is_left="true"
                        :content="dailog.born.default"
                    >
                    </dialogAvatarBox>
                    <div class="content_ele">
                        <DatePicker
                            class="default_born"
                            ref="dateRef"
                        ></DatePicker>
                    </div>
                    <dialogAvatarBox
                        is_left="true"
                        :content="dailog.sex.default"
                    ></dialogAvatarBox>
                    <div class="content_ele">
                        <boderSelect
                            class="default_sex"
                            :items="sex_list"
                            title="性别"
                            placeholder="选择你的性别"
                            ref="sexRef"
                        ></boderSelect>
                    </div>
                    <dialogAvatarBox
                        is_left="true"
                        :content="dailog.occu.default"
                    ></dialogAvatarBox>
                    <div class="content_ele">
                        <boderSelect
                            class="default_occu"
                            :items="occu_list"
                            title="职业"
                            placeholder="选择你的职业"
                            ref="occuRef"
                        ></boderSelect>
                    </div>
                    <!-- </el-scrollbar> -->
                </div>
                <div class="content_bottom">
                    <linePrompt
                        class="line_prompt"
                        :data_left="line_prompt.msg"
                        :opacity="line_prompt.msg"
                    ></linePrompt>
                </div>
            </div>
            <div class="container_son bottom">
                <div class="exit_text" data-text="退出" @click="leaveSetting">
                    退出
                </div>
                <div class="save_text" data-text="保存" @click="saveSetting">
                    保存
                </div>
            </div>
        </div>
        <transition name="opacity400">
            <avatarUpload
                v-if="edit_avatar"
                class="avatar_upload"
                :exit="leaveEdit"
            ></avatarUpload>
        </transition>
    </div>
</template>
<script>
// import Checker from "@/assets/js/checker/checker.js";
// import { ref } from "vue";
import dialogAvatarBox from "@/components/dialogBoxes/dialogAvatarBox/dialogAvatarBox.vue";
import defaultAvatar from "@/components/avatar/defaultAvatar.vue";
import borderInput from "@/components/inputs/borderInput/borderInput.vue";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import store from "@/store/index.js";
import batteryElement from "./components/batteryElement.vue";
import Code from "@/assets/js/code/code.js";
import Storage from "@/assets/js/storage/storage.js";
import util from "@/assets/js/utils.js";
import utils from "@/assets/js/utils.js";
import avatarUpload from "./components/avatarUpload.vue";
import DatePicker from "@/components/datePicker/datePicker.vue";
import boderSelect from "@/components/selects/borderSelect/boderSelect.vue";
import connector from "@/assets/js/connector/connector";
import Checker from "@/assets/js/checker/checker.js";
export default {
    data() {
        return {
            sex_list: ["男", "女"],
            occu_list: ["ikun", "小黑子"],
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
                msg: "askask擦拭",
            },
            can_save: false,
            error: "",
            prompt_type: "default",
            edit_avatar: false,
            login_name: "",
            sex: "",
            born_time: "",
            occu: "",
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
        store.state.is_login = true;
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
        defaultAvatar,
        avatarUpload,
        DatePicker,
        boderSelect,
    },
    methods: {
        leaveSetting() {
            if (!store.state.can_click_button) return;
            this.$emit("leaveSetting");
        },
        saveSetting() {
            // if (!store.state.can_click_button) return;
            // if (!this.can_save) return;
            let user_msg = utils.getUserMsg();
            let id = user_msg.id;
            let token = utils.getToken();
            id = id.toString();
            if (token === undefined) token = "tokenIsNone";
            let login_name = this.$refs.nameRef.input_msg;
            // let sex = this.$refs.sexRef.input_value;
            let sex = 1;
            let occu = this.$refs.occuRef.input_value;
            let born_time = this.$refs.dateRef.date;
            this.login_name = login_name;
            this.sex = 1;
            this.occu = occu;
            this.born_time = born_time;
            console.log("现在的职业是：", this.$refs.occuRef.input_value);
            console.log("现在的名字是:", this.$refs.nameRef.input_msg);
            console.log("现在的性别是:", this.$refs.sexRef.input_value);
            console.log("日期是：", this.$refs.dateRef.date);
            let a= this.date_format(born_time);
            console.log(a);
            connector.send(
                [id,login_name,token,sex,occu,a],
                "updateUserMsg",
                this.saveInfoCallback,
                this.saveInfoWaiting,
                this.saveInfoTimeout
            );
            // connector.test(
            //     this.loginCallback,
            //     this.loginWaiting,
            //     this.loginTimeout,
            //     200,
            //     true,
            //     1000,
            //     {
            //         "success":true
            //     }
            // );
        },
        saveInfoCallback(msg) {
            if (msg.success) {
                this.prompt_type = "success";
                this.error = "上传成功";
                let user_msg = utils.getUserMsg();
                user_msg.login_name = this.login_name;
                user_msg.sex = this.sex;
                user_msg.occu = this.occu;
                user_msg.born_time = this.born_time;
                utils.saveUserMsg(user_msg);
            } else {
                this.prompt_type = "error";
                this.error = "上传失败";
            }
        },
        saveInfoWaiting(is_waiting) {
            if (is_waiting) {
                store.state.can_click_button = false;
                this.prompt_type = "waiting";
                this.error = "上传中";
            } else {
                store.state.can_click_button = true;
                this.prompt_type = "default";
                this.error = "";
            }
        },
        saveInfoTimeout() {
            this.prompt_type = "error";
            this.error = "上传失败";
        },
        editClick() {
            this.edit_avatar = true;
            console.log(this.edit_avatar);
        },
        leaveEdit() {
            this.edit_avatar = false;
        },
        onNameSelected(e){
            this.can_save = true;
            console.log("改变");
        },
        date_format(date) {
            let str = date.toString();
            let arr = str.split(" ");
            let month = arr[1];
            let day = arr[2];
            let year = arr[3];
            let real_month = "";
            // let real_year = year.parseInt();
            // let real_day = year.parseInt();
            switch (month) {
                case "Jan":
                    real_month = "01";
                    break;
                case "Feb":
                    real_month = "02";
                    break;
                case "Mar":
                    real_month = "03";
                    break;
                case "Apr":
                    real_month = "04";
                    break;
                case "May":
                    real_month = "05";
                    break;
                case "Jun":
                    real_month = "06";
                    break;
                case "Jul":
                    real_month = "07";
                    break;
                case "Aug":
                    real_month = "08";
                    break;
                case "Sep":
                    real_month = "09";
                    break;
                case "Oct":
                    real_month = "10";
                    break;
                case "Nov":
                    real_month = "11";
                    break;
                case "Dec":
                    real_month = "12";
                    break;
            }
            return year + "-" +real_month+"-" +day;
        },
    },
    watch: {},
};
</script>
<style scoped>
.avatar_upload {
    width: 100%;
    height: 100%;
    position: absolute !important;
    top: 0;
    left: 0;
    z-index: 10;
}
.personal_setting {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 50000;
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
    position: relative;
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
    background-color: var(--scrollbar-background-color);
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
    background: var(--scrollbar-thumb-background);
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
    position: absolute;
    top: -5px;
    width: 300px;
}
.battery_element {
    position: absolute;
    right: 3%;
}
.default_avatar {
    width: 150px !important;
    height: 150px !important;
    position: relative;
}
.default_born {
    position: relative;
}
.default_sex {
    position: relative;
}
.default_occu {
    position: relative;
}
.dialog_DatePicker {
    width: 100px;
    height: 200px;
    border: solid 1px red;
}
</style>
