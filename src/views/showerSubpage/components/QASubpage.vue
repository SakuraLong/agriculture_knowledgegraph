<!-- 农业知识问答子页面 -->
<template>
    <div class="qa_subpage_container" ref="container">
        <div class="sessions_selecter">
            <div class="sessions_top_container">
                <modelSelect
                    class="model_selecter"
                    :items="model_list"
                    title="模式"
                    placeholder="选择你想要的回答模式"
                    ref="modelRef"
                    select_type="model"
                    :value="model"
                ></modelSelect>
                <button class="add_session_button" @click="add_session">
                    新会话
                </button>
            </div>
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
                        :class="
                            item.is_selected
                                ? 'dialog_title_selected'
                                : 'dialog_title_unselected'
                        "
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
                        @dblclick.stop="qaq"
                    />
                    <Check
                        v-if="!getCanchange(index)"
                        class="session_rename"
                        @click.stop="sessionRename(index)"
                        @dblclick.stop="qaq"
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
                <linePrompt
                    :opacity="error"
                    :data_left="error"
                    :type="prompt_type"
                    class="line_reminder"
                ></linePrompt>
            </div>
            <div
                v-for="(item, ind) in qa_dialog_menus"
                class="qa_show_container"
                :ref="'qa_show_container_ref' + ind"
                :key="item.time"
                :class="{
                    test1: !item.is_selected,
                }"
            >
                <dialogAvatarBox
                    :is_ai="true"
                    v-for="i in item.sessions"
                    :key="i.time"
                    :content="i.content"
                    :is_left="i.is_left"
                    :is_right="i.is_right"
                    :class="{
                        dialog_left: i.is_left,
                        dialog_right: i.is_right,
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
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import connector from "@/assets/js/connector/connector";
import Checker from "@/assets/js/checker/checker.js";
import modelSelect from "@/components/selects/borderSelect/modelSelect.vue";
import store from "@/store/index.js";
// import { Select } from "@element-plus/icons-vue/dist/types";
export default {
    data() {
        return {
            model: "对话模式:默认",
            model_list: [
                "对话模式:默认",
                "对话模式:猫娘",
                "对话模式:傲娇",
            ],
            prompt_type: "",
            error: "",
            isRunning: false,
            input_type_arr: ["button"],
            re: true,
            msg: "",
            input_font_size: "20px",
            input_place_holder: "请在这里输入你的问题",
            session_can_change: 0,
            qa_dialog_menus: [
                {
                    time: new Date(new Date().getTime()).toLocaleString(),
                    is_selected: true,
                    lable: "对话0",
                    sessions: [
                        {
                            content: "你好，欢迎来到问答界面！请输入你的问题。",
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
            // counter: 0,
        };
    },
    methods: {
        getModel(){
            // console.log(this.$refs.modelRef.input_value);
            switch(this.$refs.modelRef.input_value){
                case "对话模式:默认":return 0;
                case "对话模式:猫娘":return 1;
                case "对话模式:傲娇":return 2;
            }
        },
        selectJudge(text) {
            if (text === "true") return true;
            else return false;
        },
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
        qaq() {
            console.log("qaq");
        },
        sessionRename(index) {
            // console.log("sessionRename", index);
            // console.log(this.$refs.dialog_name_input_ref[index].value);
            // console.log("长度是:", this.$refs.dialog_name_input_ref);
            this.input_type_arr[index] = "button";
            if (this.$refs["dialog_name_input_ref" + index][0].value === "") {
                this.qa_dialog_menus[index].lable = "默认对话";
                this.re = !this.re;
            }
            console.log(this.$refs["dialog_name_input_ref" + index][0].value);
            Storage.set(0, "DIALOG_MENUS", this.qa_dialog_menus, "JSON"); // 保存
        },
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        question_submit() {
            if (!store.state.can_click_button) return;
            // this.re = !this.re;
            if (this.$refs.question_input_ref.input_msg === "") {
                this.error = "不能为空";
                return;
            }
            this.error = "";
            let time = new Date(new Date().getTime()).toLocaleString();
            let text = this.$refs.question_input_ref.input_msg;
            let item = {
                time: time,
                content: text,
                is_left: false,
                is_right: true,
            };
            this.qa_dialog_menus[this.dialog_selected].sessions.push(item);
            // this.re = !this.re;
            this.$nextTick(() => {
                this.$refs[
                    "qa_show_container_ref" + this.dialog_selected
                ][0].scrollTop =
                    this.$refs[
                        "qa_show_container_ref" + this.dialog_selected
                    ][0].scrollHeight;
                // console.log(this.$refs.qa_show_container_ref.scrollTop);
                // console.log(this.$refs.qa_show_container_ref.scrollHeight);
            });
            // console.log(this.qa_dialog_menus);
            this.$refs.question_input_ref.input_msg = "";
            Storage.set(0, "DIALOG_MENUS", this.qa_dialog_menus, "JSON"); // 保存
            let history = [];
            let i = 1;
            for (
                i;
                i < this.qa_dialog_menus[this.dialog_selected].sessions.length;
                i++
            ) {
                let content =
                    this.qa_dialog_menus[this.dialog_selected].sessions[i]
                        .content;
                let role =
                    this.qa_dialog_menus[this.dialog_selected].sessions[i]
                        .is_left === true
                        ? "assistant"
                        : "user";
                history.push({
                    content: content,
                    role: role,
                });
            }
            // let history =  JSON.stringify([{"role":"user","content":"告诉我深圳市雄韬电源科技股份有限公司的上市时间"},{"role":"user","content":"这家公司的高管有哪些"}]);
            // console.log(history);
            if(history.length===1&&this.qa_dialog_menus[this.dialog_selected].lable==="默认对话"){
                let title = history[0].content.substring(0,6);
                if(title.length>=6) title = title + "...";
                this.qa_dialog_menus[this.dialog_selected].lable = title;
            }
            history = JSON.stringify(history);
            let model =this.getModel();
            // console.log(model);
            // console.log(history);
            connector.send(
                [history,model],
                "getGptAnswer",
                this.saveInfoCallback,
                this.saveInfoWaiting,
                this.saveInfoTimeout,
                60000
            );
        },
        saveInfoCallback(msg) {
            if (msg.success) {
                this.prompt_type = "success";
                this.error = "上传成功";
                let content = msg.content;
                let new_ele = {
                    content: content,
                    is_left: true,
                    is_right: false,
                    time: new Date(new Date().getTime()).toLocaleString(),
                };
                this.qa_dialog_menus[this.dialog_selected].sessions.push(
                    new_ele
                );
                this.$nextTick(() => {
                    this.$refs[
                        "qa_show_container_ref" + this.dialog_selected
                    ][0].scrollTop =
                        this.$refs[
                            "qa_show_container_ref" + this.dialog_selected
                        ][0].scrollHeight;
                });
                Storage.set(0, "DIALOG_MENUS", this.qa_dialog_menus, "JSON"); // 保存
            } else {
                this.prompt_type = "error";
                this.error = "上传失败";
            }
        },
        saveInfoWaiting(is_waiting) {
            if (is_waiting) {
                store.state.can_click_button = false;
                this.prompt_type = "waiting";
                this.error = "等待中";
            } else {
                store.state.can_click_button = true;
                this.prompt_type = "default";
                this.error = "";
            }
        },
        saveInfoTimeout() {
            this.prompt_type = "error";
            this.error = "发送失败";
        },
        add_session() {
            let i = 0;
            for (i; i < this.qa_dialog_menus.length; i++) {
                this.qa_dialog_menus[i].is_selected = false;
            }
            let time = new Date(new Date().getTime()).toLocaleString();
            let text = "你好，欢迎来到问答界面！请输入你的问题。";
            let item = {
                time: time,
                content: text,
                is_left: true,
                is_right: false,
            };
            let title = "默认对话";
            let dia = {
                time: new Date(new Date().getTime()).toLocaleString(),
                is_selected: true,
                num: this.qa_dialog_menus.length,
                lable: title,
                sessions: [item],
            };
            this.qa_dialog_menus.push(dia);
            this.dialog_selected = this.qa_dialog_menus.length - 1;
            this.input_type_arr.push("button");
            this.re = !this.re;
            this.$nextTick(() => {
                this.$refs.session_containers_ref.scrollTop =
                    this.$refs.session_containers_ref.scrollHeight;
            });
            // console.log(this.input_type_arr);
            // this.counter++;
            Storage.set(0, "DIALOG_MENUS", this.qa_dialog_menus, "JSON"); // 保存
        },
        sessionChange(num) {
            if (this.session_can_change === 0) {
                console.log("点击");
                this.session_can_change++;
                // console.log(num);
                let i = 0;
                for (i; i < this.qa_dialog_menus.length; i++) {
                    this.qa_dialog_menus[i].is_selected = false;
                }
                this.qa_dialog_menus[num].is_selected = true;
                this.dialog_selected = num;
                // this.re = !this.re;
                this.$nextTick(() => {
                    console.log("更新完成");
                    this.session_can_change = 0;
                });
                setTimeout(() => {
                    this.session_can_change = 0;
                }, 2000);
                // console.log("现在共有",this.counter,"个对话");
                // console.log("现在被选中的对话序号是：", num);
                Storage.set(0, "DIALOG_MENUS", this.qa_dialog_menus, "JSON"); // 保存
            } else {
                console.log("不可点击");
            }
        },
        sessionDelete(num) {
            // console.log("要被删除的对话序号是", num);
            // if (this.dialog_selected === num) {
            //     this.dialog_selected = 0;
            //     this.dialog_arr[0] = true;
            // }
            let i = 0;
            for (i; i < this.qa_dialog_menus.length; i++) {
                this.qa_dialog_menus[i].is_selected = false;
            }
            if (this.qa_dialog_menus.length === 1) {
                // this.counter--;
                this.qa_dialog_menus.splice(num, 1);
                this.input_type_arr.splice(num, 1);
                this.add_session();
            } else {
                this.qa_dialog_menus[num].is_selected = false;
                this.qa_dialog_menus.splice(num, 1);
                this.input_type_arr.splice(num, 1);
                this.qa_dialog_menus[0].is_selected = true;
                this.dialog_selected = 0;
                // this.counter;
            }
            Storage.set(0, "DIALOG_MENUS", this.qa_dialog_menus, "JSON"); // 保存
            // console.log("现在被选择的是", this.dialog_selected);
        },
    },
    components: {
        textInput,
        dialogAvatarBox,
        linePrompt,
        modelSelect,
        // Select
    },
    created() {
        let qa_dialog_menus = Storage.get(
            0,
            "DIALOG_MENUS",
            [
                {
                    time: new Date(new Date().getTime()).toLocaleString(),
                    is_selected: true,
                    num: 0,
                    lable: "对话0",
                    sessions: [
                        {
                            content: "你好，欢迎来到问答界面！请输入你的问题。",
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
            this.$refs[
                "qa_show_container_ref" + this.dialog_selected
            ][0].scrollTop =
                this.$refs[
                    "qa_show_container_ref" + this.dialog_selected
                ][0].scrollHeight;
        });
        let i = 0;
        for (i = 0; i < this.qa_dialog_menus.length; i++) {
            if (this.qa_dialog_menus[i].is_selected === true) {
                this.dialog_selected = i;
                break;
            }
        }
        // this.counter = this.qa_dialog_menus.length - 1;
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
    height: 17%;
    background-color: white;
    display: flex;
    /* justify-content: center; */
    /* align-items: center; */
    flex-direction: row;
    /* border: solid 1px red; */
    /* border: solid 1px rgb(154, 154, 154); */
    top: 82%;
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
    height: 75%;
    position: absolute;
    top: 2%;
    /* top:18%; */
    left: 0%;
}
.qa_input_button {
    position: absolute;
    top: 20%;
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
    height: 82%;
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
    /* min-width: 100px; */
    left: 0;
    top: 0;
    width: 20%;
    height: 100%;
    /* border: solid 1px red; */
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
    height: 40px;
    width: 60%;
    top: 8%;
    right: 1px;
    cursor: pointer;
    color: rgb(230, 146, 255);
    border-radius: 6px;
    border: none;
    background-color: white;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(0, 0, 0, 0.3);
    font-size: 18px;
    user-select: none;
}
.add_session_button:hover {
    color: white;
    background-color: rgba(220, 179, 233, 0.8);
}
.session_containers {
    position: absolute;
    /* background-color: red; */
    bottom: 0%;
    height: 84%;
    width: 100%;
    /* background-color: aqua; */
    border: solid 1px black;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
}
.session_buttons {
    position: relative;
    /* min-width: 80px; */
    width: 80%;
    height: 40px !important;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: white;
    border-radius: 6px;
    border: 2px solid rgb(198, 170, 207);
    color: rgb(230, 146, 255);
    line-height: 40px;
    text-align: center;
    /* padding: 0; */
    /* cursor: pointer; */
    /* display: flex; */
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 2;
}
.session_buttons:hover {
    box-shadow: 2px 2px 4px rgb(230, 146, 255,0.5),
        -2px -2px 4px rgb(230, 146, 255,0.5);
    color: rgb(254, 196, 255);
}
.session_buttons_selected {
    position: relative;
    /* min-width: 80px; */
    width: 80%;
    height: 40px !important;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 2px 2px 2px rgba(205, 118, 220, 0.3),
        -2px -2px 2px rgba(205, 118, 220, 0.3);
    border: 2px solid rgb(230, 146, 255);
    color: rgb(230, 146, 255);
    line-height: 40px;
    text-align: center;
    /* padding: 0; */
    /* cursor: pointer; */
    /* display: flex; */
    flex-direction: row;
    justify-content: center;
    z-index: 2;
}
.dialog_title {
    position: relative;
    width: calc(75% - 10px) !important;
    right: 10px;
    height: auto;
    /* bottom: 2px; */
    padding: 0; /*清除自带的padding间距*/
    outline: none; /*清除input点击之后的黑色边框*/
    /* background-color: red; */
    font-family: Heiti;
    font-size: 20px;
    font-weight: 500;
    text-align: left;
    user-select: none;
    color: black;
    /* top: 2px; */
    background-color: white;
    /* padding-left: 20px; */
    /* background-color: red; */
    /* border: 1px solid red; */
}
.dialog_title_unselected:hover {
    color: rgb(230, 146, 255);
}
.dialog_title_unselected {
    /* border-bottom: 1px solid rgba(165, 165, 165, 0); */
    /* border-top: 1px solid rgba(165, 165, 165, 0); */
}
.dialog_title_selected {
    /* border-bottom: 1px solid rgb(230, 146, 255); */
    /* border-top: 1px solid rgb(230, 146, 255); */
}
.session_delete {
    position: absolute;
    /* min-width: 4px; */
    top: 25%;
    left: 85%;
    width: auto;
    height: 50%;
    cursor: pointer;
    /* border: solid 1px blue; */
}
.session_rename {
    /* border: solid 1px red; */
    position: absolute;
    /* min-width: 4px; */
    top: 25%;
    left: 70%;
    width: auto;
    height: 50%;
    cursor: pointer;
    /* border: solid 1px red; */
}
.test1 {
    /* display: none; */
    visibility: hidden;
}
.line_reminder {
    position: absolute;
    /* border: solid 2px red; */
    width: 200px;
    left: 40%;
    top: 73%;
}
.sessions_top_container {
    width: 100%;
    /* background-color: red; */
    position: relative;
    height: 16%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
}
.model_selecter {
    position: relative;
    top: -5%;
}
</style>
