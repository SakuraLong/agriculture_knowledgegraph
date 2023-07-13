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
                <div class="function_title" style="position: absolute;height: 10%;top:0;width: 100%;">
                    {{ $t("views.main_page.function_subpage.content.function_selection") }}
                </div>
                <div
                    style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: absolute;
                        top:10%;
                        left: 0;
                        width: 100%;
                        height: 80%;
                        /* border: solid 2px blue; */
                        flex-direction: column;
                    "
                >
                    <button class="test_class1" @click="changeFunction(0)">
                        <div
                            class="button_text"
                            :data-text="
                                $t('views.main_page.function_subpage.content.entity_recognition')
                            "
                        >
                            {{ $t("views.main_page.function_subpage.content.entity_recognition") }}
                        </div>
                    </button>
                    <button class="test_class1" @click="changeFunction(1)">

                        <div class="button_text" :data-text="$t('views.main_page.function_subpage.content.entity_query')">
                            {{ $t("views.main_page.function_subpage.content.entity_query") }}
                        </div>
                    </button>
                    <button class="test_class1" @click="changeFunction(2)">
                        <div class="button_text" :data-text="$t('views.main_page.function_subpage.content.relationship_query')">
                            {{ $t("views.main_page.function_subpage.content.relationship_query") }}
                        </div>
                    </button>
                    <button class="test_class1" @click="changeFunction(3)">
                        <div class="button_text" :data-text="$t('views.main_page.function_subpage.content.agricultural_knowledge_graph')">
                            {{ $t("views.main_page.function_subpage.content.agricultural_knowledge_graph") }}
                        </div>
                    </button>
                    <button class="test_class1" @click="changeFunction(4)">
                        <div class="button_text" :data-text="$t('views.main_page.function_subpage.content.agricultural_knowledge_QA')">
                            {{ $t("views.main_page.function_subpage.content.agricultural_knowledge_QA") }}
                        </div>
                    </button>
                </div>
            </div>
        </template>
    </defaultShutters>
</template>

<script>
import defaultShutters from "@/components/shutter/defaultShutter.vue";
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
    },
};
</script>

<style scoped>
.test_class1 {
    margin-top: 15px;
    margin-bottom: 15px;
    width: 190px;
    height: 100px;
    background: none;
    border: 4px solid rgb(205, 199, 199);
    color: #d5b4dc;
    font-family: FZZJ-WHJZTJW;
    font-weight: 400;
    font-size: 20px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-transform: uppercase; 大写文本 */
    cursor: pointer;
    position: relative;
}
.test_class1::before,
.test_class1::after {
    content: "";
    position: absolute;
    width: 14px;
    height: 4px;
    background: white;
    transform: skewX(50deg);
    transition: 0.4s linear;
}
.test_class1::before {
    top: -4px;
    left: 10%;
}
.test_class1::after {
    bottom: -4px;
    right: 10%;
}
.test_class1:hover::before {
    left: 80%;
}
.test_class1:hover::after {
    right: 80%;
}
.test_class1:hover {
    color: #3498db;
}
.button_text {
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}
.test_class1:hover > .button_text {
    color: white;
}
.test_class1:hover > .button_text::after {
    content: attr(data-text);
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    -webkit-text-stroke: 6px #d5b4dc;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.function_title{
    font-family: "FZZJ-WHJZTJW", sans-serif;
    text-align: center;
    font-size: 40px;
    color: #d5b4dc;
}
</style>
