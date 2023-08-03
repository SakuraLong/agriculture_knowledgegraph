<!-- 关系查询子页面 -->
<template>
    <div class="rq_subpage_container" ref="container">
        <div class="relationship_input_container">
            <div class="relationship_input_reminder">
                &nbsp;&nbsp;&nbsp;查询条件:
            </div>
            <borderInput_noafter
                :msg="msg"
                :placeholder="input_place_holder1"
                class="relationship_input_mainer1"
                ref="relationship_input_ref1"
            >
            </borderInput_noafter>
            <boderSelect
                :items="select_items"
                :title="title"
                :placeholder="select_placeholder"
                class="relationship_selecter"
                ref="relationship_select_ref"
                :value="select_value"
            >
            </boderSelect>
            <borderInput_noafter
                :msg="msg"
                :placeholder="input_place_holder2"
                class="relationship_input_mainer2"
                ref="relationship_input_ref2"
            >
            </borderInput_noafter>
            <linePrompt
                class="line_prompt"
                :data_left="line_prompt.msg"
                :opacity="line_prompt.msg"
                :type="line_prompt.type"
            ></linePrompt>
            <button
                class="relationship_input_button"
                @click="relation_search_submit"
            >
                搜索
            </button>
        </div>
        <div class="relationship_result_container">
            <div class="relationship_result_reminder_1">&nbsp;「关系图」</div>
            <div class="relationship_result_show_1">
                你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。
                你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。
            </div>
        </div>
    </div>
</template>
<script>
import borderInput_noafter from "@/components/inputs/borderInput_noafter/borderInput_noafter.vue";
import boderSelect from "@/components/selects/borderSelect/boderSelect.vue";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
export default {
    data() {
        return {
            msg: "",
            input_font_size: "20px",
            input_place_holder1: "实体1",
            input_place_holder2: "实体2",
            select_items: ["关系1", "关系2", "关系3"],
            title: "关系选择",
            select_value : "",
            select_placeholder: "选择一个关系",
            line_prompt: {
                msg: "",
                type: "error",
            },
        };
    },
    methods: {
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        relation_search_submit() {
            let obj1 = this.$refs.relationship_input_ref1.input_msg;
            let obj2 = this.$refs.relationship_input_ref2.input_msg;
            let relation = this.$refs.relationship_select_ref.input_value;
            console.log(obj1);
            if(obj1===""||obj2===""){
                this.line_prompt.msg="输入的实体不能为空";
                return;
            }
            else if(relation===""){
                this.line_prompt.msg="所选择的关系不能为空";
                return;
            }
            else{
                this.line_prompt.msg="";
            }
        },
    },
    components: {
        borderInput_noafter,
        boderSelect,
        linePrompt,
    },
};
</script>

<style scoped>
.rq_subpage_container {
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
.relationship_input_mainer1 {
    position: relative;
    left: 10%;
}
.relationship_input_mainer2 {
    position: relative;
    left: 14%;
}
.relationship_input_container {
    position: relative;
    width: 92%;
    height: 30%;
    background-color: white;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: row;
    border: solid 1px rgb(154, 154, 154);
    top: 0;
    left: 0;
}
.relationship_input_reminder {
    top: 2%;
    position: absolute;
    width: 100%;
    height: 40px;
    background-color: rgb(245, 245, 245);
    text-align: left;
    color: rgb(206, 146, 218);
    cursor: default;
    line-height: 40px;
}
.relationship_input_button {
    position: relative;
    /* bottom: 2%; */
    width: 120px;
    height: 40px;
    cursor: pointer;
    background-color: rgb(207, 159, 216);
    font-size: 20px;
    color: white;
    border-radius: 8px;
    border: none;
    left: 16%;
}
.relationship_input_button:hover {
    background-color: rgb(204, 121, 221);
}
.relationship_selecter {
    /* width: 100%; */
    position: relative;
    left: 12%;
    bottom: 5px;
}
.relationship_result_container {
    position: relative;
    width: 92%;
    height: 65%;
    /* background-color: red; */
    display: flex;
    /* justify-content: center; */
    flex-direction: column;
    align-items: center;
    border: solid 1px rgb(154, 154, 154);
    top: 2%;
    overflow: hidden;
}
.relationship_result_reminder_1 {
    position: relative;
    width: 100%;
    height: 40px;
    background-color: rgb(245, 245, 245);
    text-align: left;
    color: rgb(206, 146, 218);
    cursor: default;
    line-height: 40px;
}
.relationship_result_show_1 {
    position: relative;
    width: 100%;
    height: 92%;
    overflow: auto;
    /* background-color: red; */
}
.line_prompt {
    position: absolute;
    width: 200px;
    left: 35%;
    top: 70%;
}
.relationship_result_show_1::-webkit-scrollbar {
    width: 12px;
    margin-right: 5px;
    background-color: var(--scrollbar-background-color);
    opacity: 0;
}
/* 滚动槽 */
.relationship_result_show_1::-webkit-scrollbar-track {
    /* visibility: hidden; */
    margin-right: 5px;
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.485);
    /* background-color: aquamarine; */
    border-radius: 10px;
}
/* 滚动条滑块 */
.relationship_result_show_1::-webkit-scrollbar-thumb {
    opacity: 0;
    margin-right: 5px;
    border-radius: 10px;
    background: var(--scrollbar-thumb-background);
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.5);
    /* transition: all 0.5 ease; */
}
</style>
