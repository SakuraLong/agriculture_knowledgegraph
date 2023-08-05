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
                <searchSubpage></searchSubpage>
            </div>
            <div ref="son_1" class="son_subpage" style="left: 100%">
                <div v-if="show_catalogue" class="catalogue" ref="catalogue">
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
            </div>
            <div ref="son_2" class="son_subpage" style="left: 200%">
                <div class="map_container" ref="map_container"></div>
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
import Renderer from "@/renderer/renderer.js";
import * as echarts from "echarts";
import searchSubpage from "./subpages/searchSubpage.vue";
export default {
    data() {
        return {
            show_catalogue: true,
            renderer: null,
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
        };
    },
    components: {
        searchSubpage,
    },
    mounted() {
        this.renderer = new Renderer(
            this.$refs.shower_subpage_container_body,
            data.default_ency,
            "ency"
        );
        this.renderer.render(); // 渲染
        this.renderer.catalogueInit(this.$refs.catalogue_body);

        this.renderer.setBodyScroll(
            this.$refs.shower_subpage_container_body.scrollTop
        );
        // this.mapInit();

        let r = new Renderer(this.$refs.map_container, data.default_map, "map");
        r.render();
    },
    methods: {
        clickNav(index) {
            this.son_pages = [false, false, false, false, false];
            this.son_pages[index] = true;
            this.son_pages.forEach((element, i) => {
                this.$refs["son_" + i.toString()].style.left =
                    (i * 100 - index * 100).toString() + "%";
            });
        },
        bodyScorll() {
            this.renderer.setBodyScroll(
                this.$refs.shower_subpage_container_body.scrollTop
            );
        },
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        renderEncyByText(ency_content){
            
        }
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
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255);
}
div {
    text-align: left;
}
</style>
