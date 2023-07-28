<template>
    <div class="shower_subpage">
        <div class="shower_subpage_container">
            <div v-if="show_catalogue" class="catalogue" ref="catalogue">
                <div class="catalogue_title">
                    <h3 style="margin: 0; padding: 0">目录</h3>
                </div>
                <div class="catalogue_body" ref="catalogue_body"></div>
            </div>
            <div
                class="shower_subpage_container_body"
                ref="shower_subpage_container_body"
            ></div>
        </div>
    </div>
</template>

<script>
import Renderer from "@/renderer/renderer.js";
export default {
    data() {
        return {
            show_catalogue: true,
        };
    },
    mounted() {
        let renderer = new Renderer(
            this.$refs.shower_subpage_container_body,
            "12345678"
        );
        renderer.catalogueInit(this.$refs.catalogue_body);
    },
    methods: {},
};
</script>

<style scoped>
.shower_subpage {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid red;
    font-family: Songti;
    font-size: 20px;
}
.shower_subpage_container {
    /* user-select: all; */
    position: absolute;
    border: 1px solid red;
    right: 0%;
    width: 98%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    box-sizing: content-box;
    display: block;
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
    /* border: 1px solid red; */
}
.catalogue_body {
    /* border: 1px solid red; */
    padding-left: 10px;
    height: calc(100% - 50px);
    overflow-y: auto;
}
div {
    text-align: left;
}
</style>
