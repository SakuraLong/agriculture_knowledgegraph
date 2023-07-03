<template>
    <div class="personal_container">
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
    </div>
</template>
<script>
import Checker from "@/assets/js/checker/checker.js";
import avatar from "@/components/avatar/index.vue";
import dailogBox from "../dialogBox/index.vue";
import { ref } from "vue";
// import calendar from "@/components/calendar/index.vue";
export default {
    data() {
        return {
            value1: ref(""),
            size:"default",
            personal: {
                name: {
                    name: "",
                    has_error: false,
                    error_msg: "",
                },
                born: {
                    born: "",
                },
            },
            avatar: {
                right: "url('./theme/avatarFrame/de.png')",
                left: "url('./theme/avatarFrame/de.png')",
            },
        };
    },
    components: {
        avatar,
        dailogBox,
        // datePicker
        // calendar
    },
    watch: {
        "value1"(){
            console.log(this.value1);
        },
        "personal.name.name"() {
            if (
                !new Checker(this.personal.name.name, [
                    "sql-check",
                    "no-base-symbols",
                ]).check()
            ) {
                this.personal.name.has_error = true;
                this.personal.name.error_msg = "昵称不合法";
            } else {
                if (
                    !new Checker(this.personal.name.name, [
                        "@length-max=30",
                    ]).check()
                ) {
                    this.personal.name.has_error = true;
                    this.personal.name.error_msg = "昵称长度不能超过30";
                } else {
                    this.personal.name.has_error = false;
                }
            }
        },
    },
};
</script>
<style scoped>
.dailog_avatar_container {
    position: relative;
    width: auto;
}
.dailog_right > .dailog_avatar_container > .dailog_avatar {
    margin: 10px 20px 0px 5px;
}
.dailog_left > .dailog_avatar_container > .dailog_avatar {
    margin: 10px 5px 0px 20px;
}
.personal_container {
    position: absolute;
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 1;
}
.personal_msg_setting {
    position: absolute;
    height: 10%;
    width: 100%;
    padding-top: 10px;
    top: 0px;
    font-family: FZZJ-WHJZTJW;
    font-size: 30px;
    z-index: 1;
}
.jump {
    pointer-events: none;
    width: auto;
    height: auto;
    top: auto;
    padding-top: 0px;
    bottom: 0px;
    /* border: 1px solid red; */
    display: flex;
    align-items: flex-end;
}
.jump:hover::before {
    content: " ";
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    border: 1px solid rgb(230, 146, 255);
    transform: scale(0.1);

    transition: transform 1s;
}
.personal_msg_setting::after {
    padding-top: 10px;
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    -webkit-text-stroke: 3px rgba(230, 146, 255, 0.5);
}
.jump::after {
    display: flex;
    align-items: flex-end;
    padding-top: 0px;
    pointer-events: all;
    cursor: pointer;
}
.setting_container {
    width: 80%;
    height: 80%;
    overflow-y: scroll;
    overflow-x: hidden;
    /* border: 1px solid red; */
}
.setting_container::-webkit-scrollbar {
    width: 12px;
    background-color: rgba(255, 255, 255, 0.485);
}
/* 滚动槽 */
.setting_container::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.485);
    border-radius: 10px;
}
/* 滚动条滑块 */
.setting_container::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(165, 94, 177, 0.3);
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.5);
}
.setting_container::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(255, 0, 0, 0.4);
}
.dailog_box {
    position: relative;
    display: flex;
    /* border: 1px solid rgb(0, 255, 8); */
    width: 500px;
    height: auto;
}
.dailog_right {
    /* border: 1px solid red; */
    justify-content: end;
}
.dailog_left {
    justify-content: start;
}
.setting_dailog {
    margin: 10px 30px 10px 30px;
    padding: 10px 10px 10px 15px;
    font-size: 25px;
    font-family: ZKKLT;
    position: relative;
    border: 3px solid rgb(230, 146, 255);
    z-index: 1;
    max-width: 260px;
}
.setting_dailog::after {
    position: absolute;
    width: 40px;
    height: 40px;
    top: -2.5px;
    content: " ";
    background-color: rgb(230, 146, 255);
    mask-image: url("./img/arrow.png");
    -webkit-mask-image: url("./img/arrow.png");
    -webkit-mask-size: 40px;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: bottom;
    z-index: -1;
}
.dailog_name,
.dailog_setting_avatar,
.dailog_born,
.dailog_sex,
.dailog_occu {
    line-height: 33px;
    width: 200px;
    height: 33px;
    border-radius: 20px 0px 20px 20px;
}
.dailog_name::after,
.dailog_born::after,
.dailog_occu::after {
    left: 101%;
    rotate: 90deg;
}
.dailog_setting_avatar,
.dailog_sex {
    border-radius: 0px 20px 20px 20px;
}
.dailog_setting_avatar::after,
.dailog_sex::after {
    right: 101%;
    rotate: -90deg;
}
.dailog_born,
.dailog_sex,
.dailog_occu {
    border-radius: 20px 20px 20px 20px;
    width: 260px;
    height: 66px;
}
.dailog_born::after,
.dailog_occu::after {
    left: 100.5;
    top: 20px;
}
.dailog_sex::after {
    right: 100.5%;
    top: 20px;
}
.setting_name,
.setting_avatar,
.setting_born,
.setting_sex,
.setting_occu,
.setting_confirm {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.personal_line {
    pointer-events: all;
    position: relative;
    color: rgb(255, 65, 65);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Heiti;
    width: 260px;
    height: 0px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid rgb(255, 65, 65);
    background-color: white;
    font-size: 17px;
    z-index: 10;
}
.personal_line::after {
    font-weight: 600;
    position: absolute;
    left: 5%;
    top: -15px;
    content: attr(data-text);
    color: rgb(255, 65, 65);
    background-color: white;
    width: auto;
    height: 20px;
    padding-left: 5px;
    padding-right: 5px;
}
</style>
