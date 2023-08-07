<!-- 关系查询子页面 -->
<template>
    <div class="rq_subpage_container" ref="container">
        <div class="cna_scroll">
            <div class="relationship_input_container">
                <div class="relationship_input_reminder">
                    &nbsp;&nbsp;&nbsp;查询条件:
                </div>
                <div class="input_container">
                    <button
                        class="relationship_input_button"
                        style="visibility: hidden"
                    >
                        占位用
                    </button>
                    <borderInput_noafter
                        :msg="msg"
                        :placeholder="input_place_holder1"
                        class="relationship_input_mainer"
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
                        class="relationship_input_mainer"
                        ref="relationship_input_ref2"
                    >
                    </borderInput_noafter>
                    <button
                        class="relationship_input_button"
                        @click="relation_search_submit"
                    >
                        搜索
                    </button>
                </div>
                <div class="media_input_container">
                    <borderInput_noafter
                        :msg="msg"
                        :placeholder="input_place_holder1"
                        class="relationship_input_mainer"
                        ref="relationship_input_ref1"
                    >
                    </borderInput_noafter>
                    <boderSelect
                        :items="select_items"
                        :title="title"
                        :placeholder="select_placeholder"
                        class="relationship_selecter_"
                        ref="relationship_select_ref"
                        :value="select_value"
                    >
                    </boderSelect>
                    <borderInput_noafter
                        :msg="msg"
                        :placeholder="input_place_holder2"
                        class="relationship_input_mainer"
                        ref="relationship_input_ref2"
                    >
                    </borderInput_noafter>
                    <button
                        class="relationship_input_button"
                        @click="relation_search_submit"
                    >
                        搜索
                    </button>
                </div>
                <linePrompt
                    class="line_prompt"
                    :data_left="line_prompt.msg"
                    :opacity="line_prompt.msg"
                    :type="line_prompt.type"
                ></linePrompt>
            </div>
            <div class="relationship_result_container">
                <div class="relationship_result_reminder_1">
                    &nbsp;「关系图」
                </div>
                <div class="relationship_result_show_1">
                    你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。
                    你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。
                </div>
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
            select_value: "",
            select_placeholder: "选择一个关系",
            line_prompt: {
                msg: "sss",
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
            if (obj1 === "" || obj2 === "") {
                this.line_prompt.msg = "输入的实体不能为空";
                return;
            } else if (relation === "") {
                this.line_prompt.msg = "所选择的关系不能为空";
                return;
            } else {
                this.line_prompt.msg = "";
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
.cna_scroll{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
}
.relationship_input_mainer {
    position: relative;
}
.relationship_input_reminder {
    /* top: 2%; */
    position: relative;
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
    width: 80px;
    min-width: 80px;
    height: 40px;
    cursor: pointer;
    background-color: rgb(207, 159, 216);
    font-size: 20px;
    color: white;
    border-radius: 8px;
    border: none;
    margin: 0px 20px 0px 20px;
}
.relationship_input_button:hover {
    background-color: rgb(204, 121, 221);
}
.relationship_selecter {
    /* width: 100%; */
    position: relative;
    margin: 0px 20px 0px 20px;
    bottom: 5px;
}
.relationship_selecter_ {
    position: relative;
    margin: 20px 0px 20px 0px;
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
    overflow: hidden;
    /* background-color: red; */
}
.line_prompt {
    position: relative;
    width: 200px;
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
<style>
.input_container {
    width: 100%;
    height: 80px;
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}
.media_input_container {
    width: 100%;
    border: 1px solid red;
    display: none;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.relationship_input_container {
    position: relative;
    width: 92%;
    height: 150px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: solid 1px rgb(154, 154, 154);
}
.relationship_result_container {
    position: relative;
    width: 92%;
    height: calc(100% - 150px - 20px - 20px);
    /* background-color: red; */
    display: flex;
    /* justify-content: center; */
    flex-direction: column;
    align-items: center;
    border: solid 1px rgb(154, 154, 154);
    margin-top: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    min-height: 500px;
}
@media screen and (max-width: 1280px) {
    .input_container {
        display: none;
    }
    .media_input_container {
        display: flex;
    }
    .relationship_input_container {
        height: 360px;
    }
    .relationship_result_container {
        height: calc(100% - 360px - 20px - 20px);
    }
}
</style>
