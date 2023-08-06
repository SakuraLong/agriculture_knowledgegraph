<!-- 实体查询子页面 -->
<template>
    <div class="eq_subpage_container" ref="container">
        <div class="select_type">
            <div
                v-for="(item, index) in son_pages_name"
                :key="index"
                class="page_nav"
                :class="{ page_nav_selected: son_pages[index] }"
                @click="clickNav(index)"
            >
                {{ item }}
            </div>
        </div>
        <div
            style="
                position: relative;
                /* border: 1px solid red; */
                width: 100%;
                height: calc(100% - 30px);
                display: flex;
                overflow: hidden;
            "
        >
            <div ref="son_0" class="son_subpage">
                <searchSubpage @fromSearch="fromSearch"></searchSubpage>
            </div>
            <div ref="son_1" class="son_subpage" style="left: 100%">
                <div v-show="show_catalogue" class="catalogue" ref="catalogue">
                    <div class="catalogue_title">
                        <h3 style="margin: 0; padding: 0">目录</h3>
                    </div>
                    <div class="catalogue_body" ref="catalogue_body"></div>
                </div>
                <div
                    class="shower_subpage_container_body"
                    ref="shower_subpage_container_body"
                    @scroll="bodyScorll"
                ></div>
                <div v-if="is_waiting" class="waiting_ele">
                    <linePrompt
                        :opacity="error"
                        style="width: 260px"
                        :data_left="error"
                        :type="prompt_type"
                    ></linePrompt>
                </div>
            </div>
            <div ref="son_2" class="son_subpage" style="left: 200%">
                <mapSubpage ref="map_subpage"></mapSubpage>
            </div>
            <div ref="son_3" class="son_subpage" style="left: 300%">
                百科文档编辑页面
            </div>
            <div ref="son_4" class="son_subpage" style="left: 400%">
                图文档编辑页面
            </div>
        </div>
    </div>
</template>
<script>
import data from "@/assets/js/data";
import mapSubpage from "./subpages/mapSubpage.vue";
import Renderer from "@/renderer/renderer.js";
import searchSubpage from "./subpages/searchSubpage.vue";
import Connector from "@/assets/js/connector/connector";
import Code from "@/assets/js/code/code";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import store from "@/store/index";
export default {
    data() {
        return {
            show_catalogue: true,
            ency_renderer: null,
            map_renderer: null,
            sct: 0,
            is_map: false,
            son_pages: [true, false, false, false, false],
            son_pages_name: [
                "检索",
                "百科页面",
                "图页面",
                "百科文档编辑页面",
                "图文档编辑页面",
            ],
            ency_content: "",
            map_content: "",
            is_waiting: false,
            error: "查询中",
            prompt_type: "waiting",
        };
    },
    components: {
        searchSubpage,
        mapSubpage,
        linePrompt,
    },
    mounted() {
        this.ency_content = data.default_ency;
        this.map_content = data.default_map;
        this.renderEncyByText(this.ency_content);
        this.renderMapByText(this.map_content);
    },
    methods: {
        fromSearch(index, name) {
            this.clickNav(index);
            this.getEntityByName(name);
        },
        clickNav(index) {
            if(!store.state.can_click_button) return;
            this.son_pages = [false, false, false, false, false];
            this.son_pages[index] = true;
            this.son_pages.forEach((element, i) => {
                this.$refs["son_" + i.toString()].style.left =
                    (i * 100 - index * 100).toString() + "%";
            });
        },
        bodyScorll() {
            if (this.ency_renderer != null) {
                this.ency_renderer.setBodyScroll(
                    this.$refs.shower_subpage_container_body.scrollTop
                );
            }
        },
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        renderEncyByText(ency_content) {
            this.ency_renderer = new Renderer(
                this.$refs.shower_subpage_container_body,
                ency_content,
                "ency"
            );
            this.ency_renderer.render(); // 渲染
            this.ency_renderer.catalogueInit(this.$refs.catalogue_body);

            // this.ency_renderer.setBodyScroll(
            //     this.$refs.shower_subpage_container_body.scrollTop
            // );
        },
        renderMapByText(text){
            this.$refs.map_subpage.renderMapByText(text);
        },
        getEntityByName(name) {
            // 清空信息
            this.$refs.shower_subpage_container_body.innerHTML = "";
            this.ency_renderer = null;
            try {
                this.$refs.catalogue_body.innerHTML = "";
            } catch {
                // 目录没有被渲染
            }
            this.show_catalogue = false; // 隐藏目录
            // 查询实体详细信息
            Connector.test(
                this.entityDetailCallback,
                this.entityDetailWaiting,
                this.entityDetailTimeout,
                200,
                true,
                1000,
                {
                    success:true,
                    content:{
                        ency_content:data.default_ency,
                        map_content:data.default_map
                    }
                }
            );
        },
        entityDetailCallback(msg) {
            // 拿到信息进入实体详细信息展示界面
            if (msg.success) {
                this.show_catalogue = true; // 显示目录

                this.ency_content = msg.content.ency_content; // 之后需要解码
                this.map_content = msg.content.map_content; // 之后需要解码

                this.renderEncyByText(this.ency_content);
                this.renderMapByText(this.map_content);
            }
        },
        entityDetailWaiting(is_waiting) {
            this.is_waiting = is_waiting;
            if(is_waiting){
                store.state.can_click_button = false;
            }else{
                store.state.can_click_button = true;
            }
        },
        entityDetailTimeout() {
            // 超时
            console.log("查询实体细节超时");
        },
    },
};
</script>

<style scoped>
.eq_subpage_container {
    /* transform: translateX(); */
    /* user-select: all; */
    position: relative;
    /* border: 1px solid red; */
    float: right;
    width: 98%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.95);
    box-sizing: content-box;
    display: block;
    overflow: hidden;
}
.select_type {
    user-select: none;
    position: relative;
    display: flex;
    border-bottom: 2px solid #8222966f;
    width: 100%;
    height: 30px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: 600;
}
.shower_subpage_container_body {
    height: calc(100%);
    overflow-x: hidden;
    overflow-y: auto;
}
.page_nav {
    padding: 0px 10px 0px 10px;
    border-left: 1px solid #822296;
    border-right: 1px solid #822296;
    color: rgba(0, 0, 0, 0.679);
    font-size: 17px;
    transition: all 0.1s linear;
}
.page_nav_selected {
    transition: all 0.1s linear;
    color: #822296;
}
.son_subpage {
    position: absolute;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease-out;
    /* border: 1px solid red; */
}
.catalogue {
    position: relative;
    width: calc(250px - 20px);
    height: 100%;
    float: right;
    /* border: 1px solid red; */
    text-align: left;
    padding-left: 20px;
}
.catalogue_title {
    height: 50px;
    user-select: none !important;
    /* border: 1px solid red; */
}
.catalogue_body {
    /* border: 1px solid red; */
    padding-left: 10px;
    height: calc(100% - 50px);
    overflow-y: auto;
    user-select: none !important;
}
.map_container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(255, 255, 255); */
}
.waiting_ele {
    position: absolute;
    width: 100%;
    top: 10%;
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
}
div {
    text-align: left;
}
</style>
