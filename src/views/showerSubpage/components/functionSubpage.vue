<!-- 知识概览子页面 -->
<template>
    <div class="fs_subpage_container" ref="container">
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
        <div class="fs_subpage_body">
            <div ref="fs_son_0" class="son_subpage">
                <overviewSubpage></overviewSubpage>
            </div>
            <div ref="fs_son_1" class="son_subpage" style="left: 100%">
                <stockMarketInfo></stockMarketInfo>
            </div>
        </div>
    </div>
</template>
<script>
import store from "@/store/index";
import stockMarketInfo from "./subpages/stockMarketInfo.vue";
import overviewSubpage from "./subpages/overviewSubpage.vue";
export default {
    data() {
        return {
            son_pages: [true, false],
            son_pages_name: ["知识概览", "股市信息"],
        };
    },
    components: {
        stockMarketInfo,
        overviewSubpage,
    },
    methods: {
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        clickNav(index) {
            if (!store.state.can_click_button) return;
            this.son_pages = [false, false];
            this.son_pages[index] = true;
            this.son_pages.forEach((element, i) => {
                this.$refs["fs_son_" + i.toString()].style.left =
                    (i * 100 - index * 100).toString() + "%";
            });
        },
    },
};
</script>

<style scoped>
.fs_subpage_container {
    position: relative;
    /* border: 1px solid red; */
    float: right;
    width: 98%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    box-sizing: content-box;
    display: block;
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
.page_nav {
    cursor: pointer;
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
.fs_subpage_body {
    position: relative;
    width: 100%;
    height: calc(100% - 30px);
    border: 1px solid red;
    overflow: hidden;
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
</style>
