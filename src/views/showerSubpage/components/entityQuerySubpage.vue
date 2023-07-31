<!-- 实体查询子页面 -->
<template>
    <div class="eq_subpage_container" ref="container">
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
</template>
<script>
import Renderer from "@/renderer/renderer.js";
export default {
    data() {
        return {
            show_catalogue: true,
            renderer: null,
            sct: 0,
        };
    },
    mounted() {
        this.renderer = new Renderer(
            this.$refs.shower_subpage_container_body,
            "12345678"
        );
        this.renderer.catalogueInit(this.$refs.catalogue_body);

        this.renderer.setBodyScroll(
            this.$refs.shower_subpage_container_body.scrollTop
        );
    },
    methods: {
        bodyScorll() {
            this.renderer.setBodyScroll(
                this.$refs.shower_subpage_container_body.scrollTop
            );
        },
        getOffsetTop(){
            return this.$refs.container.offsetTop;
        }
    },
};
</script>

<style scoped>
.eq_subpage_container {
    /* user-select: all; */
    position: relative;
    border: 1px solid red;
    float: right;
    width: 98%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    box-sizing: content-box;
    display: block;
    overflow: auto;
}
.shower_subpage_container_body {
    height: 100%;
    overflow: auto;
}

/* test */
.t {
    width: 800px;
    height: 500px;
    float: right;
    border: 1px solid red;
}
.catalogue {
    position: relative;
    width: calc(250px - 20px);
    height: 50%;
    float: right;
    border: 1px solid red;
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
div {
    text-align: left;
}
</style>
