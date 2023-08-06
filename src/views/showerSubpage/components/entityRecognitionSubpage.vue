<!-- 实体识别子页面 -->
<template>
    <div class="er_subpage_container" ref="container">
        <div class="anime_input_container">
            <div class="anime_input_reminder">
                &nbsp;&nbsp;&nbsp;输入查询文本:
            </div>
            <textInput
                :msg="msg"
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
            <button class="anime_input_button" @click="anime_text_submit">点击提交</button>
        </div>
        <div class="anime_result_container">
            <div class="anime_result_reminder_1">&nbsp;「查看识别结果」</div>
            <div class="anime_result_show_1">
                你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。
                你说的对，但是《原神》是由说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。
            </div>
        </div>
    </div>
</template>
<script>
import textInput from "@/components/inputs/textInput/textInput.vue";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
export default {
    data() {
        return {
            msg: "",
            input_font_size: "20px",
            input_place_holder: "请在这里输入你想要查询的文本",
            line_prompt: {
                msg: "",
                type:"error"
            },
        };
    },
    methods: {
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        anime_text_submit(){
            console.log(this.$refs.anime_text_ref.input_msg);
            if(this.$refs.anime_text_ref.input_msg===""){
                this.line_prompt.msg="输入文本不能为空";
                console.log("不彳亍");
                return;
            }
            else{
                this.line_prompt.msg="";
                console.log("彳亍");
            }
        }
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
    border: 1px solid red;
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
    /* background-color: red; */
    /* border: solid 1px red; */
    border: solid 2px rgb(199, 187, 202);
}
.anime_result_show_1:hover {
    border: solid 2px rgb(192, 155, 201);
}
.line_prompt{
    position: relative;
    width: 300px;
    top:73%;
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
