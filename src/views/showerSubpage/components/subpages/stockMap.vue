<template>
    <div class="stock_map_container">
        <div class="suggestion">
            <div class="get_ai_button_c">
                <div class="get_ai_button" @click="clickAi">点击获取AI建议</div>
            </div>
            <div class="ai_suggestion">AI建议：{{ suggestion }}</div>
        </div>
        <div class="map_container">
            <div class="select_container">
                <el-radio-group
                    v-model="select_map_type"
                    style="float: left; margin-left: 20px"
                >
                    <el-radio-button label="分时图" />
                    <el-radio-button label="日K图" />
                    <el-radio-button label="周K图" />
                    <el-radio-button label="月K图" />
                </el-radio-group>
                <el-switch
                    style="position: absolute; right: 10px"
                    v-model="is_update"
                    active-text="60秒刷新"
                />
            </div>
            <div class="stock_map_subpage_container">
                <stockMapSubpage ref="stock_map_subpage"></stockMapSubpage>
            </div>
        </div>
    </div>
</template>

<script>
import stockMapSubpage from "./stockMapSubpage.vue";
import Connector from "@/assets/js/connector/connector";
import testMsg from "@/assets/js/testMsg";
export default {
    data() {
        return {
            url: "http://stock.salefx.cn:10000/api/stock/pressureSupport",
            key: "5cqh0wyOYyFm7HavTAHQ2Z7yAs",
            suggestion: "",
            select_map_type: "分时图",
            is_update: false,
            map_data: {
                分时图: {
                    data: [],
                    code: "",
                    name: "",
                },
                日K图: {
                    data: [],
                    code: "",
                    name: "",
                },
                周K图: {
                    data: [],
                    code: "",
                    name: "",
                },
                月K图: {
                    data: [],
                    code: "",
                    name: "",
                },
            },
            code: "",
        };
    },
    components: {
        stockMapSubpage,
    },
    mounted() {},
    watch: {
        select_map_type() {
            this.selectChange();
        },
    },
    methods: {
        getSuggestionCallback(msg) {
            console.log(msg);
            if (msg.msg === "请求成功") {
                this.suggestion =
                    msg.data.description + msg.data.opinions_of_investment;
            }
        },
        getSuggestionWaiting(is_waiting) {},
        getSuggestionTimeout() {
            console.log("超时");
        },
        clickAi() {
            Connector.sendByUrl(
                this.url,
                "GET",
                [
                    ["code", this.code.toString()],
                    ["key", this.key],
                ],
                this.getSuggestionCallback,
                this.getSuggestionWaiting,
                this.getSuggestionTimeout
            );
        },
        setCode(code) {
            this.code = code;
            this.suggestion = "";
            this.getMapDataByCode(code);
        },
        selectChange() {
            if (this.select_map_type === "分时图") {
                this.$refs.stock_map_subpage.render(
                    "F",
                    this.map_data[this.select_map_type].data,
                    this.map_data[this.select_map_type].name
                );
            } else{
                this.$refs.stock_map_subpage.render(
                    "K",
                    this.map_data[this.select_map_type].data,
                    this.map_data[this.select_map_type].name
                );
            }
        },
        getMapDataByCode(code) {
            Connector.send(
                [code.toString(), "m", "", "5"],
                "getStockAnswer",
                this.FCallback,
                this.waiting,
                this.timeout,
                30000
            );
            Connector.send(
                [code.toString(), "d", "365", ""],
                "getStockAnswer",
                this.DCallback,
                this.waiting,
                this.timeout,
                30000
            );
            Connector.send(
                [code.toString(), "w", "365", ""],
                "getStockAnswer",
                this.WCallback,
                this.waiting,
                this.timeout,
                30000
            );
            Connector.send(
                [code.toString(), "M", "365", ""],
                "getStockAnswer",
                this.MCallback,
                this.waiting,
                this.timeout,
                30000
            );
        },
        FCallback(msg) {
            // 分时图回调
            if (msg.success) {
                let data = msg.content.list;
                let id = msg.content.message.stockid;
                let name = msg.content.message.stockname;
                this.map_data.分时图.data = data;
                this.map_data.分时图.code = id;
                this.map_data.分时图.name = name;

                this.select_map_type = "分时图";
                this.selectChange();
            }
        },
        DCallback(msg) {
            // 日K图
            if (msg.success) {
                let data = msg.content.list;
                let id = msg.content.message.stockid;
                let name = msg.content.message.stockname;
                this.map_data.日K图.data = data;
                this.map_data.日K图.code = id;
                this.map_data.日K图.name = name;
            }
        },
        WCallback(msg) {
            // 周K图
            if (msg.success) {
                let data = msg.content.list;
                let id = msg.content.message.stockid;
                let name = msg.content.message.stockname;
                this.map_data.周K图.data = data;
                this.map_data.周K图.code = id;
                this.map_data.周K图.name = name;
            }
        },
        MCallback(msg) {
            // 月K图
            if (msg.success) {
                let data = msg.content.list;
                let id = msg.content.message.stockid;
                let name = msg.content.message.stockname;
                this.map_data.月K图.data = data;
                this.map_data.月K图.code = id;
                this.map_data.月K图.name = name;
            }
        },
        waiting(is_waiting) {},
        timeout() {
            console.log("超时");
        },
    },
};
</script>

<style scoped>
.stock_map_container {
    position: relative;
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */
}
.suggestion {
    position: relative;
    width: 100%;
    height: 100px;
    /* border: 1px solid red; */
    word-break: break-all;
    font-size: 18px;
    font-weight: 600;
    display: block !important;
}
.get_ai_button_c {
    float: left;
    width: 90px;
    height: 100%;
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
}
.get_ai_button {
    margin: 3px;
    cursor: pointer;
    border-radius: 4px;
    width: calc(100% - 4px);
    height: auto;
    line-height: 22px;
    border: 1px solid #822296;
    padding: 2px;
}
.get_ai_button:hover {
    box-shadow: 0px 0px 5px #822296;
}
.ai_suggestion {
    font-size: 16px;
    float: left;
    box-shadow: inset 0px 0px 3px #822296, 0px 0px 3px #822296;
    width: calc(100% - 10px - 90px);
    height: calc(100% - 10px);
    text-align: left;
    padding: 5px;
    overflow: auto;
}
.map_container {
    position: relative;
    width: 100%;
    height: calc(100% - 100px);
    /* border: 1px solid red; */
}
.select_container {
    position: relative;
    /* border: 1px solid red; */
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
}
.stock_map_subpage_container {
    position: relative;
    width: 100%;
    height: calc(100% - 40px);
}
</style>
