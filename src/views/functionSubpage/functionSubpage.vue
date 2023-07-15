<template>
    <defaultShutters has_right_girl="true">
        <template #show_child_page>
            <div
                style="
                    position: relative;
                    width: 100%;
                    height: 100%;
                    /* border: solid 2px red; */
                "
            >
                <div
                    class="function_title"
                    style="position: absolute; height: 10%; top: 0; width: 100%"
                >
                    {{
                        $t(
                            "views.main_page.function_subpage.content.function_selection"
                        )
                    }}
                </div>
                <div
                    style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: absolute;
                        top: 10%;
                        left: 0;
                        width: 100%;
                        height: 90%;
                        flex-direction: column;
                    "
                >
                    <flowButton
                        class="button_change_size"
                        @click="changeFunction(0)"
                        :judge_isSelected="false"
                        :content_text="
                            $t(
                                'views.main_page.function_subpage.content.entity_recognition'
                            )
                        "
                    ></flowButton>
                    <flowButton
                        class="button_change_size"
                        @click="changeFunction(1)"
                        :judge_isSelected="false"
                        :content_text="
                            $t(
                                'views.main_page.function_subpage.content.entity_query'
                            )
                        "
                    ></flowButton>
                    <flowButton
                        class="button_change_size"
                        @click="changeFunction(2)"
                        :judge_isSelected="false"
                        :content_text="
                            $t(
                                'views.main_page.function_subpage.content.relationship_query'
                            )
                        "
                    ></flowButton>
                    <flowButton
                        class="button_change_size"
                        @click="changeFunction(3)"
                        :judge_isSelected="false"
                        :content_text="
                            $t(
                                'views.main_page.function_subpage.content.agricultural_knowledge_graph'
                            )
                        "
                    ></flowButton>
                    <flowButton
                        class="button_change_size"
                        @click="changeFunction(4)"
                        :judge_isSelected="false"
                        :content_text="
                            $t(
                                'views.main_page.function_subpage.content.agricultural_knowledge_QA'
                            )
                        "
                    ></flowButton>
                </div>
            </div>
        </template>
    </defaultShutters>
</template>

<script>
import defaultShutters from "@/components/shutter/defaultShutter.vue";
import flowButton from "@/components/buttons/subpageButton/flowButton.vue";
const function_arr = [0, 1, 2, 3, 4];
//实体识别、实体查询、关系查询、农业知识图谱、农知问答
export default {
    // props:{cur_function:{type:Number}},
    props: {
        changeFunction: {
            type: Function,
        },
    },
    methods: {},
    data() {
        return {
            cur_function: -1,
        };
    },
    mounted() {
        // this.radio1 = Storage.get(0, "LANGUAGE", "en");
        // this.changeLanguage(language_arr.indexOf(this.radio1));
    },
    components: {
        defaultShutters,
        flowButton,
    },
};
</script>

<style scoped>
.button_change_size {
    width: 190px;
    height: 100px;
.button_change_size{
    width:190px;
    height: 60px;
}
.function_title {
    font-family: "FZZJ-WHJZTJW", sans-serif;
    text-align: center;
    font-size: 40px;
    color: var(--functionSubpage-title-color);
}
</style>
