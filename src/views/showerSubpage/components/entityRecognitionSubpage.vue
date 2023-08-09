<!-- 实体识别子页面 -->
<template>
    <div class="er_subpage_container" ref="container">
        <div class="anime_input_container">
            <div class="anime_input_reminder">
                &nbsp;&nbsp;&nbsp;输入查询文本:
            </div>
            <textInput
                :input_font_size="input_font_size"
                :placeholder="input_place_holder"
                class="anime_input_mainer"
                ref="anime_text_ref"
            >
            </textInput>
            <linePrompt
                class="line_prompt"
                :data_left="line_prompt.msg"
                :opacity="line_prompt.msg"
                :type="line_prompt.type"
            ></linePrompt>
            <button class="anime_input_button" @click="anime_text_submit">
                点击提交
            </button>
        </div>
        <div class="anime_result_container">
            <div class="anime_result_reminder_1">&nbsp;「查看识别结果」</div>
            <div class="anime_result_show_1" v-html="entity_text"></div>
        </div>
    </div>
</template>
<script>
import textInput from "@/components/inputs/textInput/textInput.vue";
import linePrompt from "@/components/prompts/line/linePrompt.vue";

import Checker from "@/assets/js/checker/checker";
import Connector from "@/assets/js/connector/connector";
import store from "@/store/index";
import Code from "@/assets/js/code/code";
import Entity from "@/renderer/entity/entity";
export default {
    data() {
        return {
            input_font_size: "20px",
            input_place_holder: "请在这里输入你想要查询的文本",
            line_prompt: {
                msg: "",
                type: "error",
            },
            entity_text: "",
        };
    },
    methods: {
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        anime_text_submit() {
            if (!store.state.can_click_button) return;
            let text = this.$refs.anime_text_ref.get();
            console.log(text);
            if (
                !new Checker(text, [
                    "no-null",
                    "@length-max=200",
                    "no-base-symbols",
                    "sql-check",
                    "no-only-spacing",
                ]).check()
            ) {
                this.line_prompt.type = "error";
                this.line_prompt.msg = "输入内容误或者过长或者为空";
                return;
            } else {
                this.line_prompt.msg = "";
                // 进入接口发送
                Connector.send(
                    [text],
                    "recognizeNode",
                    this.recognizeCallback,
                    this.recognizeWaiting,
                    this.recognizeTimeout,
                    6000
                );
            }
        },
        recognizeCallback(msg) {
            if (msg.success) {
                let text = Code.Base64.decode(msg.content.result);
                this.entity_text = new Entity("as").decodeText(text);
            }
        },
        recognizeWaiting(is_waiting) {
            store.state.can_click_button = !is_waiting;
            if (is_waiting) {
                this.line_prompt.msg = "识别中";
                this.line_prompt.type = "waiting";
            } else {
                this.line_prompt.msg = "";
                this.line_prompt.type = "default";
            }
        },
        recognizeTimeout() {
            this.line_prompt.msg = "查询超时";
            this.line_prompt.type = "error";
        },
    },
    components: {
        textInput,
        linePrompt,
    },
};
</script>

<style scoped>
.er_subpage_container {
    position: relative;
    /* border: 1px solid red; */
    float: right;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    box-sizing: content-box;
    display: flex;
    /* justify-content: center; */
    flex-direction: column;
    align-items: center;
}
.anime_input_container {
    position: relative;
    width: 92%;
    height: 55%;
    background-color: white;
    display: flex;
    justify-content: center;
    border: solid 1px rgb(154, 154, 154);
    top: 0;
    left: 0;
    /* right: 10px; */
}
.anime_input_mainer {
    width: 92%;
    height: 70%;
    position: absolute;
    top: 12%;
}
.anime_input_reminder {
    top: 0;
    position: absolute;
    width: 100%;
    height: 40px;
    background-color: rgb(245, 245, 245);
    text-align: left;
    color: rgb(206, 146, 218);
    cursor: default;
    line-height: 40px;
}
.anime_input_button {
    position: absolute;
    bottom: 2%;
    width: 400px;
    height: 50px;
    cursor: pointer;
    background-color: rgb(207, 159, 216);
    font-size: 22px;
    color: white;
    border-radius: 10px;
    border: none;
    user-select: none;
}
.anime_input_button:hover {
    background-color: rgb(204, 121, 221);
}
.anime_result_container {
    position: relative;
    width: 92%;
    height: 42%;
    /* background-color: red; */
    display: flex;
    /* justify-content: center; */
    flex-direction: column;
    align-items: center;
    border: solid 1px rgb(154, 154, 154);
    top: 2%;
    overflow: hidden;
}
.anime_result_reminder_1 {
    position: relative;
    width: 100%;
    height: 40px;
    background-color: rgb(245, 245, 245);
    text-align: left;
    color: rgb(206, 146, 218);
    cursor: default;
    line-height: 40px;
}
.anime_result_show_1 {
    position: relative;
    width: 92%;
    height: 90%;
    overflow: auto;
    text-align: left;
    /* background-color: red; */
    /* border: solid 1px red; */
    border: solid 2px rgb(199, 187, 202);
    padding-left: 5px;
    padding-right: 5px;
}
.anime_result_show_1:hover {
    border: solid 2px rgb(192, 155, 201);
}
.line_prompt {
    position: relative;
    width: 300px;
    top: 73%;
}
.anime_result_show_1::-webkit-scrollbar {
    width: 12px;
    margin-right: 5px;
    background-color: var(--scrollbar-background-color);
    opacity: 0;
}
/* 滚动槽 */
.anime_result_show_1::-webkit-scrollbar-track {
    /* visibility: hidden; */
    margin-right: 5px;
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.485);
    /* background-color: aquamarine; */
    border-radius: 10px;
}
/* 滚动条滑块 */
.anime_result_show_1::-webkit-scrollbar-thumb {
    opacity: 0;
    margin-right: 5px;
    border-radius: 10px;
    background: var(--scrollbar-thumb-background);
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.5);
    /* transition: all 0.5 ease; */
}
</style>
