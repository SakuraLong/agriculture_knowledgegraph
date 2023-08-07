<!-- 农业知识问答子页面 -->
<template>
    <div class="qa_subpage_container" ref="container">
        <div class="sessions_selecter">
            <button class="add_session_button" @click="add_session">
                新会话
            </button>
            <div
                class="session_containers"
                :key="re"
                ref="session_containers_ref"
            >
                <div
                    :class="
                        item.is_selected
                            ? 'session_buttons_selected'
                            : 'session_buttons'
                    "
                    v-for="(item, index) in qa_dialog_menus"
                    :key="item.num"
                    @click="sessionChange(index)"
                    @dblclick="testClick(index)"
                >
                    <input
                        :type="input_type_arr[index]"
                        v-model="item.lable"
                        :readonly="getCanchange(index)"
                        class="dialog_title"
                        style="-webkit-user-select: none"
                        :ref="'dialog_name_input_ref' + index"
                        :key="index"
                    />
                    <!-- <div
                        class="session_delete"
                        @click.stop="sessionDelete(index)"
                    >
                        ×
                    </div> -->
                    <Close
                        class="session_delete"
                        @click.stop="sessionDelete(index)"
                    />
                    <Check
                        v-if="!getCanchange(index)"
                        class="session_rename"
                        @click.stop="sessionRename(index)"
                    ></Check>
                </div>
            </div>
        </div>
        <div class="qa_main">
            <div class="qa_input_container">
                <!-- <div class="qa_input_reminder">&nbsp;&nbsp;&nbsp;输入问题:</div> -->
                <textInput
                    :msg="msg"
                    :input_font_size="input_font_size"
                    :placeholder="input_place_holder"
                    class="qa_input_mainer"
                    ref="question_input_ref"
                >
                </textInput>
                <button class="qa_input_button" @click="question_submit">
                    发送
                </button>
            </div>
            <div
                class="qa_show_container"
                ref="qa_show_container_ref"
                :key="re"
            >
                <dialogAvatarBox
                    v-for="item in qa_dialog_menus[dialog_selected].sessions"
                    :key="item.time"
                    :content="item.content"
                    :is_left="item.is_left"
                    :is_right="item.is_right"
                    :class="{
                        dialog_left: item.is_left,
                        dialog_right: item.is_right,
                    }"
                />
            </div>
        </div>
    </div>
</template>
<script>
import textInput from "@/components/inputs/textInput/textInput.vue";
import dialogAvatarBox from "@/components/dialogBoxes/dialogAvatarBox/dialogAvatarBox.vue";
import Storage from "@/assets/js/storage/storage.js";
import { timePanelSharedProps } from "element-plus/es/components/time-picker/src/props/shared";
// import { Select } from "@element-plus/icons-vue/dist/types";
export default {
    data() {
        return {
            input_type_arr: ["button"],
            re: true,
            msg: "",
            input_font_size: "20px",
            input_place_holder: "请在这里输入你的问题",
            qa_dialog_menus: [
                {
                    is_selected: true,
                    lable: "对话0",
                    sessions: [
                        {
                            content:
                                "你好，欢迎来到问答界面！\n 请输入你的问题",
                            is_left: true,
                            is_right: false,
                            time: new Date(
                                new Date().getTime()
                            ).toLocaleString(),
                        },
                    ],
                },
            ],
            dialog_selected: 0,
            counter: 0,
        };
    },
    methods: {
        testClick(index) {
            // this.test = !this.test;
            let i = 0;
            for (i; i < this.input_type_arr.length; i++) {
                this.input_type_arr[i] = "button";
                // return;
            }
            this.input_type_arr[index] = "text";
            this.$nextTick(() => {
                this.$refs["dialog_name_input_ref" + index][0].selectionStart =
                this.$refs["dialog_name_input_ref" + index][0].value.length;
                this.$refs["dialog_name_input_ref" + index][0].selectionEnd =
                this.$refs["dialog_name_input_ref" + index][0].value.length;
                this.$refs["dialog_name_input_ref" + index][0].focus();
                console.log(this.$refs["dialog_name_input_ref" + index]);
                console.log(this.$refs["dialog_name_input_ref" + index][0]);
            });
            // console.log(this.$refs["dialog_name_input_ref"+index]);
        },
        getCanchange(index) {
            if (this.input_type_arr[index] === "button") return true;
            else return false;
        },
        sessionRename(index) {
            // console.log("sessionRename", index);
            // console.log(this.$refs.dialog_name_input_ref[index].value);
            // console.log("长度是:", this.$refs.dialog_name_input_ref);
            this.input_type_arr[index] = "button";
            if(this.$refs["dialog_name_input_ref" + index][0].value===""){
                this.qa_dialog_menus[index].lable="默认对话";
                this.re=!this.re;
            }
            console.log(this.$refs["dialog_name_input_ref" + index][0].value);
            Storage.set(0, "DIALOG_MENUS", this.qa_dialog_menus, "JSON"); // 保存
        },
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        question_submit() {
            this.re = !this.re;
            let time = new Date(new Date().getTime()).toLocaleString();
            let text = this.$refs.question_input_ref.input_msg;
            let item = {
                time: time,
                content: text,
                is_left: this.re,
                is_right: !this.re,
            };
            this.qa_dialog_menus[this.dialog_selected].sessions.push(item);
            // this.re = !this.re;
            this.$nextTick(() => {
                this.$refs.qa_show_container_ref.scrollTop =
                    this.$refs.qa_show_container_ref.scrollHeight;
                // console.log(this.$refs.qa_show_container_ref.scrollTop);
                // console.log(this.$refs.qa_show_container_ref.scrollHeight);
            });
            // console.log(this.qa_dialog_menus);
            this.$refs.question_input_ref.input_msg = "";
            Storage.set(0, "DIALOG_MENUS", this.qa_dialog_menus, "JSON"); // 保存
        },
        add_session() {
            this.counter++;
            let i = 0;
            for (i; i < this.qa_dialog_menus.length; i++) {
                this.qa_dialog_menus[i].is_selected = false;
            }
            this.dialog_selected = this.qa_dialog_menus.length - 1;
            let time = new Date(new Date().getTime()).toLocaleString();
            let text = "你好，欢迎来到问答界面！\n 请输入你的问题";
            let item = {
                time: time,
                content: text,
                is_left: true,
                is_right: false,
            };
            let title = "默认对话" + this.counter;
            let dia = {
                is_selected: true,
                num: this.counter,
                lable: title,
                sessions: [item],
            };
            this.qa_dialog_menus.push(dia);
            this.input_type_arr.push("button");
            // this.re = !this.re;
            this.$nextTick(() => {
                this.$refs.session_containers_ref.scrollTop =
                    this.$refs.session_containers_ref.scrollHeight;
            });
            // console.log(this.input_type_arr);
            Storage.set(0, "DIALOG_MENUS", this.qa_dialog_menus, "JSON"); // 保存
        },
        increment() {
            return this.counter;
        },
        sessionChange(num) {
            console.log(num);
            let i = 0;
            for (i; i < this.qa_dialog_menus.length; i++) {
                this.qa_dialog_menus[i].is_selected = false;
            }
            this.qa_dialog_menus[num].is_selected = true;
            this.dialog_selected = num;
            // console.log("现在共有",this.counter,"个对话");
            // console.log("现在被选中的对话序号是：", num);
            Storage.set(0, "DIALOG_MENUS", this.qa_dialog_menus, "JSON"); // 保存
        },
        sessionDelete(num) {
            console.log("要被删除的对话序号是", num);
            // if (this.dialog_selected === num) {
            //     this.dialog_selected = 0;
            //     this.dialog_arr[0] = true;
            // }
            let i = 0;
            for (i; i < this.qa_dialog_menus.length; i++) {
                this.qa_dialog_menus[i].is_selected = false;
            }
            if (this.qa_dialog_menus.length === 1) {
                this.add_session();
                this.qa_dialog_menus.splice(num, 1);
                this.input_type_arr.splice(num, 1);
            } else {
                this.qa_dialog_menus[num].is_selected = false;
                this.qa_dialog_menus.splice(num, 1);
                this.input_type_arr.splice(num, 1);
                this.qa_dialog_menus[0].is_selected = true;
                this.dialog_selected = 0;
            }
            this.counter--;
            Storage.set(0, "DIALOG_MENUS", this.qa_dialog_menus, "JSON"); // 保存
            console.log("现在被选择的是", this.dialog_selected);
        },
    },
    components: {
        textInput,
        dialogAvatarBox,
        // Select
    },
    created() {
        let qa_dialog_menus = Storage.get(
            0,
            "DIALOG_MENUS",
            [
                {
                    is_selected: true,
                    num: 0,
                    lable: "对话0",
                    sessions: [
                        {
                            content:
                                "你好，欢迎来到问答界面！\n 请输入你的问题",
                            is_left: true,
                            is_right: false,
                            time: new Date(
                                new Date().getTime()
                            ).toLocaleString(),
                        },
                    ],
                },
            ],
            "JSON"
        );
        // if (qa_dialog_menus.length === 0) return;
        this.qa_dialog_menus = qa_dialog_menus;
        this.$nextTick(() => {
            this.$refs.qa_show_container_ref.scrollTop =
                this.$refs.qa_show_container_ref.scrollHeight;
        });
        let i = 0;
        for (i = 0; i < this.qa_dialog_menus.length; i++) {
            if (this.qa_dialog_menus[i].is_selected === true) {
                this.dialog_selected = i;
                break;
            }
        }
        this.counter = this.qa_dialog_menus.length - 1;
        let j = 0;
        for (j = 0; j < this.qa_dialog_menus.length; j++) {
            this.input_type_arr[j] = "button";
        }
    },
};
</script>

<style scoped>
.qa_subpage_container {
    position: relative;
    /* border: 1px solid red; */
    float: right;
    width: 98%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    box-sizing: content-box;
    display: block;
}
.qa_input_container {
    position: relative;
    width: 94%;
    height: 10%;
    background-color: white;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: row;
    /* border: solid 1px rgb(154, 154, 154); */
    top: 87%;
    left: 0;
    /* right: 10px; */
}
.qa_input_reminder {
    top: 0;
    position: absolute;
    width: 100%;
    height: 10%;
    background-color: rgb(245, 245, 245);
    text-align: left;
    color: rgb(206, 146, 218);
    cursor: default;
}
.qa_input_mainer {
    width: 87%;
    height: 100%;
    position: absolute;
    /* top:18%; */
    left: 0%;
}
.qa_input_button {
    position: relative;
    bottom: 2%;
    width: 100px;
    height: 40px;
    cursor: pointer;
    background-color: rgb(207, 159, 216);
    font-size: 18px;
    color: white;
    border-radius: 6px;
    border: none;
    left: 88%;
}
.qa_input_button:hover {
    background-color: rgb(204, 121, 221);
}
.qa_main {
    position: absolute;
    top: 0;
    left: 20%;
    width: 80%;
    height: 100%;
    /* border:solid 1px red; */
    /* background-color: aqua; */
    display: flex;
    justify-content: center;
}
.qa_show_container {
    position: absolute;
    width: calc(100% - 50px);
    height: 85%;
    top: 0;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: start;
    /* align-items: center; */
    overflow-y: scroll;
    overflow-x: hidden;
    padding-left: 50px;
    /* border: 1px solid red; */
}
.qa_show_container::-webkit-scrollbar {
    width: 12px;
    margin-right: 5px;
    background-color: var(--scrollbar-background-color);
    opacity: 0;
}
/* 滚动槽 */
.qa_show_container::-webkit-scrollbar-track {
    /* visibility: hidden; */
    margin-right: 5px;
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.485);
    /* background-color: aquamarine; */
    border-radius: 10px;
}
/* 滚动条滑块 */
.qa_show_container::-webkit-scrollbar-thumb {
    opacity: 0;
    margin-right: 5px;
    border-radius: 10px;
    background: var(--scrollbar-thumb-background);
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.5);
    /* transition: all 0.5 ease; */
}
.dialog_div_container {
    display: block;
    position: relative;
    width: 100%;
    height: 20%;
    /* border: 1px solid red; */
}
.dialog_left {
    position: relative;
    left: 0;
    float: left;
}
.dialog_right {
    position: relative;
    right: 0;
    float: right;
}
.sessions_selecter {
    position: absolute;
    left: 0;
    top: 0;
    width: 20%;
    height: 100%;
    /* border: solid 1px red; */
    background-color: palegreen;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid black;
    border-left: 1px solid black;
}
.session_containers::-webkit-scrollbar {
    width: 12px;
    margin-right: 5px;
    background-color: var(--scrollbar-background-color);
    opacity: 0;
}
/* 滚动槽 */
.session_containers::-webkit-scrollbar-track {
    /* visibility: hidden; */
    margin-right: 5px;
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.485);
    /* background-color: aquamarine; */
    border-radius: 10px;
}
/* 滚动条滑块 */
.session_containers::-webkit-scrollbar-thumb {
    opacity: 0;
    margin-right: 5px;
    border-radius: 10px;
    background: var(--scrollbar-thumb-background);
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.5);
    /* transition: all 0.5 ease; */
}
.add_session_button {
    position: relative;
    height: 6%;
    width: 60%;
    top: 3%;
    right: 1px;
    cursor: pointer;
    color: rgb(230, 146, 255);
    border-radius: 6px;
    border: none;
    background-color: white;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(0, 0, 0, 0.3);
    font-size: 18px;
}
.add_session_button:hover {
    color: white;
    background-color: rgba(220, 179, 233, 0.8);
}
.session_containers {
    position: relative;
    /* background-color: red; */
    top: 8%;
    height: 86%;
    width: 100%;
    /* background-color: aqua; */
    border: solid 1px black;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
}
.session_buttons {
    position: relative;
    width: 80%;
    height: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: transparent;
    border-radius: 6px;
    /* box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(0, 0, 0, 0.3); */
    border: 2px solid rgb(165, 165, 165);
    color: rgb(230, 146, 255);
    line-height: 40px;
    text-align: center;
    padding: 0;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* z-index: 2; */
}
.session_buttons:hover {
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3), -2px -2px 2px rgba(0, 0, 0, 0.3);
    color: rgb(254, 196, 255);
}
.session_buttons_selected {
    position: relative;
    width: 80%;
    height: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: transparent;
    border-radius: 6px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3), -2px -2px 2px rgba(0, 0, 0, 0.3);
    border: 2px solid rgb(230, 146, 255);
    color: rgb(230, 146, 255);
    line-height: 40px;
    text-align: center;
    padding: 0;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.dialog_title {
    position: absolute;
    width: calc(75% - 10px) !important;
    left: 10px;
    height: 100%;
    border: 0; /*清除自带的2px的边框*/
    padding: 0; /*清除自带的padding间距*/
    outline: none; /*清除input点击之后的黑色边框*/
    /* background-color: red; */
    font-family: Heiti;
    font-size: 15px;
    text-align: left;
    user-select: none;
    /* padding-left: 20px; */
    background-color: white;
    /* border: 1px solid red; */
}
.session_delete {
    position: absolute;
    top: 25%;
    left: 85%;
    width: auto;
    height: 50%;
}
.session_rename {
    /* border: solid 1px red; */
    position: absolute;
    top: 25%;
    left: 75%;
    width: auto;
    height: 50%;
}
</style>
