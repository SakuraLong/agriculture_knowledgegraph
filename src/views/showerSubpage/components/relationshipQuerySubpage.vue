<!-- 关系查询子页面 -->
<template>
    <div class="rq_subpage_container" ref="container">
        <div class="can_scroll">
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
                    <mapSubpage ref="map_subpage"></mapSubpage>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import borderInput_noafter from "@/components/inputs/borderInput_noafter/borderInput_noafter.vue";
import boderSelect from "@/components/selects/borderSelect/boderSelect.vue";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import mapSubpage from "./subpages/mapSubpage.vue";

import Checker from "@/assets/js/checker/checker";
import Code from "@/assets/js/code/code";
import Connector from "@/assets/js/connector/connector";
import store from "@/store/index";
export default {
    data() {
        return {
            msg: "",
            input_font_size: "20px",
            input_place_holder1: "实体1",
            input_place_holder2: "实体2",
            select_items: ["查询最短关系", "查询最长关系"],
            title: "关系选择",
            select_value: "查询最短关系",
            select_placeholder: "选择一个关系",
            line_prompt: {
                msg: "",
                type: "error",
            },
            map_renderer: null,
            id: "relation_map_container",
        };
    },
    mounted() {
        this.$refs.map_subpage.setId(this.id);
    },
    methods: {
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        relation_search_submit() {
            if(!store.state.can_click_button) return;
            let obj1 = this.$refs.relationship_input_ref1.get();
            let obj2 = this.$refs.relationship_input_ref2.get();
            let relation = this.$refs.relationship_select_ref.get();
            if (
                !new Checker(obj1, [
                    "no-null",
                    "no-only-spacing",
                    "no-base-symbols",
                    "sql-check",
                ]).check() ||
                !new Checker(obj2, [
                    "no-null",
                    "no-only-spacing",
                    "no-base-symbols",
                    "sql-check",
                ]).check()
            ) {
                this.line_prompt.type = "error";
                this.line_prompt.msg = "输入不符合规范";
                return;
            } else {
                this.line_prompt.msg = "";
                // 发送查询请求
                let index = this.select_items.findIndex((element)=>{
                    return element === relation;
                }) + 1;
                Connector.send(
                    [obj1, obj2, index.toString()],
                    "searchRelationship",
                    this.relationCallback,
                    this.relationWaiting,
                    this.relationTimeout,
                    5000
                );
            }
        },
        relationCallback(msg) {
            if (msg.success) {
                if (msg.content.has_link) {
                    let temp = Code.Base64.decode(msg.content.links_content);
                    this.$refs.map_subpage.renderMapByText(temp);
                }
            }
        },
        relationWaiting(is_waiting) {
            store.state.can_click_button = !is_waiting;
            if(is_waiting){
                this.line_prompt.msg = "查询中";
                this.line_prompt.type = "waiting";
            }else{
                this.line_prompt.msg = "";
            }
        },
        relationTimeout() {
            this.line_prompt.msg = "查询超时";
            this.line_prompt.type = "error";
        },
    },
    components: {
        borderInput_noafter,
        boderSelect,
        linePrompt,
        mapSubpage,
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
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.can_scroll {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
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
    background-color: white;
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
    /* height: 80px; */
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
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
@media screen and (max-width: 1400px) {
    .input_container {
        flex-direction: column;
    }
    .relationship_input_container {
        height: 360px;
    }
    .relationship_result_container {
        height: calc(100% - 360px - 20px - 20px);
    }
}
</style>
