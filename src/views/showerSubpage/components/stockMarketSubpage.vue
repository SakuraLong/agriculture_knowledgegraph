<template>
    <div class="stock_market_container" ref="container">
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
                <stockMarketInfo></stockMarketInfo>
            </div>
            <div ref="son_1" class="son_subpage" style="left: 100%;">
                <stockView></stockView>
            </div>
            <div ref="son_2" class="son_subpage" style="left: 200%;">
                <stockChange></stockChange>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts";
import testMsg from "@/assets/js/testMsg";
import defaultSearch from "@/components/navBar/components/search/defaultSearch.vue";
import Connector from "@/assets/js/connector/connector";
import Storage from "@/assets/js/storage/storage";
// import store from "@/store/index";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import stockMarketInfo from "./subpages/stockMarketInfo.vue";
import stockView from "./subpages/stockView.vue";
import stockChange from "./subpages/stockChange.vue";
export default {
    components: {
        stockMarketInfo,
        stockView,
        stockChange
    },
    data() {
        return {
            son_pages: [true, false, false],
            son_pages_name: ["具体查询", "龙虎榜", "异动信息"],
        };
    },
    watch: {},
    created() {
        // this.collects = Storage.get(0, "STOCK_COLLECTS", this.collects, "JSON"); // 拿取JSON数据
    },
    mounted() {
        // this.showSMInfoByData(testMsg.SM_data, "平安银行");
    },
    methods: {
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        clickNav(index) {
            // if (!store.state.can_click_button) return;
            this.son_pages = [false, false, false];
            this.son_pages[index] = true;
            this.son_pages.forEach((element, i) => {
                this.$refs["son_" + i.toString()].style.left =
                    (i * 100 - index * 100).toString() + "%";
            });
        },
    },
};
</script>

<style scoped>
.stock_market_container {
    position: relative;
    /* border: 1px solid red; */
    float: right;
    width: 98%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
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
