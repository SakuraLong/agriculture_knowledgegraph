<template>
    <div style="width: 100%; height: 100%; background-color: white">
        <div class="config_container">
            <el-switch
                v-model="is_force"
                active-text="Force"
                inactive-text="Graph"
                :disabled="map_content === ''"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-switch
                v-model="is_light"
                active-text="Light"
                inactive-text="Dark"
                :disabled="map_content === ''"
            />
        </div>
        <div class="container" :id="id"></div>
        <div class="prompt_ele" v-if="no_result">
            两个实体之间没有关系，或者实体不存在
        </div>
    </div>
</template>

<script>
import Renderer from "@/renderer/renderer";
export default {
    data() {
        return {
            map_renderer: null,
            is_light: true,
            is_force: true,
            map_content: "",
            id: "shower_container",
            no_result: false,
        };
    },
    watch: {
        is_light() {
            if (this.map_content === "") return;
            this.map_renderer.dispose();
            let map_renderer = new Renderer(
                document.getElementById(this.id),
                this.map_content,
                "map"
            );
            map_renderer.setClickNode(this.clickNode);
            let option = {
                theme:this.is_light ? "light" : "dark",
                layout:this.is_force ? "force" : "graph"
            };
            map_renderer.setOption(option);
            map_renderer.render();

            this.map_renderer = map_renderer;
        },
        is_force() {
            if (this.map_content === "") return;
            this.map_renderer.dispose();
            let map_renderer = new Renderer(
                document.getElementById(this.id),
                this.map_content,
                "map"
            );
            map_renderer.setClickNode(this.clickNode);
            let option = {
                theme:this.is_light ? "light" : "dark",
                layout:this.is_force ? "force" : "graph"
            };
            map_renderer.setOption(option);
            map_renderer.render();

            this.map_renderer = map_renderer;
        },
    },
    mounted() {},
    methods: {
        renderMapByLink(link_content) {
            try {
                this.map_renderer.dispose();
                this.map_renderer = null;
            } catch {
                //
                console.log("销毁错误");
            }
            if (link_content === "") {
                this.map_content = "";
                this.no_result = true;
            } else {
                this.no_result = false;
                let temp =
                    `- 界面配置
                        - 关系\n` + link_content;
                this.renderMapByText(temp);
            }
        },
        renderMapByText(map_content) {
            try {
                this.map_renderer.dispose();
            } catch {
                //
            }
            let map_renderer = new Renderer(
                document.getElementById(this.id),
                map_content,
                "map"
            );
            map_renderer.setClickNode(this.clickNode);
            let option = {
                theme:this.is_light ? "light" : "dark",
                layout:this.is_force ? "force" : "graph"
            };
            map_renderer.setOption(option);
            try {
                map_renderer.render();
            } catch {
                //
            }
            this.map_content = map_content;
            this.map_renderer = map_renderer;
        },
        setId(id) {
            this.id = id;
        },
        clickNode(node){
            if(node.data.node_id !== ""){
                this.$emit("fromMap", node.data.node_id);
            }
        }
    },
};
</script>

<style scoped>
.config_container {
    width: 100%;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container {
    position: relative;
    width: 100%;
    height: calc(100% - 25px);
}
.prompt_ele {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
