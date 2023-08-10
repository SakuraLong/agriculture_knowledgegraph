<template>
    <div class="stock_forecast_container">
        <div class="stock_forecast_head">
            <span style="position: absolute; left: 0"
                >基于ARIMA模型预测未来30天走势<br />（纯属娱乐，仅供参考）</span
            >
            <linePrompt
                :opacity="error"
                style="width: 260px; float: left"
                :data_left="error"
                :type="prompt_type"
            ></linePrompt>
            <defaultSearch
                style="
                    z-index: 1000;
                    width: 400px;
                    position: absolute;
                    right: 0;
                "
                @search="search"
                ref="default_search"
                :is_stock="true"
            ></defaultSearch>
        </div>
        <div class="stock_forecast_body">
            <stockMapSubpage ref="stock_map_subpage"></stockMapSubpage>
        </div>
    </div>
</template>

<script>
import defaultSearch from "@/components/navBar/components/search/defaultSearch.vue";
import stockMapSubpage from "./stockMapSubpage.vue";
import Connector from "@/assets/js/connector/connector";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import Checker from "@/assets/js/checker/checker";
export default {
    components: {
        stockMapSubpage,
        defaultSearch,
        linePrompt,
    },
    data() {
        return {
            error: "",
            prompt_type: "waiting",
            code: "",
        };
    },
    methods: {
        search(text) {
            if (!new Checker(text, ["ignore"]).check()) {
                this.error = "股票代码必须是数字";
                this.prompt_type = "error";
                this.$refs.default_search.getMsg();
            } else {
                this.code = text.toString();
                this.error = "";
                Connector.send(
                    [text.toString()],
                    "stockPredict",
                    this.searchCallback,
                    this.searchWaiting,
                    this.searchTimeout,
                    120000
                );
            }
        },
        searchCallback(msg) {
            if (msg.success) {
                let data = msg.content.data;
                this.$refs.stock_map_subpage.render("Y", data, this.code);
            } else {
                console.log("失败");
            }
        },
        searchWaiting(is_waiting) {
            if (is_waiting) {
                this.error = "查询中";
                this.prompt_type = "waiting";
            } else {
                this.error = "";
                this.$refs.default_search.getMsg();
            }
        },
        searchTimeout() {
            console.log("查询超时");
            this.error = "查询超时";
            this.prompt_type = "error";
        },
    },
};
</script>

<style scoped>
.stock_forecast_container {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: white;
}
.stock_forecast_head {
    width: 100%;
    height: 50px;
    position: relative;
    /* border: 1px solid red; */
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: center;
}
.stock_forecast_head > span {
    line-height: 25px;
    font-size: 20px;
    font-weight: 600;
}
.stock_forecast_body {
    width: 100%;
    position: relative;
    height: calc(100% - 50px);
    /* border: 1px solid red; */
}
</style>
