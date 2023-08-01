<!-- 实体查询子页面 -->
<template>
    <div class="eq_subpage_container" ref="container">
        <div class="select_type">
            <div
                :style="{ color: is_map ? 'black' : '#8222969f' }"
                style="padding-right: 20px; border-right: 1.5px solid #8222966f"
                @click="
                    this.$refs.son_1.style.transform = 'translateX(0%)';
                    this.$refs.son_0.style.transform = 'translateX(0%)';
                    is_map = false;
                "
            >
                百科界面
            </div>
            <div
                :style="{ color: !is_map ? 'black' : '#8222969f' }"
                style="padding-left: 20px; border-left: 1.5px solid #8222966f"
                @click="
                    this.$refs.son_0.style.transform = 'translateX(-100%)';
                    this.$refs.son_1.style.transform = 'translateX(-100%)';
                    is_map = true;
                "
            >
                图页面
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
            <div
                ref="son_0"
                style="
                    position: absolute;
                    left: 0;
                    display: block;
                    width: 100%;
                    height: 100%;
                    transition: all 0.5s ease-out;
                "
            >
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
            <div
                ref="son_1"
                style="
                    position: absolute;
                    left: 100%;
                    display: block;
                    width: 100%;
                    height: 100%;
                    transition: all 0.5s ease-out;
                "
            >
                <div class="map_container" ref="map_container"></div>
            </div>
        </div>
    </div>
</template>
<script>
import Renderer from "@/renderer/renderer.js";
import data from "@/assets/data.json";
import * as echarts from "echarts";
export default {
    data() {
        return {
            show_catalogue: true,
            renderer: null,
            sct: 0,
            is_map: false,
        };
    },
    mounted() {
        this.renderer = new Renderer(
            this.$refs.shower_subpage_container_body,
            "12345678",
            "ency"
        );
        this.renderer.render(); // 渲染
        this.renderer.catalogueInit(this.$refs.catalogue_body);

        this.renderer.setBodyScroll(
            this.$refs.shower_subpage_container_body.scrollTop
        );
        // this.mapInit();

        let r = new Renderer(
            this.$refs.map_container,
            "12345678",
            "map"
        );
        r.render();
    },
    methods: {
        bodyScorll() {
            this.renderer.setBodyScroll(
                this.$refs.shower_subpage_container_body.scrollTop
            );
        },
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        mapInit() {
            console.log("渲染图");
            var dom = this.$refs.map_container;
            var myChart = echarts.init(dom, null, {
                renderer: "canvas",
                useDirtyRect: false,
            });
            var app = {};
            var ROOT_PATH = "https://echarts.apache.org/examples";
            var option;

            myChart.showLoading();

            function map(graph) {
                myChart.hideLoading();
                graph.nodes.forEach(function (node) {
                    node.label = {
                        show: node.symbolSize > 30,
                    };
                });
                option = {
                    title: {
                        text: "Les Miserables",
                        subtext: "Default layout",
                        top: "top",
                        left: "left",
                    },
                    tooltip: {
                        formatter: function (params) {
                            if (params.data.source) {
                                //注意判断，else是将节点的文字也初始化成想要的格式
                                return (
                                    "aa<br>" +
                                    params.data.source +
                                    "是【" +
                                    params.data.target +
                                    "】的居间人"
                                );
                            } else {
                                return params.name;
                            }
                        },
                    },
                    legend: [
                        {
                            // selectedMode: 'single',
                            data: graph.categories.map(function (a) {
                                return a.name;
                            }),
                        },
                    ],
                    animationDuration: 1500,
                    animationEasingUpdate: "quinticInOut",
                    series: [
                        {
                            name: "Les Miserables",
                            type: "graph",
                            layout: "none",
                            data: graph.nodes,
                            links: graph.links,
                            categories: graph.categories,
                            roam: true,
                            label: {
                                position: "right",
                                formatter: "{b}",
                            },
                            lineStyle: {
                                color: "source",
                                curveness: 0.3,
                            },
                            emphasis: {
                                focus: "adjacency",
                                lineStyle: {
                                    width: 10,
                                },
                            },
                        },
                    ],
                };
                myChart.setOption(option);
            }
            map(data);
            if (option && typeof option === "object") {
                myChart.setOption(option);
            }

            window.addEventListener("resize", myChart.resize);
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
    background-color: rgba(255, 255, 255, 0.8);
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
    overflow: auto;
}

.catalogue {
    position: relative;
    width: calc(250px - 20px);
    height: 50%;
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
