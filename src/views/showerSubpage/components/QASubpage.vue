<!-- 农业知识问答子页面 -->
<template>
    <div class="qa_subpage_container" ref="container">
        <div class="sessions_selecter"></div>
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
                <!-- <div v-for="item in qa_dialog_menus[dialog_selected].sessions"
                        :key="item.time"
                        class="dialog_div_container">
                    <dialogAvatarBox
                        :content="item.content"
                        :is_left="item.is_left"
                        :is_right="item.is_right"
                        :class="{
                            dialog_left: item.is_left,
                            dialog_right:item.is_right,
                        }"
                    />
                </div> -->
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
import Vue from "vue";
export default {
    data() {
        return {
            re: true,
            msg: "",
            input_font_size: "20px",
            input_place_holder: "请在这里输入你的问题",
            qa_dialog_menus: [
                {
                    lable: "Dialog_1",
                    sessions: [
                        {
                            content:
                                "你好，欢迎来到问答界面！\n 请输入你的问题",
                            is_left: true,
                            is_right: false,
                            time: 0,
                        },
                    ],
                },
            ],
            dialog_selected: 0,
        };
    },
    methods: {
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        question_submit() {
            let time = new Date().getTime();
            let text = this.$refs.question_input_ref.input_msg;
            let item = {
                time: time,
                content: text,
                is_left: this.re,
                is_right: !this.re,
            };
            this.qa_dialog_menus[this.dialog_selected].sessions.push(item);
            this.re = !this.re;
            this.$nextTick(() => {
                this.$refs.qa_show_container_ref.scrollTop =
                    this.$refs.qa_show_container_ref.scrollHeight;
                // console.log(this.$refs.qa_show_container_ref.scrollTop);
                // console.log(this.$refs.qa_show_container_ref.scrollHeight);
            });
        },
    },
    components: {
        textInput,
        dialogAvatarBox,
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
.sessions_selecter {
    position: absolute;
    left: 0;
    top: 0;
    width: 20%;
    height: 100%;
    /* border: solid 1px red; */
    background-color: palegreen;
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
</style>
