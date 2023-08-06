<template>
    <div style="width: 100%; height: 100%" id="test_container"></div>
</template>

<script>
import Renderer from "@/renderer/renderer";
export default {
    data() {
        return {
            map_renderer: null,
        };
    },
    mounted() {
    },
    methods: {
        renderMapByText(map_content) {
            let map_renderer = new Renderer(
                document.getElementById("test_container"),
                map_content,
                "map"
            );
            map_renderer.render();

            this.map_renderer = map_renderer;
        },
    },
};
</script>

<style></style>
